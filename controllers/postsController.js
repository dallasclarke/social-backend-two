const Post = require("../models/Posts");
const Profile = require("../models/Profile");
const User = require("../models/User");

const { validationResult } = require("express-validator");

module.exports = {
  createPost: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        user: req.user.id,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  },
  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.find().sort({ date: -1 });

      res.json(posts);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  },
  getPostById: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      if (!post) {
        return res.status(400).json({ msg: "Post not found" });
      }

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  },
  deletePost: async (req, res) => {
    try {
      const deletedPost = await Post.findByIdAndDelete(req.params.id).exec();

      if (!deletedPost) {
        return res.status(401).json({ msg: "Post not found" });
      }

      res.json({ msg: "Post has been removed" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  },
};
