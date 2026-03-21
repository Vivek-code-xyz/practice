import { api } from "../../service/axiosInstance.js"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useState } from "react"
import { Lock, ShieldCheck } from "lucide-react";
import { Navigate, Link, useParams, useNavigate } from "react-router";

import { resetPasswordApi } from "../../service/authService.js";



export default function ResetPasswordForm() {

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const { token } = useParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {

        try {

            setIsLoading(true);
            setSuccessMessage("");

            // const res = await api.post(
            //     `/auth/reset-password/${token}`,
            //     { password: data.password }
            // );

            const res = await resetPasswordApi({token,password: data.password})

            setSuccessMessage(res.message);
            toast.success(res.message)
            reset()


            // Optional redirect after 2 seconds
            setTimeout(() => {
                navigate("/login");
            }, 2000);

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
                            <Lock className="text-blue-600" size={22} />
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Set New Password
                        </h2>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                        {/* NEW PASSWORD */}
                        <div>

                            <div className="flex">


                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="New Password"
                                    className="w-full border border-gray-300 p-2.5 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
                                    {...register("password", {
                                        required: "Password required",
                                        minLength: {
                                            value: 6,
                                            message: "Minimum 6 characters required"
                                        }
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
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password?.message}
                            </p>
                        </div>

                        {/* CONFIRM PASSWORD */}
                        <div>
                            <div className="flex">


                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm New Password"
                                    className="w-full border border-gray-300 p-2.5 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
                                    {...register("confirmPassword", {
                                        required: "Confirm your password",
                                        validate: (value) =>
                                            value === watch("password") || "Passwords do not match"
                                    })}
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(!showConfirmPassword)
                                    }
                                    className="px-4 bg-gray-100 border border-gray-300 border-l-0 rounded-r-md hover:bg-gray-200"
                                >
                                    {showConfirmPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                            <p className="text-red-500 text-sm mt-1">
                                {errors.confirmPassword?.message}
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-500 text-white p-2.5 rounded-md hover:bg-blue-600 transition duration-200 shadow-md"
                        >
                            {isLoading ? "Resetting..." : "Reset Password"}
                        </button>

                    </form>

        </div>
    );
}