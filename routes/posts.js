const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const auth = require("../middleware/auth");
const { createPost, getAllPosts } = require("../controllers/postsController");

router.get("/", auth, getAllPosts);

router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  createPost
);

module.exports = router;
