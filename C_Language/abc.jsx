import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, StepForward, Terminal, Cpu, Memory as MemoryIcon, Code, AlertCircle, Save, FolderOpen, Download } from 'lucide-react';

// ============================================================================
// CONSTANTS AND TYPES (Mano Basic Computer Architecture)
// ============================================================================

const MEMORY_SIZE = 4096;
const WORD_SIZE = 16;

// Instruction Format: I (1 bit) | Opcode (3 bits) | Address (12 bits)
const OPCODES = {
  AND: { code: 0b000, type: 'memory' },    // 0xxx: AND memory to AC
  ADD: { code: 0b001, type: 'memory' },    // 1xxx: ADD memory to AC
  LDA: { code: 0b010, type: 'memory' },    // 2xxx: Load memory to AC
  STA: { code: 0b011, type: 'memory' },    // 3xxx: Store AC to memory
  BUN: { code: 0b100, type: 'memory' },    // 4xxx: Branch unconditionally
  BSA: { code: 0b101, type: 'memory' },    // 5xxx: Branch and save return
  ISZ: { code: 0b110, type: 'memory' },    // 6xxx: Increment and skip if zero
};

// Register-reference instructions: 0111 0000 0000 0000 to 0111 1111 1111 1111
// Format: 0111 | 1 | xxxxxxxxxx (when I=1 in 7xxx)
const REG_REF_OPS = {
  CLA: 0b100000000000,  // Clear AC
  CLE: 0b010000000000,  // Clear E
  CMA: 0b001000000000,  // Complement AC
  CME: 0b000100000000,  // Complement E
  CIR: 0b000010000000,  // Circulate right AC and E
  CIL: 0b000001000000,  // Circulate left AC and E
  INC: 0b000000100000,  // Increment AC
  SPA: 0b000000010000,  // Skip if AC positive
  SNA: 0b000000001000,  // Skip if AC negative
  SZA: 0b000000000100,  // Skip if AC zero
  SZE: 0b000000000010,  // Skip if E zero
  HLT: 0b000000000001,  // Halt computer
};

// I/O Instructions: 1111 xxxxxxxxxxxx
const IO_OPS = {
  INP: 0b100000000000,  // Input character to AC
  OUT: 0b010000000000,  // Output character from AC
  SKI: 0b001000000000,  // Skip if input flag set
  SKO: 0b000100000000,  // Skip if output flag set
  ION: 0b000010000000,  // Interrupt on
  IOF: 0b000001000000,  // Interrupt off
};

// ============================================================================
// ASSEMBLER MODULE
// ============================================================================

class Assembler {
  constructor() {
    this.symbolTable = new Map();
    this.locationCounter = 0;
    this.errors = [];
    this.machineCode = new Array(MEMORY_SIZE).fill(0);
    this.assemblyLines = [];
  }

  assemble(sourceCode) {
    this.symbolTable.clear();
    this.locationCounter = 0;
    this.errors = [];
    this.machineCode.fill(0);
    this.assemblyLines = [];

    const lines = sourceCode.split('\n');
    
    // First pass: Build symbol table
    lines.forEach((line, index) => {
      const parsed = this.parseLine(line, index + 1);
      if (parsed) {
        this.assemblyLines.push(parsed);
        if (parsed.label) {
          if (this.symbolTable.has(parsed.label)) {
            this.errors.push(`Line ${index + 1}: Duplicate label "${parsed.label}"`);
          } else {
            this.symbolTable.set(parsed.label, this.locationCounter);
          }
        }
        if (parsed.directive === 'ORG') {
          this.locationCounter = parsed.operandValue || 0;
        } else if (parsed.directive !== 'END' && !parsed.isComment) {
          this.locationCounter++;
        }
      }
    });

    // Second pass: Generate machine code
    this.locationCounter = 0;
    this.assemblyLines.forEach((line) => {
      if (line.directive === 'ORG') {
        this.locationCounter = line.operandValue || 0;
      } else if (line.directive === 'END') {
        return;
      } else if (line.directive === 'DEC' || line.directive === 'HEX') {
        this.machineCode[this.locationCounter] = line.operandValue & 0xFFFF;
        line.address = this.locationCounter;
        this.locationCounter++;
      } else if (line.instruction) {
        const machineInstr = this.generateMachineCode(line);
        this.machineCode[this.locationCounter] = machineInstr;
        line.machineCode = machineInstr;
        line.address = this.locationCounter;
        this.locationCounter++;
      } else if (!line.isComment && line.label && !line.instruction) {
        // Label only line (like for data)
        line.address = this.locationCounter;
      }
    });

    return {
      machineCode: this.machineCode,
      symbolTable: this.symbolTable,
      errors: this.errors,
      assemblyLines: this.assemblyLines
    };
  }

