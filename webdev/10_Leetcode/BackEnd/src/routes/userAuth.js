import express from 'express'
import { register ,login,logout ,adminRegister,deleteProfile} from '../Controllers/userAuthControll.js'
import VarifyTokenMW from '../middleware/validateToken.js'



export const authRouter = express.Router()

//register
authRouter.post('/register',register)
//login
authRouter.post('/login',login)
//logout
authRouter.post('/logout',VarifyTokenMW,logout)

//admin
authRouter.post('/admin/register',VarifyTokenMW,adminRegister)
//getprofile
// authRouter.get('/getProfile',getProfile)
authRouter.delete('/profile',VarifyTokenMW,deleteProfile)

authRouter.get('/check',VarifyTokenMW,(req,res)=>{
    res.status(200).send({
        message: "LoggedIn Successfully",
            user:{
                firstName:req.result.firstName,
                emailId:req.result.emailId,
                _id:req.result._id
            }
    })
})

//on my own
//googleSignIn
//forgotPass
//emailVarification
//resetPass
