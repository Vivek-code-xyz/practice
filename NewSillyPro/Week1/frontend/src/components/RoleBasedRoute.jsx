import { useContext } from "react"
import AuthContext from "../context/authContext.jsx"

import {Navigate, replace} from 'react-router'

export default  function RoleBasedRoute ({allowedRoles ,children}){

    const {user,isLoading,isAuthenticated} = useContext(AuthContext)

    if(isLoading){
        return null //loader
    }

    if(!user){
        return <Navigate to={'/login'} replace></Navigate>
    }

    if(!allowedRoles.includes(user.role)){
        return <Navigate to="/unauthorized" replace />;
    }

    return children

    
}