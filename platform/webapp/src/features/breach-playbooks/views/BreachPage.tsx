import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { breachPlaybooksService } from '@/services/domains/breach-playbooks';
import { BreachRecoveryTimeline } from '@/features/shared/components/BreachRecoveryTimeline';

type Incident = {
  id: string;
  status: string;
  detectedAt: string;
  regulatorNotifyDueAt?: string;
  trustDelta?: number;
  summary?: string;
};

export function BreachPage() {
  const [items, setItems] = useState<Incident[]>([]);
  const [active, setActive] = useState<Incident | null>(null);

  async function reload() {
    const res = await breachPlaybooksService.listBreachIncidents();
    setItems(
      ((res as { data?: { items?: Incident[] } }).data?.items ?? []) as Incident[]
    );
  }

  useEffect(() => {
    reload().catch(console.error);
  }, []);

  async function openIncident(e: FormEvent) {
    e.preventDefault();
    const detectedAt = new Date().toISOString();
    const created = await breachPlaybooksService.openBreachIncident({
      detectedAt,
      summary: 'Sandbox breach signal',
    });
    const incident = (created as { data?: Incident }).data!;
    await breachPlaybooksService.startPlaybookRun(incident.id, {
      playbookKey: 'standard_72h',
    });
    setActive(incident);
    await reload();
  }

  return (
    <div>
      <h1 className="tk-page-title">Breach trust-recovery playbooks</h1>
      <p className="tk-page-sub">
        Timed recovery so handled-well breaches can rebuild loyalty (BR-2).
      </p>
      <form className="tk-form" onSubmit={openIncident}>
        <button className="tk-btn tk-btn-primary" type="submit">
          Activate standard 72h playbook
        </button>
      </form>
      <BreachRecoveryTimeline
        regulatory={[
          {
            label: 'Detect & open incident',
            done: Boolean(active),
            at: active?.detectedAt,
          },
          {
            label: 'Notify regulator within 72h',
            done: active?.status === 'notifying' || active?.status === 'recovered',
            at: active?.regulatorNotifyDueAt,
          },
        ]}
        customer={[
          { label: 'Customer communication track', done: Boolean(active) },
          {
            label: 'Record trust delta',
            done: active?.trustDelta != null,
          },
        ]}
      />
      <table className="tk-table" style={{ marginTop: 24 }}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Status</th>
            <th>Detected</th>
          </tr>
        </thead>
        <tbody>
          {items.map((i) => (
            <tr key={i.id}>
              <td className="tk-mono">{i.id}</td>
              <td>{i.status}</td>
              <td className="tk-mono">{i.detectedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
