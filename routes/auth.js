const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const auth = require("../middleware/auth");
const { authUser, login } = require("../controllers/authController");

router.get("/", auth, authUser);

router.post(
  "/",
  [
    check("email", "Please include a valid email!").isEmail(),
    check("password", "Please enter a password!").exists(),
  ],
  login
);

module.exports = router;
