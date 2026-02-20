import express from 'express'
import dotenv from 'dotenv'
import main from './config/db.js'
import cookieParser from "cookie-parser"
import cors from 'cors'
import { authRouter } from './routes/userAuth.js'
import { redisClient } from './config/redis.js'
import { problemRouter } from './routes/problemSet.js'
import { submitRouter } from './routes/submitProb.js'

dotenv.config()           //configuring .env file to index.jsx
const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())
app.use(cookieParser());

app.use('/user',authRouter)
app.use('/problem',problemRouter)
app.use('/solution',submitRouter)


// main()
//     .then(async ()=>{
        // app.listen(process.env.PORT,()=>{
        //     console.log("Server is listening at Port "+process.env.PORT)
        // })
//     })
//     .catch(err=>console.log("Error : "+err.message))

const InitialiseConnection = async()=>{
    try{


        await Promise.all([main(),redisClient.connect()])
        console.log("DBs Connected Successfully")

        app.listen(process.env.PORT,()=>{
            console.log("Server is listening at Port "+process.env.PORT)
        })

    }catch(e){
        console.log("Error : "+e.message)
    }
}

InitialiseConnection()