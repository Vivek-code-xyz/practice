export function FlagsPanel({ flags, changedFlags, output = "", embedded = false }) {
  return (
    <section className={`panel status-panel ${embedded ? "embedded-panel" : ""}`}>
      {!embedded ? (
        <div className="section-title-row">
          <div className="section-heading">
            <h2>Status & Output</h2>
            <p>Carry, interrupt, I/O readiness, and live ASCII output in one compact runtime view.</p>
          </div>
          <span className="chip">Status</span>
        </div>
      ) : null}
      <div className="runtime-status-layout">
        <div className="flag-grid compact-flag-grid">
          {Object.entries(flags).map(([name, value]) => (
            <div key={name} className={`flag-card compact-flag-card ${value ? "is-on" : ""} ${changedFlags.includes(name) ? "is-highlighted" : ""}`}>
              <span className="flag-name">{name}</span>
              <strong className="flag-value">{value}</strong>
            </div>
          ))}
        </div>
        <div className="runtime-output-box">
          <div className="runtime-output-head">
            <span className="eyebrow">Output</span>
            <strong>ASCII from OUTR</strong>
          </div>
          <pre className="terminal-output embedded-terminal-output">{output || "No output yet."}</pre>
        </div>
      </div>
    </section>
  );
}
