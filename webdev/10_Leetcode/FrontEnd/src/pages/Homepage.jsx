import { useState, useEffect } from "react"
import axiosClient from "../utils/axiosClient.js"
import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "../Redux/authSlice.js"
import { Link, Navigate, useNavigate } from "react-router-dom"


export default function Homepage() {

    const dispatch = useDispatch()
    const { user , loading } = useSelector((state) => state.auth)
    const navigate = useNavigate()

    const [allProblems, setAllProblems] = useState([])
    const [solvedProblems, setSolvedProblems] = useState([])
    const [filters, setFilters] = useState({
        difficulty: 'all',
        tags: 'all',
        status: 'all'
    })

    useEffect(() => {

        const fetchAllProblems = async () => {

            try {
                const { data } = await axiosClient.get("/problem")
                setAllProblems(data)
                console.log("problems", data)
            } catch (err) {
                if (err.response?.status === 401) {
                    window.location.href = "/login";
                    return;
                }
                console.log("Error While Fetching All Problems : ", err.response?.data || err.message)
            }
        }

        const fetchSolvedProblems = async () => {
            try {
                const { data } = await axiosClient.get("/problem/user/solved")
                setSolvedProblems(data)
                console.log("solved", data)
            } catch (e) {
                if (e.response?.status === 401) {
                    window.location.href = "/login";
                    return;
                }
                console.log("Error While Fetching Solved Problems : " + (e.response?.data || e.message))
            }
        }

        fetchAllProblems()

        if (user) fetchSolvedProblems()
    }, [user])



    const handleLogout = async () => {
        await dispatch(logoutUser());
        setSolvedProblems([])
        window.location.href = '/login';
    }


    const filteredProblem = allProblems.filter(problem => {
        const difficultyMatch = filters.difficulty === 'all' || filters.difficulty === problem.difficulty;
        const tagMatch = filters.tags === "all" || problem.tags === filters.tags
        const statusMatch = filters.status === "all" || solvedProblems.some(sp => sp._id === problem._id)
        return difficultyMatch && tagMatch && statusMatch
    })



    const closeDropdown = () => {
        document.activeElement.blur();
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-emerald-50 to-sky-50 text-slate-800 relative overflow-hidden">

            {/* Background Blobs */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-200 opacity-30 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 -right-40 w-96 h-96 bg-sky-200 opacity-30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-emerald-200 opacity-30 rounded-full blur-3xl"></div>

            {/* Navbar */}
            <div className="navbar bg-white/70 backdrop-blur-md border-b border-indigo-100 sticky top-0 z-20 px-6">
                <div className="flex-1">
                    <a className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-500 bg-clip-text text-transparent">
                        CodeBramha
                    </a>
                </div>

                <div className="flex-none gap-3">
                    {user ? (
                        <>
                        
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="bg-gray-200 text-gray-700 rounded-full w-10 flex items-center justify-center">
                                    <span className="text-lg font-semibold">
                                        {(user.firstName || "").charAt(0).toUpperCase() || "U"}
                                    </span>
                                </div>
                            </div>

                            <ul
                                tabIndex={0}
                                className="mt-3 p-2 shadow-lg menu menu-sm dropdown-content bg-white rounded-xl w-64 border"
                            >
                                <div className="px-4 py-3 border-b">
                                    <p className="font-semibold">{user.firstName}</p>
                                    <p className="text-sm text-gray-500 truncate">{user.emailId}</p>
                                </div>
                                {/* admin-specific actions */}
                                {user?.role === 'admin' && (
                                    <li>
                                        <Link
                                            to="/admin"
                                            className="text-indigo-600 hover:bg-indigo-50 rounded-lg"
                                            onClick={closeDropdown}
                                        >
                                            Admin Panel
                                        </Link>
                                    </li>
                                )}
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="text-rose-500 hover:bg-rose-50 rounded-lg"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                        </>
                    ) : (
                        <div className="flex gap-3">
                            <a href="/login" className="btn btn-ghost text-gray-700">
                                Login
                            </a>
                            <a href="/signup" className="btn bg-gray-900 text-white hover:bg-gray-700 border-none">
                                Sign Up
                            </a>
                        </div>
                    )}
                </div>
            </div>

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-6 py-14 text-center">
                <h1 className="text-4xl md:text-5xl font-bold pb-2 mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
                    Practice. Improve. Repeat.
                </h1>
                <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                    Sharpen your coding skills with curated problems across different
                    difficulty levels and topics.
                </p>
            </div>

            {/* Stats Section (Static) */}
            <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 px-6 mb-14">
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-md border border-indigo-100 hover:shadow-lg transition text-center">
                    <p className="text-3xl font-bold text-indigo-600">{allProblems.length}</p>
                    <p className="text-slate-500 mt-1">Total Problems</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-md border border-indigo-100 hover:shadow-lg transition text-center">
                    <p className="text-3xl font-bold text-purple-700">{solvedProblems.length}</p>
                    <p className="text-slate-500 mt-1">Solved</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-md border border-indigo-100 hover:shadow-lg transition text-center">
                    <p className="text-3xl font-bold text-green-600">
                        {allProblems.length
                            ? Math.round((solvedProblems.length / allProblems.length) * 100)
                            : 0}
                        %
                    </p>
                    <p className="text-slate-500 mt-1">Completion</p>
                </div>
            </div>

            {/* Main Section */}
            <div className="max-w-7xl mx-auto px-6 pb-20">

                {/* Filters Utility Heading */}
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-gray-700 ">
                        Filters
                    </h2>

                    <div className="flex-1 h-px bg-slate-200 ml-4"></div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-6 mb-10 
                bg-white/70 backdrop-blur-md p-6 rounded-2xl 
                border border-indigo-100 shadow-sm relative z-50">

                    {/* Helper to close dropdown */}
                    {/*
    Make sure this function exists above return:
    const closeDropdown = () => document.activeElement.blur();
  */}

                    {/* Status Filter */}
                    <div className="dropdown dropdown-bottom">
                        <div
                            tabIndex={0}
                            role="button"
                            className="w-64 flex justify-between items-center 
                 px-5 py-3 rounded-xl cursor-pointer
                 bg-white text-indigo-700 font-medium
                 border border-indigo-200 shadow-sm
                 hover:border-purple-300
                 transition-all duration-200"
                        >
                            {filters.status === "all" ? "All Problems" : "Solved"}
                            <span className="text-indigo-500">▾</span>
                        </div>

                        <ul
                            tabIndex={0}
                            className="dropdown-content z-[9999] mt-2 w-64
                 menu p-2 shadow-xl
                 bg-white/90 backdrop-blur-md
                 rounded-xl border border-indigo-100"
                        >
                            <li>
                                <button
                                    onClick={() => {
                                        setFilters({ ...filters, status: "all" });
                                        closeDropdown();
                                    }}
                                    className="rounded-lg hover:bg-gradient-to-r 
                     hover:from-indigo-100 
                     hover:via-purple-100 
                     hover:to-emerald-100"
                                >
                                    All Problems
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => {
                                        setFilters({ ...filters, status: "solved" });
                                        closeDropdown();
                                    }}
                                    className="rounded-lg hover:bg-gradient-to-r 
                     hover:from-indigo-100 
                     hover:via-purple-100 
                     hover:to-emerald-100"
                                >
                                    Solved
                                </button>
                            </li>
                        </ul>
                    </div>


                    {/* Difficulty Filter */}
                    <div className="dropdown dropdown-bottom">
                        <div
                            tabIndex={0}
                            role="button"
                            className="w-64 flex justify-between items-center 
                 px-5 py-3 rounded-xl cursor-pointer
                 bg-white text-indigo-700 font-medium
                 border border-indigo-200 shadow-sm
                 hover:border-purple-300
                 transition-all duration-200"
                        >
                            {filters.difficulty === "all"
                                ? "All Difficulties"
                                : filters.difficulty}
                            <span className="text-indigo-500">▾</span>
                        </div>

                        <ul
                            tabIndex={0}
                            className="dropdown-content z-[9999] mt-2 w-64
                 menu p-2 shadow-xl
                 bg-white/90 backdrop-blur-md
                 rounded-xl border border-indigo-100"
                        >
                            {["all", "easy", "medium", "hard"].map((level) => (
                                <li key={level}>
                                    <button
                                        onClick={() => {
                                            setFilters({ ...filters, difficulty: level });
                                            closeDropdown();
                                        }}
                                        className="capitalize rounded-lg hover:bg-gradient-to-r 
                       hover:from-indigo-100 
                       hover:via-purple-100 
                       hover:to-emerald-100"
                                    >
                                        {level === "all" ? "All Difficulties" : level}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>


                    {/* Tags Filter */}
                    <div className="dropdown dropdown-bottom">
                        <div
                            tabIndex={0}
                            role="button"
                            className="w-72 flex justify-between items-center 
                 px-5 py-3 rounded-xl cursor-pointer truncate
                 bg-white text-indigo-700 font-medium
                 border border-indigo-200 shadow-sm
                 hover:border-purple-300
                 transition-all duration-200"
                        >
                            {filters.tags === "all" ? "All Tags" : filters.tags}
                            <span className="text-indigo-500">▾</span>
                        </div>

                        <ul
                            tabIndex={0}
                            className="dropdown-content z-[9999] mt-2 w-72
                 max-h-60 overflow-y-auto
                 menu p-2 shadow-xl
                 bg-white/90 backdrop-blur-md
                 rounded-xl border border-indigo-100"
                        >
                            <li>
                                <button
                                    onClick={() => {
                                        setFilters({ ...filters, tags: "all" });
                                        closeDropdown();
                                    }}
                                    className="rounded-lg hover:bg-gradient-to-r 
                     hover:from-indigo-100 
                     hover:via-purple-100 
                     hover:to-emerald-100"
                                >
                                    All Tags
                                </button>
                            </li>

                            {Array.from(new Set(allProblems.map((p) => p.tags))).map((tag) => (
                                <li key={tag}>
                                    <button
                                        onClick={() => {
                                            setFilters({ ...filters, tags: tag });
                                            closeDropdown();
                                        }}
                                        className="rounded-lg hover:bg-gradient-to-r 
                       hover:from-indigo-100 
                       hover:via-purple-100 
                       hover:to-emerald-100"
                                    >
                                        {tag}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>


                    {/* Reset Button */}
                    <button
                        className="px-8 py-3 rounded-xl
               bg-gradient-to-r from-indigo-100 via-purple-100 to-emerald-100
               hover:from-indigo-200 hover:via-purple-200 hover:to-emerald-200
               text-indigo-700 border border-indigo-200
               shadow-sm transition-all duration-200"
                        onClick={() =>
                            setFilters({
                                difficulty: "all",
                                tags: "all",
                                status: "all",
                            })
                        }
                    >
                        Reset
                    </button>

                </div>

                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-gray-700 ">
                        Problems
                    </h2>

                    <div className="flex-1 h-px bg-slate-200 ml-4"></div>
                </div>
                {/* Problems Table */}
                <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md border border-indigo-100 overflow-hidden">

                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead className="bg-gradient-to-r from-indigo-50 to-emerald-50 text-indigo-700">
                                <tr className="hover:bg-indigo-50/60 transition duration-150 cursor-pointer">
                                    <th className="py-4">Title</th>
                                    <th>Difficulty</th>
                                    <th>Tags</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProblem.length > 0 ? (
                                    filteredProblem.map((problem) => {
                                        const isSolved = solvedProblems.some(
                                            (sp) => sp._id === problem._id
                                        );

                                        return (
                                            <tr
                                                key={problem._id}
                                                className="hover:bg-gray-50 transition duration-150 cursor-pointer"
                                                onClick={() => navigate(`/problem/${problem._id}`)}
                                            >
                                                <td className="font-medium py-4">
                                                    <Link to={`/problem/${problem._id}`} className="block w-full h-full">
                                                        {problem.title}
                                                    </Link>
                                                </td>

                                                <td>
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-sm font-medium ${problem.difficulty === "easy"
                                                            ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                                                            : problem.difficulty === "medium"
                                                                ? "bg-indigo-100 text-indigo-700 border border-indigo-200"
                                                                : "bg-purple-100 text-red-600 border border-purple-200"
                                                            }`}
                                                    >
                                                        {problem.difficulty}
                                                    </span>
                                                </td>

                                                <td>
                                                    <span className="bg-gradient-to-r from-sky-100 to-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm border border-indigo-200">
                                                        {problem.tags}
                                                    </span>
                                                </td>

                                                <td>
                                                    {isSolved ? (
                                                        <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm border border-emerald-200">
                                                            Solved
                                                        </span>
                                                    ) : (
                                                        <span className="bg-indigo-50 text-indigo-400 px-3 py-1 rounded-full text-sm border border-indigo-100">
                                                            Unsolved
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="text-center py-10 text-gray-500"
                                        >
                                            No problems found matching the filters.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}