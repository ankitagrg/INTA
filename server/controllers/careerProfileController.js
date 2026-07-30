const CareerProfile = require("../models/CareerProfile");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess } = require("../utils/apiResponse");
const {
  POSITIONS,
  EXPERIENCE_LEVELS,
  COMPANY_TYPES,
  DIFFICULTIES,
  LANGUAGES,
  TECH_STACK_GROUPS,
} = require("../utils/techStack");

// GET /api/profile/options — static option lists for the setup wizard, so
// the frontend never has to hardcode a second copy of these enums.
const getProfileOptions = asyncHandler(async (req, res) => {
  sendSuccess(res, 200, "Career profile options fetched", {
    positions: POSITIONS,
    experienceLevels: EXPERIENCE_LEVELS,
    companyTypes: COMPANY_TYPES,
    difficulties: DIFFICULTIES,
    languages: LANGUAGES,
    techStackGroups: TECH_STACK_GROUPS,
  });
});

// GET /api/profile — returns null (not a 404) when the user hasn't set one
// up yet, since "no profile yet" is a normal, expected state, not an error.
const getMyProfile = asyncHandler(async (req, res) => {
  const profile = await CareerProfile.findOne({ user: req.user.id });
  sendSuccess(res, 200, "Career profile fetched", { profile });
});

// PUT /api/profile — create or replace the caller's profile. Upsert keeps
// this a single idempotent endpoint for both first-time setup and later
// edits, rather than separate create/update routes.
const saveMyProfile = asyncHandler(async (req, res) => {
  const { position, experienceLevel, techStack, companyType, difficulty, language } = req.body;

  const profile = await CareerProfile.findOneAndUpdate(
    { user: req.user.id },
    { user: req.user.id, position, experienceLevel, techStack, companyType, difficulty, language },
    { upsert: true, new: true, runValidators: true }
  );

  sendSuccess(res, 200, "Career profile saved", { profile });
});

module.exports = { getProfileOptions, getMyProfile, saveMyProfile };
