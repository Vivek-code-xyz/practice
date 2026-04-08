import { useRef, useState } from "react";
import { formatAddress, formatWord, toSigned16 } from "../shared/mano.js";

function buildLabelLookup(symbols) {
  const lookup = new Map();
  [...symbols.entries()].forEach(([name, address]) => {
    if (!lookup.has(address)) {
      lookup.set(address, []);
    }
    lookup.get(address).push(name);
  });
  return lookup;
}

function buildListingLookup(listing) {
  const lookup = new Map();
  listing.forEach((line) => {
    if (line.address !== null && line.address !== undefined) {
      lookup.set(line.address, line);
    }
  });
  return lookup;
}

function formatDisplayValue(value, mode, type = "word") {
  if (mode === "dec") {
    return type === "address" ? String(value) : String(toSigned16(value));
  }

  return type === "address" ? formatAddress(value) : formatWord(value);
}

export function MemoryViewer({
  memory,
  pc,
  lastAccessedAddress,
  compact = false,
  embedded = false,
  symbols = new Map(),
  listing = [],
  displayMode = "hex",
  onDisplayModeChange,
}) {
  const [searchValue, setSearchValue] = useState("");
  const [searchedAddress, setSearchedAddress] = useState(null);
  const memoryGridRef = useRef(null);
  const rowRefs = useRef(new Map());
  const symbolRows = [...symbols.entries()].slice(0, 24);
  const labelLookup = buildLabelLookup(symbols);
  const listingLookup = buildListingLookup(listing);

  const handleLocateAddress = () => {
    const trimmed = searchValue.trim();
    if (!trimmed) {
      return;
    }

    const parsed =
      displayMode === "hex"
        ? Number.parseInt(trimmed, 16)
        : Number.parseInt(trimmed, 10);

    if (Number.isNaN(parsed) || parsed < 0 || parsed > 0xfff) {
      return;
    }

    setSearchedAddress(parsed);
    setSearchValue("");
    const node = rowRefs.current.get(parsed);
    if (node && memoryGridRef.current) {
      const container = memoryGridRef.current;
      const nextTop = node.offsetTop - container.clientHeight / 2 + node.clientHeight / 2;
      container.scrollTo({
        top: Math.max(0, nextTop),
        behavior: "smooth",
      });
    }
  };

  const handleGoTop = () => {
    memoryGridRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    setSearchedAddress(null);
    setSearchValue("");
  };

  return (
    <section className={`panel ${compact ? "machine-panel compact-memory-panel" : "bottom-panel"} ${embedded ? "embedded-panel" : ""}`}>
      {!embedded ? (
        <div className="section-title-row">
          <div className="section-heading">
            <h2>Memory Viewer</h2>
            <p>4096 words, 12-bit address, 16-bit data.</p>
          </div>
          <div className="memory-toolbar">
            <div className="memory-search">
              <input
                type="text"
                value={searchValue}
                onChange={(event) => setSearchValue(displayMode === "hex" ? event.target.value.toUpperCase() : event.target.value)}
                placeholder={displayMode === "hex" ? "LOCATE HEX ADDR" : "LOCATE DEC ADDR"}
              />
              <button type="button" onClick={handleLocateAddress}>
                Go
              </button>
              <button type="button" onClick={handleGoTop}>
                Top
              </button>
            </div>
            <div className="toggle-group">
              <button type="button" className={displayMode === "hex" ? "is-active" : ""} onClick={() => onDisplayModeChange?.("hex")}>
                HEX
              </button>
              <button type="button" className={displayMode === "dec" ? "is-active" : ""} onClick={() => onDisplayModeChange?.("dec")}>
                DEC
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="memory-toolbar embedded-memory-toolbar">
          <div className="memory-search">
            <input
              type="text"
              value={searchValue}
              onChange={(event) => setSearchValue(displayMode === "hex" ? event.target.value.toUpperCase() : event.target.value)}
              placeholder={displayMode === "hex" ? "HEX ADDR" : "DEC ADDR"}
            />
            <button type="button" onClick={handleLocateAddress}>
              Go
            </button>
            <button type="button" onClick={handleGoTop}>
              Top
            </button>
          </div>
          <div className="toggle-group">
            <button type="button" className={displayMode === "hex" ? "is-active" : ""} onClick={() => onDisplayModeChange?.("hex")}>
              HEX
            </button>
            <button type="button" className={displayMode === "dec" ? "is-active" : ""} onClick={() => onDisplayModeChange?.("dec")}>
              DEC
            </button>
          </div>
        </div>
      )}
      <div className={`memory-view-layout ${compact ? "memory-view-layout-compact" : ""}`}>
        <div className={`memory-table-shell ${compact ? "memory-table-shell-compact" : ""}`}>
          <div ref={memoryGridRef} className={`memory-grid ${compact ? "memory-grid-compact" : ""}`}>
            <div className="memory-grid-header">
              <div className="memory-head">ADDR</div>
              <div className="memory-head">LABEL</div>
              <div className="memory-head">DATA</div>
              <div className="memory-head">ROLE</div>
            </div>
            {Array.from(memory).map((word, address) => {
              const isPc = address === pc;
              const isAccessed = address === lastAccessedAddress;
              const labels = labelLookup.get(address) ?? [];
              const line = listingLookup.get(address);
              const roleParts = [];
              if (line?.kind === "instruction") {
                roleParts.push(line.opcode);
              } else if (line?.kind === "directive") {
                roleParts.push(line.opcode);
              }
              if (isPc) {
                roleParts.push("PC");
              }
              if (isAccessed) {
                roleParts.push("BUS");
              }
              return (
                <div
                  key={address}
                  ref={(node) => {
                    if (node) {
                      rowRefs.current.set(address, node);
                    } else {
                      rowRefs.current.delete(address);
                    }
                  }}
                  className={`memory-row ${isPc ? "pc-row" : ""} ${isAccessed ? "accessed-row" : ""} ${searchedAddress === address ? "searched-row" : ""}`}
                >
                  <span>{formatDisplayValue(address, displayMode, "address")}</span>
                  <span>{labels.join(", ") || "-"}</span>
                  <span>{formatDisplayValue(word, displayMode, "word")}</span>
                  <span>{roleParts.join(" / ") || "-"}</span>
                </div>
              );
            })}
          </div>
        </div>
        {symbolRows.length > 0 ? (
          <div className="symbol-watch">
            <div className="symbol-watch-head">
              <span className="eyebrow">Program Variables</span>
              <strong>Address and live value</strong>
            </div>
            <div className="symbol-watch-grid">
              <div className="memory-grid-header symbol-watch-header">
                <div className="memory-head">NAME</div>
                <div className="memory-head">ADDR</div>
                <div className="memory-head">VALUE</div>
              </div>
              {symbolRows.map(([name, address]) => (
                <div key={name} className="symbol-watch-row">
                  <span>{name}</span>
                  <span>{formatDisplayValue(address, displayMode, "address")}</span>
                  <span>{formatDisplayValue(memory[address] ?? 0, displayMode, "word")}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
