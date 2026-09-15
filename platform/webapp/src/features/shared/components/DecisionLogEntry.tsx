type Props = {
  title: string;
  category: string;
  outcome: string;
  decidedAt: string;
  attendees?: string[];
};

export function DecisionLogEntry({
  title,
  category,
  outcome,
  decidedAt,
  attendees = [],
}: Props) {
  return (
    <article style={{ borderBottom: '1px solid var(--color-ink-700)', padding: '12px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
        <strong>{title}</strong>
        <span className="tk-chip">{category}</span>
      </div>
      <p className="tk-meta" style={{ margin: '8px 0' }}>
        {outcome}
      </p>
      <div className="tk-meta tk-mono">
        {new Date(decidedAt).toLocaleString()}
        {attendees.length ? ` · ${attendees.join(', ')}` : ''}
      </div>
    </article>
  );
}
