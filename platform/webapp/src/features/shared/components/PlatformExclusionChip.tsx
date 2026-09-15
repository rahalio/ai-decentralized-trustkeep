type Props = { status: string; title?: string };

export function PlatformExclusionChip({ status, title }: Props) {
  const warn = status !== 'monitored_clear' && status !== 'mitigated';
  return (
    <span className={`tk-chip ${warn ? 'warn' : ''}`} title={title}>
      Platform risk: {status.replace(/_/g, ' ')}
    </span>
  );
}
