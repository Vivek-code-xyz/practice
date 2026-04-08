export const SAMPLE_PROGRAMS = {
  loadAndStore: {
    name: "Load And Store",
    code: `ORG 100
LDA VALUE
STA RESULT
HLT
VALUE, DEC 42
RESULT, DEC 0
END`,
  },
  addTwoNumbers: {
    name: "Add Two Numbers",
    code: `ORG 100
LDA FIRST
ADD SECOND
STA TOTAL
HLT
FIRST, DEC 12
SECOND, DEC 8
TOTAL, DEC 0
END`,
  },
  countdownLoop: {
    name: "Countdown Loop",
    code: `ORG 100
LOOP, LDA COUNT
SZA
BUN CONTINUE
HLT
CONTINUE, LDA COUNT
ADD NEGONE
STA COUNT
BUN LOOP
COUNT, DEC 3
NEGONE, HEX FFFF
END`,
  },
  waitForInput: {
    name: "Wait And Read Input",
    code: `ORG 100
WAIT, SKI
BUN WAIT
INP
STA CHAR
HLT
CHAR, HEX 0000
END`,
  },
  printCharacter: {
    name: "Print Character",
    code: `ORG 100
LDA LETTER
OUT
HLT
LETTER, HEX 0041
END`,
  },
  addWithHexData: {
    name: "Add With HEX + DEC",
    code: `ORG 100
LDA FIRST
ADD SECOND
STA RESULT
HLT
FIRST, HEX 0014
SECOND, DEC 27
RESULT, HEX 0000
END`,
  },
  indirectPointer: {
    name: "Indirect Addressing",
    code: `ORG 120
LDA VALUE I
STA RESULT
HLT
VALUE, HEX 0125
ORG 125
HEX 0033
ORG 126
RESULT, HEX 0000
END`,
  },
  subroutineCall: {
    name: "BSA Subroutine",
    code: `ORG 180
LDA ARG
BSA DOUBLE
STA ANSWER
HLT
DOUBLE, HEX 0000
ADD ARG
BUN DOUBLE I
ARG, DEC 21
ANSWER, DEC 0
END`,
  },
  ioEcho: {
    name: "I/O Echo",
    code: `ORG 200
SKI
BUN 200
INP
OUT
HLT
END`,
  },
};