  parseLine(line, lineNum) {
    // Remove comments
    const commentIndex = line.indexOf('/');
    const code = commentIndex >= 0 ? line.substring(0, commentIndex) : line;
    const comment = commentIndex >= 0 ? line.substring(commentIndex) : '';
    
    const trimmed = code.trim();
    if (!trimmed && !comment) return null;

    const result = {
      lineNum,
      original: line,
      code: trimmed,
      comment,
      isComment: !trimmed && comment,
      label: null,
      instruction: null,
      operand: null,
      indirect: false,
      directive: null,
      operandValue: null
    };

    if (result.isComment) return result;

    // Check for label (first token ends with ,)
    let workingCode = trimmed;
    const labelMatch = workingCode.match(/^(\w+),/);
    if (labelMatch) {
      result.label = labelMatch[1];
      workingCode = workingCode.substring(labelMatch[0].length).trim();
    }

    // Parse instruction/directive
    if (!workingCode) return result;

    const tokens = workingCode.split(/\s+/);
    const firstToken = tokens[0].toUpperCase();

    // Check for directives
    if (['ORG', 'END', 'DEC', 'HEX'].includes(firstToken)) {
      result.directive = firstToken;
      if (tokens[1]) {
        const val = parseInt(tokens[1], firstToken === 'HEX' ? 16 : 10);
        result.operandValue = isNaN(val) ? 0 : val;
      }
      return result;
    }

    // Check for instructions
    if (OPCODES[firstToken] || firstToken === 'IO' || REG_REF_OPS[firstToken]) {
      result.instruction = firstToken;
      
      if (tokens[1]) {
        let operand = tokens[1];
        // Check for indirect addressing (I)
        if (operand.endsWith(',I')) {
          result.indirect = true;
          operand = operand.slice(0, -2);
        }
        result.operand = operand;
      }
    } else if (firstToken) {
      this.errors.push(`Line ${lineNum}: Unknown instruction "${firstToken}"`);
    }

    return result;
  }

  generateMachineCode(line) {
    const { instruction, operand, indirect } = line;
    let code = 0;

    // Memory-reference instructions
    if (OPCODES[instruction]) {
      const opcode = OPCODES[instruction].code;
      let address = 0;

      if (operand) {
        if (this.symbolTable.has(operand)) {
          address = this.symbolTable.get(operand);
        } else if (!isNaN(parseInt(operand))) {
          address = parseInt(operand);
        } else {
          this.errors.push(`Line ${line.lineNum}: Undefined symbol "${operand}"`);
        }
      }

      code = (indirect ? 0x8000 : 0) | (opcode << 12) | (address & 0xFFF);
    }
    // Register-reference instructions (7xxx with I=1)
    else if (REG_REF_OPS[instruction]) {
      code = 0x7000 | 0x8000 | REG_REF_OPS[instruction]; // 0x7800 | op
    }
    // I/O instructions (Fxxx)
    else if (IO_OPS[instruction]) {
      code = 0xF000 | IO_OPS[instruction];
    }

    return code;
  }
}

// ============================================================================
// CPU SIMULATION MODULE
// ============================================================================

class ManoCPU {
  constructor() {
    this.reset();
  }

  reset() {
    // Registers (16-bit)
    this.AR = 0;  // Address Register (12 bits used)
    this.PC = 0;  // Program Counter (12 bits)
    this.DR = 0;  // Data Register (16 bits)
    this.AC = 0;  // Accumulator (16 bits)
    this.IR = 0;  // Instruction Register (16 bits)
    this.TR = 0;  // Temporary Register (16 bits)
    
    // Flags
    this.E = 0;   // Carry/Extended bit
    this.I = 0;   // Indirect bit
    this.S = 0;   // Start/Stop (0=stopped, 1=running)
    this.V = 0;   // Overflow (optional)
    
    // Memory
    this.memory = new Array(MEMORY_SIZE).fill(0);
    
    // Timing and control
    this.SC = 0;  // Sequence Counter (for timing)
    this.R = 0;   // Interrupt flip-flop
    
    // I/O
    this.inputBuffer = '';
    this.outputBuffer = '';
    this.FGI = 0; // Input flag
    this.FGO = 1; // Output flag (ready)
    
    // Execution state
    this.currentPhase = 'fetch'; // fetch, decode, execute, indirect
    this.microOperation = '';
    this.halted = false;
    this.stepCount = 0;
  }

  loadProgram(machineCode) {
    this.memory = [...machineCode];
  }

  getState() {
    return {
      registers: {
        AR: this.AR & 0xFFF,
        PC: this.PC & 0xFFF,
        DR: this.DR & 0xFFFF,
        AC: this.AC & 0xFFFF,
        IR: this.IR & 0xFFFF,
        TR: this.TR & 0xFFFF,
      },
      flags: {
        E: this.E,
        I: this.I,
        S: this.S,
        V: this.V,
        FGI: this.FGI,
        FGO: this.FGO,
      },
      memory: this.memory,
      phase: this.currentPhase,
      microOp: this.microOperation,
      halted: this.halted,
      stepCount: this.stepCount,
      output: this.outputBuffer,
    };
  }

