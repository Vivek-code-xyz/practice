import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getPostApi } from "../../service/postService"
import CommentSection from "../../components/comments/CommentSection"

export default function PostDetailPage(){

    const { postId } = useParams()

    const [post,setPost] = useState(null)
    const [loading,setLoading] = useState(true)

    useEffect(()=>{

        const fetchPost = async ()=>{

            try{

                const res = await getPostApi({id:postId})

                setPost(res.post || res)

            }catch(err){

                console.error(err)

            }finally{

                setLoading(false)

            }

        }

        fetchPost()

    },[postId])


    if(loading){
        return <p className="text-center mt-10">Loading post...</p>
    }

    if(!post){
        return <p className="text-center mt-10">Post not found</p>
    }

    return (

        <div className="max-w-3xl mx-auto p-6 space-y-8">

            <div className="border p-6 rounded space-y-4">

                <h1 className="text-3xl font-bold">
                    {post.title}
                </h1>

                <p className="text-gray-500 text-sm">
                    Author: {post.author?.username}
                </p>

                <div
                    dangerouslySetInnerHTML={{__html:post.content}}
                />

            </div>

            {/* COMMENTS */}

            <CommentSection postId={post._id} />

        </div>
    )
}