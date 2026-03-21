import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axiosClient from "../utils/axiosClient"

export default function DeleteProblem() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [problems, setProblems] = useState([])
    const [fetching, setFetching] = useState(true)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [deleteId, setDeleteId] = useState(null)
    const [confirmDelete, setConfirmDelete] = useState(null)

    useEffect(() => {
        fetchProblems()
    }, [])

    const fetchProblems = async () => {
        setFetching(true)
        try {
            const { data } = await axiosClient.get('/problem')
            setProblems(data)
        } catch (err) {
            setError('Failed to fetch problems')
        } finally {
            setFetching(false)
        }
    }

    const handleDelete = async (problemId) => {
        setDeleteId(problemId)
        setLoading(true)
        setError('')
        setSuccess('')

        try {
            await axiosClient.delete(`/problem/delete/${problemId}`)
            setSuccess('Problem deleted successfully!')
            // Remove from local state
            setProblems(prev => prev.filter(p => p._id !== problemId))
        } catch (err) {
            setError(err.response?.data?.error || err.response?.data || 'Failed to delete problem')
        } finally {
            setLoading(false)
            setDeleteId(null)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-emerald-50 to-sky-50 text-slate-800">
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-200 opacity-30 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 -right-40 w-96 h-96 bg-sky-200 opacity-30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-rose-200 opacity-30 rounded-full blur-3xl"></div>

            <div className="navbar bg-white/70 backdrop-blur-md border-b border-indigo-100 sticky top-0 z-20 px-6">
                <div className="flex-1">
                    <button 
                        onClick={() => navigate('/admin')}
                        className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-500 bg-clip-text text-transparent"
                    >
                        CodeBramha
                    </button>
                </div>
                <div className="flex-none">
                    <button 
                        onClick={() => navigate('/admin')}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm font-medium"
                    >
                        ← Back to Admin
                    </button>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-8 relative z-10">
                <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-indigo-100 p-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-600 via-red-600 to-orange-500 bg-clip-text text-transparent mb-2">
                        Delete Problem
                    </h1>
                    <p className="text-gray-500 mb-8">Select a problem to delete</p>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-600 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            {success}
                        </div>
                    )}

                    {fetching ? (
                        <div className="flex justify-center py-12">
                            <span className="loading loading-spinner loading-lg"></span>
                        </div>
                    ) : problems.length === 0 ? (
                        <div className="text-center py-12">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <p className="text-gray-500 text-lg">No problems found</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {problems.map(problem => (
                                <div 
                                    key={problem._id}
                                    className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between hover:border-red-300 hover:shadow-md transition"
                                >
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-800 text-lg">{problem.title}</h3>
                                        <div className="flex gap-2 mt-2">
                                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                                                problem.difficulty === 'easy' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                                                problem.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' :
                                                'bg-red-100 text-red-700 border border-red-200'
                                            }`}>
                                                {problem.difficulty}
                                            </span>
                                            <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded text-xs font-medium border border-indigo-200">
                                                {problem.tags}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <button
                                        onClick={() => setConfirmDelete(problem)}
                                        className="ml-4 px-4 py-2 bg-gradient-to-r from-rose-500 to-red-500 text-white rounded-lg hover:from-rose-600 hover:to-red-600 transition font-medium flex items-center gap-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Confirmation Modal */}
                    {confirmDelete && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
                                <div className="text-center">
                                    <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Confirm Delete</h3>
                                    <p className="text-gray-600 mb-6">
                                        Are you sure you want to delete <span className="font-semibold">"{confirmDelete.title}"</span>? This action cannot be undone.
                                    </p>
                                    <div className="flex gap-3 justify-center">
                                        <button
                                            onClick={() => setConfirmDelete(null)}
                                            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition font-medium"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => {
                                                handleDelete(confirmDelete._id)
                                                setConfirmDelete(null)
                                            }}
                                            disabled={loading}
                                            className="px-6 py-2 bg-gradient-to-r from-rose-500 to-red-500 text-white rounded-xl hover:from-rose-600 hover:to-red-600 transition font-medium disabled:opacity-50"
                                        >
                                            {loading ? 'Deleting...' : 'Delete'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
