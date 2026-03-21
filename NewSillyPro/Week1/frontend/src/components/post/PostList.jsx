import { useEffect, useRef, useState } from "react"
import { getAllPostsApi } from "../../service/postService.js"
import { toast } from "react-toastify"
import ConfirmDltPopup from "./ConfirmDltPopup.jsx"
import { deletePostApi } from "../../service/postService.js"
import { Link } from "react-router"

export default function PostList() {

    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [showDltPopup, setShowDltPopup] = useState(false)
    const [deleteId, setDeleteId] = useState(null)

    const observer = useRef()

    const fetchPosts = async () => {

        if (isLoading) return

        try {

            setIsLoading(true)

            const res = await getAllPostsApi({ page })
            console.log(res)

            const newPosts = res.posts

            // setPosts(prev => [...prev,...newPosts])
            setPosts(prev => {

                const ids = new Set(prev.map(p => p._id))
                const filtered = newPosts.filter(p => !ids.has(p._id))

                return [...prev, ...filtered]
            })

            if (newPosts.length === 0) {
                setHasMore(false)
            }

        } catch (err) {
            toast.error(err.response?.message)
        }
        finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchPosts()
    }, [page])

    // const lastPostRef = (node)=>{

    //     if(isLoading) return

    //     if(observer.current) observer.current.disconnect()

    //     observer.current = new IntersectionObserver(entries => {

    //         if(entries[0].isIntersecting && hasMore){
    //             setPage(prev => prev + 1)
    //         }

    //     })

    //     if(node) observer.current.observe(node)
    // }
    const lastPostRef = (node) => {

        if (isLoading) return
        if (!hasMore) return

        if (observer.current) observer.current.disconnect()

        observer.current = new IntersectionObserver(entries => {

            if (entries[0].isIntersecting) {
                setPage(prev => prev + 1)
            }

        })

        if (node) observer.current.observe(node)
    }

    // DeletePostHandle
    const handleDeleteClick = (id) => {
        setDeleteId(id)
        setShowDltPopup(true)
    }


    //confirm delete
    const confirmDelete = async () => {

        try {

            const toastId = toast.loading("Deleting post...")

            await deletePostApi(deleteId)

            setPosts(prev =>
                prev.filter(post => post._id !== deleteId)
            )

            toast.update(toastId, {
                render: "Post deleted",
                type: "success",
                isLoading: false,
                autoClose: 2000
            })

        } catch (error) {

            toast.error("Delete failed")

        } finally {

            setShowDltPopup(false)

        }
    }

    return (

        <div className="space-y-6">

            {posts.map((post, index) => {

                if (index === posts.length - 1) {

                    return (
                        <div
                            key={post._id}
                            ref={lastPostRef}
                            className="border p-4 rounded"
                        >

                            <h2 className="text-xl font-semibold">
                                {post.title}
                            </h2>

                            <p className="text-sm text-gray-500">
                                Author: {post.author?.username}
                            </p>

                            <div
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />

                            {/* Delete Button */}
                            <button
                                onClick={() => handleDeleteClick(post._id)}
                                className="mt-3 text-red-600 hover:underline"
                            >
                                Delete
                            </button>

                        </div>
                    )
                }

                return (

                    <div
                        key={post._id}
                        className="border p-4 rounded"
                    >

                        <Link to={`/posts/${post._id}`}>
                            <h2 className="text-xl font-semibold hover:underline cursor-pointer">
                                {post.title}
                            </h2>
                        </Link>

                        <p className="text-sm text-gray-500">
                            Author: {post.author?.username}
                        </p>

                        <div
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {/* Delete Button */}
                        <button
                            onClick={() => handleDeleteClick(post._id)}
                            className="mt-3 text-red-600 hover:underline"
                        >
                            Delete
                        </button>

                    </div>
                )

            })}

            {isLoading && (
                <p className="text-center">
                    Loading posts...
                </p>
            )}

            {/* Delete Confirmation Modal */}
            <ConfirmDltPopup
                isOpen={showDltPopup}
                onClose={() => setShowDltPopup(false)}
                onConfirm={confirmDelete}
            />

        </div>
    )
}