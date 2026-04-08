export function ExecutionPanel({ meta, history, currentLine, isRunning, embedded = false }) {
  return (
    <section className={`panel execution-panel ${isRunning ? "is-running" : ""} ${embedded ? "embedded-panel" : ""}`}>
      {!embedded ? (
        <div className="section-title-row">
          <div className="section-heading">
            <h2>Step Execution</h2>
            <p>RTL micro-operations across fetch, decode, execute, and interrupt cycles.</p>
          </div>
          <span className="chip">{meta.phase.toUpperCase()}</span>
        </div>
      ) : null}
      <div className="execution-current">
        <div>
          <span className="eyebrow">Timing</span>
          <strong>{meta.timing}</strong>
        </div>
        <div>
          <span className="eyebrow">Line</span>
          <strong>{currentLine ?? "-"}</strong>
        </div>
        <div>
          <span className="eyebrow">Opcode</span>
          <strong>{meta.decodedOpcode ?? "-"}</strong>
        </div>
      </div>
      <div className="rtl-box">{meta.microOperation}</div>
      <div className="history-list">
        {history.length === 0 ? <p className="muted">No micro-operations yet.</p> : null}
        {history.map((entry) => (
          <article key={entry.id} className="history-item">
            <div className="history-header">
              <strong>{entry.timing}</strong>
              <span>{entry.phase}</span>
              <span>Line {entry.line ?? "-"}</span>
            </div>
            <p>{entry.rtl}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
