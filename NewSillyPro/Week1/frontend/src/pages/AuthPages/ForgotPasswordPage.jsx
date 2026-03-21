import ForgotPasswordForm from "../../components/auth/ForgotPasswordForm";

import {  Link } from "react-router";
import { Mail, ShieldCheck, ArrowLeft } from "lucide-react";


export default function ForgotPasswordPage(){
    return(
        <>
        <div className="min-h-screen flex">

            {/* LEFT SIDE — FORM */}
            <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 p-6">
                <ForgotPasswordForm/>
            </div>

            {/* RIGHT SIDE — NEW PANEL */}
            <div className="hidden md:flex w-1/2 items-center justify-center bg-white">
                <div className="text-center p-12">

                    <div className="bg-blue-100 w-32 h-32 flex items-center justify-center rounded-full mx-auto shadow-lg">
                        <ShieldCheck size={60} className="text-blue-600" />
                    </div>

                    <h2 className="text-3xl font-bold text-gray-800 mt-8">
                        Secure Account Recovery
                    </h2>

                    <p className="text-gray-500 mt-3 max-w-sm mx-auto">
                        We’ll help you regain access to your account quickly and securely.
                        Just follow the instructions sent to your email.
                    </p>

                    <div className="mt-8 flex items-center justify-center gap-2 text-blue-600">
                        <ArrowLeft size={18} />
                        <Link to={'/login'} className="text-sm font-medium" >
                            Remember your password? Login instead
                        </Link>
                    </div>

                </div>
            </div>

        </div>
        </>
    )
}