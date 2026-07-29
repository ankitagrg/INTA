import { useState } from "react";
import { Link } from "react-router-dom";
import BrandIcon from "../components/BrandIcon.jsx";
import ThemeToggle from "../components/ThemeToggle.jsx";

const TABS = [
  { id: "semantic", label: "⚡ Semantic Alignment" },
  { id: "grammar", label: "📝 Grammar Guard" },
  { id: "sentiment", label: "🎭 Tone Tracker" },
  { id: "keywords", label: "🏷️ Keyword Stemmer" },
];

export default function Landing() {
  const [activeTab, setActiveTab] = useState("semantic");

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 antialiased font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden relative">

      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-[130px] pointer-events-none -z-10" aria-hidden="true"></div>
      <div className="absolute top-[400px] right-1/4 w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[130px] pointer-events-none -z-10" aria-hidden="true"></div>
      <div className="absolute bottom-[200px] left-10 w-[400px] h-[400px] rounded-full bg-sky-500/5 blur-[120px] pointer-events-none -z-10" aria-hidden="true"></div>

      {/* Glassmorphic Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="mx-auto w-full max-w-[1100px] px-6 sm:px-8 flex h-16 items-center justify-between">
          <Link className="flex items-center gap-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 rounded-lg" to="/">
            <div className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.4)]">
              <BrandIcon />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">INTA</span>
          </Link>

          <nav aria-label="Page sections" className="hidden items-center gap-8 md:flex">
            <a className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" href="#features">Features</a>
            <a className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" href="#playground">AI Playground</a>
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <ThemeToggle />
            <Link className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors" to="/login">Sign in</Link>
            <Link
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4.5 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition shadow-[0_4px_14px_rgba(37,99,235,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              to="/signup"
            >
              Get started
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      <main>

        {/* Hero Section */}
        <section className="pt-24 pb-16 sm:pt-32 sm:pb-24">
          <div className="mx-auto w-full max-w-[1100px] px-6 sm:px-8 text-center space-y-8">

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200/60 dark:border-blue-500/20 text-[11px] font-semibold text-blue-700 dark:text-blue-400 tracking-wider uppercase shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping" aria-hidden="true"></span>
              100% Offline AI · Zero API Fees · Pure Privacy
            </div>

            <h1 className="mx-auto max-w-4xl text-[44px] sm:text-[60px] lg:text-[72px] font-extrabold leading-[1.05] tracking-[-0.03em] text-slate-900 dark:text-white">
              Your interview prep,<br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                finally intelligent.
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-base sm:text-lg leading-[1.7] text-slate-600 dark:text-slate-400 font-normal">
              INTA runs transformer embeddings, semantic scoring, and keyword coverage checks locally on your backend. Improve technical depth, behavioral structure, and communication without paid APIs.
            </p>

            <div className="flex flex-wrap justify-center items-center gap-4 pt-2">
              <Link
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white hover:bg-blue-700 transition shadow-[0_4px_20px_rgba(37,99,235,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                to="/signup"
              >
                Launch Mock Workspace
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="h-4 w-4" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <a className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors py-3 px-4" href="#playground">
                Explore AI Playground ↓
              </a>
            </div>

          </div>
        </section>

        {/* Dynamic AI Playground Section */}
        <section id="playground" className="py-20 border-t border-slate-200/80 dark:border-slate-800">
          <div className="mx-auto w-full max-w-[1100px] px-6 sm:px-8 space-y-12">

            <div className="text-center space-y-3">
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Interactive AI Pipeline</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm max-w-lg mx-auto">
                Explore how INTA evaluates candidate responses locally across multiple scoring modules.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">

              {/* Tab Controls */}
              <div
                role="tablist"
                aria-label="AI evaluation modules"
                className="lg:col-span-4 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0"
              >
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    id={`tab-${tab.id}`}
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    aria-controls={`panel-${tab.id}`}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 text-left px-5 py-4 rounded-2xl border transition-all text-xs font-bold uppercase tracking-wider shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${
                      activeTab === tab.id
                        ? "bg-white dark:bg-slate-800 border-blue-500 text-blue-600 dark:text-blue-400 shadow-sm"
                        : "bg-slate-100/60 dark:bg-slate-900 border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Display Canvas */}
              <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm min-h-[360px] flex flex-col justify-between animate-fade-in relative overflow-hidden">
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div>

                {/* 1. Semantic Tab */}
                {activeTab === "semantic" && (
                  <div id="panel-semantic" role="tabpanel" aria-labelledby="tab-semantic" className="space-y-6 animate-fade-in">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span>Semantic Context Matching</span>
                        <span className="text-[10px] bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 font-semibold px-2 py-0.5 rounded-full uppercase">Transformer Model</span>
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-xs mt-1.5 leading-relaxed">
                        Converts sentences into high-dimensional vector embeddings locally using the <strong>MiniLM-L6-v2</strong> pipeline to test conceptual accuracy beyond exact keywords.
                      </p>
                    </div>

                    <div className="space-y-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 p-4.5 rounded-2xl">
                      <div className="text-xs">
                        <span className="text-blue-600 dark:text-blue-400 font-bold block mb-1">Standard Model Answer:</span>
                        <p className="text-slate-700 dark:text-slate-300">"REST APIs are stateless resources queried using HTTP methods."</p>
                      </div>
                      <div className="text-xs border-t border-slate-200/80 dark:border-slate-800 pt-3">
                        <span className="text-indigo-600 dark:text-indigo-400 font-bold block mb-1">Candidate Response:</span>
                        <p className="text-slate-700 dark:text-slate-300">"They use HTTP protocols to retrieve data and don't store client state."</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-200/80 dark:border-slate-800 pt-4">
                      <div>
                        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Contextual Score</span>
                        <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">91% Similarity</span>
                      </div>
                      <div className="w-1/2">
                        <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800">
                          <div className="h-2 rounded-full bg-emerald-500" style={{ width: "91%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Grammar Tab */}
                {activeTab === "grammar" && (
                  <div id="panel-grammar" role="tabpanel" aria-labelledby="tab-grammar" className="space-y-6 animate-fade-in">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span>Stylistic Grammar Guard</span>
                        <span className="text-[10px] bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 font-semibold px-2 py-0.5 rounded-full uppercase">write-good NLP</span>
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-xs mt-1.5 leading-relaxed">
                        Evaluates readability, passive voice, wordiness, clichés, and spelling issues instantly to ensure professional articulation.
                      </p>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 p-4.5 rounded-2xl space-y-3">
                      <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide block">Underlined Critiques:</span>
                      <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                        "We completed the build in a team. Actually, <span className="border-b border-dashed border-amber-500 text-amber-800 dark:text-amber-400 font-medium" title="Weasel word">it was completed</span> by our lead engineer. <span className="border-b border-dashed border-amber-500 text-amber-800 dark:text-amber-400 font-medium" title="Cliché">At the end of the day</span>, we successfully deployed it."
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-200/80 dark:border-slate-800 pt-4">
                      <div>
                        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Grammar Score</span>
                        <span className="text-2xl font-black text-amber-600 dark:text-amber-400">80/100</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20">Passive Voice Detected</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20">Cliché Flagged</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. Sentiment Tab */}
                {activeTab === "sentiment" && (
                  <div id="panel-sentiment" role="tabpanel" aria-labelledby="tab-sentiment" className="space-y-6 animate-fade-in">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span>HR Sentiment Analyzer</span>
                        <span className="text-[10px] bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 font-semibold px-2 py-0.5 rounded-full uppercase">Sentiment Lexicon</span>
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-xs mt-1.5 leading-relaxed">
                        Tracks emotional valence of HR responses to help candidate answers project confidence and constructive attitudes instead of negativity.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 p-3.5 rounded-xl flex justify-between items-center text-xs">
                        <span className="text-slate-700 dark:text-slate-300 font-medium font-mono text-[11px] truncate pr-4">"The team failed completely because of poor code quality, it was horrible."</span>
                        <span className="text-[9px] font-bold px-2.5 py-1 rounded bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400 shrink-0 uppercase tracking-wider">Negative Vibe</span>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 p-3.5 rounded-xl flex justify-between items-center text-xs">
                        <span className="text-slate-700 dark:text-slate-300 font-medium font-mono text-[11px] truncate pr-4">"We hit code bottlenecks, which allowed us to restructure lint configurations collectively."</span>
                        <span className="text-[9px] font-bold px-2.5 py-1 rounded bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 shrink-0 uppercase tracking-wider">Positive Vibe</span>
                      </div>
                    </div>

                    <div className="border-t border-slate-200/80 dark:border-slate-800 pt-4 text-left">
                      <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Influence on Score</span>
                      <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Small influence (5%) strictly focused on flagging HR/behavioral blockers.</p>
                    </div>
                  </div>
                )}

                {/* 4. Keywords Tab */}
                {activeTab === "keywords" && (
                  <div id="panel-keywords" role="tabpanel" aria-labelledby="tab-keywords" className="space-y-6 animate-fade-in">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span>Technical Keyword Stemmer</span>
                        <span className="text-[10px] bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 font-semibold px-2 py-0.5 rounded-full uppercase">Porter Stemming</span>
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-xs mt-1.5 leading-relaxed">
                        Validates key technical phrases by mapping words back to their root stems (e.g. mapping "scaling", "scalable", "scales" to "scale") to check content coverage.
                      </p>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 p-4.5 rounded-2xl space-y-4">
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Expected Key Terms:</span>
                        <div className="flex flex-wrap gap-2">
                          <span className="text-xs px-2.5 py-1 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold">relational</span>
                          <span className="text-xs px-2.5 py-1 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold">ACID</span>
                          <span className="text-xs px-2.5 py-1 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold">schema</span>
                          <span className="text-xs px-2.5 py-1 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold">scaling</span>
                        </div>
                      </div>

                      <div className="space-y-1.5 border-t border-slate-200/80 dark:border-slate-800 pt-3">
                        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Match Status:</span>
                        <div className="flex flex-wrap gap-2">
                          <span className="text-xs px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 font-semibold flex items-center gap-1">✓ relational</span>
                          <span className="text-xs px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 font-semibold flex items-center gap-1">✓ ACID</span>
                          <span className="text-xs px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 font-semibold flex items-center gap-1">✓ schema</span>
                          <span className="text-xs px-2.5 py-1 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-500/20 font-semibold flex items-center gap-1">✗ scaling</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-200/80 dark:border-slate-800 pt-4">
                      <div>
                        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Coverage Score</span>
                        <span className="text-2xl font-black text-blue-600 dark:text-blue-400">75% Matches</span>
                      </div>
                      <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold italic">Missed stem: "scale"</span>
                    </div>
                  </div>
                )}

              </div>

            </div>

          </div>
        </section>

        {/* Features List Section */}
        <section id="features" className="py-24 border-t border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="mx-auto w-full max-w-[1100px] px-6 sm:px-8 space-y-16">

            <div className="max-w-xl space-y-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Modern AI Infrastructure.<br />
                Run fully on your server.
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
                No external API latency, no credit cards required, and complete safety for university placement coordination.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

              <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-8 hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition duration-300 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-200 dark:border-blue-500/20 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Vite + React.js Core</h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                  Highly responsive Single Page Application UI styled with utility configurations from Tailwind CSS.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-8 hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition duration-300 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-200 dark:border-blue-500/20 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9s2.015-9 4.5-9m0 0a9.015 9.015 0 0 1 8.716 5.253M12 3a9.015 9.015 0 0 0-8.716 5.253M12 12h.008v.008H12V12Z" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">JWT Secured Workspaces</h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                  Token authorization rules and encrypted user databases using bcryptjs credentials hashing.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-8 hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition duration-300 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-200 dark:border-blue-500/20 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Adaptive Complexity Loops</h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                  Automatically shifts question difficulty (Easy, Medium, Hard) on the fly matching the candidate's average rating.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 pb-24">
          <div className="mx-auto w-full max-w-[1100px] px-6 sm:px-8">
            <div className="rounded-3xl border border-blue-100 dark:border-blue-500/20 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 px-8 py-16 text-center shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-white/10 rounded-full blur-[100px] -mr-32 -mt-32" aria-hidden="true"></div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white relative z-10">
                Unlock career readiness.
              </h2>
              <p className="mt-4 max-w-md mx-auto text-sm text-blue-100 leading-relaxed relative z-10">
                Create your workspace, select category modules, and check evaluations instantly using local NLP models.
              </p>
              <div className="mt-8 flex justify-center gap-4 relative z-10">
                <Link
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-blue-700 hover:bg-blue-50 transition shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  to="/signup"
                >
                  Start practicing
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="h-4 w-4" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 py-16 text-slate-500 dark:text-slate-400">
        <div className="mx-auto w-full max-w-[1100px] px-6 sm:px-8 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                <BrandIcon />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">INTA</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
              Intelligent Local Interview Preparation Workspace built for seamless offline scoring, zero latency, and pure privacy.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">Product</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#features" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Features</a></li>
              <li><a href="#playground" className="hover:text-blue-600 dark:hover:text-blue-400 transition">AI Pipeline</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">Institution</h4>
            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
              Gandaki College of Engineering and Science (GCES)
            </p>
            <p className="text-[11px] text-slate-400 dark:text-slate-500">
              Department of Software Engineering
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">Project Team & Committee</h4>
            <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
              <p><strong className="text-slate-700 dark:text-slate-300">Members:</strong> Ankita Gurung & Sabina Karki</p>
              <p><strong className="text-slate-700 dark:text-slate-300">Supervisor:</strong> Er. Ranjan Adhikari</p>
              <p><strong className="text-slate-700 dark:text-slate-300">Coordinator:</strong> Er. Santosh Panth</p>
            </div>
          </div>
        </div>

        <div className="mt-12 mx-auto w-full max-w-[1100px] px-6 sm:px-8 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 dark:text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} INTA — Gandaki College of Engineering and Science. All rights reserved.</p>
          <p className="font-mono text-[11px]">Local NLP · Transformer Embeddings · MiniLM</p>
        </div>
      </footer>

    </div>
  );
}
