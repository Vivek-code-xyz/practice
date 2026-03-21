import { User } from "../models/User.js";
import AppError from "../utils/AppError.js";



export const getAllUsers = async (req,res,next)=>{
    try{

        const page = Math.max(1,parseInt(req.query.page) || 1)
        const limit = Math.max(1,parseInt(req.query.limit)||10)

        const skip = (page-1)*limit
        

        const users = await User.find().select('-__v -loginAttempts -refreshToken -refreshTokenExpiresAt').sort({ createdAt: -1 }).skip(skip).limit(limit)

        const totalUsers = await User.countDocuments()

        res.json({
            message:'Data Fetched Successfully',
            totalPages:Math.ceil(totalUsers/limit),
            totalUsers,
            currentPage:page,
            users
        })

    }catch(err){
        next(err)
    }
}


export const updateRole = async (req,res,next)=>{
    try{
        const {id} = req.params
        const {role} = req.body

        if (req.user.id === id) {   //prevents admin to change his own role
            return next(new AppError("You cannot change your own role", 400));
        }

        const allowedRoles = ["user", "moderator", "admin"];

        if (!allowedRoles.includes(role)) {         //invalid roles are handled
            return next(new AppError("Invalid role value", 400));
        }

        const user = await User.findById(id).select('-__v -loginAttempts -refreshToken -refreshTokenExpiresAt')

        if(!user){
           return next(new AppError("User Not Found",404))

        }

        user.role = role

        await user.save()

        res.json({
            success:true,
            message:"User role updated successfully",
            user

        })
    }
    catch(err){
        next(err)
    }
}