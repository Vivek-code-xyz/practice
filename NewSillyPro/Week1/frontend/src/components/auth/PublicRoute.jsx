import useAuth from "../../hooks/useAuthHook.js";
import { Navigate } from "react-router";


export default function PublicRoute({children}){
    const {isLoading,isAuthenticated} = useAuth()

    if(isLoading) return null

    if(isAuthenticated) {
       return <Navigate to="/" replace />
    }

    return children

}