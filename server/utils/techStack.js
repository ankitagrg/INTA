// Single source of truth for career-profile option lists (reused by the
// validator so the allowed-values check never drifts from what the
// frontend renders) and for mapping a user's freeform tech-stack
// selections onto the Question model's existing `role` tags.

const POSITIONS = [
  "frontend-developer",
  "backend-developer",
  "fullstack-developer",
  "mern-stack-developer",
  "react-developer",
  "nodejs-developer",
  "java-developer",
  "python-developer",
  "flutter-developer",
  "devops-engineer",
  "ui-ux-designer",
  "qa-engineer",
  "data-analyst",
  "data-scientist",
  "ai-ml-engineer",
  "cyber-security-analyst",
  "cloud-engineer",
  "software-engineer",
  "mobile-app-developer",
  "other",
];

const EXPERIENCE_LEVELS = ["internship", "fresher", "junior", "mid", "senior"];
const COMPANY_TYPES = ["startup", "product", "service", "faang", "any"];
const DIFFICULTIES = ["easy", "medium", "hard", "adaptive"];
const LANGUAGES = ["english", "nepali", "mixed"];

// Grouped for the frontend's tech-stack picker. Every `value` here must
// have an entry (or fall through to "general") in TECH_TO_ROLE below.
const TECH_STACK_GROUPS = [
  {
    group: "Frontend",
    options: ["html", "css", "react", "angular", "vue"],
  },
  {
    group: "Backend",
    options: ["node", "express", "django", "flask", "spring-boot", "laravel"],
  },
  {
    group: "Database",
    options: ["mongodb", "mysql", "postgresql", "firebase", "redis"],
  },
  {
    group: "Languages",
    options: ["javascript", "typescript", "java", "python", "cpp", "csharp", "php", "go"],
  },
  {
    group: "Other",
    options: ["docker", "kubernetes", "aws", "git", "rest-api", "graphql"],
  },
];

const TECH_STACK_OPTIONS = TECH_STACK_GROUPS.flatMap((g) => g.options);

// Only the tracks the seed bank actually has questions for (see
// server/seed/questions.js). Anything not listed here maps to "general"
// rather than promising content that doesn't exist yet.
const TECH_TO_ROLE = {
  react: "react",
  javascript: "javascript",
  typescript: "javascript",
  node: "node",
  express: "node",
  django: "python",
  flask: "python",
  python: "python",
  java: "java",
  "spring-boot": "java",
  mongodb: "database",
  mysql: "database",
  postgresql: "database",
  firebase: "database",
  redis: "database",
};

// Preference order when a user's tech stack maps to more than one seeded
// track (e.g. a MERN profile matches react, node, javascript, database) —
// picks the most specific/primary one for the session's question pool.
const ROLE_PRIORITY = ["react", "node", "python", "java", "database", "javascript", "oop", "networking", "operating-system"];

// Returns the single best-matching seeded role tag for a user's tech
// stack, or "general" if nothing matches (e.g. a UI/UX Designer profile
// with no seeded track yet).
const derivePrimaryRole = (techStack = []) => {
  const matched = new Set(
    techStack.map((t) => TECH_TO_ROLE[String(t).toLowerCase()]).filter(Boolean)
  );
  if (matched.size === 0) return "general";
  return ROLE_PRIORITY.find((role) => matched.has(role)) || matched.values().next().value;
};

module.exports = {
  POSITIONS,
  EXPERIENCE_LEVELS,
  COMPANY_TYPES,
  DIFFICULTIES,
  LANGUAGES,
  TECH_STACK_GROUPS,
  TECH_STACK_OPTIONS,
  derivePrimaryRole,
};
