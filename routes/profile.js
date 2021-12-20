const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const auth = require("../middleware/auth");
const { createProfile } = require("../controllers/profileController");

router.post("/", auth, createProfile);

module.exports = router;
