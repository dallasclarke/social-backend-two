const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const auth = require("../middleware/auth");
const {
  createProfile,
  userProfile,
  getAllProfiles,
} = require("../controllers/profileController");

router.get("/me", auth, userProfile);
router.get("/", getAllProfiles);

router.post("/", auth, createProfile);

module.exports = router;
