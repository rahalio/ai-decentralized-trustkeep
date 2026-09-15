type Props = {
  periodLabel: string;
  status: string;
  downloadUrl?: string;
  onGenerate?: () => void;
};

export function BoardPackExport({
  periodLabel,
  status,
  downloadUrl,
  onGenerate,
}: Props) {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <div>
        <strong>Board pack · {periodLabel}</strong>
        <div className="tk-meta tk-mono">status: {status}</div>
      </div>
      {onGenerate ? (
        <button className="tk-btn tk-btn-primary" onClick={onGenerate}>
          Generate monthly OR pack
        </button>
      ) : null}
      {downloadUrl ? (
        <a className="tk-btn" href={downloadUrl} target="_blank" rel="noreferrer">
          Download (no raw PII)
        </a>
      ) : null}
    </div>
  );
}
