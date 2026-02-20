import express from 'express'
import { createProblem,updateProblem,deleteProblem,readProblemById ,readAllProblem,readSolvedProblem,submittedProblem} from '../Controllers/problemControll.js'
import { validateProblem } from '../middleware/validProblem.js'
import VarifyTokenMW from '../middleware/validateToken.js'

export const problemRouter = express.Router()

//create
problemRouter.post("/create",VarifyTokenMW,validateProblem,createProblem)


//read
problemRouter.get("/user/solved",VarifyTokenMW,readSolvedProblem)
problemRouter.get("/:id",VarifyTokenMW,readProblemById)
problemRouter.get("/",VarifyTokenMW,readAllProblem)
problemRouter.get("/submissions/:pid",VarifyTokenMW,submittedProblem)

//update
problemRouter.put("/update/:id",VarifyTokenMW,updateProblem)


//delete
problemRouter.delete("/delete/:id",VarifyTokenMW,deleteProblem)