import { api } from "./axiosInstance.js";

export const getPostComment = async ({page,postId})=>{
    const response = await api.get(`/posts/${postId}/comment?page=${page}`)
    return response.data
}


export const createComment = async ({postId,content})=>{
    const res = await api.post(`/posts/${postId}/comment`,content)
    return res.data
}

export const createCommentReply = async ({commentId,content})=>{
    const res = await api.post(`/comments/${commentId}/reply`,content)
    return res.data
}