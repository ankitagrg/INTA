import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as sessionService from "../services/sessionService";
import * as careerProfileService from "../services/careerProfileService";
import { getScoreTextColor } from "../utils/scoreColor";
import { notify } from "../utils/toast.js";
import { labelFor } from "../utils/labels.js";
import AppNav from "../components/AppNav.jsx";
import Button from "../components/Button.jsx";
import Spinner from "../components/Spinner.jsx";

const CATEGORIES = [
  {
    id: "technical",
    title: "Technical",
    description: "Test backend/frontend concepts, REST APIs, databases, and general programming terms.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
      </svg>
    ),
  },
  {
    id: "hr",
    title: "HR Fit",
    description: "Practice behavioral screening, career goals, team coordination, and company value alignments.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
  },
  {
    id: "behavioral",
    title: "Behavioral",
    description: "Evaluate conflict resolution, project struggles, and engineering teamwork using the STAR framework.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
      </svg>
    ),
  },
];

export default function Session() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("technical");
  const [session, setSession] = useState(null);
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [checkingProfile, setCheckingProfile] = useState(true);

  // Interviews are tailored to a career profile — send anyone who hasn't
  // set one up yet there first, rather than showing generic categories.
  useEffect(() => {
    (async () => {
      try {
        const { profile: myProfile } = await careerProfileService.getMyProfile();
        if (!myProfile) {
          navigate("/profile-setup", { replace: true });
          return;
        }
        setProfile(myProfile);
      } catch (err) {
        notify.apiError(err, "Could not load your career profile");
      } finally {
        setCheckingProfile(false);
      }
    })();
  }, [navigate]);

  const startSession = async (selectedCategory) => {
    const cat = selectedCategory || category;
    setLoading(true);
    try {
      const data = await sessionService.startSession(cat);
      setSession(data.session);
      setQuestion(data.question);
      setEvaluation(null);
      setAnswer("");
    } catch (err) {
      notify.apiError(err, "Could not start session");
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async () => {
    if (!answer.trim()) return;
    setLoading(true);
    try {
      const data = await sessionService.submitAnswer({
        sessionId: session._id,
        questionId: question._id,
        answerText: answer,
      });
      setEvaluation(data.evaluation);
    } catch (err) {
      notify.apiError(err, "Could not submit answer");
    } finally {
      setLoading(false);
    }
  };

  const nextQuestion = async () => {
    setLoading(true);
    try {
      const data = await sessionService.getNextQuestion(session._id);
      if (data.question) {
        setQuestion(data.question);
        setAnswer("");
        setEvaluation(null);
      } else {
        navigate(`/results/${session._id}`);
      }
    } catch (err) {
      notify.apiError(err, "Could not fetch next question");
    } finally {
      setLoading(false);
    }
  };

  const exitSession = () => {
    // Best-effort cleanup — leaving via the logo shouldn't block on the network.
    if (session) {
      sessionService.completeSession(session._id).catch(() => {});
    }
    setSession(null);
    setQuestion(null);
    setAnswer("");
    setEvaluation(null);
  };

  const abortAndViewResults = async () => {
    if (!session) return;
    setLoading(true);
    try {
      await sessionService.completeSession(session._id);
    } catch {
      // Still navigate — the results page will show whatever was already recorded.
    } finally {
      navigate(`/results/${session._id}`);
    }
  };

  if (checkingProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f0f4ff] to-[#f8f9ff] dark:from-slate-950 dark:to-slate-900 flex flex-col items-center justify-center gap-4">
        <Spinner size="lg" className="text-blue-600 dark:text-blue-400" />
        <p className="text-sm text-slate-500 dark:text-slate-400">Loading your interview workspace...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0f4ff] to-[#f8f9ff] dark:from-slate-950 dark:to-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      <AppNav onLogoClick={exitSession} />

      <main className="flex-1 max-w-3xl w-full mx-auto p-6 md:py-12">
        {/* 1. Category Selection View */}
        {!session && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-extrabold text-[#0e1628] dark:text-white tracking-tight">
                Start a mock interview
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Select a category below to test your skills and receive dynamic feedback.
              </p>
            </div>

            {profile && (
              <div className="flex items-center justify-between gap-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 px-5 py-3.5">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Personalizing for{" "}
                  <span className="font-bold text-slate-800 dark:text-slate-100">{labelFor(profile.position)}</span>
                  {profile.techStack?.length > 0 && (
                    <>
                      {" "}
                      &middot; {profile.techStack.slice(0, 3).map(labelFor).join(", ")}
                      {profile.techStack.length > 3 && ` +${profile.techStack.length - 3} more`}
                    </>
                  )}
                </p>
                <Link
                  to="/profile-setup"
                  className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 hover:underline shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 rounded"
                >
                  Edit profile
                </Link>
              </div>
            )}

            <div className="grid md:grid-cols-3 gap-5" role="radiogroup" aria-label="Interview category">
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  role="radio"
                  aria-checked={category === c.id}
                  onClick={() => setCategory(c.id)}
                  className={`text-left rounded-[24px] bg-white dark:bg-slate-900 p-6 border-2 transition-all cursor-pointer relative focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${
                    category === c.id
                      ? "border-blue-600 shadow-[0_4px_25px_rgba(37,99,235,0.06)]"
                      : "border-slate-200/60 dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                      category === c.id
                        ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400"
                        : "bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500"
                    }`}
                  >
                    {c.icon}
                  </div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base">{c.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{c.description}</p>
                  {category === c.id && (
                    <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-blue-600" aria-hidden="true" />
                  )}
                </button>
              ))}
            </div>

            <Button
              onClick={() => startSession()}
              loading={loading}
              className="w-full py-4.5"
            >
              {loading ? "Initializing Session..." : "Start Interview Workspace"}
              {!loading && (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              )}
            </Button>
          </div>
        )}

        {/* 2. Active Session & Question Workspace */}
        {session && question && (
          <div className="bg-white dark:bg-slate-900 rounded-[32px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-slate-100 dark:border-slate-800 space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
                {question.category} · Question {session.questions?.length || 1}
              </span>

              <span
                className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  question.difficulty === "easy"
                    ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10"
                    : question.difficulty === "medium"
                    ? "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10"
                    : "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10"
                }`}
              >
                {question.difficulty}
              </span>
            </div>

            <h2 className="text-xl font-bold text-[#0e1628] dark:text-white leading-snug">{question.text}</h2>

            <div className="space-y-2">
              <label htmlFor="answer" className="sr-only">
                Your answer
              </label>
              <textarea
                id="answer"
                rows={6}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                disabled={evaluation !== null}
                placeholder="Type your structured answer here... Consider structure, logic, and key technical concepts."
                className="w-full bg-[#f5f7fc] dark:bg-slate-800 border-none rounded-2xl px-5 py-4 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:focus:ring-violet-400/30 transition disabled:opacity-75"
              />
              <div className="flex justify-between text-[11px] text-slate-400 dark:text-slate-500 font-medium px-1">
                <span>Aim for at least 20-30 words for proper AI comparison</span>
                <span>{answer.trim().split(/\s+/).filter(Boolean).length} words</span>
              </div>
            </div>

            {!evaluation ? (
              <Button onClick={submitAnswer} loading={loading} disabled={!answer.trim()}>
                {loading ? "Evaluating Answer..." : "Submit for Local Evaluation"}
                {!loading && (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                )}
              </Button>
            ) : (
              <div className="space-y-6 pt-4 border-t border-slate-100 dark:border-slate-800 animate-fade-in">
                <div className="rounded-2xl border border-slate-100 dark:border-slate-800 p-6 flex flex-col md:flex-row md:items-start justify-between gap-6 bg-slate-50/50 dark:bg-slate-800/50">
                  <div className="space-y-3 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                      AI Evaluation Feedback
                    </p>
                    {evaluation.strengths?.length > 0 && (
                      <div className="space-y-1">
                        {evaluation.strengths.map((s, idx) => (
                          <p key={idx} className="text-sm text-emerald-700 dark:text-emerald-400 flex items-start gap-1.5">
                            <span aria-hidden="true">✓</span>
                            <span>{s}</span>
                          </p>
                        ))}
                      </div>
                    )}
                    {evaluation.weaknesses?.length > 0 && (
                      <div className="space-y-1">
                        {evaluation.weaknesses.map((w, idx) => (
                          <p key={idx} className="text-sm text-amber-700 dark:text-amber-400 flex items-start gap-1.5">
                            <span aria-hidden="true">!</span>
                            <span>{w}</span>
                          </p>
                        ))}
                      </div>
                    )}
                    {evaluation.suggestions?.length > 0 && (
                      <div className="space-y-1">
                        {evaluation.suggestions.map((s, idx) => (
                          <p key={idx} className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-1.5">
                            <span aria-hidden="true">→</span>
                            <span>{s}</span>
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-center justify-center shrink-0 border-l border-slate-100 dark:border-slate-800 pl-6 md:w-36 text-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                      Score
                    </span>
                    <span className={`text-4xl font-extrabold tracking-tight mt-1 ${getScoreTextColor(evaluation.finalScore)}`}>
                      {evaluation.finalScore}%
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Metric Breakdown
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { label: "Conceptual Alignment (Transformers)", value: evaluation.semanticScore * 100, color: "bg-blue-600" },
                      { label: "Lexical Overlap (TF-IDF)", value: evaluation.tfidfScore * 100, color: "bg-indigo-500" },
                      { label: "Writing & Grammar Score", value: evaluation.grammarScore, color: "bg-violet-500" },
                      { label: "Keyword Coverage", value: evaluation.keywordScore * 100, color: "bg-emerald-500" },
                    ].map((metric) => (
                      <div className="space-y-1" key={metric.label}>
                        <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
                          <span>{metric.label}</span>
                          <span>{Math.round(metric.value)}%</span>
                        </div>
                        <div
                          className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800"
                          role="progressbar"
                          aria-valuenow={Math.round(metric.value)}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={metric.label}
                        >
                          <div
                            className={`h-2 rounded-full ${metric.color} transition-all duration-500`}
                            style={{ width: `${metric.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {evaluation.grammarIssues && evaluation.grammarIssues.length > 0 && (
                    <div className="pt-2">
                      <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
                        Writing Quality Issues
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {evaluation.grammarIssues.map((issue, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-2.5 py-1 rounded-lg"
                          >
                            {issue}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={abortAndViewResults}
                    className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 rounded"
                  >
                    Abort Interview
                  </button>

                  <Button onClick={nextQuestion} loading={loading}>
                    {loading ? "Loading Next..." : "Next Question"}
                    {!loading && (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
