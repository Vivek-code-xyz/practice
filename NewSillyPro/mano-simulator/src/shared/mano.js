export const MEMORY_SIZE = 4096;
export const WORD_MASK = 0xffff;
export const ADDRESS_MASK = 0x0fff;
export const BYTE_MASK = 0x00ff;

export const MEMORY_REFERENCE_OPCODES = {
  AND: 0x0,
  ADD: 0x1,
  LDA: 0x2,
  STA: 0x3,
  BUN: 0x4,
  BSA: 0x5,
  ISZ: 0x6,
};

export const REGISTER_REFERENCE_OPCODES = {
  CLA: 0x0800,
  CLE: 0x0400,
  CMA: 0x0200,
  CME: 0x0100,
  CIR: 0x0080,
  CIL: 0x0040,
  INC: 0x0020,
  SPA: 0x0010,
  SNA: 0x0008,
  SZA: 0x0004,
  SZE: 0x0002,
  HLT: 0x0001,
};

export const IO_REFERENCE_OPCODES = {
  INP: 0x0800,
  OUT: 0x0400,
  SKI: 0x0200,
  SKO: 0x0100,
  ION: 0x0080,
  IOF: 0x0040,
};

export const DIRECTIVES = new Set(["ORG", "END", "DEC", "HEX"]);

export const MEMORY_REFERENCE_SET = new Set(Object.keys(MEMORY_REFERENCE_OPCODES));
export const REGISTER_REFERENCE_SET = new Set(Object.keys(REGISTER_REFERENCE_OPCODES));
export const IO_REFERENCE_SET = new Set(Object.keys(IO_REFERENCE_OPCODES));
export const ALL_INSTRUCTIONS = new Set([
  ...MEMORY_REFERENCE_SET,
  ...REGISTER_REFERENCE_SET,
  ...IO_REFERENCE_SET,
]);

export const HEX_ADDRESS_WIDTH = 3;
export const HEX_WORD_WIDTH = 4;

export function toWord(value) {
  return value & WORD_MASK;
}

export function toAddress(value) {
  return value & ADDRESS_MASK;
}

export function toByte(value) {
  return value & BYTE_MASK;
}

export function toSigned16(value) {
  const word = toWord(value);
  return word & 0x8000 ? word - 0x10000 : word;
}

export function formatAddress(value) {
  return toAddress(value).toString(16).toUpperCase().padStart(HEX_ADDRESS_WIDTH, "0");
}

export function formatWord(value) {
  return toWord(value).toString(16).toUpperCase().padStart(HEX_WORD_WIDTH, "0");
}

export function formatByte(value) {
  return toByte(value).toString(16).toUpperCase().padStart(2, "0");
}

export function wordToBinary(value, width = 16) {
  const normalized = width === 12 ? toAddress(value) : toWord(value);
  return normalized.toString(2).padStart(width, "0").replace(/(.{4})/g, "$1 ").trim();
}

export function computeOverflowOnAdd(a, b, result) {
  const sa = toSigned16(a);
  const sb = toSigned16(b);
  const sr = toSigned16(result);
  return Number((sa >= 0 && sb >= 0 && sr < 0) || (sa < 0 && sb < 0 && sr >= 0));
}

