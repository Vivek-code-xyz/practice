import { Routes,Route, Navigate } from "react-router-dom"
import Homepage from "./pages/Homepage.jsx"
import Login from "./pages/Login.jsx"
import Signup from "./pages/Signup.jsx"
import { useSelector,useDispatch } from "react-redux"
import {useEffect } from "react"
import { checkAuth } from "./Redux/authSlice.js"
import AdminPanel from "./pages/adminPanel.jsx"
import CreateProblem from "./pages/CreateProblem.jsx"
import UpdateProblem from "./pages/UpdateProblem.jsx"
import DeleteProblem from "./pages/DeleteProblem.jsx"
import MonacoEditor from "./pages/MonacoEditor.jsx"
import ProblemPage from "./pages/ProblemPage.jsx"
import ErrorToast from "./components/ErrorToast.jsx"

function App() {
  
  const {isAuthenticated,loading,user} = useSelector(state=>state.auth)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(checkAuth())
  },[dispatch])


  if(loading){
    return <div className="min-h-screen flex justify-center items-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  }

  return (
    <>
    <ErrorToast />
    <Routes>
      <Route path="/" element={isAuthenticated ? <Homepage/> : <Navigate to="/login"/>}></Route>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/"/> : <Login/>}></Route>
      <Route path="/signup" element={isAuthenticated ? <Navigate to="/"/> : <Signup/>}></Route>
      <Route path="/admin" element={
        isAuthenticated && user?.role === "admin" ? (
          <AdminPanel />
        ) : (
          <Navigate to="/" />
        )
      }></Route>
      <Route path="/admin/create" element={
        isAuthenticated && user?.role === "admin"?
        <CreateProblem/> : <Navigate to="/"/>
      }></Route>
      <Route path="/admin/update" element={
        isAuthenticated && user?.role === "admin"?
        <UpdateProblem/> : <Navigate to="/"/>
      }></Route>
      <Route path="/admin/delete" element={
        isAuthenticated && user?.role === "admin"?
        <DeleteProblem/> : <Navigate to="/"/>
      }></Route>


      <Route path="/problem/:id" element={<ProblemPage/>}></Route>
      <Route path="/editor" element={<MonacoEditor/>}></Route>
    </Routes>
     
    </>
  )
}

// function App() {
//   return <h1>Hello World</h1>
// }



export default App
