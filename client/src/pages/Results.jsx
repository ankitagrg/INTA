import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import * as sessionService from "../services/sessionService";
import { getScoreTextColor, getScoreBadgeColor } from "../utils/scoreColor";
import { notify, getErrorMessage } from "../utils/toast.js";
import AppNav from "../components/AppNav.jsx";
import Button from "../components/Button.jsx";
import Card from "../components/Card.jsx";
import Skeleton from "../components/Skeleton.jsx";

export default function Results() {
  const { sessionId } = useParams();
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await sessionService.getSessionResults(sessionId);
        setResults(data);
      } catch (err) {
        const message = getErrorMessage(err, "Could not load results");
        setError(message);
        notify.error(message);
      } finally {
        setLoading(false);
      }
    })();
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0f4ff] to-[#f8f9ff] dark:from-slate-950 dark:to-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      <AppNav />

      <main className="flex-1 max-w-3xl w-full mx-auto p-6 md:py-12">
        {loading && (
          <Card className="p-8 space-y-8" aria-busy="true" aria-label="Loading results">
            <div className="text-center space-y-3">
              <Skeleton className="h-12 w-12 rounded-full mx-auto" />
              <Skeleton className="h-6 w-64 mx-auto" />
              <Skeleton className="h-4 w-48 mx-auto" />
            </div>
            <Skeleton className="h-20 w-full" />
            <div className="space-y-3">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          </Card>
        )}

        {!loading && error && (
          <Card className="p-8 text-center space-y-4">
            <p className="text-sm text-red-600 dark:text-red-400 font-semibold">{error}</p>
            <Link to="/session">
              <Button variant="secondary">Back to Interview</Button>
            </Link>
          </Card>
        )}

        {!loading && results && (
          <Card className="p-8 space-y-8 animate-fade-in">
            {/* Completed Title */}
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto text-emerald-500 dark:text-emerald-400 shadow-sm border border-emerald-100 dark:border-emerald-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 h-6" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                </svg>
              </div>
              <h1 className="text-3xl font-extrabold text-[#0e1628] dark:text-white tracking-tight">
                Mock Interview Complete
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                You have finished the {results.session?.category} evaluation session.
              </p>
            </div>

            {/* Score box */}
            <div className="rounded-2xl border border-slate-100 dark:border-slate-800 p-6 bg-slate-50/50 dark:bg-slate-800/50 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Overall Score</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                  Average calculated across all question attempts.
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className={`text-4xl font-extrabold tracking-tight ${getScoreTextColor(results.overallScore)}`}>
                  {results.overallScore}%
                </span>
              </div>
            </div>

            {/* List of answers & scores */}
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Detailed logs
              </p>

              <div className="divide-y divide-slate-100 dark:divide-slate-800 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900">
                {results.session?.responses?.length ? (
                  results.session.responses.map((resp, idx) => {
                    const qText = results.session?.questions?.[idx]?.text || `Question ${idx + 1}`;
                    return (
                      <div key={resp._id} className="p-5 space-y-3 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition">
                        <div className="flex justify-between items-start gap-4">
                          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">{qText}</h4>
                          <span
                            className={`text-xs font-bold px-2 py-0.5 rounded-lg shrink-0 ${getScoreBadgeColor(resp.evaluation?.finalScore || 0)}`}
                          >
                            {resp.evaluation?.finalScore || 0}%
                          </span>
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-400 italic bg-slate-50/50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100/60 dark:border-slate-800 leading-relaxed">
                          " {resp.answerText} "
                        </div>
                        {(resp.evaluation?.suggestions?.[0] || resp.evaluation?.strengths?.[0]) && (
                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                            <span className="font-bold text-slate-600 dark:text-slate-300">Feedback:</span>{" "}
                            {resp.evaluation?.suggestions?.[0] || resp.evaluation?.strengths?.[0]}
                          </p>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <p className="p-5 text-xs text-slate-400 dark:text-slate-500 text-center">
                    No questions were answered in this session.
                  </p>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
              <Link to="/dashboard" className="w-full sm:w-auto">
                <Button variant="secondary" className="w-full">
                  View Dashboard
                </Button>
              </Link>
              <Link to="/session" className="w-full sm:w-auto">
                <Button variant="primary" className="w-full">
                  Back to Workspace Home
                </Button>
              </Link>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
}
