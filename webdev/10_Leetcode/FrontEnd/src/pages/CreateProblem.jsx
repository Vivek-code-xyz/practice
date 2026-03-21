import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axiosClient from "../utils/axiosClient"

const DIFFICULTIES = ['easy', 'medium', 'hard']
const TAGS = ['array', 'graph', 'tree', 'DP', 'sorting', 'math', 'linkedlist', 'searching']
const LANGUAGES = ['javascript', 'python', 'java', 'cpp', 'c']

export default function CreateProblem() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        difficulty: 'easy',
        tags: 'array',
        videoUrl: '',
        videoDescription: '',
        visibleTestCases: [{ input: '', output: '', explaination: '' }],
        hiddenTestCases: [{ input: '', output: '' }],
        startCode: LANGUAGES.map(lang => ({ language: lang, initialCode: '' })),
        referenceCode: LANGUAGES.map(lang => ({ language: lang, completeCode: '' }))
    })

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

            await axiosClient.post('/problem/create', payload)
            setSuccess('Problem created successfully!')
            setTimeout(() => navigate('/admin'), 2000)
        } catch (err) {
            setError(err.response?.data?.error || err.response?.data || 'Failed to create problem')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-emerald-50 to-sky-50 text-slate-800">
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-200 opacity-30 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 -right-40 w-96 h-96 bg-sky-200 opacity-30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-emerald-200 opacity-30 rounded-full blur-3xl"></div>

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
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-green-600 bg-clip-text text-transparent mb-2">
                        Create New Problem
                    </h1>
                    <p className="text-gray-500 mb-8">Fill in the details to add a new problem</p>

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

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Basic Info */}
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
                                    placeholder="Enter problem title"
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
                                    placeholder="Describe the problem"
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
                        </div>

                        {/* Visible Test Cases */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between border-b border-indigo-100 pb-2">
                                <h2 className="text-xl font-semibold text-gray-800">Visible Test Cases</h2>
                                <button
                                    type="button"
                                    onClick={() => addTestCase('visibleTestCases')}
                                    className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition text-sm font-medium"
                                >
                                    + Add Test Case
                                </button>
                            </div>
                            {formData.visibleTestCases.map((tc, index) => (
                                <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-sm font-medium text-gray-600">Test Case {index + 1}</span>
                                        {formData.visibleTestCases.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeTestCase(index, 'visibleTestCases')}
                                                className="text-red-500 hover:text-red-700 text-sm"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                    <div className="grid gap-3">
                                        <input
                                            type="text"
                                            value={tc.input}
                                            onChange={(e) => handleTestCaseChange(index, 'input', e.target.value, 'visibleTestCases')}
                                            required
                                            className="px-3 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none text-sm"
                                            placeholder="Input"
                                        />
                                        <input
                                            type="text"
                                            value={tc.output}
                                            onChange={(e) => handleTestCaseChange(index, 'output', e.target.value, 'visibleTestCases')}
                                            required
                                            className="px-3 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none text-sm"
                                            placeholder="Output"
                                        />
                                        <input
                                            type="text"
                                            value={tc.explaination}
                                            onChange={(e) => handleTestCaseChange(index, 'explaination', e.target.value, 'visibleTestCases')}
                                            required
                                            className="px-3 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none text-sm"
                                            placeholder="Explanation"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Hidden Test Cases */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between border-b border-indigo-100 pb-2">
                                <h2 className="text-xl font-semibold text-gray-800">Hidden Test Cases</h2>
                                <button
                                    type="button"
                                    onClick={() => addTestCase('hiddenTestCases')}
                                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition text-sm font-medium"
                                >
                                    + Add Test Case
                                </button>
                            </div>
                            {formData.hiddenTestCases.map((tc, index) => (
                                <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-sm font-medium text-gray-600">Test Case {index + 1}</span>
                                        {formData.hiddenTestCases.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeTestCase(index, 'hiddenTestCases')}
                                                className="text-red-500 hover:text-red-700 text-sm"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <input
                                            type="text"
                                            value={tc.input}
                                            onChange={(e) => handleTestCaseChange(index, 'input', e.target.value, 'hiddenTestCases')}
                                            required
                                            className="px-3 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none text-sm"
                                            placeholder="Input"
                                        />
                                        <input
                                            type="text"
                                            value={tc.output}
                                            onChange={(e) => handleTestCaseChange(index, 'output', e.target.value, 'hiddenTestCases')}
                                            required
                                            className="px-3 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none text-sm"
                                            placeholder="Output"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Start Code */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-800 border-b border-indigo-100 pb-2">Starter Code (Optional)</h2>
                            <p className="text-sm text-gray-500">Initial code provided to users</p>
                            <div className="grid gap-4">
                                {formData.startCode.map((sc, index) => (
                                    <div key={sc.language} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                                        <label className="block text-sm font-medium text-gray-600 mb-2 capitalize">{sc.language}</label>
                                        <textarea
                                            value={sc.initialCode}
                                            onChange={(e) => handleCodeChange(index, 'initialCode', e.target.value, 'startCode')}
                                            rows={4}
                                            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none text-sm font-mono"
                                            placeholder={`Enter starter code for ${sc.language}`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Reference Code */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-800 border-b border-indigo-100 pb-2">Reference Solution</h2>
                            <p className="text-sm text-gray-500">Complete solution code for validation (required)</p>
                            <div className="grid gap-4">
                                {formData.referenceCode.map((rc, index) => (
                                    <div key={rc.language} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                                        <label className="block text-sm font-medium text-gray-600 mb-2 capitalize">{rc.language}</label>
                                        <textarea
                                            value={rc.completeCode}
                                            onChange={(e) => handleCodeChange(index, 'completeCode', e.target.value, 'referenceCode')}
                                            rows={6}
                                            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none text-sm font-mono"
                                            placeholder={`Enter complete solution for ${rc.language}`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end gap-4 pt-4">
                            <button
                                type="button"
                                onClick={() => navigate('/admin')}
                                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <span className="loading loading-spinner loading-sm"></span>
                                        Creating...
                                    </span>
                                ) : 'Create Problem'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
