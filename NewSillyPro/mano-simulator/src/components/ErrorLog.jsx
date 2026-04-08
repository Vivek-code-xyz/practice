export function ErrorLog({ errors, embedded = false }) {
  return (
    <section className={`panel bottom-panel ${embedded ? "embedded-panel" : ""}`}>
      <div className="section-title-row">
        <div className="section-heading">
          <h2>Error Log</h2>
          <p>Assembler diagnostics with friendly explanations and suggestions.</p>
        </div>
        <span className={`chip ${errors.length ? "chip-danger" : "chip-ok"}`}>{errors.length ? `${errors.length} issues` : "Assembler happy"}</span>
      </div>
      <div className="error-list">
        {errors.length === 0 ? <p className="muted">No errors. The assembler is calm, fed, and cooperative.</p> : null}
        {errors.map((error, index) => (
          <article key={`${error.lineNumber}-${index}`} className="error-item">
            <strong>Line {error.lineNumber}</strong>
            <p>{error.message}</p>
            {error.suggestion ? <span>{error.suggestion}</span> : null}
          </article>
        ))}
      </div>
    </section>
  );
}
