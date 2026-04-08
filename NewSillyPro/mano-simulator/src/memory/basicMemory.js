import { ADDRESS_MASK, MEMORY_SIZE, WORD_MASK } from "../shared/mano.js";

export function createMemory() {
  return new Uint16Array(MEMORY_SIZE);
}

export function cloneMemory(memory) {
  return Uint16Array.from(memory);
}

export function readMemory(memory, address) {
  return memory[address & ADDRESS_MASK] & WORD_MASK;
}

export function writeMemory(memory, address, value) {
  memory[address & ADDRESS_MASK] = value & WORD_MASK;
}

export function loadWords(memory, image) {
  const next = createMemory();
  next.set(memory);

  image.forEach(({ address, value }) => {
    next[address & ADDRESS_MASK] = value & WORD_MASK;
  });

  return next;
}
