import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { decisionLogsService } from '@/services/domains/decision-logs';
import { DecisionLogEntry } from '@/features/shared/components/DecisionLogEntry';

type Decision = {
  id: string;
  title: string;
  category: string;
  outcome: string;
  decidedAt: string;
  attendees?: string[];
};

export function DecisionsPage() {
  const [items, setItems] = useState<Decision[]>([]);
  const [title, setTitle] = useState('');
  const [outcome, setOutcome] = useState('');
  const [category, setCategory] = useState('business');

  async function reload() {
    const res = await decisionLogsService.listDecisionLogs();
    setItems(
      ((res as { data?: { items?: Decision[] } }).data?.items ?? []) as Decision[]
    );
  }

  useEffect(() => {
    reload().catch(console.error);
  }, []);

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    await decisionLogsService.createDecisionLog({
      title,
      category,
      outcome,
      decidedAt: new Date().toISOString(),
      attendees: ['CDO', 'Privacy', 'CMO'],
    });
    setTitle('');
    setOutcome('');
    await reload();
  }

  return (
    <div>
      <h1 className="tk-page-title">Cross-functional decision log</h1>
      <p className="tk-page-sub">
        Attach compliance / business / technology decisions to trust actions (BR-7).
      </p>
      <form className="tk-form" onSubmit={onCreate}>
        <input
          required
          placeholder="Decision title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="compliance">compliance</option>
          <option value="business">business</option>
          <option value="technology">technology</option>
        </select>
        <textarea
          required
          placeholder="Outcome"
          value={outcome}
          onChange={(e) => setOutcome(e.target.value)}
        />
        <button className="tk-btn tk-btn-primary" type="submit">
          Add decision
        </button>
      </form>
      {items.length === 0 ? (
        <p className="tk-meta">Empty — prompt to log the monthly review.</p>
      ) : null}
      {items.map((d) => (
        <DecisionLogEntry key={d.id} {...d} />
      ))}
    </div>
  );
}
