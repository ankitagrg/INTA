/**
 * Transformer-based semantic similarity using @xenova/transformers.
 * Runs a sentence-embedding model fully locally (no external API calls, no cost).
 *
 * NOTE: the model is downloaded and cached on first run — this can take a
 * minute or two the very first time you call getSemanticSimilarity(). Run
 * `npm run test:ai` early (see testRunner.js) to trigger and verify this
 * download before wiring it into live routes.
 */
const { pipeline } = require("@xenova/transformers");

let embedder = null;

async function getEmbedder() {
  if (!embedder) {
    // Small, fast, good-quality sentence embedding model
    embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  }
  return embedder;
}

function cosineSim(a, b) {
  let dot = 0, magA = 0, magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

/**
 * @param {string} userAnswer
 * @param {string} modelAnswer
 * @returns {Promise<number>} similarity score between 0 and 1
 */
async function getSemanticSimilarity(userAnswer, modelAnswer) {
  const model = await getEmbedder();

  const [userEmbedding, modelEmbedding] = await Promise.all([
    model(userAnswer, { pooling: "mean", normalize: true }),
    model(modelAnswer, { pooling: "mean", normalize: true }),
  ]);

  const similarity = cosineSim(userEmbedding.data, modelEmbedding.data);
  return Math.round(similarity * 100) / 100;
}

module.exports = { getSemanticSimilarity };
