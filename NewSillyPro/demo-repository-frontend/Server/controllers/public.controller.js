import Blog from '../models/Blog.js'
import { requestPasswordReset } from './auth.controller.js'
const team = {
    "1" : {
        name : "Dev Gondaliya",
        tech : "Backend Developer",
        quote : "I am the best"
    }, 
    "2" : {
        name : "Vivek Khasiya",
        tech : "Frontend Developer",
        quote : "I am the GOAT"
    },
    "3" : {
        name : "Param Rao",
        tech : "Backend Developer",
        quote : "I am the consisent"
    },
    "4" : {
        name : "Prince Vasava",
        tech : "Security",
        quote : "I am Security Expert"
    },
    "5" : {
        name : "Jigar Ghogari",
        tech : "Designer",
        quote : "I am the Designer"
    }
}


export function teamInfo(req,res,next) {
    try {
        res.status(200).json({
            team,
            Status : "Success",
            Message : "Team Info fetched successfully"
        })
    } catch (err) {
        next(err)
    }
}


export async function blogs(req,res,next) {
    try {
        const blogs = await Blog.find()
        .select('title summary')
        .limit(10)
        .sort({ createdAt : -1})
        res.status(200).json({
            blogs,
            Status : "Success",
            Message : "Blogs fetched Successfully"
        })
    } catch (err) {
        next(err)
    }
}

export async function getBlog(req,res,next){
    try {
        const { blogId } = req.params
        const blog = await Blog.findById(blogId)
        if(!blog) {
            const err = new Error("Blog not found")
            err.statusCode = 404
            throw err
        }
        res.status(200).json({
            blog,
            Status : "Success",
            Message : "Blog fetched successfully"
        })
    } catch (err) {
        next(err)
    }
}