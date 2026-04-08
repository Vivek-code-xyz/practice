import {
  ADDRESS_MASK,
  ALL_INSTRUCTIONS,
  DIRECTIVES,
  IO_REFERENCE_OPCODES,
  IO_REFERENCE_SET,
  MEMORY_REFERENCE_OPCODES,
  MEMORY_REFERENCE_SET,
  MEMORY_SIZE,
  REGISTER_REFERENCE_OPCODES,
  REGISTER_REFERENCE_SET,
  toAddress,
  toWord,
} from "../shared/mano.js";

const LABEL_PATTERN = /^[A-Z][A-Z0-9_]*$/;
const COMMENT_PATTERNS = ["//", ";", "/"];

function stripComment(line) {
  let cutAt = line.length;

  COMMENT_PATTERNS.forEach((marker) => {
    const index = line.indexOf(marker);
    if (index >= 0) {
      cutAt = Math.min(cutAt, index);
    }
  });

  return line.slice(0, cutAt).trimEnd();
}

function isNumericLiteral(token, baseHint) {
  if (!token) {
    return false;
  }

  if (baseHint === 16) {
    return /^[0-9A-F]+$/i.test(token);
  }

  return /^[-+]?\d+$/.test(token);
}

function parseNumericLiteral(token, baseHint = 10) {
  if (!isNumericLiteral(token, baseHint)) {
    return null;
  }

  return Number.parseInt(token, baseHint);
}

function makeError(lineNumber, kind, detail, suggestion) {
  const jokes = {
    syntax: "Assembler confused. Send snacks pizza immediately.",
    opcode: "This opcode is illegal... the silicon detectives are on their way.",
    label: "Your label disappeared like socks in laundry.",
    symbol: "A symbol wandered off without leaving a forwarding address.",
    memory: "Memory overflow! You broke the 4K universe.",
    directive: "Directive drama detected. The assembler would like a calmer script.",
  };

  return {
    lineNumber,
    kind,
    detail,
    suggestion,
    message: `Line ${lineNumber}: ${detail} ${jokes[kind] ?? jokes.syntax}`,
  };
}

function tokenizeStatement(statement) {
  const normalized = statement.replace(",", " , ");
  return normalized.split(/\s+/).filter(Boolean);
}

function parseLine(rawLine, lineNumber) {
  const upper = rawLine.toUpperCase();
  const code = stripComment(upper);

  const parsed = {
    lineNumber,
    raw: rawLine,
    normalized: upper,
    code,
    address: null,
    label: null,
    opcode: null,
    operand: null,
    indirect: false,
    kind: "empty",
  };

  if (!code.trim()) {
    return parsed;
  }

  const labelMatch = code.match(/^\s*([A-Z][A-Z0-9_]*)\s*,\s*(.*)$/);
  let remainder = code.trim();
  if (labelMatch) {
    parsed.label = labelMatch[1];
    remainder = labelMatch[2].trim();
  }

  if (!remainder) {
    parsed.kind = "labelOnly";
    return parsed;
  }

  const tokens = tokenizeStatement(remainder);
  parsed.opcode = tokens[0];

  if (DIRECTIVES.has(parsed.opcode)) {
    parsed.kind = "directive";
    parsed.operand = tokens[1] ?? null;
    if (tokens.length > 2) {
      parsed.extra = tokens.slice(2);
    }
    return parsed;
  }

  if (ALL_INSTRUCTIONS.has(parsed.opcode)) {
    parsed.kind = "instruction";
    if (tokens[1] === "I") {
      parsed.indirect = true;
    } else if (tokens[1]) {
      parsed.operand = tokens[1];
      if (tokens[2] === "I") {
        parsed.indirect = true;
      }
    }
    if (tokens[2] && tokens[2] !== "I") {
      parsed.extra = tokens.slice(2);
    }
    if (tokens[3]) {
      parsed.extra = tokens.slice(2);
    }
    return parsed;
  }

  parsed.kind = "unknown";
  return parsed;
}

