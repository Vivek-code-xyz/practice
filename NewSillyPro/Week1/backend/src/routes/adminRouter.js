import { Router } from "express"
import {checkRole} from "../middleware/checkRole.js"
import protect from "../middleware/auth.middleware.js"
import { getAllUsers ,updateRole} from "../controllers/adminController.js"


export const adminRouter = Router()



adminRouter.get('/users',protect,checkRole('admin'),getAllUsers)
adminRouter.patch('/users/:id/role',protect,checkRole('admin'),updateRole)

