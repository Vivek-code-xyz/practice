import express from 'express'
import { createBlog, deleteBlog, updateBlog } from '../controllers/admin.controller.js'
import adminMiddleware from '../middlewares/adminMiddleware.js'

const adminRouter = express.Router()

// create blog
adminRouter.post('/blog',adminMiddleware, createBlog)
// delete blog
adminRouter.delete('/:blogId',adminMiddleware, deleteBlog)
// update blog
adminRouter.patch('/:blogId' , adminMiddleware, updateBlog)
export default adminRouter