export function DocumentationPanel() {
  return (
    <section className="panel bottom-panel">
      <div className="section-title-row">
        <div className="section-heading">
          <h2>How To Use</h2>
          <p>A quick guide to writing, assembling, and running programs in Codembly.</p>
        </div>
        <span className="chip">Guide</span>
      </div>
      <div className="doc-copy">
        <p>Start by creating or selecting a file from the explorer on the left. Write your Basic Computer assembly program in the editor, or load one of the sample programs from the header if you want a quick starting point.</p>
        <p>When your code is ready, use <code>Assemble</code> to translate it and load it into memory. If there are syntax or assembly problems, check the <code>Error Log</code> tab below the editor to see what needs to be fixed.</p>
        <p>Use <code>Step</code> to move through the program one micro-operation at a time, or use <code>Run</code> to execute continuously. <code>Reset</code> reloads the assembled program, and <code>Clear</code> empties the current editor file.</p>
        <p>If your program needs input, type characters into the input box in the editor toolbar and press <code>Load</code>. Output from the program appears in the runtime output panel, while registers, flags, and memory update live as the program runs.</p>
        <p>Use <code>Import</code> and <code>Export</code> in the header to bring in or download <code>.ash</code> files. A small dot on an editor tab means that file has changes that have not been assembled or exported yet.</p>
        <p>Keyboard shortcuts: <code>Ctrl+S</code> assembles, <code>Ctrl+Shift+S</code> exports the current file, <code>Ctrl+O</code> imports a file, <code>Ctrl+N</code> creates a new file, <code>F5</code> runs or pauses, and <code>F10</code> steps through execution.</p>
        <p>You can customize the whole interface from <code>Settings</code>, including theme, style preset, fonts, and density. Your files and appearance preferences are stored locally in the browser, so they stay available on the same device.</p>
      </div>
    </section>
  );
}
