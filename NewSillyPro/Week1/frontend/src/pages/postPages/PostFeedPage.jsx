import PostList from "../../components/post/PostList.jsx"

export default function PostFeedPage(){

    return (
        <div className="max-w-3xl mx-auto p-6">

            <h1 className="text-2xl font-bold mb-6">
                All Posts
            </h1>

            <PostList />

        </div>
    )
}