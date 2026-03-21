import jwt from "jsonwebtoken"

export default function generateToken(payload){
    const tokenExpiresIn = "15min"

    const token = jwt.sign(payload,process.env.JWT_SECRET_KEY ,{expiresIn:tokenExpiresIn})
    return token;
}


export const generateRefreshToken = (payload)=>{
    const tokenExpiresIn = "7d"

    const token = jwt.sign(payload,process.env.JWT_SECRET_REFRESH_KEY ,{expiresIn:tokenExpiresIn})
    return token; 
}