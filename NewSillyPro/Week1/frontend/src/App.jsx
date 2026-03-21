import React from 'react'
import { Route, Routes } from 'react-router'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import HomePage from './pages/HomePage.jsx'
import PublicRoute from './components/auth/PublicRoute.jsx'
import PrivateRoute from './components/auth/PrivateRoute.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import RoleBasedRoute from './components/RoleBasedRoute.jsx'
import AdminDashBoard from './pages/AdminDashBoard.jsx'
import ForgotPasswordPage from './pages/AuthPages/ForgotPasswordPage.jsx'
import ResetPasswordPage from './pages/AuthPages/ResetPasswordPage.jsx'
import RegisterPage from './pages/AuthPages/RegisterPage.jsx'
import LoginPage from './pages/AuthPages/LoginPage.jsx'
import CreatePostPage from './pages/postPages/createPostPage.jsx'
import PostFeedPage from './pages/postPages/PostFeedPage.jsx'
import EditPostPage from './pages/postPages/EditPostPage.jsx'
import PostDetailPage from './pages/postPages/PostDetailsPage.jsx'

const App = () => {
  return (
    <>

      <ToastContainer autoClose={3000} position="top-center" />
      <Routes>
        <Route path='/' element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>}>
        </Route>

        <Route path='/register' element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        }></Route>


        <Route path='/login' element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>}>
        </Route>

        <Route path='/profile' element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        }></Route>

        <Route path='/admin' element={
          <RoleBasedRoute allowedRoles={['admin']}>
            <AdminDashBoard/>
          </RoleBasedRoute>
        }></Route>

        <Route path='/forgot-password' element={
          <PublicRoute>
            <ForgotPasswordPage/>
          </PublicRoute>
        }></Route>

        <Route path='/reset-password/:token' element={
          <PublicRoute>
            <ResetPasswordPage/>
          </PublicRoute>
        }></Route>

        <Route path='/posts/create-post' element={
          <PrivateRoute>
            <CreatePostPage/>
          </PrivateRoute>
        }></Route>


        <Route path='/posts/edit-post/:id' element={
          <PrivateRoute>
            <EditPostPage/>
          </PrivateRoute>
        }></Route>

        <Route path='/posts/feed' element={
          <PrivateRoute>
            <PostFeedPage></PostFeedPage>
          </PrivateRoute>
        }></Route>

        <Route path='/posts/:postId' element={
          <PrivateRoute>
            <PostDetailPage />
          </PrivateRoute>
        }></Route>

      </Routes>
    </>
  )
}

export default App