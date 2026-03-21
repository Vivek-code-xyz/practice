import EditPostForm from "../../components/post/EditPostForm.jsx"
import {useParams} from 'react-router'



export default function EditPostPage() {
    const {id} = useParams()

  return (
    <div className="max-w-3xl mx-auto p-6">

      <h1 className="text-2xl font-bold mb-6">
        Edit Post
      </h1>

      <EditPostForm id={id}/>

    </div>
  )
}