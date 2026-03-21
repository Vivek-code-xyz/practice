import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axiosClient from "../utils/axiosClient";
import Editor from "@monaco-editor/react";
import {ChatAI} from "../components/ChatAI";



export default function ProblemPage() {
    const { id } = useParams();
    const [problem, setProblem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("description");

    // notes (persist per-problem in localStorage)
    const [notes, setNotes] = useState("");

    // editor
    const [langOptions, setLangOptions] = useState([]);
    const [currentLang, setCurrentLang] = useState("");
    const [codeMap, setCodeMap] = useState({});

    const editorRef = useRef(null);

    // run/submit state
    const [output, setOutput] = useState(null);
    const [visibleTests, setVisibleTests] = useState(false);
    const [testing, setTesting] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // submissions
    const [submissions, setSubmissions] = useState(null);

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                setLoading(true);
                const { data } = await axiosClient.get(`/problem/${id}`);
                setProblem(data);
                // prepare languages
                const langs = data.startCode.map((s) => s.language);
                setLangOptions(langs);
                if (langs.length) {
                    setCurrentLang(langs[0]);
                }
                // initial codes map
                const map = {};
                data.startCode.forEach((s) => (map[s.language] = s.initialCode));
                setCodeMap(map);
            } catch (e) {
                if (e.response?.status === 401) {
                    window.location.href = "/login";
                    return;
                }
                setError(e.response?.data || "Unable to fetch problem");
            } finally {
                setLoading(false);
            }
        };

        const fetchSubmissions = async () => {
            try {
                const { data } = await axiosClient.get(`/problem/submissions/${id}`);
                setSubmissions(Array.isArray(data) ? data : []);
            } catch (e) {
                if (e.response?.status === 401) {
                    window.location.href = "/login";
                    return;
                }
                // ignore other failures
                setSubmissions([]);
            }
        };

        fetchProblem();
        fetchSubmissions();

        // load notes for this problem
        const stored = localStorage.getItem(`notes-${id}`) || "";
        setNotes(stored);
    }, [id]);

    const handleLanguageChange = (e) => {
        const lang = e.target.value;
        setCurrentLang(lang);
    };

    const handleEditorDidMount = (editor) => {
        editorRef.current = editor;
    };

    const handleCodeChange = (val) => {
        setCodeMap((prev) => ({ ...prev, [currentLang]: val }));
    };

    const showVisibleTests = () => {
        setVisibleTests((v) => !v);
    };

    const handleRun = async () => {
        if (!currentLang || !codeMap[currentLang]) return;
        setTesting(true);
        setOutput(null);
        try {
            const { data } = await axiosClient.post(`/submit/run/${id}`, {
                language: currentLang,
                code: codeMap[currentLang],
            });
            setOutput({ type: "run", result: data });
        } catch (e) {
            if (e.response?.status === 401) {
                window.location.href = "/login";
                return;
            }
            setOutput({ type: "error", message: e.response?.data || e.message });
        } finally {
            setTesting(false);
        }
    };

    const handleSubmit = async () => {
        if (!currentLang || !codeMap[currentLang]) return;
        setSubmitting(true);
        setOutput(null);
        try {
            const { data } = await axiosClient.post(`/submit/submit/${id}`, {
                language: currentLang,
                code: codeMap[currentLang],
            });
            setOutput({ type: "submit", result: data });
            // refresh submissions and maybe solved
            const resp = await axiosClient.get(`/problem/submissions/${id}`);
            setSubmissions(Array.isArray(resp.data) ? resp.data : []);
        } catch (e) {
            if (e.response?.status === 401) {
                window.location.href = "/login";
                return;
            }
            setOutput({ type: "error", message: e.response?.data || e.message });
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (error || !problem) {
        return (
            <div className="p-8">
                <p className="text-red-500">{error || "Problem not found"}</p>
                <Link to="/" className="text-blue-600 underline">
                    Go back
                </Link>
            </div>
        );
    }

//    return (
//         <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-emerald-50 to-sky-50 text-slate-800">
//             <div className="container mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">
//                 {/* left panel */}
//                 <div className="flex-1">
//                     <div className="mb-2">
//                         <Link to="/" className="text-indigo-600 hover:underline">
//                             ← Back to problems
//                         </Link>
//                     </div>
//                     <h1 className="text-2xl font-bold mb-4">{problem.title}</h1>
//                     <div className="flex space-x-4 mb-6">
//                         <button
//                             className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === "description"
//                                 ? "bg-indigo-600 text-white"
//                                 : "bg-white/70 text-indigo-700"
//                                 }`}
//                             onClick={() => setActiveTab("description")}
//                         >
//                             Description
//                         </button>
//                         <button
//                             className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === "editorial"
//                                 ? "bg-indigo-600 text-white"
//                                 : "bg-white/70 text-indigo-700"
//                                 }`}
//                             onClick={() => setActiveTab("editorial")}
//                         >
//                             Editorial
//                         </button>
//                         <button
//                             className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === "solutions"
//                                 ? "bg-indigo-600 text-white"
//                                 : "bg-white/70 text-indigo-700"
//                                 }`}
//                             onClick={() => setActiveTab("solutions")}
//                         >
//                             Solutions
//                         </button>
//                         <button
//                             className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === "submissions"
//                                 ? "bg-indigo-600 text-white"
//                                 : "bg-white/70 text-indigo-700"
//                                 }`}
//                             onClick={() => setActiveTab("submissions")}
//                         >
//                             Submissions
//                         </button>
//                     </div>

//                     <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow border border-indigo-100">
//                         {activeTab === "description" && (
//                             <div className="space-y-4">
//                                 <p>{problem.description}</p>
//                                 {problem.visibleTestCases && problem.visibleTestCases.length > 0 && (
//                                     <div>
//                                         <h3 className="font-semibold">Visible Test Cases</h3>
//                                         {problem.visibleTestCases.map((t, idx) => (
//                                             <div
//                                                 key={idx}
//                                                 className="mt-2 p-3 bg-gray-100 rounded-lg"
//                                             >
//                                                 <p>
//                                                     <strong>Input:</strong> {t.input}
//                                                 </p>
//                                                 <p>
//                                                     <strong>Output:</strong> {t.output}
//                                                 </p>
//                                                 <p>
//                                                     <strong>Explanation:</strong> {t.explaination}
//                                                 </p>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 )}
//                             </div>
//                         )}

//                         {activeTab === "editorial" && (
//                             <p className="text-gray-500">Editorial coming soon...</p>
//                         )}

//                         {activeTab === "solutions" && (
//                             <div className="space-y-4">
//                                 {problem.referenceCode && problem.referenceCode.length > 0 ? (
//                                     problem.referenceCode.map((ref, idx) => (
//                                         <div key={idx}>
//                                             <h4 className="font-semibold capitalize">{ref.language}</h4>
//                                             <pre className="bg-gray-100 p-3 rounded overflow-auto">
//                                                 {ref.completeCode}
//                                             </pre>
//                                         </div>
//                                     ))
//                                 ) : (
//                                     <p className="text-gray-500">No reference solutions yet.</p>
//                                 )}
//                             </div>
//                         )}

//                         {activeTab === "submissions" && (
//                             <div className="space-y-3">
//                                 {submissions && submissions.length > 0 ? (
//                                     <>
//                                         <p className="text-sm text-gray-600">
//                                             Total submissions: {submissions.length}
//                                         </p>
//                                         {submissions.map((s) => (
//                                             <div
//                                                 key={s._id}
//                                                 className="p-3 bg-gray-100 rounded flex justify-between items-center"
//                                             >
//                                                 <div>
//                                                     <p className="font-medium capitalize">
//                                                         {s.language} - {s.status}
//                                                     </p>
//                                                     <p className="text-sm text-gray-600">
//                                                         Passed: {s.testCasesPassed}/{s.testCasesTotal}
//                                                     </p>
//                                                 </div>
//                                                 <span className="text-xs text-gray-500">
//                                                     {new Date(s.createdAt).toLocaleString()}
//                                                 </span>
//                                             </div>
//                                         ))}
//                                     </>
//                                 ) : (
//                                     <p className="text-gray-500">No submissions yet.</p>
//                                 )}
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 {/* right panel editor */}
//                 <div className="flex-1 flex flex-col">
//                     <div className="mb-4 flex items-center space-x-2">
//                         <label className="font-medium">Language:</label>
//                         <select
//                             value={currentLang}
//                             onChange={handleLanguageChange}
//                             className="select select-bordered"
//                         >
//                             {langOptions.map((l) => (
//                                 <option key={l} value={l}>
//                                     {l}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                     <div className="flex-1">
//                         <Editor
//                             height="400px"
//                             language={currentLang}
//                             value={codeMap[currentLang] || ""}
//                             onMount={handleEditorDidMount}
//                             onChange={handleCodeChange}
//                             theme="vs-dark"
//                         />
//                     </div>
//                     <div className="mt-4 flex space-x-3">
//                         <button
//                             onClick={handleRun}
//                             disabled={testing}
//                             className="btn btn-sm bg-indigo-600 text-white"
//                         >
//                             {testing ? "Running..." : "Run"}
//                         </button>
//                         <button
//                             onClick={handleSubmit}
//                             disabled={submitting}
//                             className="btn btn-sm bg-green-600 text-white"
//                         >
//                             {submitting ? "Submitting..." : "Submit"}
//                         </button>
//                         <button
//                             onClick={showVisibleTests}
//                             className="btn btn-sm bg-gray-200 text-gray-700"
//                         >
//                             {visibleTests ? "Hide" : "Show"} Visible Cases
//                         </button>
//                     </div>

//                     {visibleTests && problem.visibleTestCases && (
//                         <div className="mt-4 bg-white/80 p-4 rounded shadow">
//                             <h3 className="font-semibold mb-2">Visible Test Cases</h3>
//                             {problem.visibleTestCases.map((t, i) => (
//                                 <div key={i} className="mb-2">
//                                     <p>
//                                         <strong>Input:</strong> {t.input}
//                                     </p>
//                                     <p>
//                                         <strong>Output:</strong> {t.output}
//                                     </p>
//                                 </div>
//                             ))}
//                         </div>
//                     )}

//                     {output && (
//                         <div className="mt-4 bg-white/90 p-4 rounded shadow">
//                             <h3 className="font-semibold">Result</h3>
//                             {output.type === "error" ? (
//                                 <p className="text-red-500">{output.message}</p>
//                             ) : output.type === "run" ? (
//                                 <>
//                                     {output.result.globalError && (
//                                         <p className="text-red-500">
//                                             {output.result.globalError}
//                                         </p>
//                                     )}
//                                     {output.result.testCases && (
//                                         <div className="mt-2">
//                                             {output.result.testCases.map((t, idx) => (
//                                                 <div key={idx} className="mb-2">
//                                                     <p>
//                                                         <strong>Test #{idx + 1}:</strong> {t.status}
//                                                     </p>
//                                                     <p className="text-sm">
//                                                         Input: {t.input}
//                                                     </p>
//                                                     <p className="text-sm">
//                                                         Expected: {t.expectedOutput}
//                                                     </p>
//                                                     <p className="text-sm">
//                                                         Actual: {t.actualOutput}
//                                                     </p>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     )}
//                                 </>
//                             ) : output.type === "submit" ? (
//                                 <>
//                                     <p className={`font-semibold ${output.result.status === 'accepted' ? 'text-green-600' : 'text-red-600'}`}>Status: {output.result.status}</p>
//                                     <p>
//                                         Passed: {output.result.passed}/{output.result.total}
//                                     </p>
//                                     {output.result.errorMessage && (
//                                         <p className="text-red-500">
//                                             Error: {output.result.errorMessage}
//                                         </p>
//                                     )}
//                                 </>
//                             ) : null}
//                         </div>
//                     )}
//                 </div>

//             </div>
//         </div>
//     );
return (
  <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-emerald-50 to-sky-100 text-slate-800">
    <div className="container mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">

      {/* ================= LEFT PANEL ================= */}
      <div className="flex-1">

        

        <h1 className="text-4xl font-bold tracking-tight mb-8
               bg-gradient-to-r from-blue-500 via-green-500 to-purple-500
               bg-clip-text text-transparent
               drop-shadow-sm">
          {problem.title}
        </h1>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-6">
          {["description", "editorial", "solutions", "submissions","AI","notes"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200
              ${
                activeTab === tab
                  ? "bg-gradient-to-r from-indigo-500 to-emerald-500 text-white shadow-md scale-105"
                  : "bg-white/70 border border-indigo-100 text-indigo-700 hover:bg-white hover:shadow"
              }`}
            >
              {tab === 'AI' ? 'AI' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="bg-white/70 backdrop-blur-xl border border-indigo-100 rounded-2xl shadow-lg p-6">

          {/* ================= DESCRIPTION ================= */}
          {activeTab === "description" && (
            <div className="space-y-6 ">
              <h3 className="font-semibold text-indigo-600 mb-2">
                   Description
                  </h3>
              <p className="leading-relaxed text-base font-semibold text-gray-700  ">{problem.description}</p>
              <div className="w-full h-px bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 my-6 opacity-50"></div>
              {problem.visibleTestCases?.length > 0 && (
                <div>
                  <h3 className="font-semibold text-indigo-600 mb-3">
                    Visible Test Cases
                  </h3>

                  {problem.visibleTestCases.map((t, idx) => (
                    <div
                      key={idx}
                      className="p-4 mb-3 rounded-xl bg-gradient-to-r from-indigo-50 to-emerald-50 border border-indigo-100"
                    >
                      <p><strong>Input:</strong> {t.input}</p>
                      <p><strong>Output:</strong> {t.output}</p>
                      <p><strong>Explanation:</strong> {t.explaination}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ================= EDITORIAL ================= */}
          {activeTab === "editorial" && (
            <>
              {problem.videoUrl ? (
                <>
                  <iframe
                    width="75%"
                    height="350"
                    className="mt-5 rounded-lg shadow-lg justify-self-center"
                    src={problem.videoUrl}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  {problem.videoDescription && (
                    <p className="mt-4 text-gray-700">{problem.videoDescription}</p>
                  )}
                </>
              ) : (
                <p className="text-slate-500">Editorial coming soon...</p>
              )}
            </>
          )}

          {/* ================= SOLUTIONS ================= */}
          {activeTab === "solutions" && (
            <div className="space-y-5">
              {problem.referenceCode?.length > 0 ? (
                problem.referenceCode.map((ref, idx) => (
                  <div key={idx}>
                    <h4 className="font-semibold capitalize text-indigo-600 mb-2">
                      {ref.language}
                    </h4>
                    <pre className="bg-slate-900 text-slate-200 p-4 rounded-xl text-sm overflow-auto">
                      {ref.completeCode}
                    </pre>
                  </div>
                ))
              ) : (
                <p className="text-slate-500">No reference solutions yet.</p>
              )}
            </div>
          )}

          {/* ================= SUBMISSIONS ================= */}
          {activeTab === "submissions" && (
            <div className="space-y-4">
              {submissions?.length > 0 ? (
                submissions.map((s) => (
                  <div
                    key={s._id}
                    className="p-4 rounded-xl bg-white border border-indigo-100 shadow-sm hover:shadow-md transition flex justify-between"
                  >
                    <div>
                      <p className="font-medium capitalize text-indigo-700">
                        {s.language} — {s.status}
                      </p>
                      <p className="text-sm text-slate-500">
                        Passed: {s.testCasesPassed}/{s.testCasesTotal}
                      </p>
                    </div>
                    <span className="text-xs text-slate-400">
                      {new Date(s.createdAt).toLocaleString()}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-slate-500">No submissions yet.</p>
              )}
            </div>
          )}

          {activeTab === "AI" && (
            <>
              <ChatAI problem={problem}></ChatAI>
            </>
          )}

          {activeTab === "notes" && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-indigo-600">
                Personal Notes
              </h2>
              <textarea
                className="w-full h-56 p-3 border border-indigo-200 rounded-lg bg-white/80 text-slate-800 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={notes}
                onChange={(e) => {
                  const v = e.target.value;
                  setNotes(v);
                  localStorage.setItem(`notes-${id}`, v);
                }}
                placeholder="Write your observations here..."
              />
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
                onClick={() => {
                  if (window.confirm("Clear all notes?")) {
                    setNotes("");
                    localStorage.removeItem(`notes-${id}`);
                  }
                }}
              >
                Clear Notes
              </button>
            </div>
          )}

        </div>
      </div>


      {/* ================= RIGHT PANEL ================= */}
      <div className="flex-1 flex flex-col">

        <div className="mb-4">
          <Link
            to="/"
            className="block text-end items-center gap-1 text-indigo-600 font-medium mb-6
           hover:text-indigo-800 hover:gap-2 transition-all duration-200 btn-secondary"
          >
            ← Back to problems
          </Link>
        </div>

        {/* Language */}
        <div className="flex items-center justify-between mb-4 bg-white/70 rounded-xl p-3 border border-indigo-100 shadow-sm ">
          <label className="font-medium text-indigo-600">Language</label>
          <select
            value={currentLang}
            onChange={handleLanguageChange}
            className="select select-sm bg-white border-indigo-200 focus:border-indigo-400"
          >
            {langOptions.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>

        {/* Editor */}
        <div className="rounded-2xl overflow-hidden border border-slate-700 shadow-xl bg-[#1e1e1e] ">
          <Editor
            height="420px"
            className="pt-3"
            language={currentLang}
            value={codeMap[currentLang] || ""}
            onMount={handleEditorDidMount}
            onChange={handleCodeChange}
            theme="vs-dark"
          />
        </div>

        {/* Buttons */}
        <div className="mt-5 flex gap-3">
          <button
            onClick={handleRun}
            disabled={testing}
            className="px-5 py-2 rounded-xl text-white text-sm font-medium
              bg-gradient-to-r from-indigo-500 to-indigo-600
              hover:scale-105 hover:shadow-md transition-all disabled:opacity-50"
          >
            {testing ? "Running..." : "Run"}
          </button>

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="px-5 py-2 rounded-xl text-white text-sm font-medium
              bg-gradient-to-r from-emerald-500 to-emerald-600
              hover:scale-105 hover:shadow-md transition-all disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>

          <button
            onClick={showVisibleTests}
            className="px-5 py-2 rounded-xl text-sm font-medium
              bg-white border border-indigo-200 text-indigo-600
              hover:bg-indigo-50 transition"
          >
            {visibleTests ? "Hide" : "Show"} Visible Cases
          </button>
        </div>

        {/* ================= SHOW/HIDE TEST CASES FIXED ================= */}
        {visibleTests && problem.visibleTestCases && (
          <div className="mt-5 bg-white/70 border border-indigo-100 rounded-2xl p-4 shadow-md">
            <h3 className="font-semibold text-indigo-600 mb-3">
              Visible Test Cases
            </h3>
            {problem.visibleTestCases.map((t, i) => (
              <div key={i} className="mb-3 p-3 bg-indigo-50 rounded-lg">
                <p><strong>Input:</strong> {t.input}</p>
                <p><strong>Output:</strong> {t.output}</p>
              </div>
            ))}
          </div>
        )}

        {/* ================= FULL OUTPUT BLOCK (RUN + SUBMIT) ================= */}
        {output && (
          <div className="mt-5 bg-white/80 border border-indigo-100 rounded-2xl p-5 shadow-lg">
            <h3 className="font-semibold text-indigo-600 mb-3">Result</h3>

            {output.type === "error" && (
              <p className="text-red-500">{output.message}</p>
            )}

            {output.type === "run" && (
              <>
                {output.result.globalError && (
                  <p className="text-red-500">{output.result.globalError}</p>
                )}

                {output.result.testCases && (
                  <div className="space-y-3 mt-2">
                    {output.result.testCases.map((t, idx) => (
                      <div key={idx} className="p-3 bg-indigo-50 rounded-lg">
                        <p className="font-medium">
                          Test #{idx + 1}: {t.status}
                        </p>
                        <p className="text-sm">Input: {t.input}</p>
                        <p className="text-sm">Expected: {t.expectedOutput}</p>
                        <p className="text-sm">Actual: {t.actualOutput}</p>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {output.type === "submit" && (
              <>
                <p className={`font-semibold ${
                  output.result.status === "accepted"
                    ? "text-emerald-600"
                    : "text-red-500"
                }`}>
                  Status: {output.result.status}
                </p>
                <p>
                  Passed: {output.result.passed}/{output.result.total}
                </p>

                {output.result.errorMessage && (
                  <p className="text-red-500 mt-2">
                    Error: {output.result.errorMessage}
                  </p>
                )}
              </>
            )}
          </div>
        )}

      </div>
    </div>
  </div>
);
}
