import { readMemory, writeMemory, createMemory, loadWords } from "../memory/basicMemory.js";
import {
  ADDRESS_MASK,
  BYTE_MASK,
  IO_REFERENCE_OPCODES,
  MEMORY_REFERENCE_OPCODES,
  REGISTER_REFERENCE_OPCODES,
  computeOverflowOnAdd,
  formatAddress,
  toAddress,
  toSigned16,
  toWord,
} from "../shared/mano.js";

function snapshotState(cpu) {
  return {
    registers: {
      AR: cpu.AR,
      PC: cpu.PC,
      DR: cpu.DR,
      AC: cpu.AC,
      IR: cpu.IR,
      TR: cpu.TR,
      INPR: cpu.INPR,
      OUTR: cpu.OUTR,
      SC: cpu.SC,
    },
    flags: {
      E: cpu.E,
      I: cpu.I,
      S: cpu.S,
      R: cpu.R,
      IEN: cpu.IEN,
      FGI: cpu.FGI,
      FGO: cpu.FGO,
      V: cpu.V,
    },
    memory: Array.from(cpu.memory),
    meta: {
      halted: cpu.halted,
      timing: cpu.currentTiming,
      phase: cpu.phase,
      microOperation: cpu.microOperation,
      decodedOpcode: cpu.decodedOpcode,
      outputBuffer: cpu.outputBuffer,
      inputQueue: [...cpu.inputQueue],
      lastAccessedAddress: cpu.lastAccessedAddress,
      startAddress: cpu.startAddress,
      interruptPending: cpu.R,
    },
  };
}

function collectChanges(before, after) {
  const changedRegisters = Object.keys(after.registers).filter(
    (name) => before.registers[name] !== after.registers[name],
  );
  const changedFlags = Object.keys(after.flags).filter((name) => before.flags[name] !== after.flags[name]);

  return {
    changedRegisters,
    changedFlags,
  };
}

export class BasicComputer {
  constructor() {
    this.reset();
  }

  reset() {
    this.AR = 0;
    this.PC = 0;
    this.DR = 0;
    this.AC = 0;
    this.IR = 0;
    this.TR = 0;
    this.INPR = 0;
    this.OUTR = 0;

    this.E = 0;
    this.I = 0;
    this.S = 0;
    this.R = 0;
    this.IEN = 0;
    this.FGI = 0;
    this.FGO = 1;
    this.V = 0;

    this.SC = 0;
    this.memory = createMemory();
    this.halted = false;
    this.phase = "idle";
    this.currentTiming = "IDLE";
    this.microOperation = "System reset. Registers cleared and memory preserved only when reloaded.";
    this.decodedOpcode = null;
    this.currentInstructionType = null;
    this.currentInstructionName = null;
    this.executionStep = 0;
    this.lastAccessedAddress = null;
    this.outputBuffer = "";
    this.inputQueue = [];
    this.outputReadyDelay = 0;
    this.startAddress = 0;
  }

  loadProgram(image, startAddress = 0) {
    this.memory = loadWords(createMemory(), image);
    this.startAddress = toAddress(startAddress);
    this.PC = this.startAddress;
    this.lastAccessedAddress = null;
    this.phase = "ready";
    this.currentTiming = "READY";
    this.microOperation = `Program loaded at ${formatAddress(this.startAddress)}.`;
  }

  start() {
    if (!this.halted) {
      this.S = 1;
      this.phase = "run";
    }
  }

  stop() {
    this.S = 0;
    if (!this.halted) {
      this.phase = "paused";
    }
  }

  queueInput(text) {
    [...text].forEach((character) => {
      this.inputQueue.push(character.charCodeAt(0) & BYTE_MASK);
    });
    this.refreshInputRegister();
  }

  refreshInputRegister() {
    if (!this.FGI && this.inputQueue.length > 0) {
      this.INPR = this.inputQueue[0];
      this.FGI = 1;
    }
  }

  serviceOutputFlag() {
    if (this.outputReadyDelay > 0) {
      this.outputReadyDelay -= 1;
      if (this.outputReadyDelay === 0) {
        this.FGO = 1;
      }
    }
  }

  shouldEnterInterruptCycle() {
    return this.SC === 0 && this.R === 1;
  }

  updateInterruptRequest() {
    if (this.IEN && (this.FGI || this.FGO)) {
      this.R = 1;
    }
  }

  getState() {
    return snapshotState(this);
  }

