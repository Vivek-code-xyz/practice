import { Submission } from "../models/submission.js"
import {Problem} from "../models/problem.js"
import { judgeSubmission } from "../utils/judge.js"

export const submitCode = async(req,res)=>{
    try{
        const userId = req.result._id
        const problemId = req.params.id
        const {language,code} = req.body

        if(!userId || !problemId || !language || !code)
            return res.status(400).send("Some fields Are missing")

        const problem = await Problem.findById(problemId)

        if (!problem)
        return res.status(404).json({ message: "Problem not found" });


        const submittedResult = await Submission.create({
            userId,problemId,code,language,status:"pending",testCasesTotal:problem.hiddenTestCases.length
        })

        //give code to piston for checking
        let passedCount = 0;
        let finalStatus = "accepted";
        let totalRuntime = 0;
        let maxMemory = 0;
        let errorMessage = "";
        let verdictType = "";


        for (const testCase of problem.hiddenTestCases) {

            const result = await judgeSubmission({
                language,
                completeCode: code,
                input: testCase.input,
                expectedOutput: testCase.output,
            });

            if (result.status !== "Accepted") {
                finalStatus =(result.status === "Wrong Answer")? "wrong": "error";
                errorMessage = result.error || result.status;
                verdictType = result.status;
                break;
            }

            passedCount++;
            
            totalRuntime = Math.max(totalRuntime, result.cpu_time || 0);
            maxMemory = Math.max(maxMemory, result.memory || 0); 

        }

        if (passedCount === problem.hiddenTestCases.length) {
            finalStatus = "accepted";
        }

        //update in database
       const newSubmittedResult= await Submission.findByIdAndUpdate(submittedResult._id,
            {
                status: finalStatus,
                runtime: totalRuntime,
                memory: maxMemory,
                errorMessage: errorMessage,
                testCasesPassed: passedCount,
            },
            { new: true }
        );
        
        if(!req.result.problemSolved.includes(problemId) && (passedCount === problem.hiddenTestCases.length)){     //push the problem solved to userSchema
            req.result.problemSolved.push(problemId)
            await req.result.save()
        }


        return res.status(200).json({
            status: newSubmittedResult.status,
            passed: passedCount,
            total: problem.hiddenTestCases.length,
            errorMessage: errorMessage || null,
            verdict:verdictType 
        });



    }catch(e){
        res.status(500).send("Error : "+e.message)
    }
}


export const runCode = async(req,res)=>{
    try{
        const userId = req.result._id
        const problemId = req.params.id
        const {language,code} = req.body

        if(!userId || !problemId || !language || !code)
            return res.status(400).send("Some fields Are missing")

        const problem = await Problem.findById(problemId)

        if (!problem)
        return res.status(404).json({ message: "Problem not found" });


        //give code to piston for checking
        


        let testCaseResults = [];
        let globalError = null;

    for (const testCase of problem.visibleTestCases) {

        const result = await judgeSubmission({
            language,
            completeCode: code,
            input: testCase.input,
            expectedOutput: testCase.output,
        });

        // 🔴 Global errors (compile/runtime/TLE/system)
        if (
            result.status === "Compile Error" ||
            result.status === "Runtime Error" ||
            result.status === "Time Limit Exceeded" ||
            result.status === "System Error"
        ) {
            globalError = result.status;
            break;
        }

        // 🟡 Logical result (Accepted / Wrong Answer)
        testCaseResults.push({
            input: testCase.input,
            expectedOutput: testCase.output,
            actualOutput: result.output,
            status: result.status
        });
    }


        return res.status(200).json({
            globalError,
            testCases: testCaseResults
        });




    }catch(e){
        res.status(500).send("Error : "+e.message)
    }   
}