import { useEffect, useState } from 'react';
import { boardExportsService } from '@/services/domains/board-exports';
import { BoardPackExport } from '@/features/shared/components/BoardPackExport';

type Pack = {
  id: string;
  periodLabel: string;
  status: string;
  downloadUrl?: string;
};

export function ExportPage() {
  const [items, setItems] = useState<Pack[]>([]);
  const periodLabel = new Date().toISOString().slice(0, 7);

  async function reload() {
    const res = await boardExportsService.listBoardExports();
    setItems(((res as { data?: { items?: Pack[] } }).data?.items ?? []) as Pack[]);
  }

  useEffect(() => {
    reload().catch(console.error);
  }, []);

  async function generate() {
    await boardExportsService.createBoardExport({
      periodLabel,
      includeGates: true,
      includeBreachRecovery: true,
      includeHoldingCosts: true,
      includePlatformRisks: true,
    });
    await reload();
  }

  const latest = items[0];

  return (
    <div>
      <h1 className="tk-page-title">Board / regulator export</h1>
      <p className="tk-page-sub">
        Narrative pack of scores, gates, recovery, and cost burn-down without raw PII
        (BR-11).
      </p>
      <BoardPackExport
        periodLabel={latest?.periodLabel ?? periodLabel}
        status={latest?.status ?? 'pending'}
        downloadUrl={latest?.downloadUrl}
        onGenerate={generate}
      />
      <table className="tk-table" style={{ marginTop: 24 }}>
        <thead>
          <tr>
            <th>Period</th>
            <th>Status</th>
            <th>Id</th>
          </tr>
        </thead>
        <tbody>
          {items.map((p) => (
            <tr key={p.id}>
              <td>{p.periodLabel}</td>
              <td>{p.status}</td>
              <td className="tk-mono">{p.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
