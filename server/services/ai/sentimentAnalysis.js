/**
 * Sentiment/tone analysis using the `sentiment` package.
 * Useful mainly for HR/behavioral answers to flag overly negative tone.
 */
const Sentiment = require("sentiment");
const analyzer = new Sentiment();

/**
 * @param {string} text
 * @returns {{ score: number, comparative: number, label: string }}
 */
function analyzeSentiment(text) {
  const result = analyzer.analyze(text);
  let label = "neutral";
  if (result.comparative > 0.15) label = "positive";
  else if (result.comparative < -0.15) label = "negative";

  return { score: result.score, comparative: result.comparative, label };
}

module.exports = { analyzeSentiment };
