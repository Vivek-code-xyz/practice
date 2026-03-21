import validator from 'validator'
import AppError from '../utils/AppError.js'


export const validateLogin = (req,res,next)=>{
    let {email,password} = req.body

    //extra cleanup
    
    email = email?.trim().toLowerCase();
    password = password?.trim();

    if(!email || !password){
    
        return next( new AppError("All Fields Are Required",400) )
    }

    if(!validator.isEmail(email)){
    
        return next( new AppError("Invalid Email",400))
    }

    


    req.body.email = email

    next()
}