import axios from "axios";
import { exec, spawn } from "child_process";
import fs from "fs";
import os from "os";
import path from "path";

const PISTON_URL = "https://emkc.org/api/v2/piston/execute"

// fallback config to use local runner when remote API unavailable
const USE_LOCAL = true; // always run locally since public API locked down

// helper to run shell command and capture output (exec only, no stdin support)
function runCmd(cmd, options = {}) {
    return new Promise((resolve, reject) => {
        exec(cmd, options, (error, stdout, stderr) => {
            resolve({ error, stdout, stderr });
        });
    });
}

// helper using spawn so we can pipe stdin
function runCmdWithInput(cmd, stdin, options = {}) {
    return new Promise((resolve) => {
        const proc = spawn(cmd, { shell: true, ...options });
        let stdout = "";
        let stderr = "";
        proc.stdout.on("data", (c) => (stdout += c.toString()));
        proc.stderr.on("data", (c) => (stderr += c.toString()));
        proc.on("close", (code) => {
            resolve({ error: code !== 0 ? { code } : null, stdout, stderr });
        });
        if (stdin) {
            proc.stdin.write(stdin);
        }
        proc.stdin.end();
    });
}

async function runLocal({language, code, stdin=""}){
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "run-") );
    let sourceFile, exeFile, compileCmd;
    let runCommand = [];
    const isWin = process.platform === 'win32';

    switch(language) {
        case 'cpp':
        case 'c':
            sourceFile = path.join(tmpDir, 'main.' + (language==='cpp'? 'cpp':'c'));
            exeFile = path.join(tmpDir, isWin ? 'a.exe' : 'a.out');
            fs.writeFileSync(sourceFile, code);
            compileCmd = `g++ -std=c++17 "${sourceFile}" -o "${exeFile}"`;
            runCommand = [exeFile];
            break;
        case 'java':
            sourceFile = path.join(tmpDir, 'Main.java');
            fs.writeFileSync(sourceFile, code);
            compileCmd = `javac "${sourceFile}"`;
            runCommand = ['java', '-cp', tmpDir, 'Main'];
            break;
        case 'python':
            sourceFile = path.join(tmpDir, 'main.py');
            fs.writeFileSync(sourceFile, code);
            runCommand = ['python', sourceFile];
            break;
        case 'javascript':
            sourceFile = path.join(tmpDir, 'main.js');
            fs.writeFileSync(sourceFile, code);
            runCommand = ['node', sourceFile];
            break;
        default:
            return { compile: { code: 0 }, run: { code: 0, stdout: '', stderr: 'Language not supported locally' } };
    }

    // compile step if needed
    if (compileCmd) {
        const { error, stderr } = await runCmd(compileCmd);
        if (error) {
            return { compile: { code: error.code || 1, stderr: stderr || error.message } };
        }
    }

    try {
        // execute with stdin support (direct spawn without shell)
        const proc = spawn(runCommand[0], runCommand.slice(1), { cwd: tmpDir });
        if (stdin) proc.stdin.write(stdin);
        proc.stdin.end();

        let stdout = "";
        let stderr = "";
        proc.stdout.on("data", c => stdout += c.toString());
        proc.stderr.on("data", c => stderr += c.toString());

        const exitCode = await new Promise(resolve => {
            proc.on("close", code => resolve(code));
        });

        return { compile: { code: 0 }, run: { code: exitCode, stdout, stderr } };
    } catch(e) {
        return { compile: { code: 0 }, run: { code: 1, stdout: '', stderr: e.message } };
    } finally {
        try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch(_) {}
    }
}

export default async function runPiston({language, code, stdin = ""}){
    if (USE_LOCAL) {
        return runLocal({language, code, stdin});
    }

    try{
        const version = 'latest';
        const payload = {
            language,
            version,
            files: [
                {
                    name: language === 'java' ? 'Main.java' : 'main',
                    content: code
                }
            ],
            stdin,
            compile_timeout: 10000,
            run_timeout: 5000,
            compile_memory_limit: -1,
            run_memory_limit: -1
        }

        const {data} = await axios.post(PISTON_URL, payload, {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 30000
        })

        return data
    } catch(e){
        console.error("Piston Full Error:", {
            message: e.message,
            status: e.response?.status,
            statusText: e.response?.statusText,
            data: e.response?.data,
            config: e.config?.data
        })
        // fallback to local
        return runLocal({language, code, stdin});
    }
}