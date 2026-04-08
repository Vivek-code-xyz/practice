import { useLayoutEffect, useRef } from "react";
import {
  ALL_INSTRUCTIONS,
  DIRECTIVES,
  IO_REFERENCE_SET,
  MEMORY_REFERENCE_SET,
  REGISTER_REFERENCE_SET,
} from "../shared/mano.js";

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function classifyWord(word, index) {
  if (DIRECTIVES.has(word)) {
    return "token-directive";
  }

  if (MEMORY_REFERENCE_SET.has(word)) {
    return "token-memory-op";
  }

  if (REGISTER_REFERENCE_SET.has(word)) {
    return "token-register-op";
  }

  if (IO_REFERENCE_SET.has(word)) {
    return "token-io-op";
  }

  if (/^[-+]?\d+$/.test(word) || /^[0-9A-F]+$/.test(word)) {
    return "token-number";
  }

  if (word === "I") {
    return "token-indirect";
  }

  if (index === 0 && !ALL_INSTRUCTIONS.has(word) && !DIRECTIVES.has(word)) {
    return "token-label";
  }

  return "token-symbol";
}

function highlightLine(line) {
  if (!line.trim()) {
    return "&nbsp;";
  }

  const commentStart = line.search(/(\/\/|;)/);
  const codePart = commentStart >= 0 ? line.slice(0, commentStart) : line;
  const commentPart = commentStart >= 0 ? line.slice(commentStart) : "";

  const parts = [];
  const words = codePart.split(/(\s+|,)/);
  let semanticIndex = 0;

  words.forEach((part) => {
    if (!part) {
      return;
    }

    if (/^\s+$/.test(part)) {
      parts.push(escapeHtml(part));
      return;
    }

    if (part === ",") {
      parts.push(`<span class="token-punctuation">,</span>`);
      return;
    }

    const tokenClass = classifyWord(part, semanticIndex);
    parts.push(`<span class="${tokenClass}">${escapeHtml(part)}</span>`);
    semanticIndex += 1;
  });

  if (commentPart) {
    parts.push(`<span class="token-comment">${escapeHtml(commentPart)}</span>`);
  }

  return parts.join("");
}

export function CodeEditor({ value, onChange, activeLine, errorLines, isDark }) {
  const textareaRef = useRef(null);
  const highlightRef = useRef(null);
  const gutterRef = useRef(null);
  const selectionRef = useRef(null);
  const lines = value.split("\n");

  const handleChange = (event) => {
    selectionRef.current = {
      start: event.target.selectionStart,
      end: event.target.selectionEnd,
    };
    onChange(event.target.value.toUpperCase());
  };

  const handleScroll = (event) => {
    const top = event.target.scrollTop;
    const left = event.target.scrollLeft;

    if (highlightRef.current) {
      highlightRef.current.scrollTop = top;
      highlightRef.current.scrollLeft = left;
    }

    if (gutterRef.current) {
      gutterRef.current.scrollTop = top;
    }
  };

  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    const selection = selectionRef.current;

    if (!textarea || !selection) {
      return;
    }

    textarea.setSelectionRange(selection.start, selection.end);
    selectionRef.current = null;
  }, [value]);

  return (
    <div className="panel editor-shell">
      <div className="editor-grid">
        <div className="line-gutter" aria-hidden="true" ref={gutterRef}>
          {lines.map((_, index) => {
            const lineNumber = index + 1;
            return (
              <div
                key={lineNumber}
                className={[
                  "line-number",
                  activeLine === lineNumber ? "is-active" : "",
                  errorLines.has(lineNumber) ? "has-error" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {lineNumber}
              </div>
            );
          })}
        </div>
        <div className={`editor-stage ${isDark ? "editor-dark" : "editor-light"}`}>
          <pre className="code-highlight" aria-hidden="true" ref={highlightRef}>
            {lines.map((line, index) => {
              const lineNumber = index + 1;
              return (
                <div
                  key={lineNumber}
                  className={[
                    "code-line",
                    activeLine === lineNumber ? "is-active" : "",
                    errorLines.has(lineNumber) ? "has-error" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  dangerouslySetInnerHTML={{ __html: highlightLine(line) }}
                />
              );
            })}
          </pre>
          <textarea
            ref={textareaRef}
            className="code-input"
            spellCheck="false"
            value={value}
            onChange={handleChange}
            onScroll={handleScroll}
            aria-label="Assembly code editor"
          />
        </div>
      </div>
    </div>
  );
}
