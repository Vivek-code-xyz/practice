import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
import { User } from "../models/user.js";
import validate from "../utils/validate.js";
import { redisClient } from '../config/redis.js';
import {Submission} from '../models/submission.js'

export const register = async(req,res)=>{

    try{

        validate(req.body)

        // Check if user already exists
        const existingUser = await User.findOne({ emailId: req.body.emailId });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        req.body.password = await bcrypt.hash(req.body.password,9)           //password is stored in hash
        req.body.role = 'user'
        const user = await User.create(req.body)

        //Cookie Generation And GiveAway
        const token = jwt.sign({_id : user._id , emailId:req.body.emailId,role:'user' }, process.env.JWT_KEY , {expiresIn:60*60})
        res.cookie('token',token,{maxAge:60*60*1000})
        res.status(201).json({
            message: "User Registered Successfully",
            user:{
                firstName:user.firstName,
                lastName:user.lastName || "",
                emailId:user.emailId,
                _id:user._id
            }
        })

    }catch(e){
        console.error("Register Error:", e);
        res.status(400).json({ message: e.message || "Registration failed" })
    }
   
}

export const login = async(req,res)=>{
    try{
        const {emailId,password} = req.body
        if(!emailId || !password){
            throw new Error("Credential Missing")
        }

        const user = await User.findOne({emailId})

        if(!user){
            throw new Error("User Not Found...Please SignIn First")
        }

        const passmatch = await bcrypt.compare(password,user.password)

        if(!passmatch){
            throw new Error("Invalid Credentials")
        }

        //generate and give token..
        const token = jwt.sign({_id : user._id , emailId ,role:user.role }, process.env.JWT_KEY , {expiresIn:60*60})
        res.cookie('token',token,{maxAge:60*60*1000})
        res.status(201).json({
            message: "User LoggedIn Successfully",
            user:{
                firstName:user.firstName+" "+user.lastName,
                emailId:user.emailId,
                _id:user._id
            }
        })

    }
    catch(e){
        res.status(401).send("Error : "+e.message)
    }
}

export const logout =  async(req,res)=>{
    try{

        //validate the token --> done by middleware
        const {token} = req.cookies
        const payload = jwt.decode(token)
        //add token to redis blocklist
        await redisClient.set(`token:${token}`,"blocked")
        await redisClient.expireAt(`token:${token}`,payload.exp)

        //clear the cookie
        res.cookie("token",null,{expires:new Date(Date.now())})
        res.send("loggedOut Successfully")

    }catch(e){
         res.status(503).send("Error : "+e.message)
    }
}

export const adminRegister = async(req,res)=>{

    try{

        if(req.result.role !='admin'){
            throw new Error("Permission Denied for normal user")
        }

        validate(req.body)

        req.body.password = await bcrypt.hash(req.body.password,9)           //password is stored in hash
        // req.body.role = 'admin'
        const user = await User.create(req.body)

        //Cookie Generation And GiveAway
        const token = jwt.sign({_id : user._id , emailId:req.body.emailId,role:user.role }, process.env.JWT_KEY , {expiresIn:60*60})
        res.cookie('token',token,{maxAge:60*60*1000})
        res.status(201).send("User Registered Successfully")

    }catch(e){
        res.status(400).json({ message: e.message })
    }
   
}


export const deleteProfile = async(req,res)=>{
    try{

        const userId = req.result._id

        await User.findByIdAndDelete(userId)

        await Submission.deleteMany({userId})

        res.status(200).send("Profile Deleted Successfully")

    }
    catch(e){
        res.status(400).send("Error : "+e.message)
    }
}



