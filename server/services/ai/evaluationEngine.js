/**
 * Composite evaluation engine.
 * Combines TF-IDF similarity, transformer semantic similarity, grammar
 * quality, sentiment, and keyword coverage into one weighted score + feedback.
 */
const { getTfidfSimilarity } = require("./tfidfSimilarity");
const { getSemanticSimilarity } = require("./semanticSimilarity");
const { checkGrammar } = require("./grammarCheck");
const { analyzeSentiment } = require("./sentimentAnalysis");
const { getKeywordMatchScore } = require("./keywordExtraction");

// Tune these weights as you validate against real answers
const WEIGHTS = {
  tfidf: 0.15,
  semantic: 0.40,
  grammar: 0.15,
  keyword: 0.25,
  sentiment: 0.05, // small influence; mainly a signal, not a hard penalty
};

function sentimentToUnitScore(label) {
  if (label === "negative") return 0.4;
  if (label === "positive") return 1.0;
  return 0.8; // neutral
}

function buildFeedback({ tfidfScore, semanticScore, grammar, keywordResult, sentiment, compositeScore }) {
  const notes = [];

  if (semanticScore < 0.5) {
    notes.push("Your answer's core meaning didn't align closely with what was expected — revisit the key concept.");
  } else if (semanticScore >= 0.8) {
    notes.push("Strong conceptual alignment with the expected answer.");
  }

  if (keywordResult.missed.length) {
    notes.push(`Consider mentioning: ${keywordResult.missed.join(", ")}.`);
  }

  if (grammar.issues.length) {
    notes.push(`Writing quality: ${grammar.issues.length} issue(s) flagged (e.g. passive voice, wordiness).`);
  }

  if (sentiment.label === "negative") {
    notes.push("Tone leaned negative — for HR/behavioral answers, aim for a more constructive tone.");
  }

  notes.push(`Overall score: ${compositeScore}/100.`);
  return notes.join(" ");
}

/**
 * @param {string} userAnswer
 * @param {{ modelAnswer: string, keywords: string[] }} question
 * @returns {Promise<object>} full evaluation result, ready to save to EvaluationResult model
 */
async function evaluateAnswer(userAnswer, question) {
  const { modelAnswer, keywords = [] } = question;

  const tfidfScore = getTfidfSimilarity(userAnswer, modelAnswer);
  const semanticScore = await getSemanticSimilarity(userAnswer, modelAnswer);
  const grammar = checkGrammar(userAnswer);
  const keywordResult = getKeywordMatchScore(userAnswer, keywords);
  const sentiment = analyzeSentiment(userAnswer);

  const compositeScore = Math.round(
    (tfidfScore * WEIGHTS.tfidf +
      semanticScore * WEIGHTS.semantic +
      (grammar.score / 100) * WEIGHTS.grammar +
      keywordResult.score * WEIGHTS.keyword +
      sentimentToUnitScore(sentiment.label) * WEIGHTS.sentiment) *
      100
  );

  const feedback = buildFeedback({
    tfidfScore,
    semanticScore,
    grammar,
    keywordResult,
    sentiment,
    compositeScore,
  });

  return {
    tfidfScore,
    semanticSimilarity: semanticScore,
    grammarIssues: grammar.issues,
    grammarScore: grammar.score,
    sentimentScore: sentiment.comparative,
    keywordMatchScore: keywordResult.score,
    compositeScore,
    feedback,
  };
}

module.exports = { evaluateAnswer };
