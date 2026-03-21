import LoginForm from "../../components/auth/LoginForm";



export default function LoginPage(){


    return (
        <div className="min-h-screen flex bg-linear-to-br from-slate-100 to-slate-200">

            {/* LEFT SIDE — Form */}
            <div className="flex w-full md:w-1/2 items-center justify-center">

                <LoginForm/>
            </div>
            
            {/* RIGHT SIDE — Illustration */}
            <div className="hidden md:flex w-1/2 items-center justify-center bg-white shadow-lg">

                <div className="text-center p-10">

                    <img
                        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                        alt="register illustration"
                        className="w-72 drop-shadow-xl"
                    />

                    <h2 className="text-3xl font-bold text-gray-800 mt-6">
                        Welcome!
                    </h2>

                    <p className="text-gray-500 mt-2">
                       Login Account
                    </p>

                </div>

            </div>

        </div>
    )
}