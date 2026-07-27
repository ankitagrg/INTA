/**
 * TF-IDF based lexical similarity between a user's answer and the model answer.
 * Uses the `natural` library's TfIdf + cosine similarity on term vectors.
 */
const natural = require("natural");
const { TfIdf } = natural;

function cosineSimilarity(vecA, vecB) {
  const terms = new Set([...Object.keys(vecA), ...Object.keys(vecB)]);
  let dot = 0, magA = 0, magB = 0;

  terms.forEach((term) => {
    const a = vecA[term] || 0;
    const b = vecB[term] || 0;
    dot += a * b;
    magA += a * a;
    magB += b * b;
  });

  if (magA === 0 || magB === 0) return 0;
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

function getTfidfVector(tfidf, docIndex) {
  const vector = {};
  tfidf.listTerms(docIndex).forEach((item) => {
    vector[item.term] = item.tfidf;
  });
  return vector;
}

/**
 * @param {string} userAnswer
 * @param {string} modelAnswer
 * @returns {number} similarity score between 0 and 1
 */
function getTfidfSimilarity(userAnswer, modelAnswer) {
  const tfidf = new TfIdf();
  tfidf.addDocument(modelAnswer);
  tfidf.addDocument(userAnswer);

  const vecModel = getTfidfVector(tfidf, 0);
  const vecUser = getTfidfVector(tfidf, 1);

  const similarity = cosineSimilarity(vecModel, vecUser);
  return Math.round(similarity * 100) / 100;
}

module.exports = { getTfidfSimilarity };
