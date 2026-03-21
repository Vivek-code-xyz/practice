import { Router } from "express";
import { createPost,getAllPosts,getPost,updatePost,deletePost , getMyPosts} from "../controllers/postController.js";
import protect from "../middleware/auth.middleware.js";
import { checkPostOwnership } from "../middleware/checkPostOwnership.js";
import { createComment ,getComments } from "../controllers/commentController.js";
export const postRouter = Router()


postRouter.post('/create',protect,createPost)

postRouter.get('/get-all-posts',protect,getAllPosts)
postRouter.get('/:id',protect,getPost)

postRouter.put('/:id',protect,checkPostOwnership,updatePost)
postRouter.delete('/:id',protect,checkPostOwnership,deletePost)

postRouter.get('/me',protect,getMyPosts)

postRouter.post('/:postId/comment',protect,createComment)
postRouter.get('/:postId/comment',protect,getComments)