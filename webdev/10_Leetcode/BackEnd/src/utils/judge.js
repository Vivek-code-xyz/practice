import runPiston from "./Piston.js";
import { normalize } from "./normalise.js";

export async function judgeSubmission({language,completeCode,input,expectedOutput},timeLimit = 5000) {

  try {
        const data = await runPiston({language,code: completeCode,stdin: input});

        console.log("Judge Data:", JSON.stringify(data, null, 2))

        // Validate response structure
        if (!data || typeof data !== 'object') {
            return {
                status: "System Error",
                message: "Invalid response from code execution service",
            };
        }

        const compile = data.compile || { code: 0, stderr: '' };
        const run = data.run || {};

        // 🔴 COMPILE ERROR
        if (compile && compile.code !== 0) {
            return {
                status: "Compile Error",
                error: compile.stderr || compile.output || "Compilation failed",
            };
        }

        // Check if run exists and has output
        if (!run || run.stdout === undefined) {
            console.error("Run object missing or no stdout:", run)
            return {
                status: "System Error",
                message: "No output from code execution. Run stderr: " + (run?.stderr || "none"),
            };
        }

        // 🔴 RUNTIME ERROR (exit code non-zero, excluding code 0 which is success)
        if (run.code !== 0 && run.code !== null && run.code !== undefined) {
            return {
                status: "Runtime Error",
                error: run.stderr || "Runtime error occurred",
                exitCode: run.code
            };
        }

        // 🔴 TIME LIMIT EXCEEDED
        if (run.signal === "SIGKILL") {
            return {
                status: "Time Limit Exceeded",
                cpu_time: run.cpu_time,
            };
        }

        // 🟡 WRONG ANSWER - normalize both expected and actual output before comparison
        const normalizedExpected = normalize(expectedOutput || "");
        const normalizedActual = normalize(run.stdout || "");

        if (normalizedActual !== normalizedExpected) {
            return {
                status: "Wrong Answer",
                expected: normalizedExpected,
                output: normalizedActual,
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
        console.error("Judge Error:", error.message)
        return {
            status: "System Error",
            message: error.message,
        };
  }
}
