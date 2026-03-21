import validator from 'validator'
import AppError from '../utils/AppError.js'


export const validateRegister = (req,res,next)=>{
    let {username,email,password} = req.body

    //extra cleanup
    username = username?.trim();
    email = email?.trim().toLowerCase();
    password = password?.trim();

    if(!email || !password || !username){
    //    return res.status(400).json({
    //         success:false,
    //         message:"All Fields Are Required"
    //    })
        return next( new AppError("All Fields Are Required",400) )
    }

    if(!validator.isEmail(email)){
    //     return res.status(400).json({
    //         success:false,
    //         message:"Invalid Email"
    //    })
        return next( new AppError("Invalid Email",400))
    }

    if(!validator.isStrongPassword(password)){
    //     return res.status(400).json({
    //         success:false,
    //         message:"Weak Password"
    //    })
        return next( new AppError("Weak Password",400))
    }

    if(username.length <3 || username.length>25 ){
    //     return res.status(400).json({
    //         success:false,
    //         message:"Length of Username must be between 3 to 25 charecters"
    //    })
        return next( new AppError("Length of Username must be between 3 to 25 charecters",400))
    }


    //saving lowercase email in request
    req.body.email = email


    next()
}