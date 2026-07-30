// Human-readable labels for the kebab-case position/tech-stack values the
// backend stores (see server/utils/techStack.js) — presentation only, the
// backend's option lists remain the single source of truth for what's allowed.
const LABEL_OVERRIDES = {
  "mern-stack-developer": "MERN Stack Developer",
  "nodejs-developer": "Node.js Developer",
  "ui-ux-designer": "UI/UX Designer",
  "ai-ml-engineer": "AI/ML Engineer",
  "devops-engineer": "DevOps Engineer",
  "qa-engineer": "QA Engineer",
  faang: "FAANG",
  cpp: "C++",
  csharp: "C#",
  php: "PHP",
  aws: "AWS",
  javascript: "JavaScript",
  typescript: "TypeScript",
  "rest-api": "REST API",
  graphql: "GraphQL",
  "spring-boot": "Spring Boot",
  html: "HTML",
  css: "CSS",
  mongodb: "MongoDB",
  mysql: "MySQL",
  postgresql: "PostgreSQL",
};

const titleCase = (value) =>
  value
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

export const labelFor = (value) => LABEL_OVERRIDES[value] || titleCase(value);
