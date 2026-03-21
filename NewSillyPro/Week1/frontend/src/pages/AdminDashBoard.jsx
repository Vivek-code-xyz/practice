import { useEffect, useState } from "react"
import { api } from "../service/axiosInstance.js"
import { toast } from "react-toastify"
import { ArrowLeft, ArrowRight } from "lucide-react";



export default function AdminDashBoard(){

    const [users,setUsers] = useState([])
    const [currentPage,setCurrentPage] = useState(1)
    const [isLoading,setIsLoading] = useState(false)
    const [totalPages,setTotalPages] = useState(0)

    let limit = 5;

    async function fetchUser (page=1){
        try{
            setIsLoading(true)

            const {data} = await api.get(`/admin/users?page=${page}&limit=${limit}`)

            setUsers(data.users)
            setCurrentPage(data.currentPage)
            setTotalPages(data.totalPages)

            // toast.success(data.message)

            
            
        }catch(e){
            toast.error( "User Not Fetch"+e.data?.message )
        }finally{         
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        fetchUser(currentPage)
    },[])


    const handleRoleChange = async (userId,newRole)=>{
        try{
            const res = await api.patch(`/admin/users/${userId}/role`,{role:newRole})
            setUsers(  (prevUsers)=>prevUsers.map((u)=>u._id ===userId ? {...u,role:newRole}:u)  )
            toast.success(res.data.message)
        }catch(e){
            toast.error("Error Upadating Role : "+e.response?.data?.message )
        }
    }



    const getRoleBadgeColor = (role) => {
        if (role === "admin") return "bg-green-500";
        if (role === "moderator") return "bg-purple-500";
        return "bg-blue-500";
    };




    return(<>

        <div className="container mx-auto px-4 py-8 max-w-7xl" >
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

            {isLoading? (<p className="text-center py-8 text-gray-500">Loading</p>) :
                (
                    <div className="overflow-hidden rounded-lg shadow-md">
                    
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-50">
                            <tr className="border-t border-gray-200 hover:bg-gray-50 transition-colors">
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change Role</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((u)=>( 
                                <tr key={u._id} className="border-t border-gray-200 hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{u.username}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{u.email}</td>
                                    <td className={`mx-4 my-6 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${getRoleBadgeColor(u.role)}`}>{u.role}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        <select value={u.role} onChange={(e)=>{handleRoleChange(u._id,e.target.value)}} className="block w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                                            <option value="user">User</option>
                                            <option value="moderator">Moderator</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* pagination controls */}

                    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-6">

                        <button disabled={currentPage ===1} onClick={() => fetchUser(currentPage - 1)} className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                            <ArrowLeft>Prev</ArrowLeft>
                        </button>

                        <span className="text-sm text-gray-700">Page {currentPage} of {totalPages}</span>

                        <button disabled={currentPage === totalPages} onClick={() => fetchUser(currentPage + 1)} className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                            <ArrowRight>Next</ArrowRight>
                        </button>
                    </div>

                    </div>


                )
            }
        </div>
    </>)
}