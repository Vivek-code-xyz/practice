export function ControlBar({
  onAssemble,
  onRun,
  onStep,
  onReset,
  isRunning,
  disabled,
  inputBuffer,
  onInputChange,
  onLoadInput,
  samples,
  onLoadSample,
  theme,
  onToggleTheme,
}) {
  return (
    <section className="control-panel compact-control-panel">
      <div className="control-row">
        <button type="button" onClick={onAssemble}>
          ASSEMBLE
        </button>
        <button type="button" onClick={onRun} disabled={disabled}>
          {isRunning ? "PAUSE" : "RUN"}
        </button>
        <button type="button" onClick={onStep} disabled={disabled || isRunning}>
          STEP
        </button>
        <button type="button" onClick={onReset}>
          RESET
        </button>
        <button type="button" className="theme-toggle" onClick={onToggleTheme}>
          {theme === "dark" ? "LIGHT THEME" : "DARK THEME"}
        </button>
      </div>
      <div className="control-row secondary">
        <select defaultValue="" onChange={(event) => onLoadSample(event.target.value)}>
          <option value="" disabled>
            Load sample program
          </option>
          {Object.entries(samples).map(([key, sample]) => (
            <option key={key} value={key}>
              {sample.name}
            </option>
          ))}
        </select>
        <input type="text" value={inputBuffer} onChange={(event) => onInputChange(event.target.value.toUpperCase())} placeholder="ASCII INPUT" />
        <button type="button" onClick={onLoadInput}>
          LOAD INPUT
        </button>
      </div>
    </section>
  );
}
