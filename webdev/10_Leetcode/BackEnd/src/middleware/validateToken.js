import jwt from 'jsonwebtoken'
import { User } from '../models/user.js'
import { redisClient } from '../config/redis.js'

export default async function VarifyTokenMW(req,res,next){

    try{

        const {token} = req.cookies

        if(!token){
            throw new Error("Token is Not Present")

        }

        const payload =  jwt.verify(token,process.env.JWT_KEY)

        const {_id} = payload

        if(!_id) throw new Error("invalid token")
        
        const result = await User.findById(_id)

        if(!result) throw new Error("User Not Exist")

        //is present in blocklist of redis

        const isBlocked = await redisClient.exists(`token:${token}`)


        if(isBlocked) throw new Error("Invalid Token")


        req.result = result

        next()
        

    }catch(e){
        res.status(401).send("Error : "+e.message)
    }
}