/**
 * Seeds the Question collection from seed/questions.js so the interview
 * flow has data to serve right after setup, without building an admin
 * panel first. Safe to re-run — it replaces the entire collection each
 * time rather than appending duplicates.
 *
 * Run with: npm run seed  (from inside /server, with .env configured)
 */
require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });
const mongoose = require("mongoose");
const Question = require("../models/Question");
const questions = require("./questions");

function summarize(seeded) {
  const byCategory = {};

  for (const q of seeded) {
    byCategory[q.category] ??= {};
    byCategory[q.category][q.role] ??= { easy: 0, medium: 0, hard: 0 };
    byCategory[q.category][q.role][q.difficulty] += 1;
  }

  for (const [category, byRole] of Object.entries(byCategory)) {
    console.log(`\n${category}:`);
    for (const [role, counts] of Object.entries(byRole)) {
      const total = counts.easy + counts.medium + counts.hard;
      console.log(
        `  ${role.padEnd(18)} ${total} (easy: ${counts.easy}, medium: ${counts.medium}, hard: ${counts.hard})`
      );
    }
  }
}

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    await Question.deleteMany({});
    const seeded = await Question.insertMany(questions);

    console.log(`\nSeeded ${seeded.length} questions successfully.`);
    summarize(seeded);

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
})();
