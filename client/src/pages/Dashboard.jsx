import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import * as sessionService from "../services/sessionService";
import { useTheme } from "../hooks/useTheme.js";
import { notify } from "../utils/toast.js";
import AppNav from "../components/AppNav.jsx";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";
import { DashboardSkeleton } from "../components/Skeleton.jsx";
import { getScoreTextColor } from "../utils/scoreColor";

// Fixed categorical order (never cycled/reassigned) + a single sequential hue
// for the single-series charts, per the project's data-viz color guidelines.
// Dark-mode steps match the same validated palette's dark set, not an
// automatic flip.
const PALETTE = {
  light: {
    blue: "#2a78d6",
    orange: "#eb6834",
    aqua: "#1baf7a",
    grid: "#e1e0d9",
    axis: "#c3c2b7",
    muted: "#898781",
    text: "#52514e",
    tooltipBg: "#ffffff",
    tooltipBorder: "#e2e8f0",
    tooltipText: "#334155",
  },
  dark: {
    blue: "#3987e5",
    orange: "#d95926",
    aqua: "#199e70",
    grid: "#2c2c2a",
    axis: "#383835",
    muted: "#898781",
    text: "#c3c2b7",
    tooltipBg: "#1e293b",
    tooltipBorder: "#334155",
    tooltipText: "#e2e8f0",
  },
};

const LABELS = {
  technical: "Technical",
  hr: "HR",
  behavioral: "Behavioral",
  java: "Java",
  python: "Python",
  javascript: "JavaScript",
  react: "React",
  node: "Node",
  database: "Database",
  networking: "Networking",
  oop: "OOP",
  "operating-system": "OS",
  general: "General",
};
const label = (key) => LABELS[key] || key;

const formatDate = (iso) => new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });

function ChartTooltip({ active, payload, label: tooltipLabel, colors }) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-xl shadow-lg px-3 py-2 text-xs border"
      style={{ background: colors.tooltipBg, borderColor: colors.tooltipBorder, color: colors.tooltipText }}
    >
      <p className="font-bold mb-0.5">{tooltipLabel}</p>
      <p>{payload[0].value}%</p>
    </div>
  );
}

function StatTile({ tile, value }) {
  return (
    <Card className="p-5">
      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">{tile}</p>
      <p className={`text-3xl font-extrabold tracking-tight mt-1.5 ${getScoreTextColor(value)}`}>{value}%</p>
    </Card>
  );
}

