const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

router.get("/", (req, res) => res.send("Test Working!!!!"));

module.exports = router;
