import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axiosClient from "../utils/axiosClient"

const DIFFICULTIES = ['easy', 'medium', 'hard']
const TAGS = ['array', 'graph', 'tree', 'DP', 'sorting', 'math', 'linkedlist', 'searching']
const LANGUAGES = ['javascript', 'python', 'java', 'cpp', 'c']

export default function UpdateProblem() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [fetchingProblems, setFetchingProblems] = useState(true)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [problems, setProblems] = useState([])
    const [selectedProblem, setSelectedProblem] = useState(null)
    const [formData, setFormData] = useState(null)

    useEffect(() => {
        fetchProblems()
    }, [])

    const fetchProblems = async () => {
        setFetchingProblems(true)
        try {
            const { data } = await axiosClient.get('/problem')
            setProblems(data)
        } catch (err) {
            setError('Failed to fetch problems')
        } finally {
            setFetchingProblems(false)
        }
    }

    const selectProblem = async (problemId) => {
        setLoading(true)
        setError('')
        setSuccess('')
        try {
            const { data } = await axiosClient.get(`/problem/${problemId}`)
            setSelectedProblem(data)
            
            // Initialize form with problem data (also support legacy field names)
            const startCodeData = LANGUAGES.map(lang => {
                const existing = data.startCode?.find(sc => sc.language === lang)
                return { language: lang, initialCode: existing?.initialCode || '' }
            })
            
            const referenceCodeData = LANGUAGES.map(lang => {
                const existing = data.referenceCode?.find(rc => rc.language === lang)
                return { language: lang, completeCode: existing?.completeCode || '' }
            })

            const legacyVideoUrl = data.videoUrl || data.VideoUrl || ''
            const legacyVideoDescription = data.videoDescription || data.videoDescription || data.videoDescprition || ''

            setFormData({
                title: data.title || '',
                description: data.description || '',
                difficulty: data.difficulty || 'easy',
                tags: data.tags || 'array',
                videoUrl: legacyVideoUrl,
                videoDescription: legacyVideoDescription,
                visibleTestCases: data.visibleTestCases?.length > 0 
                    ? data.visibleTestCases 
                    : [{ input: '', output: '', explaination: '' }],
                hiddenTestCases: data.hiddenTestCases?.length > 0 
                    ? data.hiddenTestCases 
                    : [{ input: '', output: '' }],
                startCode: startCodeData,
                referenceCode: referenceCodeData
            })
        } catch (err) {
            setError('Failed to fetch problem details')
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        setError('')
    }

    const handleTestCaseChange = (index, field, value, type) => {
        const newTestCases = [...formData[type]]
        newTestCases[index][field] = value
        setFormData(prev => ({ ...prev, [type]: newTestCases }))
    }

    const handleCodeChange = (index, field, value, codeType) => {
        const newCode = [...formData[codeType]]
        newCode[index][field] = value
        setFormData(prev => ({ ...prev, [codeType]: newCode }))
    }

    const addTestCase = (type) => {
        const newCase = type === 'visibleTestCases' 
            ? { input: '', output: '', explaination: '' }
            : { input: '', output: '' }
        setFormData(prev => ({ ...prev, [type]: [...prev[type], newCase] }))
    }

    const removeTestCase = (index, type) => {
        if (formData[type].length > 1) {
            const newCases = formData[type].filter((_, i) => i !== index)
            setFormData(prev => ({ ...prev, [type]: newCases }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setSuccess('')

        try {
            const payload = {
                ...formData,
                startCode: formData.startCode.filter(sc => sc.initialCode.trim() !== ''),
                referenceCode: formData.referenceCode.filter(rc => rc.completeCode.trim() !== '')
            }

            await axiosClient.put(`/problem/update/${selectedProblem._id}`, payload)
            setSuccess('Problem updated successfully!')
            setTimeout(() => {
                setSelectedProblem(null)
                setFormData(null)
                fetchProblems()
            }, 2000)
        } catch (err) {
            setError(err.response?.data?.error || err.response?.data || 'Failed to update problem')
        } finally {
            setLoading(false)
        }
    }

    const goBack = () => {
        setSelectedProblem(null)
        setFormData(null)
    }

    // Show problem selection list
    if (!selectedProblem) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-emerald-50 to-sky-50 text-slate-800">
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-200 opacity-30 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 -right-40 w-96 h-96 bg-sky-200 opacity-30 rounded-full blur-3xl"></div>

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
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                            Update Problem
                        </h1>
                        <p className="text-gray-500 mb-8">Select a problem to update</p>

                        {fetchingProblems ? (
                            <div className="flex justify-center py-12">
                                <span className="loading loading-spinner loading-lg"></span>
                            </div>
                        ) : problems.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">
                                No problems found
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {problems.map(problem => (
                                    <div 
                                        key={problem._id}
                                        onClick={() => selectProblem(problem._id)}
                                        className="p-4 bg-gray-50 rounded-xl border border-gray-200 cursor-pointer hover:border-indigo-400 hover:shadow-md transition flex items-center justify-between"
                                    >
                                        <div>
                                            <h3 className="font-semibold text-gray-800">{problem.title}</h3>
                                            <div className="flex gap-2 mt-1">
                                                <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                                                    problem.difficulty === 'easy' ? 'bg-emerald-100 text-emerald-700' :
                                                    problem.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-red-100 text-red-700'
                                                }`}>
                                                    {problem.difficulty}
                                                </span>
                                                <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded text-xs font-medium">
                                                    {problem.tags}
                                                </span>
                                            </div>
                                        </div>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    // Show update form
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-emerald-50 to-sky-50 text-slate-800">
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-200 opacity-30 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 -right-40 w-96 h-96 bg-sky-200 opacity-30 rounded-full blur-3xl"></div>

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
                        onClick={goBack}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm font-medium"
                    >
                        ← Back to List
                    </button>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-8 relative z-10">
                <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-indigo-100 p-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                        Update Problem
                    </h1>
                    <p className="text-gray-500 mb-8">Editing: {selectedProblem.title}</p>

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

                    {formData && (
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold text-gray-800 border-b border-indigo-100 pb-2">Basic Information</h2>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-xl border border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                                        <select
                                            name="difficulty"
                                            value={formData.difficulty}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                                        >
                                            {DIFFICULTIES.map(diff => (
                                                <option key={diff} value={diff} className="capitalize">{diff}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                                        <select
                                            name="tags"
                                            value={formData.tags}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                                        >
                                            {TAGS.map(tag => (
                                                <option key={tag} value={tag} className="capitalize">{tag}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Video URL (iframe compatible)</label>
                                <input
                                    type="text"
                                    name="videoUrl"
                                    value={formData.videoUrl}
                                    onChange={handleChange}
                                    placeholder="https://www.youtube.com/embed/..."
                                    className="w-full px-4 py-3 rounded-xl border border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Video Description</label>
                                <textarea
                                    name="videoDescription"
                                    value={formData.videoDescription}
                                    onChange={handleChange}
                                    rows={2}
                                    placeholder="Brief description of the editorial video"
                                    className="w-full px-4 py-3 rounded-xl border border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between border-b border-indigo-100 pb-2">
                                    <h2 className="text-xl font-semibold text-gray-800">Visible Test Cases</h2>
                                    <button
                                        type="button"
                                        onClick={() => addTestCase('visibleTestCases')}
                                        className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition text-sm font-medium"
                                    >
                                        + Add
                                    </button>
                                </div>
                                {formData.visibleTestCases.map((tc, index) => (
                                    <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-sm font-medium text-gray-600">Test Case {index + 1}</span>
                                            {formData.visibleTestCases.length > 1 && (
                                                <button type="button" onClick={() => removeTestCase(index, 'visibleTestCases')} className="text-red-500 text-sm">Remove</button>
                                            )}
                                        </div>
                                        <div className="grid gap-3">
                                            <input type="text" value={tc.input} onChange={(e) => handleTestCaseChange(index, 'input', e.target.value, 'visibleTestCases')} required className="px-3 py-2 rounded-lg border border-gray-300 text-sm" placeholder="Input" />
                                            <input type="text" value={tc.output} onChange={(e) => handleTestCaseChange(index, 'output', e.target.value, 'visibleTestCases')} required className="px-3 py-2 rounded-lg border border-gray-300 text-sm" placeholder="Output" />
                                            <input type="text" value={tc.explaination} onChange={(e) => handleTestCaseChange(index, 'explaination', e.target.value, 'visibleTestCases')} required className="px-3 py-2 rounded-lg border border-gray-300 text-sm" placeholder="Explanation" />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between border-b border-indigo-100 pb-2">
                                    <h2 className="text-xl font-semibold text-gray-800">Hidden Test Cases</h2>
                                    <button type="button" onClick={() => addTestCase('hiddenTestCases')} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">+ Add</button>
                                </div>
                                {formData.hiddenTestCases.map((tc, index) => (
                                    <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-sm font-medium text-gray-600">Test Case {index + 1}</span>
                                            {formData.hiddenTestCases.length > 1 && (
                                                <button type="button" onClick={() => removeTestCase(index, 'hiddenTestCases')} className="text-red-500 text-sm">Remove</button>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <input type="text" value={tc.input} onChange={(e) => handleTestCaseChange(index, 'input', e.target.value, 'hiddenTestCases')} required className="px-3 py-2 rounded-lg border border-gray-300 text-sm" placeholder="Input" />
                                            <input type="text" value={tc.output} onChange={(e) => handleTestCaseChange(index, 'output', e.target.value, 'hiddenTestCases')} required className="px-3 py-2 rounded-lg border border-gray-300 text-sm" placeholder="Output" />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold text-gray-800 border-b border-indigo-100 pb-2">Starter Code</h2>
                                {formData.startCode.map((sc, index) => (
                                    <div key={sc.language} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                                        <label className="block text-sm font-medium text-gray-600 mb-2 capitalize">{sc.language}</label>
                                        <textarea value={sc.initialCode} onChange={(e) => handleCodeChange(index, 'initialCode', e.target.value, 'startCode')} rows={4} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm font-mono" />
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-end gap-4 pt-4">
                                <button type="button" onClick={goBack} className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium">Cancel</button>
                                <button type="submit" disabled={loading} className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium disabled:opacity-50">
                                    {loading ? <span className="flex items-center gap-2"><span className="loading loading-spinner loading-sm"></span>Updating...</span> : 'Update Problem'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}
