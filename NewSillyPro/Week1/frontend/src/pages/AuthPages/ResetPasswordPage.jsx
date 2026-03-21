import ResetPasswordForm from "../../components/auth/ResetPasswordForm";
import {  ShieldCheck } from "lucide-react";


export default function ResetPasswordPage(){
    return (
        <div className="min-h-screen flex">

            {/* LEFT SIDE — BANNER */}
            <div className="hidden md:flex w-1/2 items-center justify-center bg-gray-100">
                <div className="text-center p-12">

                    <div className="bg-blue-100 w-32 h-32 flex items-center justify-center rounded-full mx-auto shadow-lg">
                        <ShieldCheck size={60} className="text-blue-600" />
                    </div>

                    <h2 className="text-3xl font-bold text-gray-800 mt-8">
                        Reset Your Password
                    </h2>

                    <p className="text-gray-500 mt-3 max-w-sm mx-auto">
                        Create a strong new password to secure your account.
                        Make sure it’s something you don’t use elsewhere.
                    </p>

                </div>
            </div>

            {/* RIGHT SIDE — FORM */}
            <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-6">
                <ResetPasswordForm/>
            </div>

        </div>
    );
}