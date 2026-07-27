/**
 * Grammar / writing-quality check using `write-good`.
 * Flags passive voice, wordiness, weasel words, clichés, etc.
 */
const writeGood = require("write-good");

/**
 * @param {string} text
 * @returns {{ issues: string[], score: number }} score 0-100, 100 = no issues found
 */
function checkGrammar(text) {
  const suggestions = writeGood(text);
  const issues = suggestions.map((s) => s.reason);

  // Simple scoring: penalize per flagged issue, floor at 0
  const wordCount = text.trim().split(/\s+/).length || 1;
  const penaltyPerIssue = Math.min(15, 300 / wordCount); // shorter answers penalized less harshly per issue
  const score = Math.max(0, Math.round(100 - issues.length * penaltyPerIssue));

  return { issues, score };
}

module.exports = { checkGrammar };
