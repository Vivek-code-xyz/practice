import express from 'express'
import { teamInfo , blogs , getBlog } from '../controllers/public.controller.js'

const publicRouter = express.Router()

// // blogs
publicRouter.get('/blog',blogs)
// // blog
publicRouter.get('/blog/:blogId',getBlog)
// // team-info
publicRouter.get('/',teamInfo)
export default publicRouter