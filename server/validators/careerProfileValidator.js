const {
  POSITIONS,
  EXPERIENCE_LEVELS,
  COMPANY_TYPES,
  DIFFICULTIES,
  LANGUAGES,
  TECH_STACK_OPTIONS,
} = require("../utils/techStack");

const validateSaveProfile = (req, res, next) => {
  const { position, experienceLevel, techStack, companyType, difficulty, language } = req.body;

  if (typeof position !== "string" || !POSITIONS.includes(position)) {
    return res.status(400).json({ success: false, message: `position must be one of: ${POSITIONS.join(", ")}` });
  }
  if (typeof experienceLevel !== "string" || !EXPERIENCE_LEVELS.includes(experienceLevel)) {
    return res
      .status(400)
      .json({ success: false, message: `experienceLevel must be one of: ${EXPERIENCE_LEVELS.join(", ")}` });
  }
  if (!Array.isArray(techStack) || techStack.length === 0 || !techStack.every((t) => TECH_STACK_OPTIONS.includes(t))) {
    return res.status(400).json({ success: false, message: "techStack must be a non-empty array of known technologies" });
  }
  if (companyType !== undefined && !COMPANY_TYPES.includes(companyType)) {
    return res.status(400).json({ success: false, message: `companyType must be one of: ${COMPANY_TYPES.join(", ")}` });
  }
  if (difficulty !== undefined && !DIFFICULTIES.includes(difficulty)) {
    return res.status(400).json({ success: false, message: `difficulty must be one of: ${DIFFICULTIES.join(", ")}` });
  }
  if (language !== undefined && !LANGUAGES.includes(language)) {
    return res.status(400).json({ success: false, message: `language must be one of: ${LANGUAGES.join(", ")}` });
  }

  next();
};

module.exports = { validateSaveProfile };
