import { Post } from "../models/Post.js"
import { authRouter } from "../routes/authRouter.js"
import AppError from "../utils/AppError.js"
// import { checkPostOwnership } from "../middleware/checkPostOwnership.js"


export const createPost = async (req, res, next) => {

    try {
        const { title, content, tags, status } = req.body
        const author = req.user._id         //it is actually author Id

        //field validation
        if (!title || !content) {
            return next(new AppError("Required Fields are missing", 400))
        }

        if (title.length < 5) {
            return next(new AppError("Minimul allowed Title Length is 5", 400))
        }
        if (tags && !Array.isArray(tags)) {
            return next(new AppError("tags must be an array", 400))
        }

        const allowedStatus = ['draft', 'published']
        if (status && !allowedStatus.includes(status)) {
            return next(new AppError("Invalid status value", 400))
        }



        const post = await Post.create({ title, content, tags, status, author })

        res.status(201).json({
            success: true,
            message: "Post Created Successfully",
            post: post
        })


    } catch (err) {
        next(err)
    }
}




export const getAllPosts = async (req, res, next) => {
    try {

        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 5

        const status = req.query.status
        const skip = (page - 1) * limit

        const filters = {}

        if (status) filters.status = status

        const posts = await Post.find(filters).populate("author", "username").sort({ createdAt: -1 }).skip(skip).limit(limit).select("-__v")


        res.status(200).json({
            success: true,
            message: "All Posts fetched Succcessfully",
            page,
            limit,
            count: posts.length,
            posts,

        })

    } catch (err) {
        next(err)
    }
}


export const getPost = async (req, res, next) => {
    try {

        const postId = req.params.id

        // if(!mongoose.Types.ObjectId.isValid(postId)){       //checking is postId is valid or not
        //     return next(new AppError("Invalid post ID",400))
        // }


        const post = await Post.findByIdAndUpdate(postId, { $inc: { views: 1 } }, { new: true }).populate("author", "username").select("-__v")

        if (!post) {
            return next(new AppError("Post not found", 404))
        }

        res.status(200).json({
            success: true,
            message: "Post Fetched Successfully",
            post

        })

    } catch (err) {
        next(err)
    }
}



export const updatePost = async (req, res, next) => {

    try {
      
        const postId = req.params.id
        const { title, content, tags, status } = req.body
        const post = req.post

        if (title) post.title = title
        if (content) post.content = content
        if (tags) post.tags = tags
        if (status) post.status = status
        post.updatedAt = new Date()


        const updatedPost = await post.save()

        res.status(200).json({
            success: true,
            message: 'Post updated Successfully',
            post: updatedPost
        })

    } catch (err) {
        next(err)
    }

}


export const deletePost = async (req, res, next) => {
    try {
        const post = req.post

        post.isDeleted = true
        post.updatedAt = new Date()

        const deletedPost = await post.save()


        res.status(200).json({
            success: true,
            message: 'Post deleted Successfully',
            post: deletedPost
        })


    } catch (err) {
        next(err)
    }
}


export const getMyPosts = async (req, res, next) => {
    try {
        

        const userId = req.user._id
        const { status, tag, sort } = req.query
        const page = Number(req.query.page) || 1
        // const limit = Number(req.query.limit) || 10
        const limit = Math.min(Number(req.query.limit) || 10, 50)

        const skip = (page - 1) * limit

        const filter = {
            author: userId
        }

        // if(status) filter.status=status
        const allowedStatus = ["draft", "published"]

        if (status) {
            if (!allowedStatus.includes(status)) {
                return next(new AppError("invalid filters!", 400))
            }

            filter.status = status
        }

        if (tag) filter.tags = tag

        let dbQuery = Post.find(filter)

        dbQuery = dbQuery.sort(sort || "-createdAt").skip(skip).limit(limit)

        // const posts = await dbQuery

        // const posts = await dbQuery.lean()
        // const totalPosts = await Post.countDocuments(filter)
       
        const [posts, totalPosts] = await Promise.all([
            dbQuery.lean(),
            Post.countDocuments(filter)
        ])
        console.log('2')

        res.status(200).json({
            success: true,
            page: Number(page),
            limit: Number(limit),
            count: posts.length,
            posts,
            totalPosts
        })


    } catch (err) {
        next(err)
    }
}