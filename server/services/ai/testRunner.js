/**
 * Standalone CLI test for the AI evaluation engine.
 * Run with: npm run test:ai
 * This lets you validate every AI module (and trigger the transformer
 * model download) BEFORE wiring the engine into live API routes.
 */
const { evaluateAnswer } = require("./evaluationEngine");

const sampleQuestion = {
  text: "What is the difference between SQL and NoSQL databases?",
  modelAnswer:
    "SQL databases are relational, use structured schemas with tables, and enforce ACID compliance, while NoSQL databases are non-relational, offer flexible schemas, and are designed for horizontal scalability with large unstructured data.",
  keywords: ["relational", "schema", "scalability", "ACID", "structured"],
};

const sampleUserAnswer =
  "SQL databases use tables and a fixed schema and are relational, they follow ACID rules. NoSQL databases don't have a fixed schema and scale horizontally better for big data.";

(async () => {
  console.log("Running AI evaluation engine test...\n");
  console.log("Question:", sampleQuestion.text);
  console.log("User answer:", sampleUserAnswer, "\n");

  try {
    const result = await evaluateAnswer(sampleUserAnswer, sampleQuestion);
    console.log("Evaluation result:");
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("Test failed:", error);
  }
})();
