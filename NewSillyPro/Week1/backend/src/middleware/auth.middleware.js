import jwt from 'jsonwebtoken'
import AppError from '../utils/AppError.js'
import { User } from '../models/User.js'


export default async function protect (req,res,next){
    // Expect JWT in HttpOnly cookie named `accessToken` (cookie-parser required)
    const token =  req?.cookies?.accessToken

    if (!token) {
        return next(new AppError("Authorization token missing", 401))
    }
    try{

        const payload = jwt.verify(token,process.env.JWT_SECRET_KEY)


        const id = payload.userId
        const user = await User.findById(id).select('_id username email role')

        if(!user)
            return next(new AppError("User Not Exist",401))

        req.user = user;
        next()
        

    }catch(err){

        if(err.name === 'TokenExpiredError') {
            return next(new AppError("Session expired, please login again", 401))
        }

        if(err.name === 'JsonWebTokenError') {
            return next(new AppError("Invalid token, please login again", 401))
        }

        return next(new AppError("Authentication failed: "+err.message, 401))
    }
}