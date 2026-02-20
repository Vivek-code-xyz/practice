import Blog from "../models/Blog.js"
import { validateBlog } from "../utils/adminValidator.js"
import { blogs } from "./public.controller.js"

export async function createBlog(req,res,next) {
    try {
        validateBlog(req.body)
        const blog = await Blog.create(req.body)
        res.status(201).json({
            blog,
            Status : "Success",
            Message : "Blog created successfully"
        })
    } catch (err) {
        next(err)
    }
}

export async function deleteBlog(req,res,next) {
    try {
        const { blogId } = req.params
        if(!blogId) {
            const err = new Error("Provide blog id")
            err.statusCode = 400
            throw err
        }
        const blog = await Blog.findByIdAndDelete(blogId)
        res.status(200).json({
            blog,
            Status : "Success",
            Message : "Blog is deleted successfully"
        })
    } catch (err) {
        next(err)
    }
}
export async function updateBlog(req,res,next) {
    try {
        const { blogId } = req.params
        const blog = await Blog.findById(blogId)
        if(!blog) {
            const err = new Error("Blog not found")
            err.statusCode = 404
            throw err
        }
        const updatedBlog = req.body
        console.log(updatedBlog)
        if(updatedBlog.title !== undefined) blog.title = updatedBlog.title
        if(updatedBlog.content !== undefined) blog.content = updatedBlog.content
        if(updatedBlog.summary !== undefined) blog.summary = updatedBlog.summary
        await blog.save()
        res.status(200).json({
            blog,
            Status : "Success",
            Message : "Blog fetched successfully"
        })
        
    } catch (err) {
        next(err)
    }
}