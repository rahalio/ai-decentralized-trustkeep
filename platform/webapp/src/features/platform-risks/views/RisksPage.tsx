import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { platformRisksService } from '@/services/domains/platform-risks';
import { PlatformExclusionChip } from '@/features/shared/components/PlatformExclusionChip';

type Risk = {
  id: string;
  title: string;
  status: string;
  severity: string;
  owner: string;
};

export function RisksPage() {
  const [items, setItems] = useState<Risk[]>([]);
  const [title, setTitle] = useState('');
  const [owner, setOwner] = useState('CDO');

  async function reload() {
    const res = await platformRisksService.listPlatformRisks();
    setItems(((res as { data?: { items?: Risk[] } }).data?.items ?? []) as Risk[]);
  }

  useEffect(() => {
    reload().catch(console.error);
  }, []);

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    await platformRisksService.createPlatformRisk({
      title,
      severity: 'medium',
      owner,
      status: 'watch',
    });
    setTitle('');
    await reload();
  }

  return (
    <div>
      <h1 className="tk-page-title">Platform exclusion risk register</h1>
      <p className="tk-page-sub">
        Track exclusion risk from digital platforms due to weak ethical/security controls
        (BR-8).
      </p>
      <form className="tk-form" onSubmit={onCreate}>
        <input
          required
          placeholder="Risk title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input value={owner} onChange={(e) => setOwner(e.target.value)} />
        <button className="tk-btn tk-btn-primary" type="submit">
          Add risk item
        </button>
      </form>
      {items.length === 0 ? (
        <p className="tk-meta">
          Empty = monitored-clear state. <PlatformExclusionChip status="monitored_clear" />
        </p>
      ) : null}
      <table className="tk-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Owner</th>
            <th>Severity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((r) => (
            <tr key={r.id}>
              <td>{r.title}</td>
              <td>{r.owner}</td>
              <td>{r.severity}</td>
              <td>
                <PlatformExclusionChip status={r.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
