import runPiston from "./Piston.js";
import { normalize } from "./normalise.js";

export async function judgeSubmission({language,completeCode,input,expectedOutput},timeLimit = 2000 ) {

  try {
        const data = await runPiston({language,code: completeCode,stdin: input,});

        const { compile, run } = data;

        // 🔴 COMPILE ERROR
        if (compile.code !== 0) {
            return {
                status: "Compile Error",
                error: compile.stderr || compile.output,
            };
        }

        // 🔴 TIME LIMIT EXCEEDED
        if (run.signal === "SIGKILL" || run.cpu_time > timeLimit) {
            return {
                status: "Time Limit Exceeded",
                cpu_time: run.cpu_time,
            };
        }

        // 🔴 RUNTIME ERROR
        if (run.code !== 0) {
            return {
                status: "Runtime Error",
                error: run.stderr,
            };
        }

        // 🟡 WRONG ANSWER
        if (normalize(run.stdout) !== normalize(expectedOutput)) {
            return {
                status: "Wrong Answer",
                expected: expectedOutput,
                output: run.stdout,
            };
        }

        // 🟢 ACCEPTED
        return {
            status: "Accepted",
            memory: run.memory,
            cpu_time: run.cpu_time,
            output: run.stdout,
        };

  } catch (error) {
        return {
            status: "System Error",
            message: error.message,
        };
  }
}
