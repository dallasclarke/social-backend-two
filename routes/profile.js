const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const auth = require("../middleware/auth");
const { createProfile, userProfile } = require("../controllers/profileController");

router.get("/me", auth, userProfile);

router.post("/", auth, createProfile);

module.exports = router;