  stepMicroOperation(force = false) {
    if (this.halted) {
      return {
        done: true,
        ...collectChanges(this.getState(), this.getState()),
        state: this.getState(),
      };
    }

    if (!this.S && !force) {
      return {
        done: true,
        ...collectChanges(this.getState(), this.getState()),
        state: this.getState(),
      };
    }

    if (force && !this.S) {
      this.S = 1;
    }

    const before = this.getState();
    this.lastAccessedAddress = null;
    let rtl = "";

    if (this.shouldEnterInterruptCycle()) {
      ({ rtl } = this.executeInterruptMicroStep());
    } else {
      ({ rtl } = this.executeInstructionMicroStep());
    }

    this.refreshInputRegister();
    const after = this.getState();
    const changes = collectChanges(before, after);

    return {
      done: this.halted || (!this.S && !force),
      rtl,
      state: after,
      ...changes,
      memoryAddress: this.lastAccessedAddress,
    };
  }

  executeInterruptMicroStep() {
    this.phase = "interrupt";

    if (this.SC === 0) {
      this.currentTiming = "T0";
      this.AR = 0;
      this.TR = this.PC;
      this.SC = 1;
      this.microOperation = "AR <- 0, TR <- PC";
      return { rtl: this.microOperation };
    }

    if (this.SC === 1) {
      this.currentTiming = "T1";
      writeMemory(this.memory, this.AR, this.TR);
      this.lastAccessedAddress = this.AR;
      this.PC = 0;
      this.SC = 2;
      this.microOperation = "M[AR] <- TR, PC <- 0";
      return { rtl: this.microOperation };
    }

    this.currentTiming = "T2";
    this.PC = toAddress(this.PC + 1);
    this.IEN = 0;
    this.R = 0;
    this.SC = 0;
    this.phase = "fetch";
    this.microOperation = "PC <- PC + 1, IEN <- 0, R <- 0, SC <- 0";
    return { rtl: this.microOperation };
  }

  executeInstructionMicroStep() {
    if (this.SC === 0) {
      this.phase = "fetch";
      this.currentTiming = "T0";
      this.AR = this.PC;
      this.SC = 1;
      this.microOperation = "AR <- PC";
      return { rtl: this.microOperation };
    }

    if (this.SC === 1) {
      this.phase = "fetch";
      this.currentTiming = "T1";
      this.IR = readMemory(this.memory, this.AR);
      this.lastAccessedAddress = this.AR;
      this.PC = toAddress(this.PC + 1);
      this.SC = 2;
      this.microOperation = "IR <- M[AR], PC <- PC + 1";
      return { rtl: this.microOperation };
    }

    if (this.SC === 2) {
      this.phase = "decode";
      this.currentTiming = "T2";
      this.I = (this.IR >> 15) & 1;
      this.decodedOpcode = (this.IR >> 12) & 0x7;
      this.AR = this.IR & ADDRESS_MASK;
      this.currentInstructionType = this.resolveInstructionType();
      this.currentInstructionName = this.resolveInstructionName();
      this.SC = 3;
      this.microOperation = `AR <- IR(0-11), I <- IR(15), Decode ${this.currentInstructionName}`;
      return { rtl: this.microOperation };
    }

    if (this.currentInstructionType === "memory" && this.I === 1 && this.SC === 3) {
      this.phase = "indirect";
      this.currentTiming = "T3";
      this.AR = readMemory(this.memory, this.AR) & ADDRESS_MASK;
      this.lastAccessedAddress = this.AR;
      this.SC = 4;
      this.microOperation = "AR <- M[AR](0-11)";
      return { rtl: this.microOperation };
    }

    if (this.currentInstructionType === "memory") {
      return this.executeMemoryReferenceMicroStep();
    }

    if (this.currentInstructionType === "register") {
      this.phase = "execute";
      this.currentTiming = "T3";
      const rtl = this.executeRegisterReference();
      this.completeInstruction();
      return { rtl };
    }

    this.phase = "execute";
    this.currentTiming = "T3";
    const rtl = this.executeIoReference();
    this.completeInstruction();
    return { rtl };
  }

  resolveInstructionType() {
    if (this.decodedOpcode !== 0x7) {
      return "memory";
    }

    return this.I === 0 ? "register" : "io";
  }

  resolveInstructionName() {
    if (this.decodedOpcode !== 0x7) {
      return Object.entries(MEMORY_REFERENCE_OPCODES).find(([, code]) => code === this.decodedOpcode)?.[0] ?? "UNKNOWN";
    }

    const instructionBits = this.IR & 0x0fff;
    const lookup = this.I === 0 ? REGISTER_REFERENCE_OPCODES : IO_REFERENCE_OPCODES;
    return Object.entries(lookup).find(([, code]) => code === instructionBits)?.[0] ?? "UNKNOWN";
  }

