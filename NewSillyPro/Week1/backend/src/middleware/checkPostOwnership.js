import AppError from '../utils/AppError.js'
import {Post} from "../models/Post.js"






export const checkPostOwnership = async (req,res,next)=>{
    try{
       
        const userId = req.user._id
        
        const role = req.user.role
        
        
        const postId = req.params.id
       
        
        const post = await Post.findById(postId)
        
        
        if(!post){
            return next(new AppError("post not found!",404))
        }

        if(role === 'admin' || post.author.toString() === userId.toString()){
            req.post = post
            return next()
        }

        return next(new AppError("You are not allowed to modify this post",403))

    }
    catch(err){
        next(err)
    }
}