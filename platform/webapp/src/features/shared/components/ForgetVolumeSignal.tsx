type Props = { openCount: number };

export function ForgetVolumeSignal({ openCount }: Props) {
  return (
    <div className="tk-meta" role="note">
      Forget-volume signal (read-only):{' '}
      <span className="tk-mono">{openCount}</span> open — no erasure execution in Trustkeep
      (BR-10).
    </div>
  );
}