  executeMemoryReferenceMicroStep() {
    const opcode = this.decodedOpcode;
    const directBaseStep = this.I === 1 ? 4 : 3;

    if ((opcode === MEMORY_REFERENCE_OPCODES.AND || opcode === MEMORY_REFERENCE_OPCODES.ADD || opcode === MEMORY_REFERENCE_OPCODES.LDA || opcode === MEMORY_REFERENCE_OPCODES.ISZ) && this.SC === directBaseStep) {
      this.phase = "execute";
      this.currentTiming = `T${this.SC}`;
      this.DR = readMemory(this.memory, this.AR);
      this.lastAccessedAddress = this.AR;
      this.SC += 1;
      this.microOperation = "DR <- M[AR]";
      return { rtl: this.microOperation };
    }

    if (opcode === MEMORY_REFERENCE_OPCODES.AND && this.SC === directBaseStep + 1) {
      this.currentTiming = `T${this.SC}`;
      this.AC = toWord(this.AC & this.DR);
      this.microOperation = "AC <- AC AND DR";
      this.completeInstruction();
      return { rtl: this.microOperation };
    }

    if (opcode === MEMORY_REFERENCE_OPCODES.ADD && this.SC === directBaseStep + 1) {
      this.currentTiming = `T${this.SC}`;
      const oldAc = this.AC;
      const result = oldAc + this.DR;
      this.E = Number(result > 0xffff);
      this.AC = toWord(result);
      this.V = computeOverflowOnAdd(oldAc, this.DR, this.AC);
      this.microOperation = "AC <- AC + DR, E <- Cout";
      this.completeInstruction();
      return { rtl: this.microOperation };
    }

    if (opcode === MEMORY_REFERENCE_OPCODES.LDA && this.SC === directBaseStep + 1) {
      this.currentTiming = `T${this.SC}`;
      this.AC = this.DR;
      this.microOperation = "AC <- DR";
      this.completeInstruction();
      return { rtl: this.microOperation };
    }

    if (opcode === MEMORY_REFERENCE_OPCODES.STA && this.SC === directBaseStep) {
      this.phase = "execute";
      this.currentTiming = `T${this.SC}`;
      writeMemory(this.memory, this.AR, this.AC);
      this.lastAccessedAddress = this.AR;
      this.microOperation = "M[AR] <- AC";
      this.completeInstruction();
      return { rtl: this.microOperation };
    }

    if (opcode === MEMORY_REFERENCE_OPCODES.BUN && this.SC === directBaseStep) {
      this.phase = "execute";
      this.currentTiming = `T${this.SC}`;
      this.PC = this.AR;
      this.microOperation = "PC <- AR";
      this.completeInstruction();
      return { rtl: this.microOperation };
    }

    if (opcode === MEMORY_REFERENCE_OPCODES.BSA && this.SC === directBaseStep) {
      this.phase = "execute";
      this.currentTiming = `T${this.SC}`;
      writeMemory(this.memory, this.AR, this.PC);
      this.lastAccessedAddress = this.AR;
      this.AR = toAddress(this.AR + 1);
      this.SC += 1;
      this.microOperation = "M[AR] <- PC, AR <- AR + 1";
      return { rtl: this.microOperation };
    }

    if (opcode === MEMORY_REFERENCE_OPCODES.BSA && this.SC === directBaseStep + 1) {
      this.currentTiming = `T${this.SC}`;
      this.PC = this.AR;
      this.microOperation = "PC <- AR";
      this.completeInstruction();
      return { rtl: this.microOperation };
    }

    if (opcode === MEMORY_REFERENCE_OPCODES.ISZ && this.SC === directBaseStep + 1) {
      this.currentTiming = `T${this.SC}`;
      this.DR = toWord(this.DR + 1);
      this.microOperation = "DR <- DR + 1";
      this.SC += 1;
      return { rtl: this.microOperation };
    }

    if (opcode === MEMORY_REFERENCE_OPCODES.ISZ && this.SC === directBaseStep + 2) {
      this.currentTiming = `T${this.SC}`;
      writeMemory(this.memory, this.AR, this.DR);
      this.lastAccessedAddress = this.AR;
      if (this.DR === 0) {
        this.PC = toAddress(this.PC + 1);
        this.microOperation = "M[AR] <- DR, if (DR = 0) then PC <- PC + 1";
      } else {
        this.microOperation = "M[AR] <- DR";
      }
      this.completeInstruction();
      return { rtl: this.microOperation };
    }

    this.microOperation = "No micro-operation matched; instruction decode stalled.";
    this.completeInstruction();
    return { rtl: this.microOperation };
  }

