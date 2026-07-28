/**
 * AI Evaluation Engine — orchestrates the full answer-scoring pipeline.
 *
 * Step 1: Grammar Evaluation   (write-good)
 * Step 2: Sentiment Analysis   (sentiment)
 * Step 3: Keyword Matching     (natural, Porter stemming)
 * Step 4: TF-IDF Similarity    (natural)
 * Step 5: Semantic Similarity  (@xenova/transformers — model cached after first load)
 * Step 6: Weighted composite score + structured feedback
 */
const { checkGrammar } = require("./grammarCheck");
const { analyzeSentiment } = require("./sentimentAnalysis");
const { getKeywordMatchScore } = require("./keywordExtraction");
const { getTfidfSimilarity } = require("./tfidfSimilarity");
const { getSemanticSimilarity } = require("./semanticSimilarity");

// Tune these as you validate against real sample answers.
const WEIGHTS = {
  semantic: 0.4,
  tfidf: 0.25,
  keyword: 0.15,
  grammar: 0.1,
  sentiment: 0.1,
};

function sentimentToUnitScore(label) {
  if (label === "negative") return 0.4;
  if (label === "positive") return 1.0;
  return 0.8; // neutral
}

function buildFeedback({ semanticScore, tfidfScore, grammar, keywordResult, sentiment }) {
  const strengths = [];
  const weaknesses = [];
  const suggestions = [];

  // Semantic (40%) — the strongest signal of whether the answer is conceptually correct
  if (semanticScore >= 0.8) {
    strengths.push("Strong conceptual alignment with the expected answer.");
  } else if (semanticScore < 0.5) {
    weaknesses.push("Your answer's core meaning didn't align closely with what was expected.");
    suggestions.push("Revisit the key concept behind this question and make sure your answer addresses it directly.");
  }

  // TF-IDF (25%) — lexical overlap; can diverge from semantic score if the right idea is expressed in very different words
  if (tfidfScore < 0.3) {
    weaknesses.push("Limited overlap with the specific terminology used in the expected answer.");
    suggestions.push("Try using more of the precise technical terms relevant to this question.");
  }

  // Keyword coverage (15%)
  if (keywordResult.missed.length) {
    weaknesses.push(`Missing expected keywords: ${keywordResult.missed.join(", ")}.`);
    suggestions.push(`Consider mentioning: ${keywordResult.missed.join(", ")}.`);
  } else if (keywordResult.matched.length) {
    strengths.push("Covered all expected keywords.");
  }

  // Grammar (10%)
  if (grammar.issues.length === 0) {
    strengths.push("No grammar or writing-quality issues detected.");
  } else {
    weaknesses.push(`${grammar.issues.length} writing issue(s) detected (e.g. passive voice, wordiness, clichés).`);
    suggestions.push("Review your answer for passive voice, wordiness, or clichés.");
  }

  // Sentiment (10%) — mainly a signal for HR/behavioral tone, not a hard penalty
  if (sentiment.label === "positive") {
    strengths.push("Tone was positive and constructive.");
  } else if (sentiment.label === "negative") {
    weaknesses.push("Tone leaned negative.");
    suggestions.push("Aim for a more constructive, confident tone, especially for HR/behavioral answers.");
  }

  return { strengths, weaknesses, suggestions };
}

/**
 * @param {string} userAnswer
 * @param {{ modelAnswer: string, keywords: string[] }} question
 * @returns {Promise<object>} full evaluation result, ready to save to EvaluationResult
 */
async function evaluateAnswer(userAnswer, question) {
  const { modelAnswer, keywords = [] } = question;

  // Step 1: Grammar Evaluation
  const grammar = checkGrammar(userAnswer);

  // Step 2: Sentiment Analysis
  const sentiment = analyzeSentiment(userAnswer);

  // Step 3: Keyword Matching
  const keywordResult = getKeywordMatchScore(userAnswer, keywords);

  // Step 4: TF-IDF Similarity
  const tfidfScore = getTfidfSimilarity(userAnswer, modelAnswer);

  // Step 5: Semantic Similarity (transformer model is loaded once and cached — see semanticSimilarity.js)
  const semanticScore = await getSemanticSimilarity(userAnswer, modelAnswer);

  // Step 6: Weighted composite score
  const finalScore = Math.round(
    (semanticScore * WEIGHTS.semantic +
      tfidfScore * WEIGHTS.tfidf +
      keywordResult.score * WEIGHTS.keyword +
      (grammar.score / 100) * WEIGHTS.grammar +
      sentimentToUnitScore(sentiment.label) * WEIGHTS.sentiment) *
      100
  );

  const { strengths, weaknesses, suggestions } = buildFeedback({
    semanticScore,
    tfidfScore,
    grammar,
    keywordResult,
    sentiment,
  });

  return {
    finalScore,
    semanticScore,
    tfidfScore,
    grammarIssues: grammar.issues,
    grammarScore: grammar.score, // not in the required shape, but kept: grammar is 10% of finalScore and the UI shows it
    sentiment,
    keywordScore: keywordResult.score,
    strengths,
    weaknesses,
    suggestions,
  };
}

module.exports = { evaluateAnswer };
