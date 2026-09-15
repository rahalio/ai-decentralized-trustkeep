type Props = {
  name: string;
  score?: number;
  gateState?: 'open' | 'blocked';
  optInRate?: number;
  revokeRate?: number;
  onOpen?: () => void;
};

export function JourneyTrustBand({
  name,
  score = 0,
  gateState = 'open',
  optInRate,
  revokeRate,
  onOpen,
}: Props) {
  return (
    <article
      className={`tk-journey-band ${gateState === 'blocked' ? 'blocked' : ''}`}
    >
      <header style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <strong>{name}</strong>
          <div className="tk-meta">
            opt-in {optInRate != null ? `${Math.round(optInRate * 100)}%` : '—'} · revoke{' '}
            {revokeRate != null ? `${Math.round(revokeRate * 100)}%` : '—'}
          </div>
        </div>
        <div className="tk-score">{score.toFixed(1)}</div>
      </header>
      {onOpen ? (
        <button className="tk-btn" style={{ marginTop: 12 }} onClick={onOpen}>
          Open journey
        </button>
      ) : null}
    </article>
  );
}
