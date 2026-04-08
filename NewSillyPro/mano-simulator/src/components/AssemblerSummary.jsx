import { formatAddress, formatWord } from "../shared/mano.js";

export function AssemblerSummary({ listing, symbols }) {
  const symbolRows = [...symbols.entries()].sort((a, b) => a[1] - b[1] || a[0].localeCompare(b[0]));

  return (
    <section className="panel bottom-panel">
      <div className="section-title-row">
        <div className="section-heading">
          <h2>Assembler Listing</h2>
          <p>Resolved addresses, machine words, and original source lines.</p>
        </div>
        <span className="chip">{symbols.size} symbols</span>
      </div>
      <div className="listing-columns">
        <div className="listing-table">
          <div className="listing-head">ADDR</div>
          <div className="listing-head">WORD</div>
          <div className="listing-head">SOURCE</div>
          {listing.map((line) => (
            <div key={`${line.lineNumber}-${line.address ?? "na"}`} className="listing-row">
              <span>{line.address === null ? "---" : formatAddress(line.address)}</span>
              <span>{line.machineWord === undefined ? "----" : formatWord(line.machineWord)}</span>
              <span>{line.code}</span>
            </div>
          ))}
        </div>
        <div className="symbol-table">
          <h3>Symbol Table</h3>
          {symbolRows.length === 0 ? <p className="muted">No labels defined in the current assembly source.</p> : null}
          {symbolRows.map(([name, address]) => (
            <div key={name} className="symbol-row">
              <span>{name}</span>
              <strong>{formatAddress(address)}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