export function assemble(source) {
  const lines = source.split(/\r?\n/).map((line, index) => parseLine(line, index + 1));
  const errors = [];
  const symbolTable = new Map();
  const listing = [];
  const image = [];
  let locationCounter = 0;
  let startAddress = 0;
  let firstResolvedAddress = null;
  let sawEnd = false;

  lines.forEach((line) => {
    if (sawEnd && line.code) {
      return;
    }

    if (line.label && !LABEL_PATTERN.test(line.label)) {
      errors.push(makeError(line.lineNumber, "label", `Invalid label "${line.label}".`, "Use letters, numbers, and underscores, starting with a letter."));
    }

    if (line.kind === "unknown") {
      errors.push(makeError(line.lineNumber, "opcode", `Unknown opcode "${line.opcode}".`, "Check the Mano instruction set or directive spelling."));
      return;
    }

    if (line.label) {
      if (symbolTable.has(line.label)) {
        errors.push(makeError(line.lineNumber, "label", `Duplicate label "${line.label}".`, "Each symbol needs a unique home address."));
      } else {
        symbolTable.set(line.label, locationCounter);
      }
    }

    if (line.kind === "directive") {
      if (line.opcode === "ORG") {
        if (!line.operand) {
          errors.push(makeError(line.lineNumber, "directive", "ORG requires an address operand.", "Try something like ORG 100."));
          return;
        }
        const orgValue = parseNumericLiteral(line.operand, 16);
        if (orgValue === null || orgValue < 0 || orgValue >= MEMORY_SIZE) {
          errors.push(makeError(line.lineNumber, "directive", `ORG operand "${line.operand}" is outside 000-FFF.`, "Use a 12-bit hexadecimal address."));
          return;
        }
        locationCounter = orgValue;
        if (firstResolvedAddress === null) {
          firstResolvedAddress = locationCounter;
          startAddress = locationCounter;
        }
      } else if (line.opcode === "END") {
        sawEnd = true;
      } else {
        if (!line.operand) {
          errors.push(makeError(line.lineNumber, "directive", `${line.opcode} requires a constant operand.`, "Feed the assembler a real constant and it will stop glaring."));
          return;
        }
        const base = line.opcode === "HEX" ? 16 : 10;
        const numericValue = parseNumericLiteral(line.operand, base);
        if (numericValue === null) {
          errors.push(makeError(line.lineNumber, "directive", `${line.opcode} operand "${line.operand}" is invalid.`, "HEX wants hexadecimal digits. DEC wants a signed decimal number."));
          return;
        }
        line.address = locationCounter;
        listing.push(line);
        locationCounter += 1;
      }
      return;
    }

    if (line.kind === "instruction") {
      if (firstResolvedAddress === null) {
        firstResolvedAddress = locationCounter;
        startAddress = locationCounter;
      }

      const isMemoryRef = MEMORY_REFERENCE_SET.has(line.opcode);
      const isNonMemoryRef = REGISTER_REFERENCE_SET.has(line.opcode) || IO_REFERENCE_SET.has(line.opcode);

      if (isMemoryRef && !line.operand) {
        errors.push(makeError(line.lineNumber, "syntax", `${line.opcode} requires an operand.`, "Memory-reference instructions need an address or symbol."));
      }

      if (isNonMemoryRef && line.operand) {
        errors.push(makeError(line.lineNumber, "syntax", `${line.opcode} does not take an operand.`, "Register and I/O reference instructions fly solo."));
      }

      if (line.indirect && !isMemoryRef) {
        errors.push(makeError(line.lineNumber, "syntax", `Indirect bit is invalid for ${line.opcode}.`, "Only memory-reference instructions can use indirect addressing."));
      }

      if (line.extra?.length) {
        errors.push(makeError(line.lineNumber, "syntax", `Unexpected extra tokens: ${line.extra.join(" ")}.`, "The assembler found luggage that does not belong on this line."));
      }

      line.address = locationCounter;
      listing.push(line);
      locationCounter += 1;
      return;
    }

    if (line.kind === "labelOnly") {
      errors.push(makeError(line.lineNumber, "syntax", `Label "${line.label}" is missing an opcode or directive.`, "Attach an instruction or data definition to that label."));
    }
  });

  if (!sawEnd) {
    errors.push(makeError(lines.length || 1, "directive", "Missing END directive.", "Finish the program with END so pass two knows when to stop."));
  }

  if (locationCounter > MEMORY_SIZE) {
    errors.push(makeError(lines.length || 1, "memory", "Program size exceeded 4096 words.", "The Mano machine only rents out 4K addresses."));
  }

  const occupiedAddresses = new Set();

  listing.forEach((line) => {
    if (line.address === null || occupiedAddresses.has(line.address)) {
      return;
    }

    occupiedAddresses.add(line.address);

    if (line.kind === "directive") {
      const base = line.opcode === "HEX" ? 16 : 10;
      const value = parseNumericLiteral(line.operand, base);
      if (value !== null) {
        image.push({ address: line.address, value: toWord(value) });
      }
      return;
    }

    if (line.kind !== "instruction") {
      return;
    }

    let machineWord = 0;

    if (MEMORY_REFERENCE_SET.has(line.opcode)) {
      let addressValue = null;

      if (symbolTable.has(line.operand)) {
        addressValue = symbolTable.get(line.operand);
      } else {
        addressValue = parseNumericLiteral(line.operand, 16);
      }

      if (addressValue === null) {
        errors.push(makeError(line.lineNumber, "symbol", `Undefined symbol "${line.operand}".`, "Define the label before END or use a valid hexadecimal address."));
        addressValue = 0;
      }

      if (addressValue < 0 || addressValue > ADDRESS_MASK) {
        errors.push(makeError(line.lineNumber, "memory", `Address "${line.operand}" is outside 000-FFF.`, "Basic Computer addresses are 12-bit."));
      }

      machineWord =
        (line.indirect ? 0x8000 : 0) |
        (MEMORY_REFERENCE_OPCODES[line.opcode] << 12) |
        toAddress(addressValue);
    } else if (REGISTER_REFERENCE_SET.has(line.opcode)) {
      machineWord = 0x7000 | REGISTER_REFERENCE_OPCODES[line.opcode];
    } else if (IO_REFERENCE_SET.has(line.opcode)) {
      machineWord = 0xf000 | IO_REFERENCE_OPCODES[line.opcode];
    }

    line.machineWord = toWord(machineWord);
    image.push({ address: line.address, value: line.machineWord });
  });

  image.sort((a, b) => a.address - b.address);

  return {
    lines,
    listing,
    image,
    symbolTable,
    errors,
    startAddress,
  };
}
