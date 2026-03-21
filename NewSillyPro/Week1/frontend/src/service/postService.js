import { api } from "./axiosInstance.js";


export const createPostApi = async(data)=>{
    const response = await api.post('/posts/create',data)
    return response.data
}

export const getAllPostsApi = async({page})=>{
    const response = await api.get(`/posts/get-all-posts?page=${page}&limit=5`)
    return response.data
}



export const getPostApi = async ({id})=>{
  
    const response = await api.get(`/posts/${id}`)
    return response.data

}


export const updatePostApi = async ({id,payload})=>{
    const response = await api.put(`/posts/${id}`,payload)
    return response.data
}


export const deletePostApi = async (id) => {
    const res = await api.delete(`/posts/${id}`)
    return res.data

}