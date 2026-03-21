import { Router } from "express"
import { getProfile , updateProfile } from "../controllers/user.controller.js"
import protect from "../middleware/auth.middleware.js"


export const userRouter = Router()

userRouter.get('/profile',protect,getProfile)
userRouter.patch('/profile',protect,updateProfile)