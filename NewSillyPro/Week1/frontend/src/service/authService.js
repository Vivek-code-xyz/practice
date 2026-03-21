import { api } from "./axiosInstance.js";

export const loginUser = async ({email,password})=>{
    const response = await api.post('/auth/login',{email,password})
    return response.data
}

export const registerUser = async ({username,email,password})=>{
    const response = await api.post('/auth/register',{username,email,password})
    return response.data
}

export const forgotPasswordApi = async(email)=>{
     const res = await api.post("/auth/forgot-password", {
                email:email
            });
    return res.data
}


export const resetPasswordApi = async({token,password})=>{
    const res = await api.post(
                `/auth/reset-password/${token}`,
                { password }
            );
    return res.data
}