  step() {
    if (this.halted || !this.S) {
      return { done: true, state: this.getState() };
    }

    this.stepCount++;
    let rtl = '';

    // Determine phase
    if (this.SC === 0 && this.currentPhase === 'fetch') {
      // T0: AR <- PC
      this.AR = this.PC;
      rtl = 'AR ← PC';
      this.SC = 1;
    } else if (this.SC === 1) {
      // T1: IR <- M[AR], PC <- PC + 1
      this.IR = this.memory[this.AR];
      this.PC = (this.PC + 1) & 0xFFF;
      rtl = 'IR ← M[AR], PC ← PC + 1';
      this.SC = 2;
    } else if (this.SC === 2) {
      // T2: Decode, I <- IR(15), AR <- IR(11-0)
      this.I = (this.IR >> 15) & 1;
      const opcode = (this.IR >> 12) & 0x7;
      this.AR = this.IR & 0xFFF;
      
      // Check instruction type
      if (opcode === 7) {
        // Register or I/O reference
        if (this.I === 1) {
          this.currentPhase = 'execute_reg';
          rtl = 'Decode: Register-reference instruction';
        } else {
          this.currentPhase = 'execute_io';
          rtl = 'Decode: I/O instruction';
        }
      } else {
        this.currentPhase = 'indirect';
        rtl = `Decode: Memory-reference, I=${this.I}`;
      }
      this.SC = 3;
    } else if (this.currentPhase === 'indirect') {
      if (this.I === 1) {
        // Indirect addressing: AR <- M[AR]
        this.AR = this.memory[this.AR] & 0xFFF;
        rtl = 'AR ← M[AR] (Indirect)';
        this.I = 0;
      }
      this.currentPhase = 'execute_mem';
      this.SC = 4;
    } else if (this.currentPhase === 'execute_mem') {
      const opcode = (this.IR >> 12) & 0x7;
      rtl = this.executeMemoryInstruction(opcode);
      this.currentPhase = 'fetch';
      this.SC = 0;
    } else if (this.currentPhase === 'execute_reg') {
      rtl = this.executeRegisterInstruction();
      this.currentPhase = 'fetch';
      this.SC = 0;
    } else if (this.currentPhase === 'execute_io') {
      rtl = this.executeIOInstruction();
      this.currentPhase = 'fetch';
      this.SC = 0;
    }

    this.microOperation = rtl;
    return { done: false, state: this.getState(), rtl };
  }

  executeMemoryInstruction(opcode) {
    let rtl = '';
    
    switch (opcode) {
      case 0: // AND
        this.DR = this.memory[this.AR];
        this.AC = this.AC & this.DR;
        rtl = 'DR ← M[AR], AC ← AC ∧ DR';
        break;
      case 1: // ADD
        this.DR = this.memory[this.AR];
        const sum = this.AC + this.DR;
        this.E = (sum >> 16) & 1;
        this.AC = sum & 0xFFFF;
        rtl = 'DR ← M[AR], AC ← AC + DR, E ← carry';
        break;
      case 2: // LDA
        this.DR = this.memory[this.AR];
        this.AC = this.DR;
        rtl = 'DR ← M[AR], AC ← DR';
        break;
      case 3: // STA
        this.memory[this.AR] = this.AC;
        rtl = 'M[AR] ← AC';
        break;
      case 4: // BUN
        this.PC = this.AR;
        rtl = 'PC ← AR';
        break;
      case 5: // BSA
        this.memory[this.AR] = this.PC;
        this.AR = this.AR + 1;
        this.PC = this.AR;
        rtl = 'M[AR] ← PC, AR ← AR + 1, PC ← AR';
        break;
      case 6: // ISZ
        this.DR = this.memory[this.AR];
        this.DR = (this.DR + 1) & 0xFFFF;
        this.memory[this.AR] = this.DR;
        if (this.DR === 0) {
          this.PC = (this.PC + 1) & 0xFFF;
        }
        rtl = 'DR ← M[AR], DR ← DR + 1, M[AR] ← DR, if(DR=0) PC ← PC + 1';
        break;
    }
    
    return rtl;
  }

