import AppError from "../utils/AppError.js"

export const checkRole = (...roles)=>{
    return ((req,res,next)=>{

        if(!req.user || !req.user.role){
            return next (new AppError("Unauthorized!. No user role found",401))
        }

        if(!roles.includes(req.user.role)){
            return next (new AppError("Permission Denied.Unauthorized",403))
        }

        next()

    })
}