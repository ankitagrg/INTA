const express = require("express");
const { getProfileOptions, getMyProfile, saveMyProfile } = require("../controllers/careerProfileController");
const { protect } = require("../middleware/authMiddleware");
const { validateSaveProfile } = require("../validators/careerProfileValidator");

const router = express.Router();

router.get("/options", getProfileOptions);
router.get("/", protect, getMyProfile);
router.put("/", protect, validateSaveProfile, saveMyProfile);

module.exports = router;
