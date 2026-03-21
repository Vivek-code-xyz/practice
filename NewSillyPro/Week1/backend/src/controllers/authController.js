import hashPassword from '../utils/hashPassword.js'
import { User } from '../models/User.js'
import AppError from '../utils/AppError.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import generateToken, { generateRefreshToken } from '../utils/generateToken.js'
import crypto from 'crypto'
import generateResetToken from '../utils/generateResetToken.js'
import { sendResetEmail } from '../utils/sendResetEmail.js'

export const userRegister = async (req, res, next) => {

    try {
        console.log("hello", req.body)
        let { username, email, password } = req.body
        password = await hashPassword(password)

        const user = await User.create({ username, email, password })

        const token = generateToken({ role: 'user', userId: user._id, email })
        const refreshToken = generateRefreshToken({ role: 'user', userId: user._id, email })

        const hashedRefreshToken = await hashPassword(refreshToken)
        user.refreshToken = hashedRefreshToken;
        user.refreshTokenExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

        await user.save()

        // const { password: pass,refreshToken:rtkn,refreshTokenExpiresAt:rtknDate,loginAttempts:lgn, ...userInfo } = user.toObject()

        const userInfo = {
            _id:user._id,
            username:user.username,
            email:user.email,
            role:user.role,
            createdAt:user.createdAt
        }

        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: false, // true in production (HTTPS)

            maxAge: 15 * 60 * 1000, // 15 minutes
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            user: userInfo
        })

    }
    catch (error) {
        next(error)
    }

}


export const userLogin = async (req, res, next) => {

    try {

        const { email, password } = req.body

        if (!email || !password) {
            return next(new AppError("All fields are required", 400))
        }

        const user = await User.findOne({ email }).select("+password")

        if (!user)
            return next(new AppError("Invalid Credentials", 401))

        if (user.isLocked())
            return next(new AppError("Account is Locked", 423))

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            await user.incrementLoginAttempts()
            return next(new AppError("Invalid Credentials", 401))

        }

        user.loginAttempts = 0
        user.lockedUntil = undefined


        const token = generateToken({ role: 'user', userId: user._id, email })
        const refreshToken = generateRefreshToken({ role: 'user', userId: user._id, email })

        const hashedRefreshToken = await hashPassword(refreshToken)
        user.refreshToken = hashedRefreshToken;
        user.refreshTokenExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        await user.save()


        // const { password: pass,refreshToken:rtkn,refreshTokenExpiresAt:rtknDate,loginAttempts:lgn, ...userInfo } = user.toObject()

        const userInfo = {
            _id:user._id,
            username:user.username,
            email:user.email,
            role:user.role,
            createdAt:user.createdAt
        }

        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: false, // true in production (HTTPS)

            maxAge: 15 * 60 * 1000, // 15 minutes
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,

            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            success: true,

            user: userInfo
        })

    } catch (err) {
        next(err)
    }


}





export const refreshTokenHandler = async (req,res,next)=>{
    try{
        const {refreshToken} = req.cookies;

        if (!refreshToken) {
            return next(new AppError("Refresh token missing", 401))
        }

        let decoded;
        try {
            decoded = jwt.verify(
                refreshToken,
                process.env.JWT_SECRET_REFRESH_KEY
            );
        } catch (err) {
            return next(new AppError("Invalid RefreshToken", 401))
        }

        // Get user from decoded token (extracted from JWT, not DB comparison)
        const user = await User.findById(decoded.userId);

        if (!user)
            return next(new AppError("User Not Found", 401))

        if (user.refreshTokenExpiresAt < new Date()) {
            return next(new AppError("Refresh token expired", 401));
        }

        // Verify the token matches what's in DB using bcrypt
        const isTokenValid = await bcrypt.compare(refreshToken, user.refreshToken);
        if (!isTokenValid) {
            return next(new AppError("Invalid token", 401));
        }

        const newToken = generateToken({ role: 'user', userId: user._id, email: user.email })
        const newRefreshToken = generateRefreshToken({ role: 'user', userId: user._id, email: user.email })
        
        const hashedNewRefreshToken = await hashPassword(newRefreshToken)
        user.refreshToken = hashedNewRefreshToken;
        user.refreshTokenExpiresAt = new Date(Date.now()+7*24*60*60*1000)

        await user.save()

        res.cookie("accessToken", newToken, {
            httpOnly: true,
            secure: false,
            maxAge: 15 * 60 * 1000,
        });

        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({ message: "Token refreshed" });

    }catch(err){
        next(err)
    }
}





export const forgotPassword = async (req,res,next)=>{
    try{
        const {email} = req.body;

        const user = await User.findOne({email})

        if(!user){
            return next(new AppError("Reset link sent if email exists",404))
        }

        // const resetToken = crypto.randomBytes(32).toString('hex')
        // const hashedResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')

        const result = generateResetToken()

        const resetToken = result.token
        const hashedResetToken =  result.hashedToken

        user.resetPasswordToken = hashedResetToken;
        user.resetPasswordExpiry = Date.now()+ 10*60*1000;

        await user.save()

        const resetURL = `http://localhost:5173/reset-password/${resetToken}`;

        sendResetEmail(email,resetURL)

        res.status(200).json({
            success:true,
            message:"Reset Link Generated",
            // resetURL
        })

    }catch(e){
        next(e)
    }
}




export const resetPassword = async(req,res,next)=>{
    try{

        const {token} = req.params
        const {password} = req.body

        const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

        const user = await User.findOne({resetPasswordToken:hashedToken,resetPasswordExpiry: { $gt: Date.now() }})

        if(!user){
           return next(new AppError("Token is invalid or expired", 400));
        }


        const hashedPassword = await hashPassword(password)

        user.password = hashedPassword

        user.resetPasswordToken = undefined
        user.resetPasswordExpiry = undefined
        
        await user.save()

        res.status(200).json({
            success:true,
            message:"Password Reset Successfully",

        })

    }catch(e){
        next(e)
    }
}