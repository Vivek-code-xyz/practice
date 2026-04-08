import { formatAddress, formatByte, formatWord, toSigned16, wordToBinary } from "../shared/mano.js";

function RegisterCard({ name, value, width, highlight }) {
  const display = width === 12 ? formatAddress(value) : width === 8 ? formatByte(value) : formatWord(value);
  const numeric = width === 16 ? `${value} / ${toSigned16(value)}` : `${value}`;

  return (
    <article className={`register-card ${highlight ? "is-highlighted" : ""}`}>
      <div className="register-head">
        <div className="register-title-stack">
          <strong className="register-name">{name}</strong>
          <span className="register-width">{width}-bit</span>
        </div>
        <span className="register-chip">HEX</span>
      </div>
      <div className="register-value">{display}</div>
      <div className="register-binary">{wordToBinary(value, width)}</div>
      <div className="register-meta">
        <span>DEC</span>
        <span className="register-meta-value">{numeric}</span>
      </div>
    </article>
  );
}

export function RegisterPanel({ registers, changedRegisters, flags = null, changedFlags = [], embedded = false }) {
  const highlight = (name) => changedRegisters.includes(name);

  return (
    <section className={`panel machine-panel ${embedded ? "embedded-panel" : ""}`}>
      {!embedded ? (
        <div className="section-title-row">
          <div className="section-heading">
            <h2>Register File</h2>
            <p>Main registers, I/O registers, and sequence counter.</p>
          </div>
          <span className="chip">CPU state</span>
        </div>
      ) : null}
      <div className="register-panel-scroll">
        <div className="register-grid">
          <RegisterCard name="AR" value={registers.AR} width={12} highlight={highlight("AR")} />
          <RegisterCard name="PC" value={registers.PC} width={12} highlight={highlight("PC")} />
          <RegisterCard name="DR" value={registers.DR} width={16} highlight={highlight("DR")} />
          <RegisterCard name="AC" value={registers.AC} width={16} highlight={highlight("AC")} />
          <RegisterCard name="IR" value={registers.IR} width={16} highlight={highlight("IR")} />
          <RegisterCard name="TR" value={registers.TR} width={16} highlight={highlight("TR")} />
          <RegisterCard name="INPR" value={registers.INPR} width={8} highlight={highlight("INPR")} />
          <RegisterCard name="OUTR" value={registers.OUTR} width={8} highlight={highlight("OUTR")} />
          <RegisterCard name="SC" value={registers.SC} width={4} highlight={highlight("SC")} />
        </div>
        {flags ? (
          <div className="register-flags-block">
            <div className="register-flags-head">
              <span className="eyebrow">Flags & Flip-Flops</span>
              <strong>Live control state</strong>
            </div>
            <div className="flag-grid compact-flag-grid register-flags-grid">
              {Object.entries(flags).map(([name, value]) => (
                <div
                  key={name}
                  className={`flag-card compact-flag-card ${value ? "is-on" : ""} ${changedFlags.includes(name) ? "is-highlighted" : ""}`}
                >
                  <span className="flag-name">{name}</span>
                  <strong className="flag-value">{value}</strong>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
