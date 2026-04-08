# Codembly

Codembly is a fully client-side React workspace for the Morris Mano Basic Computer. The app includes:

- A line-numbered uppercase assembly editor
- A two-pass assembler with `ORG`, `END`, `DEC`, and `HEX`
- A 4096-word memory system with 12-bit addressing and 16-bit words
- Full register and flip-flop visualization
- RTL-level fetch, decode, indirect, execute, and interrupt-cycle stepping
- Memory-reference, register-reference, and I/O instruction support
- Friendly assembler diagnostics and sample programs

## Run

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

Local production preview:

```bash
npm run preview
```

## Deploy

This project is ready for static deployment.

Build output:

```bash
npm run build
```

The production files are generated in `dist/`.

Supported out of the box:

- Vercel via `vercel.json`
- Netlify via `netlify.toml`
- Any static host that serves the `dist/` folder

Recommended deployment settings:

- Build command: `npm run build`
- Output directory: `dist`
- Node version: current LTS

Before deploying, replace the placeholder personal links in the footer if needed:

- GitHub URL
- LinkedIn URL
- Email address

## Instruction Coverage

Memory-reference:

- `AND`
- `ADD`
- `LDA`
- `STA`
- `BUN`
- `BSA`
- `ISZ`

Register-reference:

- `CLA`
- `CLE`
- `CMA`
- `CME`
- `CIR`
- `CIL`
- `INC`
- `SPA`
- `SNA`
- `SZA`
- `SZE`
- `HLT`

I/O:

- `INP`
- `OUT`
- `SKI`
- `SKO`
- `ION`
- `IOF`

## Assembly Rules

- Source is auto-converted to uppercase in the editor
- Labels use `LABEL, OPCODE OPERAND`
- Comments may use `;`, `//`, or `/`
- Indirect addressing uses `I` after the operand, for example `LDA PTR I`
- `ORG` operands are interpreted as hexadecimal addresses
- `HEX` stores hexadecimal constants
- `DEC` stores signed decimal constants in 16-bit two's-complement form

## Project Structure

```text
src/
  assembler/
    assembler.js
  components/
    AssemblerSummary.jsx
    CodeEditor.jsx
    ControlBar.jsx
    DocumentationPanel.jsx
    ErrorLog.jsx
    ExecutionPanel.jsx
    FlagsPanel.jsx
    MemoryViewer.jsx
    RegisterPanel.jsx
  cpu/
    basicComputer.js
  memory/
    basicMemory.js
  shared/
    mano.js
  samplePrograms.js
  App.jsx
```

## Verification

The core was verified with:

- `npm run lint`
- `npm run build`
- Direct module execution checks for:
  - `LDA/ADD/STA/HLT`
  - indirect addressing with `I`
  - `BSA`/`BUN I` subroutine flow
