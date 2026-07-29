export function getScoreTextColor(score) {
  if (score >= 75) return "text-emerald-600 dark:text-emerald-400";
  if (score >= 40) return "text-amber-500 dark:text-amber-400";
  return "text-red-500 dark:text-red-400";
}

export function getScoreBadgeColor(score) {
  if (score >= 75) return "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10";
  if (score >= 40) return "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10";
  return "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10";
}
