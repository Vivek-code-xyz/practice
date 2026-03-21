import { useState } from "react"
import { useForm } from "react-hook-form"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

import { createPostApi } from "../../service/postService.js"
import { toast } from "react-toastify"
import { X } from "lucide-react"

export default function CreatePostForm() {

    const { register, handleSubmit, reset, setValue } = useForm({ defaultValues: { status: 'draft' } })
   
    const [tags, setTags] = useState([])
    const [inputTag, setInputTag] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const editor = useEditor({
    extensions: [StarterKit],
    content: "",
})

    const addTag = (e) => {
        if (e.key === 'Enter' && inputTag.trim() !== "") {
            e.preventDefault()
            setTags([...tags, inputTag.trim()])
            setInputTag("")
        }
    }

    const removeTag = (idx) => {
        setTags(tags.filter((_, i) => i !== idx))
    }


    const onSubmit = async (data) => {
        try {
            setIsLoading(true)
            const payload = {
                ...data,
                tags,
                // content
                content: editor.getHTML()
            }
            console.log(payload)

            const res = await createPostApi(payload)

            toast.success("Post Created successfully")
            reset()
            editor.commands.clearContent()
           
            setTags([])

        } catch (err) {
            toast.error(err.res?.message)
        } finally {
            setIsLoading(false)
        }


    }

    if (!editor) return null

    return (<>
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* title */}
            <div>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" {...register('title', { required: true })} />
            </div>

            {/* content */}
            <div>
                <label htmlFor="content">Content</label>
                <EditorContent editor={editor} className="border p-3 rounded min-h-37.5" />
            </div>

            {/* tagINput */}
            <div>
                <label htmlFor="tag">Tags</label>
                <input type="text" placeholder="Type Tag and Press Enter"
                    value={inputTag}
                    onChange={(e) => setInputTag(e.target.value)}
                    onKeyDown={addTag}
                />

                <div>
                    {tags.map((tag, idx) => (
                        <span key={idx}>
                            {tag} <X onClick={() => removeTag(idx)} />
                        </span>
                    ))}
                </div>
            </div>

            {/* status */}
            <div>
                <label className="block mb-2 font-medium">Status</label>

                <input type="hidden" {...register("status")} />

                <div className="flex gap-2">

                    <button
                        type="button"
                        onClick={() => setValue("status", "draft")}
                        className="px-4 py-2 border rounded hover:bg-gray-100"
                    >
                        Draft
                    </button>

                    <button
                        type="button"
                        onClick={() => setValue("status", "published")}
                        className="px-4 py-2 border rounded hover:bg-green-100"
                    >
                        Publish
                    </button>

                </div>
            </div>

             {/* submitbutton */}
            <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 text-white px-6 py-2 rounded"
            >

                {isLoading ? "Creating..." : "Create Post"}

            </button>
        </form>
    </>)
}