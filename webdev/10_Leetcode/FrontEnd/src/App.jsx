import { Routes,Route, Navigate } from "react-router"
import Homepage from "./pages/Homepage.jsx"
import Login from "./pages/Login.jsx"
import Signup from "./pages/Signup.jsx"
import { useSelector,useDispatch } from "react-redux"
import {useEffect } from "react"
import { checkAuth } from "./Redux/authSlice.js"


function App() {
  
  const {isAuthenticated} = useSelector(state=>state.auth)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(checkAuth())
  },[dispatch])


  return (
    <>
    <Routes>
      <Route path="/" element={isAuthenticated ? <Homepage/> : <Navigate to="/login"/>}></Route>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/"/> : <Login/>}></Route>
      <Route path="/signup" element={isAuthenticated ? <Navigate to="/"/> : <Signup/>}></Route>
    </Routes>
     
    </>
  )
}

// function App() {
//   return <h1>Hello World</h1>
// }



export default App
