type Props = {
  inactiveRecords: number;
  annualCostPerRecord: number;
  estimatedAnnualCost: number;
  cleansedRecords?: number;
  burnDownTargetRecords?: number;
};

export function HoldingCostCurve({
  inactiveRecords,
  annualCostPerRecord,
  estimatedAnnualCost,
  cleansedRecords = 0,
  burnDownTargetRecords = 0,
}: Props) {
  const progress =
    burnDownTargetRecords > 0
      ? Math.min(100, Math.round((cleansedRecords / burnDownTargetRecords) * 100))
      : 0;
  return (
    <div>
      <div className="tk-score" style={{ color: 'var(--color-teal)' }}>
        ${estimatedAnnualCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
      </div>
      <div className="tk-meta">
        {inactiveRecords.toLocaleString()} inactive · ${annualCostPerRecord.toFixed(2)}/record/yr
      </div>
      <div
        style={{
          marginTop: 12,
          height: 8,
          background: 'var(--color-ink-700)',
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            background: 'var(--color-teal)',
            transition: 'width var(--motion-score)',
          }}
        />
      </div>
      <div className="tk-meta" style={{ marginTop: 6 }}>
        Burn-down {progress}% ({cleansedRecords}/{burnDownTargetRecords || '—'})
      </div>
    </div>
  );
}
