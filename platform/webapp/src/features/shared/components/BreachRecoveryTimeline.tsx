type Step = { label: string; at?: string; done?: boolean };

type Props = { regulatory: Step[]; customer: Step[] };

export function BreachRecoveryTimeline({ regulatory, customer }: Props) {
  return (
    <div style={{ display: 'grid', gap: 16, gridTemplateColumns: '1fr 1fr' }}>
      {[
        ['72h regulatory', regulatory],
        ['Customer communication', customer],
      ].map(([title, steps]) => (
        <section key={title as string}>
          <h3 style={{ marginTop: 0 }}>{title as string}</h3>
          <ol style={{ margin: 0, paddingLeft: 18 }}>
            {(steps as Step[]).map((s) => (
              <li
                key={s.label}
                style={{
                  marginBottom: 8,
                  color: s.done ? 'var(--color-teal)' : 'var(--color-steel)',
                  transition: 'color var(--motion-recover)',
                }}
              >
                <span className="tk-mono">{s.label}</span>
                {s.at ? <div className="tk-meta">{s.at}</div> : null}
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}
