import AppError from "../utils/AppError.js"
import { Comment } from "../models/Comment.js";
import { Post } from "../models/Post.js";


export const createComment = async (req, res, next) => {
    try {
        const { postId } = req.params
        const { content } = req.body

        if (!content || content.trim().length < 3) {
            return next(new AppError("Comment must be of atleast 3 charecter long", 400))
        }

        const comment = await Comment.create({
            content,
            post: postId,
            author: req.user._id
        })


        await Post.findByIdAndUpdate(
            postId,
            { $inc: { commentCount: 1 } }
        );

        res.status(201).json({
            message: "Comment created successfully",
            comment
        });

    } catch (err) {
        next(err)
    }
}


export const getComments = async (req, res, next) => {
    try {
        const { postId } = req.params

        const page = parseInt(req.query.page) || 1
        const limit = Math.min(parseInt(req.query.limit) || 10, 30)
        const skip = (page - 1) * limit

        const comments = await Comment.find({
            post: postId,
            parentComment: null
        }).populate('author', "username avatar")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)



        const totalComments = await Comment.countDocuments({
            post: postId,
            parentComment: null
        })


        res.status(200).json({
            success: true,
            message: "Comments Fatched successfully",
            totalComments,
            page,
            comments
        })



    } catch (err) {
        next(err)
    }
}



export const createCommentReply = async (req, res, next) => {
    try {
        const { commentId } = req.params
        const { content } = req.body

        if (content.trim().length < 3) {
            return next(new AppError("Content is empty", 400))
        }

        const parentComment = await Comment.findById(commentId)

        if (!parentComment) {
            return next(new AppError("Parent comment not found", 404))
        }

        const reply = await Comment.create({
            content,
            author: req.user._id,
            post: parentComment.post,
            parentComment: parentComment._id
        })

        await Post.findByIdAndUpdate(
            parentComment.post,
            { $inc: { commentCount: 1 } }
        );

        res.status(201).json({
            success:true,
            message: "Reply created successfully",
            reply
        });

    } catch (err) {
        next(err)
    }
}