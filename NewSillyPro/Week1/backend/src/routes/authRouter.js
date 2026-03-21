import { Router } from "express"
import { userRegister,userLogin ,refreshTokenHandler,forgotPassword,resetPassword} from "../controllers/authController.js"
import { validateRegister} from "../middleware/validateRegister.js"
import { validateLogin } from "../middleware/validateLogin.js"
import { rateLimiter } from "../middleware/rateLimiter.js"

export const authRouter = Router()

authRouter.post('/register',rateLimiter,validateRegister,userRegister)
authRouter.post('/login',rateLimiter,validateLogin,userLogin)

authRouter.post('/refresh',refreshTokenHandler)

authRouter.post('/forgot-password',forgotPassword)
authRouter.post('/reset-password/:token',resetPassword)