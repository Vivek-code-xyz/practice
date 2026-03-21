import { api } from "../../service/axiosInstance.js"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useState } from "react"
import { Mail, ShieldCheck, ArrowLeft } from "lucide-react";
import { Navigate,Link } from "react-router";
import { forgotPasswordApi } from "../../service/authService.js";

export default function ForgotPasswordForm() {

    const [isLoading, setIsLoading] = useState(false)
    const [successMsg, setSuccessMsg] = useState('')

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm()


    const onSubmit = async (data) => {

        try {
            setIsLoading(true)
            setSuccessMsg("")

            // const res = await api.post("/auth/forgot-password", {
            //     email: data.email
            // });
            const res =  await forgotPasswordApi(data.email)

            setSuccessMsg(res.message)

            toast.success(res.message)
            reset()


        } catch (err) {

            toast.error(err.response?.message)

        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-blue-100 p-2 rounded-full">
                            <Mail className="text-blue-600" size={22} />
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Forgot Password
                        </h2>
                    </div>

                    <p className="text-gray-500 text-sm mb-6">
                        Enter your registered email and we’ll send you a reset link.
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full border border-gray-300 p-2.5 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
                                {...register("email", {
                                    required: "Email required"
                                })}
                            />
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email?.message}
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-500 text-white p-2.5 rounded-md hover:bg-blue-600 transition duration-200 shadow-md"
                        >
                            {isLoading ? "Sending..." : "Send Reset Link"}
                        </button>
                    </form>
        </div>
    );
}