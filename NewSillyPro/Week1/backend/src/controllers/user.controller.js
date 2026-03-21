import { User } from "../models/User.js"
import AppError from "../utils/AppError.js"

export const getProfile = async (req, res, next) => {
    try {

        const userId = req.user._id

        const user = await User.findById(userId).select('_id username email createdAt role').lean()

        if (!user)
            return next(new AppError("User Not Exist", 404))

      
        return res.status(200).json({
            success:true,
            message:"Profile Fetched Successfully",
            data:{
                user:user
            }
       })

    } catch (err) {
        return next(err)
    }
}


export const updateProfile = async (req,res,next)=>{
    try{
        const userId = req.user._id

        const{username,email} = req.body

        if (!username && !email) {
            return next(new AppError("No fields provided to update", 400));
        }

        const user = await User.findById(userId)

        if(!user){
            return next(new AppError("User Not Exist", 404))
        }

        if(email && email !== user.email){
            const isemailExist = await User.findOne({email})

            if(isemailExist){
                return next(new AppError("Email is Already In Use",400))
            }

            user.email = email
        }

        if(username){
            user.username = username
        }

        await user.save()


        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: {
                user: {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    createdAt:user.createdAt,
                    
                }
            }
        });

    }catch(err){
        return next(err)
    }
}