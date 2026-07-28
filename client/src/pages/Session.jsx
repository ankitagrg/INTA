import { useState } from "react";
import * as sessionService from "../services/sessionService";
import { useAuth } from "../hooks/useAuth.js";
import { getScoreTextColor, getScoreBadgeColor } from "../utils/scoreColor";
import BrandIcon from "../components/BrandIcon.jsx";

export default function Session() {
  const { user, logout } = useAuth();
  const [category, setCategory] = useState("technical");
  const [session, setSession] = useState(null);
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [finalResults, setFinalResults] = useState(null);

  const startSession = async (selectedCategory) => {
    const cat = selectedCategory || category;
    setError("");
    setLoading(true);
    setFinalResults(null);
    try {
      const data = await sessionService.startSession(cat);
      setSession(data.session);
      setQuestion(data.question);
      setEvaluation(null);
      setAnswer("");
    } catch (err) {
      setError(err.response?.data?.message || "Could not start session");
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async () => {
    if (!answer.trim()) return;
    setError("");
    setLoading(true);
    try {
      const data = await sessionService.submitAnswer({
        sessionId: session._id,
        questionId: question._id,
        answerText: answer,
      });
      setEvaluation(data.evaluation);
    } catch (err) {
      setError(err.response?.data?.message || "Could not submit answer");
    } finally {
      setLoading(false);
    }
  };

  const nextQuestion = async () => {
    setError("");
    setLoading(true);
    try {
      const data = await sessionService.getNextQuestion(session._id);
      if (data.question) {
        setQuestion(data.question);
        setAnswer("");
        setEvaluation(null);
      } else {
        setQuestion(null);
        // Fetch final results when interview ends
        const results = await sessionService.getSessionResults(session._id);
        setFinalResults(results);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Could not fetch next question");
    } finally {
      setLoading(false);
    }
  };

  const exitSession = () => {
    // Only mark the session complete if it was actually abandoned mid-interview
    // (not when dismissing results that are already finalized).
    if (session && !finalResults) {
      sessionService.completeSession(session._id).catch(() => {
        // Best-effort cleanup — don't block the user from leaving even if this fails.
      });
    }
    setSession(null);
    setQuestion(null);
    setAnswer("");
    setEvaluation(null);
    setFinalResults(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0f4ff] to-[#f8f9ff] flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Dashboard Top Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={exitSession}>
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-[0_2px_10px_rgba(37,99,235,0.2)]">
              <BrandIcon />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">INTA</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-slate-100 text-slate-600 text-xs font-bold rounded-full flex items-center justify-center border border-slate-200">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <span className="text-sm font-semibold text-slate-700 hidden sm:inline">{user?.name}</span>
            </div>
            <button
              onClick={logout}
              className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-slate-800 transition py-1"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main workspace */}
      <main className="flex-1 max-w-3xl w-full mx-auto p-6 md:py-12">
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 rounded-2xl p-4 text-xs font-semibold text-center mb-6 shadow-sm">
            {error}
          </div>
        )}

        {/* 1. Category Selection View */}
        {!session && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-extrabold text-[#0e1628] tracking-tight">Start a mock interview</h1>
              <p className="text-slate-500 text-sm">Select a category below to test your skills and receive dynamic feedback.</p>
            </div>

            {/* Premium Category Cards */}
            <div className="grid md:grid-cols-3 gap-5">
              
              {/* Technical */}
              <div
                onClick={() => setCategory("technical")}
                className={`rounded-[24px] bg-white p-6 border-2 transition-all cursor-pointer relative ${
                  category === "technical"
                    ? "border-blue-600 shadow-[0_4px_25px_rgba(37,99,235,0.06)]"
                    : "border-slate-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:border-slate-300"
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${category === "technical" ? "bg-blue-50 text-blue-600" : "bg-slate-50 text-slate-400"}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-800 text-base">Technical</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Test backend/frontend concepts, REST APIs, databases, and general programming terms.
                </p>
                {category === "technical" && (
                  <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-blue-600"></span>
                )}
              </div>

              {/* HR Fit */}
              <div
                onClick={() => setCategory("hr")}
                className={`rounded-[24px] bg-white p-6 border-2 transition-all cursor-pointer relative ${
                  category === "hr"
                    ? "border-blue-600 shadow-[0_4px_25px_rgba(37,99,235,0.06)]"
                    : "border-slate-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:border-slate-300"
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${category === "hr" ? "bg-blue-50 text-blue-600" : "bg-slate-50 text-slate-400"}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-800 text-base">HR Fit</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Practice behavioral screening, career goals, team coordination, and company value alignments.
                </p>
                {category === "hr" && (
                  <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-blue-600"></span>
                )}
              </div>

              {/* Behavioral */}
              <div
                onClick={() => setCategory("behavioral")}
                className={`rounded-[24px] bg-white p-6 border-2 transition-all cursor-pointer relative ${
                  category === "behavioral"
                    ? "border-blue-600 shadow-[0_4px_25px_rgba(37,99,235,0.06)]"
                    : "border-slate-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:border-slate-300"
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${category === "behavioral" ? "bg-blue-50 text-blue-600" : "bg-slate-50 text-slate-400"}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-800 text-base">Behavioral</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Evaluate conflict resolution, project struggles, and engineering teamwork using the STAR framework.
                </p>
                {category === "behavioral" && (
                  <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-blue-600"></span>
                )}
              </div>

            </div>

            {/* Launch Button */}
            <button
              onClick={() => startSession()}
              disabled={loading}
              className="w-full bg-[#0e1628] hover:bg-[#1a253c] text-white py-4.5 rounded-2xl flex justify-center items-center gap-2 font-semibold shadow-[0_4px_12px_rgba(14,22,40,0.1)] transition disabled:opacity-50"
            >
              {loading ? "Initializing Session..." : "Start Interview Workspace"}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        )}

        {/* 2. Active Session & Question Workspace */}
        {session && question && (
          <div className="bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-slate-100 space-y-6">
            
            {/* Session Header Status */}
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                {question.category} · Question {session.questions?.length || 1}
              </span>
              
              {/* Difficulty badge */}
              <span
                className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  question.difficulty === "easy"
                    ? "text-emerald-600 bg-emerald-50"
                    : question.difficulty === "medium"
                    ? "text-amber-600 bg-amber-50"
                    : "text-purple-600 bg-purple-50"
                }`}
              >
                {question.difficulty}
              </span>
            </div>

            {/* The Question Text */}
            <h2 className="text-xl font-bold text-[#0e1628] leading-snug">{question.text}</h2>

            {/* Input textarea */}
            <div className="space-y-2">
              <textarea
                rows={6}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                disabled={evaluation !== null}
                placeholder="Type your structured answer here... Consider structure, logic, and key technical concepts."
                className="w-full bg-[#f5f7fc] border-none rounded-2xl px-5 py-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition disabled:opacity-75"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-medium px-1">
                <span>Aim for at least 20-30 words for proper AI comparison</span>
                <span>{answer.trim().split(/\s+/).filter(Boolean).length} words</span>
              </div>
            </div>

            {/* Form actions / Evaluation display */}
            {!evaluation ? (
              <button
                onClick={submitAnswer}
                disabled={loading || !answer.trim()}
                className="bg-[#0e1628] hover:bg-[#1a253c] text-white px-6 py-3.5 rounded-xl font-semibold shadow-[0_4px_10px_rgba(14,22,40,0.08)] transition flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? "Evaluating Answer..." : "Submit for Local Evaluation"}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </button>
            ) : (
              <div className="space-y-6 pt-4 border-t border-slate-100 animate-fade-in">
                
                {/* Score Summary Box */}
                <div className="rounded-2xl border border-slate-100 p-6 flex flex-col md:flex-row md:items-start justify-between gap-6 bg-slate-50/50">
                  <div className="space-y-3 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">AI Evaluation Feedback</p>
                    {evaluation.strengths?.length > 0 && (
                      <div className="space-y-1">
                        {evaluation.strengths.map((s, idx) => (
                          <p key={idx} className="text-sm text-emerald-700 flex items-start gap-1.5">
                            <span>✓</span><span>{s}</span>
                          </p>
                        ))}
                      </div>
                    )}
                    {evaluation.weaknesses?.length > 0 && (
                      <div className="space-y-1">
                        {evaluation.weaknesses.map((w, idx) => (
                          <p key={idx} className="text-sm text-amber-700 flex items-start gap-1.5">
                            <span>!</span><span>{w}</span>
                          </p>
                        ))}
                      </div>
                    )}
                    {evaluation.suggestions?.length > 0 && (
                      <div className="space-y-1">
                        {evaluation.suggestions.map((s, idx) => (
                          <p key={idx} className="text-sm text-slate-600 flex items-start gap-1.5">
                            <span>→</span><span>{s}</span>
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-center justify-center shrink-0 border-l border-slate-100 pl-6 md:w-36 text-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Score</span>
                    <span className={`text-4xl font-extrabold tracking-tight mt-1 ${getScoreTextColor(evaluation.finalScore)}`}>
                      {evaluation.finalScore}%
                    </span>
                  </div>
                </div>

                {/* Score Metric Bars */}
                <div className="space-y-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-700">Metric Breakdown</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Semantic Similarity */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-slate-600">
                        <span>Conceptual Alignment (Transformers)</span>
                        <span>{Math.round(evaluation.semanticScore * 100)}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-slate-100">
                        <div
                          className="h-2 rounded-full bg-blue-600 transition-all duration-500"
                          style={{ width: `${evaluation.semanticScore * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* TF-IDF similarity */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-slate-600">
                        <span>Lexical Overlap (TF-IDF)</span>
                        <span>{Math.round(evaluation.tfidfScore * 100)}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-slate-100">
                        <div
                          className="h-2 rounded-full bg-indigo-500 transition-all duration-500"
                          style={{ width: `${evaluation.tfidfScore * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Grammar Score */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-slate-600">
                        <span>Writing & Grammar Score</span>
                        <span>{evaluation.grammarScore}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-slate-100">
                        <div
                          className="h-2 rounded-full bg-violet-500 transition-all duration-500"
                          style={{ width: `${evaluation.grammarScore}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Keyword Match */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-slate-600">
                        <span>Keyword Coverage</span>
                        <span>{Math.round(evaluation.keywordScore * 100)}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-slate-100">
                        <div
                          className="h-2 rounded-full bg-emerald-500 transition-all duration-500"
                          style={{ width: `${evaluation.keywordScore * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Grammar Issues Tag List */}
                  {evaluation.grammarIssues && evaluation.grammarIssues.length > 0 && (
                    <div className="pt-2">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Writing Quality Issues</span>
                      <div className="flex flex-wrap gap-2">
                        {evaluation.grammarIssues.map((issue, idx) => (
                          <span key={idx} className="text-[10px] font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg">
                            {issue}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Navigation row */}
                <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                  <button
                    onClick={exitSession}
                    className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-slate-800 transition"
                  >
                    Abort Interview
                  </button>
                  
                  <button
                    onClick={nextQuestion}
                    disabled={loading}
                    className="bg-[#0e1628] hover:bg-[#1a253c] text-white px-6 py-3.5 rounded-xl font-semibold shadow-[0_4px_10px_rgba(14,22,40,0.08)] transition flex items-center gap-2"
                  >
                    <span>{loading ? "Loading Next..." : "Next Question"}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
                </div>

              </div>
            )}

          </div>
        )}

        {/* 3. Session Results / Completed View */}
        {session && !question && finalResults && (
          <div className="bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-slate-100 space-y-8 animate-fade-in">
            
            {/* Completed Title */}
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-500 shadow-sm border border-emerald-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                </svg>
              </div>
              <h1 className="text-3xl font-extrabold text-[#0e1628] tracking-tight">Mock Interview Complete</h1>
              <p className="text-slate-500 text-sm">You have finished the {session.category} evaluation session successfully.</p>
            </div>

            {/* Score box */}
            <div className="rounded-2xl border border-slate-100 p-6 bg-slate-50/50 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-800">Overall Composite Score</p>
                <p className="text-xs text-slate-400 mt-1">Average calculated across all question attempts.</p>
              </div>
              <div className="text-right shrink-0">
                <span className={`text-4xl font-extrabold tracking-tight ${getScoreTextColor(finalResults.overallScore)}`}>
                  {finalResults.overallScore}%
                </span>
              </div>
            </div>

            {/* List of answers & scores */}
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-700">Detailed logs</p>
              
              <div className="divide-y divide-slate-100 rounded-2xl border border-slate-100 overflow-hidden bg-white">
                {finalResults.session?.responses?.map((resp, idx) => {
                  const qText = finalResults.session?.questions?.[idx]?.text || `Question ${idx + 1}`;
                  return (
                    <div key={resp._id} className="p-5 space-y-3 bg-white hover:bg-slate-50/50 transition">
                      <div className="flex justify-between items-start gap-4">
                        <h4 className="text-sm font-bold text-slate-800">{qText}</h4>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-lg shrink-0 ${getScoreBadgeColor(resp.evaluation?.finalScore || 0)}`}>
                          {resp.evaluation?.finalScore || 0}%
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 italic bg-slate-50/50 p-3 rounded-xl border border-slate-100/60 leading-relaxed">
                        " {resp.answerText} "
                      </div>
                      {(resp.evaluation?.suggestions?.[0] || resp.evaluation?.strengths?.[0]) && (
                        <p className="text-xs text-slate-500 leading-relaxed">
                          <span className="font-bold text-slate-600">Feedback:</span>{" "}
                          {resp.evaluation?.suggestions?.[0] || resp.evaluation?.strengths?.[0]}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex justify-center pt-2">
              <button
                onClick={exitSession}
                className="w-full sm:w-auto bg-[#0e1628] hover:bg-[#1a253c] text-white px-8 py-4 rounded-xl font-semibold shadow-sm transition"
              >
                Back to Workspace Home
              </button>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}
