import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useState } from "react"
import useAuth from "../../hooks/useAuthHook.js"
import {useNavigate , Link} from "react-router"

export default function LoginForm() {

    const {login:loginAuth} = useAuth()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm()

    const [showPassword, setShowPassword] = useState(false)
    

   

    async function onSubmit(data) {
        try {
            
            const res = await loginAuth({
                    email: data.email,
                    password: data.password
                })
            // toast.success(res.message)
            navigate('/')
            reset()

        } catch (e) {
            toast.error(e.response?.data?.message || "Login Failed")
        }
    }

    return (
        <div className="bg-white w-96 p-8 rounded-xl shadow-md hover:shadow-lg transition">

                    <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
                        Login
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">


                        

                        {/* Email */}
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full border border-gray-300 p-2.5 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                                {...register("email", {
                                    required: "Email required"
                                })}
                            />
                            <p className="text-red-500 text-sm">
                                {errors.email?.message}
                            </p>
                        </div>


                        {/* Password */}
                        <div>
                            <div className="flex">

                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="w-full border border-gray-300 p-2.5 rounded-l-md focus:ring-2 focus:ring-blue-400 outline-none"
                                    {...register("password", {
                                        required: "Password required"
                                    })}
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="px-4 bg-gray-100 border border-gray-300 border-l-0 rounded-r-md hover:bg-gray-200"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>

                            </div>

                            <p className="text-red-500 text-sm">
                                {errors.password?.message}
                            </p>

                        </div>


                        


                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-blue-500 text-white p-2.5 rounded-md hover:bg-blue-600 transition"
                        >
                            {isSubmitting ? "Logging In..." : "Login Account"}
                        </button>

                        <div className="flex justify-center items-center mt-4">
                            <p className="text-sm text-gray-500">
                                Dont have account?{" "}
                                <Link
                                    to="/register"
                                    className="text-primary font-semibold hover:text-primary-focus hover:underline transition duration-200"
                                >
                                    Register
                                </Link>
                            </p>
                        </div>


                    </form>

        </div>
    )
}
