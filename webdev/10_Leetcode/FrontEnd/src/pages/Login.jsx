import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../Redux/authSlice"
import { useSelector } from "react-redux"



const loginSchema = z.object({
    email: z.string().email("Invalid Email"),
    password: z.string().min(8, "Password must be at least 8 characters")
})

export default function Login() {

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(loginSchema) })
    const [showpass, setShowpass] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isAuthenticated,loading,error } = useSelector(state=>state.auth)

    useEffect(() => {
        if(isAuthenticated){   
            navigate("/")
        }
    }, [isAuthenticated, navigate])

    function submitData(data) {
        dispatch(loginUser(data))
    }

    return (
        <div className="relative min-h-screen flex overflow-hidden bg-linear-to-br from-blue-50 via-white to-purple-50">

            <div className="flex w-full lg:w-3/5 items-center justify-center px-6 py-12">
                <div className="w-full max-w-md">

                    <div className="animate-fade-down text-3xl font-semibold text-center bg-linear-to-r from-blue-600 via-emerald-500 to-purple-600 bg-clip-text text-transparent mb-8 tracking-tight">
                        Welcome Back
                    </div>

                    <form onSubmit={handleSubmit(submitData)} className="bg-white border border-gray-200 rounded-2xl p-8 space-y-5 shadow-xl shadow-blue-100/40 animate-fade-slide transition-all duration-300 hover:shadow-purple-200/40">

                        <div className="flex flex-col space-y-1.5 fade-1">
                            <label htmlFor="email" className="text-sm font-medium text-gray-600">Email</label>
                            <input type="email" id="email" {...register('email')} placeholder="Enter your email" className="input w-full bg-gray-50 border border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none transition duration-200 text-gray-900" />
                            <span className="text-xs h-4.5 text-red-500">{errors.email?.message}</span>
                        </div>

                        <div className="relative flex flex-col space-y-1.5 fade-2">
                            <label htmlFor="password" className="text-sm font-medium text-gray-600">Password</label>
                            <input id="password" type={showpass ? "text" : "password"} {...register('password')} placeholder="Enter password" className="input w-full bg-gray-50 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none pr-16 transition duration-200 text-gray-900" />
                            <button type="button" onClick={() => setShowpass(!showpass)} className="absolute right-3 top-9.5 text-xs font-medium text-blue-600 hover:text-purple-600 transition">
                                {showpass ? "Hide" : "Show"}
                            </button>
                            <span className="text-xs h-4.5 text-red-500">{errors.password?.message}</span>
                        </div>

                        <button type="submit" className="btn w-full bg-linear-to-r fade-3 from-blue-600 via-emerald-500 to-purple-600 border-none text-white font-semibold rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-95">
                            Login
                        </button>

                    </form>

                </div>
            </div>

            <div className="hidden lg:block w-px bg-linear-to-b from-transparent via-gray-300 to-transparent"></div>

            <div className="hidden lg:flex lg:w-2/5 relative items-center justify-center px-12 animate-fade-left">
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_30%,#3b82f6,transparent_50%),radial-gradient(circle_at_70%_60%,#a855f7,transparent_50%),radial-gradient(circle_at_50%_80%,#10b981,transparent_50%)]"></div>
                <div className="relative z-10 text-center space-y-6">
                    <div className="w-40 h-40 mx-auto rounded-3xl bg-linear-to-br from-blue-600 via-emerald-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-blue-300/40 transition-all duration-500 hover:scale-105">
                        U
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800">Hello Again!</h2>
                    <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">
                        Log in to continue solving challenges and improving your coding skills.
                    </p>
                </div>
            </div>

        </div>
    )
}
