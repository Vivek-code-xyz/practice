import Heads from "./Heads"
import { Outlet } from "react-router"

export default function SecHome(){
    return(
        <>
            <Heads/>
            <Outlet/>
        </>
    )
}