  executeRegisterReference() {
    const instruction = this.IR & 0x0fff;
    const parts = [];

    if (instruction & REGISTER_REFERENCE_OPCODES.CLA) {
      this.AC = 0;
      parts.push("AC <- 0");
    }
    if (instruction & REGISTER_REFERENCE_OPCODES.CLE) {
      this.E = 0;
      parts.push("E <- 0");
    }
    if (instruction & REGISTER_REFERENCE_OPCODES.CMA) {
      this.AC = toWord(~this.AC);
      parts.push("AC <- AC'");
    }
    if (instruction & REGISTER_REFERENCE_OPCODES.CME) {
      this.E = this.E ? 0 : 1;
      parts.push("E <- E'");
    }
    if (instruction & REGISTER_REFERENCE_OPCODES.CIR) {
      const ac0 = this.AC & 1;
      this.AC = toWord((this.AC >> 1) | (this.E << 15));
      this.E = ac0;
      parts.push("AC <- shr AC, AC(15) <- E, E <- AC(0)");
    }
    if (instruction & REGISTER_REFERENCE_OPCODES.CIL) {
      const ac15 = (this.AC >> 15) & 1;
      this.AC = toWord((this.AC << 1) | this.E);
      this.E = ac15;
      parts.push("AC <- shl AC, AC(0) <- E, E <- AC(15)");
    }
    if (instruction & REGISTER_REFERENCE_OPCODES.INC) {
      this.AC = toWord(this.AC + 1);
      parts.push("AC <- AC + 1");
    }
    if (instruction & REGISTER_REFERENCE_OPCODES.SPA) {
      if (toSigned16(this.AC) > 0) {
        this.PC = toAddress(this.PC + 1);
      }
      parts.push("if (AC(15) = 0 and AC != 0) then PC <- PC + 1");
    }
    if (instruction & REGISTER_REFERENCE_OPCODES.SNA) {
      if (toSigned16(this.AC) < 0) {
        this.PC = toAddress(this.PC + 1);
      }
      parts.push("if (AC(15) = 1) then PC <- PC + 1");
    }
    if (instruction & REGISTER_REFERENCE_OPCODES.SZA) {
      if (this.AC === 0) {
        this.PC = toAddress(this.PC + 1);
      }
      parts.push("if (AC = 0) then PC <- PC + 1");
    }
    if (instruction & REGISTER_REFERENCE_OPCODES.SZE) {
      if (this.E === 0) {
        this.PC = toAddress(this.PC + 1);
      }
      parts.push("if (E = 0) then PC <- PC + 1");
    }
    if (instruction & REGISTER_REFERENCE_OPCODES.HLT) {
      this.S = 0;
      this.halted = true;
      parts.push("S <- 0");
    }

    this.microOperation = parts.join(", ");
    return this.microOperation;
  }

  executeIoReference() {
    const instruction = this.IR & 0x0fff;
    const parts = [];

    if (instruction & IO_REFERENCE_OPCODES.INP) {
      this.AC = (this.AC & 0xff00) | this.INPR;
      if (this.inputQueue.length > 0) {
        this.inputQueue.shift();
      }
      this.FGI = 0;
      this.refreshInputRegister();
      parts.push("AC(0-7) <- INPR, FGI <- 0");
    }
    if (instruction & IO_REFERENCE_OPCODES.OUT) {
      this.OUTR = this.AC & BYTE_MASK;
      this.outputBuffer += String.fromCharCode(this.OUTR);
      this.FGO = 0;
      this.outputReadyDelay = 1;
      parts.push("OUTR <- AC(0-7), FGO <- 0");
    }
    if (instruction & IO_REFERENCE_OPCODES.SKI) {
      if (this.FGI === 1) {
        this.PC = toAddress(this.PC + 1);
      }
      parts.push("if (FGI = 1) then PC <- PC + 1");
    }
    if (instruction & IO_REFERENCE_OPCODES.SKO) {
      if (this.FGO === 1) {
        this.PC = toAddress(this.PC + 1);
      }
      parts.push("if (FGO = 1) then PC <- PC + 1");
    }
    if (instruction & IO_REFERENCE_OPCODES.ION) {
      this.IEN = 1;
      parts.push("IEN <- 1");
    }
    if (instruction & IO_REFERENCE_OPCODES.IOF) {
      this.IEN = 0;
      parts.push("IEN <- 0");
    }

    this.microOperation = parts.join(", ");
    return this.microOperation;
  }

  completeInstruction() {
    this.SC = 0;
    this.phase = this.halted ? "halted" : "fetch";
    this.serviceOutputFlag();
    if (!this.halted) {
      this.updateInterruptRequest();
    }
  }
}