function ChartCard({ title, subtitle, empty, children }) {
  return (
    <Card className="p-6">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">{title}</p>
      {subtitle && <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">{subtitle}</p>}
      <div className="mt-4 h-64">
        {empty ? (
          <div className="h-full flex items-center justify-center text-xs text-slate-400 dark:text-slate-500 text-center px-6">
            Not enough data yet — complete a few interviews to see this chart.
          </div>
        ) : (
          children
        )}
      </div>
    </Card>
  );
}

export default function Dashboard() {
  const { theme } = useTheme();
  const colors = PALETTE[theme] || PALETTE.light;
  const CATEGORY_COLORS = { technical: colors.blue, hr: colors.orange, behavioral: colors.aqua };

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const result = await sessionService.getDashboard();
        setData(result);
      } catch (err) {
        notify.apiError(err, "Could not load dashboard");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0f4ff] to-[#f8f9ff] dark:from-slate-950 dark:to-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      <AppNav />

      <main className="flex-1 max-w-6xl w-full mx-auto p-6 md:py-12 space-y-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-[#0e1628] dark:text-white tracking-tight">Your Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Performance across every mock interview you've completed.
          </p>
        </div>

        {loading && <DashboardSkeleton />}

        {!loading && data && data.totalInterviews === 0 && (
          <Card className="rounded-[32px] p-10 text-center space-y-4">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">No interviews yet</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Complete your first mock interview to start seeing your score trends, strengths, and weak spots here.
            </p>
            <Link to="/session">
              <Button variant="primary">Start your first interview</Button>
            </Link>
          </Card>
        )}

        {!loading && data && data.totalInterviews > 0 && (
          <>
            {/* Stats row */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatTile tile="Overall Score" value={data.overallScore} />
              <StatTile tile="Average Score" value={data.averageScore} />
              <StatTile tile="Best Score" value={data.bestScore} />
              <Card className="p-5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                  Total Interviews
                </p>
                <p className="text-3xl font-extrabold tracking-tight mt-1.5 text-slate-900 dark:text-white">
                  {data.totalInterviews}
                </p>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-6">
              <ChartCard
                title="Performance Trend"
                subtitle="Overall score per interview, over time"
                empty={data.performanceTrend.length === 0}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.performanceTrend} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                    <CartesianGrid stroke={colors.grid} vertical={false} />
                    <XAxis
                      dataKey="date"
                      tickFormatter={formatDate}
                      stroke={colors.axis}
                      tick={{ fill: colors.muted, fontSize: 11 }}
                      tickLine={false}
                    />
                    <YAxis
                      domain={[0, 100]}
                      stroke={colors.axis}
                      tick={{ fill: colors.muted, fontSize: 11 }}
                      tickLine={false}
                      width={36}
                    />
                    <Tooltip content={<ChartTooltip colors={colors} />} labelFormatter={formatDate} />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke={colors.blue}
                      strokeWidth={2}
                      dot={{ r: 4, fill: colors.blue, stroke: colors.tooltipBg, strokeWidth: 2 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard
                title="Category-wise Scores"
                subtitle="Average score by interview category"
                empty={data.categoryScores.length === 0}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.categoryScores} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                    <CartesianGrid stroke={colors.grid} vertical={false} />
                    <XAxis
                      dataKey="category"
                      tickFormatter={label}
                      stroke={colors.axis}
                      tick={{ fill: colors.muted, fontSize: 11 }}
                      tickLine={false}
                    />
                    <YAxis
                      domain={[0, 100]}
                      stroke={colors.axis}
                      tick={{ fill: colors.muted, fontSize: 11 }}
                      tickLine={false}
                      width={36}
                    />
                    <Tooltip content={<ChartTooltip colors={colors} />} labelFormatter={label} />
                    <Bar dataKey="score" radius={[4, 4, 0, 0]} maxBarSize={56}>
                      {data.categoryScores.map((entry) => (
                        <Cell key={entry.category} fill={CATEGORY_COLORS[entry.category] || colors.blue} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard
                title="Topic-wise Scores"
                subtitle="Average score per technical topic"
                empty={data.topicScores.length === 0}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={data.topicScores} outerRadius="75%">
                    <PolarGrid stroke={colors.grid} />
                    <PolarAngleAxis dataKey="topic" tickFormatter={label} tick={{ fill: colors.text, fontSize: 11 }} />
                    <PolarRadiusAxis domain={[0, 100]} tick={{ fill: colors.muted, fontSize: 10 }} tickCount={5} />
                    <Tooltip content={<ChartTooltip colors={colors} />} labelFormatter={label} />
                    <Radar dataKey="score" stroke={colors.blue} fill={colors.blue} fillOpacity={0.15} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              </ChartCard>

              {/* Strong / Weak Topics */}
              <Card className="p-6 space-y-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Strong Topics
                  </p>
                  {data.strongTopics.length === 0 ? (
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">Not enough technical answers yet.</p>
                  ) : (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {data.strongTopics.map((t) => (
                        <span
                          key={t.topic}
                          className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20"
                        >
                          {label(t.topic)} · {t.score}%
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Weak Topics
                  </p>
                  {data.weakTopics.length === 0 ? (
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">Not enough technical answers yet.</p>
                  ) : (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {data.weakTopics.map((t) => (
                        <span
                          key={t.topic}
                          className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-100 dark:border-amber-500/20"
                        >
                          {label(t.topic)} · {t.score}%
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Recent Interviews */}
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Recent Interviews
              </p>
              <div className="divide-y divide-slate-100 dark:divide-slate-800 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900">
                {data.recentInterviews.map((interview) => (
                  <Link
                    key={interview.id}
                    to={`/results/${interview.id}`}
                    className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-500"
                  >
                    <div>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                        {label(interview.category)}
                        {interview.role !== "general" && ` · ${label(interview.role)}`}
                      </p>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                        {formatDate(interview.createdAt)} · {interview.questionCount} question
                        {interview.questionCount === 1 ? "" : "s"} ·{" "}
                        <span
                          className={
                            interview.status === "completed"
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-amber-600 dark:text-amber-400"
                          }
                        >
                          {interview.status}
                        </span>
                      </p>
                    </div>
                    <span className={`text-lg font-extrabold shrink-0 ${getScoreTextColor(interview.overallScore)}`}>
                      {interview.overallScore}%
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
