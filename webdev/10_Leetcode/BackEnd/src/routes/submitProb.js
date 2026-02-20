import express from "express";
import VarifyTokenMW from "../middleware/validateToken.js";
import { submitCode ,runCode } from "../Controllers/userSubmission.js";
export const submitRouter = express.Router()


submitRouter.post('/submit/:id',VarifyTokenMW,submitCode)
submitRouter.post('/run/:id',VarifyTokenMW,runCode)

