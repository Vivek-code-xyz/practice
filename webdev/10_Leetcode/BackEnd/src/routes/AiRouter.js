import express from 'express'
import VarifyTokenMW from '../middleware/validateToken.js'
import {AskAi} from '../Controllers/AiControll.js'

export const AiRouter = express.Router()


AiRouter.post('/chat',VarifyTokenMW,AskAi)