  executeRegisterInstruction() {
    const op = this.IR & 0xFFF;
    let rtl = '';
    
    if (op & REG_REF_OPS.CLA) {
      this.AC = 0;
      rtl += 'AC ← 0, ';
    }
    if (op & REG_REF_OPS.CLE) {
      this.E = 0;
      rtl += 'E ← 0, ';
    }
    if (op & REG_REF_OPS.CMA) {
      this.AC = (~this.AC) & 0xFFFF;
      rtl += 'AC ← AC\', ';
    }
    if (op & REG_REF_OPS.CME) {
      this.E = ~this.E & 1;
      rtl += 'E ← E\', ';
    }
    if (op & REG_REF_OPS.CIR) {
      const lsb = this.AC & 1;
      this.AC = (this.AC >> 1) | (this.E << 15);
      this.E = lsb;
      rtl += 'AC ← shr AC, AC(15) ← E, E ← AC(0), ';
    }
    if (op & REG_REF_OPS.CIL) {
      const msb = (this.AC >> 15) & 1;
      this.AC = ((this.AC << 1) | this.E) & 0xFFFF;
      this.E = msb;
      rtl += 'AC ← shl AC, AC(0) ← E, E ← AC(15), ';
    }
    if (op & REG_REF_OPS.INC) {
      this.AC = (this.AC + 1) & 0xFFFF;
      rtl += 'AC ← AC + 1, ';
    }
    if (op & REG_REF_OPS.SPA) {
      if ((this.AC & 0x8000) === 0 && this.AC !== 0) {
        this.PC = (this.PC + 1) & 0xFFF;
        rtl += 'if(AC>0) PC ← PC + 1, ';
      }
    }
    if (op & REG_REF_OPS.SNA) {
      if (this.AC & 0x8000) {
        this.PC = (this.PC + 1) & 0xFFF;
        rtl += 'if(AC<0) PC ← PC + 1, ';
      }
    }
    if (op & REG_REF_OPS.SZA) {
      if (this.AC === 0) {
        this.PC = (this.PC + 1) & 0xFFF;
        rtl += 'if(AC=0) PC ← PC + 1, ';
      }
    }
    if (op & REG_REF_OPS.SZE) {
      if (this.E === 0) {
        this.PC = (this.PC + 1) & 0xFFF;
        rtl += 'if(E=0) PC ← PC + 1, ';
      }
    }
    if (op & REG_REF_OPS.HLT) {
      this.S = 0;
      this.halted = true;
      rtl += 'S ← 0 (Halt), ';
    }
    
    return rtl || 'NOP';
  }

  executeIOInstruction() {
    const op = this.IR & 0xFFF;
    let rtl = '';
    
    if (op & IO_OPS.INP) {
      if (this.inputBuffer.length > 0) {
        this.AC = (this.AC & 0xFF00) | this.inputBuffer.charCodeAt(0);
        this.inputBuffer = this.inputBuffer.slice(1);
        this.FGI = 0;
      }
      rtl = 'AC(0-7) ← INPR, FGI ← 0';
    }
    if (op & IO_OPS.OUT) {
      this.outputBuffer += String.fromCharCode(this.AC & 0xFF);
      this.FGO = 0;
      rtl = 'OUTR ← AC(0-7), FGO ← 0';
    }
    if (op & IO_OPS.SKI) {
      if (this.FGI) {
        this.PC = (this.PC + 1) & 0xFFF;
        rtl = 'if(FGI=1) PC ← PC + 1';
      }
    }
    if (op & IO_OPS.SKO) {
      if (this.FGO) {
        this.PC = (this.PC + 1) & 0xFFF;
        rtl = 'if(FGO=1) PC ← PC + 1';
      }
    }
    if (op & IO_OPS.ION) {
      this.R = 1;
      rtl = 'R ← 1';
    }
    if (op & IO_OPS.IOF) {
      this.R = 0;
      rtl = 'R ← 0';
    }
    
    return rtl || 'NOP';
  }

  start() {
    this.S = 1;
    this.halted = false;
  }

  stop() {
    this.S = 0;
  }

  setInput(char) {
    this.inputBuffer += char;
    this.FGI = 1;
  }
}

// ============================================================================
// UI COMPONENTS
// ============================================================================

const RegisterDisplay = ({ name, value, bits = 16, highlight }) => {
  const binary = (value >>> 0).toString(2).padStart(bits, '0');
  const hex = (value >>> 0).toString(16).toUpperCase().padStart(Math.ceil(bits/4), '0');
  const isNegative = bits === 16 && (value & 0x8000) !== 0;
  const signedValue = isNegative ? value - 0x10000 : value;

  return (
    <div className={`p-3 rounded-lg border transition-all duration-300 ${highlight ? 'bg-blue-100 border-blue-500 shadow-md' : 'bg-white border-gray-200'}`}>
      <div className="flex justify-between items-center mb-1">
        <span className="font-bold text-gray-700">{name}</span>
        <span className="text-xs text-gray-500">{bits}-bit</span>
      </div>
      <div className="font-mono text-lg font-bold text-gray-900 mb-1">
        {hex.padStart(4, '0')}h
      </div>
      <div className="font-mono text-xs text-gray-600 break-all mb-1">
        {binary.match(/.{1,4}/g).join(' ')}
      </div>
      <div className="text-xs text-gray-500">
        Unsigned: {value} | Signed: {signedValue}
      </div>
    </div>
  );
};

const FlagDisplay = ({ name, value, highlight }) => (
  <div className={`px-3 py-2 rounded-lg border text-center transition-all duration-300 ${highlight ? 'bg-green-100 border-green-500' : value ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-200'}`}>
    <div className="text-xs font-bold text-gray-600 mb-1">{name}</div>
    <div className={`text-lg font-bold ${value ? 'text-green-600' : 'text-gray-400'}`}>
      {value ? '1' : '0'}
    </div>
  </div>
);

