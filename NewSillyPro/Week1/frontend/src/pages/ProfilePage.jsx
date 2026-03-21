import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { getUserProfile,updateUserProfile } from "../service/userService.js";
import { toast } from "react-toastify"
import { UserCircle, Pencil } from "lucide-react";

export default function ProfilePage() {

    const {register ,handleSubmit,reset} = useForm()

    const [profile, setProfile] = useState(null);
    
    const [isEditing,setIsEditing] = useState(false)
    const [isSaving,setIsSaving] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchProfile = async ()=>{
            try {
                const response = await getUserProfile();

                setProfile(response.data.user);

                reset({
                        username:response.data.user.username,
                        email:response.data.user.email
                    })

            } catch (error) {
                toast.error("Failed to load profile");
            } finally {
                setIsLoading(false);
            }

        }
        
        fetchProfile()
    }, [reset])


    if (isLoading || !profile) return <div>Loading...</div>;

    function handleCancel(){
        reset({
            username:profile.username,
            email:profile.email
        })
        setIsEditing(false)
    }

    async function onSubmit(formdata){
        try{
            setIsSaving(true)

            const response = await updateUserProfile(formdata)
            const updatedUser = response.data.user

            setProfile(updatedUser)

            reset({
                username:updatedUser.username,
                email:updatedUser.email
            })
            setIsEditing(false)
            toast.success("Profile updated successfully!");

        }catch(err){
            // console.error("Failed to update profile", err);
            toast.error(err.response?.data?.message || "Failed to update profile")    
        }finally{
            setIsSaving(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
            <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center shadow-md">
                    <UserCircle size={60} className="text-blue-600" />
                </div>
            </div>
            <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Profile</h1>
            {!isEditing ?
            (
                <>
                    <p className="text-gray-700 mb-2"><strong>Username</strong> : {profile.username}</p>
                    <p className="text-gray-700 mb-6"><strong>Email</strong> : {profile.email}</p>
                    <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition" onClick={()=>setIsEditing(true)}><Pencil size={18} />Edit</button>
                
                </>
            ) : (
                <>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label htmlFor="" className="block text-sm font-medium text-gray-600 mb-1">UserName</label>
                            <input type="text" {...register("username" , {required:true})}  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
                        </div>

                        <div>
                            <label htmlFor="" className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                            <input type="email" {...register("email",{required:true})}  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button type="submit" disabled={isSaving} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition disabled:opacity-60">{isSaving ? "Saving..." : "Save"}</button>
                            <button type="button" onClick={handleCancel} className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-2 rounded-lg transition">Cancel</button>
                        </div>

                    </form>
                </>
            )}
            </div>
        </div>
        
       
    );

}