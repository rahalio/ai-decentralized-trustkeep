import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { monetizationGatesService } from '@/services/domains/monetization-gates';
import { journeysService } from '@/services/domains/journeys';
import { MonetizationGateBanner } from '@/features/shared/components/MonetizationGateBanner';

type Proposal = {
  id: string;
  journeyId: string;
  status: string;
  valueProposition: string;
  autoBlocked?: boolean;
};
type Journey = { id: string; name: string };

export function GatesPage() {
  const [items, setItems] = useState<Proposal[]>([]);
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [journeyId, setJourneyId] = useState('');
  const [valueProposition, setValueProposition] = useState('');

  async function reload() {
    const [p, j] = await Promise.all([
      monetizationGatesService.listMonetizationProposals(),
      journeysService.listJourneys(),
    ]);
    const jItems = ((j as { data?: { items?: Journey[] } }).data?.items ??
      []) as Journey[];
    setJourneys(jItems);
    setItems(
      ((p as { data?: { items?: Proposal[] } }).data?.items ?? []) as Proposal[]
    );
    if (!journeyId && jItems[0]) setJourneyId(jItems[0].id);
  }

  useEffect(() => {
    reload().catch(console.error);
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    await monetizationGatesService.submitMonetizationProposal({
      journeyId,
      valueProposition,
      involvesThirdPartyShare: true,
    });
    setValueProposition('');
    await reload();
  }

  const blocked = items.filter((i) => i.status === 'blocked').length;

  return (
    <div>
      <h1 className="tk-page-title">Monetisation permission gates</h1>
      <p className="tk-page-sub">
        Block third-party sharing when trust is below threshold (BR-4, BR-12).
      </p>
      <MonetizationGateBanner blockedCount={blocked} />
      <form className="tk-form" onSubmit={onSubmit}>
        <select value={journeyId} onChange={(e) => setJourneyId(e.target.value)}>
          {journeys.map((j) => (
            <option key={j.id} value={j.id}>
              {j.name}
            </option>
          ))}
        </select>
        <textarea
          required
          placeholder="Value proposition"
          value={valueProposition}
          onChange={(e) => setValueProposition(e.target.value)}
        />
        <button className="tk-btn tk-btn-primary" type="submit">
          Submit proposal
        </button>
      </form>
      <table className="tk-table">
        <thead>
          <tr>
            <th>Proposal</th>
            <th>Status</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {items.map((p) => (
            <tr key={p.id}>
              <td>{p.valueProposition}</td>
              <td>
                <span className={`tk-chip ${p.status === 'blocked' ? 'warn' : ''}`}>
                  {p.status}
                </span>
              </td>
              <td>
                {p.status === 'blocked' ? (
                  <button
                    className="tk-btn"
                    onClick={() =>
                      monetizationGatesService
                        .decideMonetizationGate(p.id, {
                          decision: 'allow',
                          rationale: 'Remediated after review',
                        })
                        .then(reload)
                    }
                  >
                    Release after remediation
                  </button>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