const MemoryViewer = ({ memory, currentAddress, onScroll }) => {
  const [startAddr, setStartAddr] = useState(0);
  const visibleRows = 16;

  useEffect(() => {
    // Auto-scroll to PC if it's in reasonable range
    if (currentAddress >= startAddr && currentAddress < startAddr + visibleRows) {
      return;
    }
  }, [currentAddress]);

  const handleScroll = (e) => {
    const newStart = parseInt(e.target.value);
    setStartAddr(newStart);
    if (onScroll) onScroll(newStart);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-gray-800 flex items-center gap-2">
          <MemoryIcon size={18} />
          Memory Viewer
        </h3>
        <input 
          type="range" 
          min="0" 
          max={MEMORY_SIZE - visibleRows} 
          value={startAddr}
          onChange={handleScroll}
          className="w-48"
        />
        <span className="text-xs text-gray-500">Addr: {startAddr.toString(16).toUpperCase()}h</span>
      </div>
      
      <div className="font-mono text-sm">
        <div className="grid grid-cols-3 gap-2 mb-2 text-xs font-bold text-gray-500 border-b pb-2">
          <span>Address</span>
          <span>Hex</span>
          <span>Binary</span>
        </div>
        {memory.slice(startAddr, startAddr + visibleRows).map((word, idx) => {
          const addr = startAddr + idx;
          const isCurrent = addr === currentAddress;
          return (
            <div 
              key={addr}
              className={`grid grid-cols-3 gap-2 py-1 px-2 rounded ${isCurrent ? 'bg-blue-100 border border-blue-300' : idx % 2 === 0 ? 'bg-gray-50' : ''}`}
            >
              <span className={isCurrent ? 'font-bold text-blue-700' : 'text-gray-600'}>
                {addr.toString(16).toUpperCase().padStart(3, '0')}h
              </span>
              <span className={isCurrent ? 'font-bold text-blue-900' : ''}>
                {word.toString(16).toUpperCase().padStart(4, '0')}h
              </span>
              <span className="text-xs text-gray-500 truncate">
                {(word >>> 0).toString(2).padStart(16, '0')}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CodeEditor = ({ code, onChange, errors }) => {
  const textareaRef = useRef(null);
  
  // Simple syntax highlighting simulation via styling
  return (
    <div className="relative h-full">
      <textarea
        ref={textareaRef}
        value={code}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-full p-4 font-mono text-sm bg-gray-50 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        spellCheck={false}
        placeholder="; Enter your assembly code here
; Example:
ORG 100
LDA X
ADD Y
STA Z
HLT
X, DEC 5
Y, DEC 10
Z, DEC 0
END"
      />
      {errors.length > 0 && (
        <div className="absolute bottom-4 left-4 right-4 bg-red-50 border border-red-200 rounded-lg p-3 max-h-32 overflow-auto">
          <div className="flex items-center gap-2 text-red-700 font-bold mb-2">
            <AlertCircle size={16} />
            Errors ({errors.length})
          </div>
          {errors.map((err, idx) => (
            <div key={idx} className="text-xs text-red-600 mb-1">{err}</div>
          ))}
        </div>
      )}
    </div>
  );
};

const AssemblyListing = ({ lines }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-4 h-full overflow-auto">
    <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
      <Code size={18} />
      Assembly Listing
    </h3>
    <table className="w-full text-sm font-mono">
      <thead className="text-xs text-gray-500 border-b">
        <tr>
          <th className="text-left py-2">Addr</th>
          <th className="text-left py-2">Machine</th>
          <th className="text-left py-2">Source</th>
        </tr>
      </thead>
      <tbody>
        {lines.filter(l => l.address !== undefined || l.machineCode !== undefined).map((line, idx) => (
          <tr key={idx} className="border-b border-gray-100">
            <td className="py-1 text-gray-500">
              {line.address !== undefined ? line.address.toString(16).toUpperCase().padStart(3, '0') : '-'}
            </td>
            <td className="py-1 text-blue-600 font-bold">
              {line.machineCode !== undefined ? line.machineCode.toString(16).toUpperCase().padStart(4, '0') : '-'}
            </td>
            <td className="py-1 text-gray-700 pl-2">{line.code}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const ExecutionLog = ({ logs }) => (
  <div className="bg-black rounded-lg border border-gray-700 p-4 h-full overflow-auto font-mono text-sm">
    <h3 className="font-bold text-gray-300 mb-3 flex items-center gap-2">
      <Terminal size={18} />
      Execution Log (RTL)
    </h3>
    <div className="space-y-1">
      {logs.length === 0 && <div className="text-gray-500 italic">No operations yet. Click Step or Run to start execution.</div>}
      {logs.map((log, idx) => (
        <div key={idx} className={`py-1 ${idx === logs.length - 1 ? 'text-green-400' : 'text-gray-400'}`}>
          <span className="text-gray-600 mr-2">[{log.step}]</span>
          <span className="text-blue-400 mr-2">{log.phase}:</span>
          {log.rtl}
        </div>
      ))}
    </div>
  </div>
);

// ============================================================================
// MAIN APPLICATION
// ============================================================================

const SAMPLE_PROGRAMS = {
  add: `; Simple Addition Program
ORG 100
LDA X       / Load first number
ADD Y       / Add second number
STA Z       / Store result
HLT         / Halt
X, DEC 25   / First operand
Y, DEC 37   / Second operand
Z, DEC 0    / Result storage
END`,

  loop: `; Loop Counter Program
ORG 100
CLA         / Clear AC
STA COUNT   / Initialize counter
LOOP, LDA COUNT
INC         / Increment
STA COUNT
ADD MAX     / Add max value to check
SPA         / Skip if positive (if COUNT > MAX)
BUN LOOP    / Continue loop
HLT
COUNT, DEC 0
MAX, DEC -10
END`,

  multiply: `; Multiplication by repeated addition
ORG 100
LDA Y       / Load multiplier
CIL         / Check if negative (move sign to E)
CLE         / Clear E (we just wanted to check sign)
LDA Y       / Reload
SZA         / Skip if zero (result is zero)
BUN MUL     / Start multiplication
BUN DONE    / Y was zero
MUL, STA CTR / Store as counter
CLA
LOOP, ADD X / Add multiplicand
ISZ CTR     / Decrement counter
BUN LOOP    / Continue
DONE, STA PROD
HLT
X, DEC 12
Y, DEC 8
CTR, DEC 0
PROD, DEC 0
END`,

  factorial: `; Calculate 5!
ORG 200
LDA FIVE    / Load 5
STA NUM     / Store as current number
DEC 1       / Subtract 1
STA FACT    / Initialize factorial result with 1 (will be built up)
CLA
INC         / AC = 1
STA FACT
LOOP, LDA NUM
SZA         / If NUM is 0, we're done
BUN CONT
BUN DONE
CONT, STA CTR / Save current NUM
LDA FACT    / Load current factorial
STA TEMP    / Save as multiplicand
LDA NUM     / Reload number as multiplier
DEC 1       / Decrement for next iteration
STA NUM
/ Multiply TEMP by current NUM (simplified)
LDA FACT
ADD TEMP    / Add repeatedly (simplified - assumes small numbers)
STA FACT
BUN LOOP
DONE, HLT
FIVE, DEC 5
NUM, DEC 0
FACT, DEC 1
TEMP, DEC 0
CTR, DEC 0
END`
};

const ManoComputerSimulator = () => {
  const [code, setCode] = useState(SAMPLE_PROGRAMS.add);
  const [assembled, setAssembled] = useState(null);
  const [cpu] = useState(() => new ManoCPU());
  const [cpuState, setCpuState] = useState(cpu.getState());
  const [logs, setLogs] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(5);
  const [activeTab, setActiveTab] = useState('memory'); // memory, listing, log
  const runIntervalRef = useRef(null);
  const prevStateRef = useRef(null);

  // Initialize
  useEffect(() => {
    handleAssemble();
    return () => {
      if (runIntervalRef.current) clearInterval(runIntervalRef.current);
    };
  }, []);

  const handleAssemble = () => {
    const assembler = new Assembler();
    const result = assembler.assemble(code);
    setAssembled(result);
    
    if (result.errors.length === 0) {
      cpu.reset();
      cpu.loadProgram(result.machineCode);
      setCpuState(cpu.getState());
      setLogs([]);
      prevStateRef.current = null;
    }
  };

  const handleStep = () => {
    if (!assembled || assembled.errors.length > 0) return;
    
    const prev = cpu.getState();
    prevStateRef.current = prev;
    
    const result = cpu.step();
    const newState = result.state;
    
    setCpuState(newState);
    
    if (result.rtl) {
      setLogs(prev => [...prev, {
        step: newState.stepCount,
        phase: newState.phase,
        rtl: result.rtl
      }]);
    }
    
    if (result.done || newState.halted) {
      setIsRunning(false);
      if (runIntervalRef.current) {
        clearInterval(runIntervalRef.current);
        runIntervalRef.current = null;
      }
    }
    
    return result;
  };

  const handleRun = () => {
    if (isRunning) {
      setIsRunning(false);
      if (runIntervalRef.current) {
        clearInterval(runIntervalRef.current);
        runIntervalRef.current = null;
      }
    } else {
      cpu.start();
      setIsRunning(true);
      runIntervalRef.current = setInterval(() => {
        const result = handleStep();
        if (result?.done || result?.state?.halted) {
          setIsRunning(false);
          clearInterval(runIntervalRef.current);
          runIntervalRef.current = null;
        }
      }, 1000 / speed);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    if (runIntervalRef.current) {
      clearInterval(runIntervalRef.current);
      runIntervalRef.current = null;
    }
    cpu.reset();
    if (assembled) {
      cpu.loadProgram(assembled.machineCode);
    }
    setCpuState(cpu.getState());
    setLogs([]);
    prevStateRef.current = null;
  };

  const loadSample = (key) => {
    setCode(SAMPLE_PROGRAMS[key]);
    setTimeout(handleAssemble, 0);
  };

  // Check which registers changed for highlighting
  const getHighlight = (regName) => {
    if (!prevStateRef.current) return false;
    return prevStateRef.current.registers[regName] !== cpuState.registers[regName];
  };

  const getFlagHighlight = (flagName) => {
    if (!prevStateRef.current) return false;
    return prevStateRef.current.flags[flagName] !== cpuState.flags[flagName];
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-6 bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Cpu className="text-blue-600" />
                Mano Basic Computer Simulator
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Based on "Computer System Architecture" by M. Morris Mano
              </p>
            </div>
            <div className="flex gap-2">
              <select 
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
                onChange={(e) => loadSample(e.target.value)}
                value=""
              >
                <option value="" disabled>Load Sample Program...</option>
                <option value="add">Simple Addition</option>
                <option value="loop">Loop Counter</option>
                <option value="multiply">Multiplication</option>
                <option value="factorial">Factorial</option>
              </select>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {/* Left Panel: Code Editor */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 h-[500px] flex flex-col">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-bold text-gray-800 flex items-center gap-2">
                <Code size={18} />
                Assembly Editor
              </h2>
              <button
                onClick={handleAssemble}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm font-medium"
              >
                <Play size={16} />
                Assemble & Load
              </button>
            </div>
            <div className="flex-1">
              <CodeEditor code={code} onChange={setCode} errors={assembled?.errors || []} />
            </div>
          </div>

          {/* Right Panel: Registers and Controls */}
          <div className="space-y-4">
            {/* Control Panel */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex gap-2 mb-4">
                <button
                  onClick={handleStep}
                  disabled={isRunning || !assembled || assembled.errors.length > 0}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  <StepForward size={18} />
                  Step
                </button>
                <button
                  onClick={handleRun}
                  disabled={!assembled || assembled.errors.length > 0}
                  className={`flex-1 px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium ${isRunning ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
                >
                  {isRunning ? <Pause size={18} /> : <Play size={18} />}
                  {isRunning ? 'Pause' : 'Run'}
                </button>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                >
                  <RotateCcw size={18} />
                </button>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Speed:</span>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={speed}
                  onChange={(e) => setSpeed(parseInt(e.target.value))}
                  className="flex-1"
                />
                <span className="text-sm text-gray-600 w-12">{speed}x</span>
              </div>
              
              <div className="mt-3 flex items-center gap-4 text-sm">
                <span className={`px-2 py-1 rounded ${cpuState.flags.S ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  S (Run): {cpuState.flags.S ? 'ON' : 'OFF'}
                </span>
                <span className={`px-2 py-1 rounded ${cpuState.halted ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
                  {cpuState.halted ? 'HALTED' : 'ACTIVE'}
                </span>
                <span className="text-gray-500">
                  Phase: <span className="font-bold text-blue-600">{cpuState.phase}</span>
                </span>
              </div>
            </div>

            {/* Registers Grid */}
            <div className="grid grid-cols-2 gap-3">
              <RegisterDisplay name="PC" value={cpuState.registers.PC} bits={12} highlight={getHighlight('PC')} />
              <RegisterDisplay name="AR" value={cpuState.registers.AR} bits={12} highlight={getHighlight('AR')} />
              <RegisterDisplay name="AC" value={cpuState.registers.AC} bits={16} highlight={getHighlight('AC')} />
              <RegisterDisplay name="IR" value={cpuState.registers.IR} bits={16} highlight={getHighlight('IR')} />
              <RegisterDisplay name="DR" value={cpuState.registers.DR} bits={16} highlight={getHighlight('DR')} />
              <RegisterDisplay name="TR" value={cpuState.registers.TR} bits={16} highlight={getHighlight('TR')} />
            </div>

            {/* Flags */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-bold text-gray-800 mb-3 text-sm">Flags & Status</h3>
              <div className="grid grid-cols-6 gap-2">
                <FlagDisplay name="E" value={cpuState.flags.E} highlight={getFlagHighlight('E')} />
                <FlagDisplay name="I" value={cpuState.flags.I} highlight={getFlagHighlight('I')} />
                <FlagDisplay name="S" value={cpuState.flags.S} highlight={getFlagHighlight('S')} />
                <FlagDisplay name="V" value={cpuState.flags.V} highlight={getFlagHighlight('V')} />
                <FlagDisplay name="FGI" value={cpuState.flags.FGI} highlight={getFlagHighlight('FGI')} />
                <FlagDisplay name="FGO" value={cpuState.flags.FGO} highlight={getFlagHighlight('FGO')} />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Panel: Memory / Listing / Log */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 h-[400px]">
          <div className="flex gap-4 mb-4 border-b">
            <button
              onClick={() => setActiveTab('memory')}
              className={`pb-2 px-2 font-medium transition-colors ${activeTab === 'memory' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
            >
              Memory
            </button>
            <button
              onClick={() => setActiveTab('listing')}
              className={`pb-2 px-2 font-medium transition-colors ${activeTab === 'listing' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
            >
              Assembly Listing
            </button>
            <button
              onClick={() => setActiveTab('log')}
              className={`pb-2 px-2 font-medium transition-colors ${activeTab === 'log' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
            >
              Execution Log
            </button>
            <button
              onClick={() => setActiveTab('help')}
              className={`pb-2 px-2 font-medium transition-colors ${activeTab === 'help' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
            >
              Instruction Set
            </button>
          </div>

          <div className="h-[320px]">
            {activeTab === 'memory' && (
              <MemoryViewer 
                memory={cpuState.memory} 
                currentAddress={cpuState.registers.PC}
              />
            )}
            {activeTab === 'listing' && assembled && (
              <AssemblyListing lines={assembled.assemblyLines} />
            )}
            {activeTab === 'log' && (
              <ExecutionLog logs={logs} />
            )}
            {activeTab === 'help' && (
              <div className="h-full overflow-auto p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-lg mb-4">Mano Basic Computer Instruction Set</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-blue-700 mb-2">Memory-Reference Instructions (Format: I | Opcode | Address)</h4>
                    <table className="w-full text-sm border-collapse">
                      <thead className="bg-gray-200">
                        <tr>
                          <th className="p-2 text-left">Instruction</th>
                          <th className="p-2 text-left">Opcode</th>
                          <th className="p-2 text-left">Description</th>
                          <th className="p-2 text-left">RTL</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b"><td className="p-2 font-mono">AND</td><td className="p-2">000</td><td className="p-2">AND memory with AC</td><td className="p-2 font-mono">AC ← AC ∧ M[AR]</td></tr>
                        <tr className="border-b"><td className="p-2 font-mono">ADD</td><td className="p-2">001</td><td className="p-2">Add memory to AC</td><td className="p-2 font-mono">AC ← AC + M[AR], E ← carry</td></tr>
                        <tr className="border-b"><td className="p-2 font-mono">LDA</td><td className="p-2">010</td><td className="p-2">Load memory to AC</td><td className="p-2 font-mono">AC ← M[AR]</td></tr>
                        <tr className="border-b"><td className="p-2 font-mono">STA</td><td className="p-2">011</td><td className="p-2">Store AC to memory</td><td className="p-2 font-mono">M[AR] ← AC</td></tr>
                        <tr className="border-b"><td className="p-2 font-mono">BUN</td><td className="p-2">100</td><td className="p-2">Branch unconditionally</td><td className="p-2 font-mono">PC ← AR</td></tr>
                        <tr className="border-b"><td className="p-2 font-mono">BSA</td><td className="p-2">101</td><td className="p-2">Branch and save return</td><td className="p-2 font-mono">M[AR] ← PC, PC ← AR + 1</td></tr>
                        <tr className="border-b"><td className="p-2 font-mono">ISZ</td><td className="p-2">110</td><td className="p-2">Increment and skip if zero</td><td className="p-2 font-mono">M[AR] ← M[AR] + 1, if 0 then PC ← PC + 1</td></tr>
                      </tbody>
                    </table>
                  </div>

                  <div>
                    <h4 className="font-bold text-green-700 mb-2">Register-Reference Instructions (Format: 0111 1 xxxxxxxxxx)</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="font-mono bg-white p-2 rounded border">CLA - Clear AC</div>
                      <div className="font-mono bg-white p-2 rounded border">CLE - Clear E</div>
                      <div className="font-mono bg-white p-2 rounded border">CMA - Complement AC</div>
                      <div className="font-mono bg-white p-2 rounded border">CME - Complement E</div>
                      <div className="font-mono bg-white p-2 rounded border">CIR - Circulate Right</div>
                      <div className="font-mono bg-white p-2 rounded border">CIL - Circulate Left</div>
                      <div className="font-mono bg-white p-2 rounded border">INC - Increment AC</div>
                      <div className="font-mono bg-white p-2 rounded border">SPA - Skip if AC Positive</div>
                      <div className="font-mono bg-white p-2 rounded border">SNA - Skip if AC Negative</div>
                      <div className="font-mono bg-white p-2 rounded border">SZA - Skip if AC Zero</div>
                      <div className="font-mono bg-white p-2 rounded border">SZE - Skip if E Zero</div>
                      <div className="font-mono bg-white p-2 rounded border">HLT - Halt Computer</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-purple-700 mb-2">Directives</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="font-mono bg-white p-2 rounded border">ORG n - Origin at address n</div>
                      <div className="font-mono bg-white p-2 rounded border">END - End of program</div>
                      <div className="font-mono bg-white p-2 rounded border">DEC n - Decimal constant</div>
                      <div className="font-mono bg-white p-2 rounded border">HEX n - Hexadecimal constant</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Output Display */}
        {cpuState.output && (
          <div className="mt-4 bg-black rounded-lg border border-gray-700 p-4">
            <h3 className="font-bold text-gray-300 mb-2 flex items-center gap-2">
              <Terminal size={18} />
              Program Output
            </h3>
            <div className="font-mono text-green-400 whitespace-pre-wrap">
              {cpuState.output}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManoComputerSimulator;