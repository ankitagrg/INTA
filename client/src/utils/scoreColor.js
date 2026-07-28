export function getScoreTextColor(score) {
  if (score >= 75) return "text-emerald-600";
  if (score >= 40) return "text-amber-500";
  return "text-red-500";
}

export function getScoreBadgeColor(score) {
  if (score >= 75) return "text-emerald-600 bg-emerald-50";
  if (score >= 40) return "text-amber-600 bg-amber-50";
  return "text-red-600 bg-red-50";
}
