import runPiston from '../utils/Piston.js'
import jwt from 'jsonwebtoken'
import { normalize } from '../utils/normalise.js'
import { Problem } from '../models/problem.js'
import { judgeSubmission } from '../utils/judge.js'
import { User } from '../models/user.js'
import { Submission } from '../models/submission.js'


export const createProblem =  async (req,res)=>{

    if (req.result.role !== "admin") 
        return res.status(403).json({error: "Permission denied"});

    const {title,description,difficulty,
        tags,visibleTestCases,hiddenTestCases,
        startCode,referenceCode} = req.body

    //does this is valid problem? is handled by middleware
    try{


        for(const {language,completeCode} of referenceCode){
            
            for(const testCase of [...visibleTestCases,...hiddenTestCases]){

                const result = await judgeSubmission({language,completeCode,input:testCase.input,expectedOutput:testCase.output})

                if(result.status !== 'Accepted'){
                    throw new Error(`Reference Failde in ${language}`)
                }
            }

        }

        await Problem.create({...req.body,problemCreater:req.result._id})
        

        res.status(201).json({
            message: "Reference code validated successfully"
        })



    }catch(e){
        res.status(401).send("Error : "+e.message)
    }

}

export const updateProblem = async(req,res)=>{
    if (req.result.role !== "admin") 
        return res.status(403).json({error: "Permission denied"});

    const {id} = req.params
    
    try{ 

        if(!id){
            return res.status(400).send("Id is missing")
        }

        const prob = await Problem.findById(id)

        if(!prob){
            return res.status(404).send("Problem Not Found")
        }

        const {title,description,difficulty,
        tags,visibleTestCases,hiddenTestCases,
        startCode,referenceCode} = req.body

        for(const {language,completeCode} of referenceCode){
            
            for(const testCase of visibleTestCases){

                const result = await judgeSubmission({language,completeCode,input:testCase.input,expectedOutput:testCase.output})

                if(result.status !== 'Accepted'){
                    throw new Error(`Reference Failde in ${language}`)
                }
            }

        }

        const updatedProb = await Problem.findByIdAndUpdate(id,{...req.body},{runValidators:true,new:true})
        res.status(200).send(updatedProb)


        


    }catch(e){
        res.status(401).send("Error : "+e.message)
    }
}

export const deleteProblem = async(req,res)=>{
    if (req.result.role !== "admin") 
        return res.status(403).json({error: "Permission denied"});

    const {id} = req.params

    try{
        if(!id){
            return res.status(400).send("Id is missing")
        }

       const deletedProb = await Problem.findByIdAndDelete(id)

       if(!deletedProb) return res.status(404).send("Problem not found")

        res.status(200).send("Problem Deleted Successfully!")

    }
    catch(e){
         res.status(401).send("Error : "+e.message)
    }
}


//get requests

export const readProblemById = async (req,res)=>{
    const {id} = req.params
    try{
        if(!id){
            return res.status(400).send("Id is missing")
        }

        const prob = await Problem.findById(id).select('_id title description difficulty tags visibleTestCases startCode')

        if(!prob){
            return res.status(404).send("Problem Not Found")
        }
        
        res.status(200).send(prob)

    }catch(e){
         res.status(401).send("Error : "+e.message)
    }
}

export const readAllProblem =  async(req,res)=>{
    try{
        
        const probs = await Problem.find({}).select('_id title difficulty tags')

        if(probs.length==0){
            return res.status(404).send("Problem Not Found")
        }
        
        res.status(200).send(probs)

    }catch(e){
         res.status(401).send("Error : "+e.message)
    }
}

export const readSolvedProblem = async(req,res)=>{
    try{
        const userid =  req.result._id
        const user = await User.findById(userid).populate({
            path:'problemSolved',
            select:"_id title difficulty tags"
        })

        res.status(200).send(user.problemSolved)
    }
    catch(e){
        res.status(401).send("Error : "+e.message)
    }
}

export const submittedProblem= async(req,res)=>{
    try{
        const problemId = req.params.pid
        const userId = req.result._id

        const result = await Submission.find({userId,problemId})

        if(result.length === 0){
            res.status(200).send("No Submission Yet")
        }
        res.status(200).send(result)

    }
    catch(e){
        res.status(400).send("Error : "+e.message)
    }
}