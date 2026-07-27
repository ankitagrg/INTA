/**
 * Seeds a handful of sample interview questions so you can test the
 * full flow immediately after setup, without building an admin panel first.
 * Run with: node seed.js  (from inside /server, with .env configured)
 */
require("dotenv").config();
const mongoose = require("mongoose");
const Question = require("./models/Question");

const sampleQuestions = [
  {
    text: "What is the difference between SQL and NoSQL databases?",
    category: "technical",
    role: "general",
    difficulty: "medium",
    modelAnswer:
      "SQL databases are relational, use structured schemas with tables, and enforce ACID compliance, while NoSQL databases are non-relational, offer flexible schemas, and are designed for horizontal scalability with large unstructured data.",
    keywords: ["relational", "schema", "scalability", "ACID", "structured"],
  },
  {
    text: "Explain the concept of REST APIs.",
    category: "technical",
    role: "general",
    difficulty: "easy",
    modelAnswer:
      "REST APIs are stateless web services that use standard HTTP methods like GET, POST, PUT, and DELETE to perform operations on resources, typically identified by URLs and represented in formats like JSON.",
    keywords: ["stateless", "HTTP", "resources", "JSON", "endpoints"],
  },
  {
    text: "Tell me about a time you faced a conflict in a team project and how you resolved it.",
    category: "behavioral",
    role: "general",
    difficulty: "medium",
    modelAnswer:
      "A strong answer describes a specific situation, the task at hand, the action taken to communicate and resolve the disagreement constructively, and the positive result achieved for the team.",
    keywords: ["communication", "team", "resolution", "outcome"],
  },
  {
    text: "Why do you want to work at this company?",
    category: "hr",
    role: "general",
    difficulty: "easy",
    modelAnswer:
      "A good answer connects the candidate's skills and values to the company's mission and products, and shows genuine research into the company rather than a generic response.",
    keywords: ["mission", "values", "research", "growth"],
  },
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    await Question.deleteMany({});
    await Question.insertMany(sampleQuestions);

    console.log(`Seeded ${sampleQuestions.length} questions successfully.`);
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
})();
