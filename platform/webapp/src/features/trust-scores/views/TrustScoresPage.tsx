import { useEffect, useState } from 'react';
import { trustScoresService } from '@/services/domains/trust-scores';

type Score = {
  id: string;
  journeyId: string;
  score: number;
  gateState: string;
  computedAt: string;
};

export function TrustScoresPage() {
  const [items, setItems] = useState<Score[]>([]);

  useEffect(() => {
    trustScoresService
      .listTrustScores()
      .then((res) =>
        setItems(
          ((res as { data?: { items?: Score[] } }).data?.items ?? []) as Score[]
        )
      )
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1 className="tk-page-title">Trust scores</h1>
      <p className="tk-page-sub">Per-journey trust scores with gate state (BR-1).</p>
      <table className="tk-table">
        <thead>
          <tr>
            <th>Journey</th>
            <th>Score</th>
            <th>Gate</th>
            <th>Computed</th>
          </tr>
        </thead>
        <tbody>
          {items.map((s) => (
            <tr key={s.id}>
              <td className="tk-mono">{s.journeyId}</td>
              <td className="tk-mono">{s.score.toFixed(1)}</td>
              <td>
                <span className={`tk-chip ${s.gateState === 'blocked' ? 'warn' : ''}`}>
                  {s.gateState}
                </span>
              </td>
              <td className="tk-mono">{s.computedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
