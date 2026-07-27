/**
 * Keyword coverage check: how many of the question's expected keywords
 * appear in the user's answer (case-insensitive, simple stemmed match).
 */
const natural = require("natural");
const stemmer = natural.PorterStemmer;

function stemSet(text) {
  const tokens = text.toLowerCase().match(/[a-z0-9]+/g) || [];
  return new Set(tokens.map((t) => stemmer.stem(t)));
}

/**
 * @param {string} userAnswer
 * @param {string[]} keywords
 * @returns {{ matched: string[], missed: string[], score: number }} score 0-1
 */
function getKeywordMatchScore(userAnswer, keywords = []) {
  if (!keywords.length) return { matched: [], missed: [], score: 1 };

  const answerStems = stemSet(userAnswer);
  const matched = [];
  const missed = [];

  keywords.forEach((kw) => {
    const kwStem = stemmer.stem(kw.toLowerCase());
    if (answerStems.has(kwStem)) matched.push(kw);
    else missed.push(kw);
  });

  const score = Math.round((matched.length / keywords.length) * 100) / 100;
  return { matched, missed, score };
}

module.exports = { getKeywordMatchScore };
