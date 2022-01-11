const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const auth = require("../middleware/auth");
const {
  createProfile,
  userProfile,
  getAllProfiles,
  getProfileById,
} = require("../controllers/profileController");

router.get("/me", auth, userProfile);
router.get("/", getAllProfiles);
router.get("/user/:user_id", getProfileById);

router.post("/", auth, createProfile);

module.exports = router;
