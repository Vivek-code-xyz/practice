



import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

export default function AdminPanel() {
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)
    const [activeView, setActiveView] = useState('menu')

    // enforce admin role on client side as additional guard
    if (!user || user.role !== "admin") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-emerald-50 to-sky-50">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
                    <p className="text-gray-600">You do not have permission to access this page.</p>
                    <button 
                        onClick={() => navigate('/')}
                        className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-emerald-50 to-sky-50 text-slate-800">
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-200 opacity-30 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 -right-40 w-96 h-96 bg-sky-200 opacity-30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-emerald-200 opacity-30 rounded-full blur-3xl"></div>

            <div className="navbar bg-white/70 backdrop-blur-md border-b border-indigo-100 sticky top-0 z-20 px-6">
                <div className="flex-1">
                    <button 
                        onClick={() => navigate('/')}
                        className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-500 bg-clip-text text-transparent"
                    >
                        CodeBramha
                    </button>
                </div>
                <div className="flex-none">
                    <span className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium border border-indigo-200">
                        Admin Panel
                    </span>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-12 relative z-10">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-green-600 bg-clip-text text-transparent mb-3">
                        Admin Dashboard
                    </h1>
                    <p className="text-slate-600">Manage your problems efficiently</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div 
                        onClick={() => navigate('/admin/create')}
                        className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-indigo-100 cursor-pointer hover:shadow-xl hover:border-indigo-300 transition-all duration-300 group"
                    >
                        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-100 to-green-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold text-center text-gray-800 mb-2">Create Problem</h2>
                        <p className="text-gray-500 text-center text-sm">Add a new problem to the database</p>
                    </div>

                    <div 
                        onClick={() => navigate('/admin/update')}
                        className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-indigo-100 cursor-pointer hover:shadow-xl hover:border-indigo-300 transition-all duration-300 group"
                    >
                        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold text-center text-gray-800 mb-2">Update Problem</h2>
                        <p className="text-gray-500 text-center text-sm">Modify existing problems</p>
                    </div>

                    <div 
                        onClick={() => navigate('/admin/delete')}
                        className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-indigo-100 cursor-pointer hover:shadow-xl hover:border-indigo-300 transition-all duration-300 group"
                    >
                        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-rose-100 to-red-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold text-center text-gray-800 mb-2">Delete Problem</h2>
                        <p className="text-gray-500 text-center text-sm">Remove problems from database</p>
                    </div>
                </div>

                <div className="mt-10 text-center">
                    <button 
                        onClick={() => navigate('/')}
                        className="px-8 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition font-medium"
                    >
                        ← Back to Homepage
                    </button>
                </div>
            </div>
        </div>
    )
}