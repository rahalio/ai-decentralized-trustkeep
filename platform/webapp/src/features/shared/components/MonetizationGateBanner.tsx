type Props = { blockedCount: number };

export function MonetizationGateBanner({ blockedCount }: Props) {
  if (blockedCount <= 0) return null;
  return (
    <div className="tk-gate-banner" role="status" aria-live="polite">
      Monetisation auto-blocked on {blockedCount} journey
      {blockedCount === 1 ? '' : 's'} — remediate trust before release (BR-12).
    </div>
  );
}
