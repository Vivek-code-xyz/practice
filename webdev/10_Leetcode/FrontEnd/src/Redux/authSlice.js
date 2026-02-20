import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axiosClient from "../utils/axiosClient";


export const registerUser = createAsyncThunk("auth/register",
    async (userData,{ rejectWithValue })=>{
        try{
            const response = await axiosClient.post('/user/register',{
                firstName: userData.firstName,
                emailId: userData.email,
                password: userData.password
            })
            return response.data.user
        }
        catch(e){
        return rejectWithValue(e.response?.data)
    }
    }
)

export const loginUser = createAsyncThunk("auth/login",
    async (credentials,{ rejectWithValue })=>{
        try{   
            const response = await axiosClient.post('/user/login',{
                emailId: credentials.email,
                password: credentials.password
            })
            return response.data.user
        }catch(e){
            return rejectWithValue(e.response?.data)
        }   
    }
)


export const checkAuth = createAsyncThunk("auth/check",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosClient.get('/user/check')
            return response.data.user
        } catch(e){
            return rejectWithValue(e.response?.data)
        }
    }
)

export const logoutUser = createAsyncThunk("auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosClient.post('/user/logout')
            return null
        } catch(e){
            return rejectWithValue(e.response?.data)
        }
    }
)

const authSlice = createSlice({ 
    name:"auth",
    initialState:{
        user:null,
        loading:false,
        error:null,
        isAuthenticated:false
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(registerUser.pending,(state)=>{
            state.loading = true,
            state.error = null
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.loading = false,
            state.user = !!action.payload,
            state.isAuthenticated = true
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.loading = false,
            state.error = action.payload?.message || "Registration failed",
            state.isAuthenticated = false,
            state.user = null
        })
        .addCase(loginUser.pending,(state)=>{
            state.loading = true,
            state.error = null
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.loading = false, 
            state.user = !!action.payload,
            state.isAuthenticated = true
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.loading = false,
            state.error = action.payload?.message || "Login failed",
            state.isAuthenticated = false,
            state.user = null
        })
        .addCase(checkAuth.pending,(state)=>{
            state.loading = true,
            state.error = null
        })
        .addCase(checkAuth.fulfilled,(state,action)=>{
            state.loading = false,
            state.user = !!action.payload,
            state.isAuthenticated = true
        })
        .addCase(checkAuth.rejected,(state,action)=>{
            state.loading = false,
            state.error = action.payload?.message || "Check auth failed",
            state.isAuthenticated = false,
            state.user = null
        })
        .addCase(logoutUser.pending,(state)=>{
            state.loading = true,
            state.error = null
        })
        .addCase(logoutUser.fulfilled,(state,action)=>{
            state.user = null,
            state.isAuthenticated = false
            state.loading = false
            state.error = null
        })
        .addCase(logoutUser.rejected,(state,action)=>{
            state.error = action.payload?.message || "Logout failed",
            state.loading = false,
            state.user = null,
            state.isAuthenticated = false
        })
    }        

})

export default authSlice.reducer