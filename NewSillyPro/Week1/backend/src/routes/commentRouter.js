import { Router } from "express";
import { createCommentReply } from "../controllers/commentController.js";
import protect from "../middleware/auth.middleware.js";

export const commentRouter = Router()

commentRouter.post('/:commentId/reply',protect,createCommentReply)