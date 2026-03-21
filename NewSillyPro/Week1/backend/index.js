import dotenv from "dotenv";
dotenv.config()
import express from "express";
import main from "./src/config/MongoDB.js";
import { authRouter } from "./src/routes/authRouter.js";
import cors from "cors"
import { errorHandler } from "./src/middleware/errorHandler.js";
import { userRouter } from "./src/routes/userRouter.js";
import cookieParser from "cookie-parser";
import { adminRouter } from "./src/routes/adminRouter.js";
import helmet  from 'helmet'
import morgan from "morgan";
import { postRouter } from "./src/routes/postRouter.js";
import { commentRouter } from "./src/routes/commentRouter.js";


const app = express()
app.use(morgan("dev"));

app.use(helmet({
    contentSecurityPolicy: false  //for development only..remove for Production
}))

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(express.json())        //json parser
app.use(cookieParser())
app.set("trust proxy", 1); //for production and for vercel deployment


app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.use('/api/admin',adminRouter)
app.use('/api/posts',postRouter)
app.use('/api/comments',commentRouter)

app.use(errorHandler)

main()
    .then(()=>{
        app.listen(process.env.PORT,()=>{
            console.log("Listening At Port : "+process.env.PORT)
        })
    })
    .catch((err)=>{
        console.log("Database Connection Failed : " + err.message)
        process.exit(1)  
        // ← exits the process if DB fails
        // no point running server without database
    })
