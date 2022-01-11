const Profile = require("../models/Profile");
const Posts = require("../models/Posts");
const User = require("../models/User");

const { validationResult } = require("express-validator");

module.exports = {
  createProfile: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { bio, city, state, github, twitter, linkedin, facebook } = req.body;

    const profileFields = {
      user: req.user.id,
      bio,
      city,
      state,
    };

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  },
  userProfile: async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id }).populate(
        "user",
        ["name", "profile", "dateJoined"]
      );

      if (!profile) {
        return res
          .status(400)
          .json({ msg: "There is no profile for this user!" });
      }

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  },
  getAllProfiles: async (req, res) => {
    try {
      const profiles = await Profile.find().populate("user", [
        "name",
        "birthday",
        "dateJoined",
      ]);

      res.json(profiles);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  },
  getProfileById: async (req, res) => {
    try {
      const profile = await Profile.findOne({
        user: req.params.user_id,
      });

      if (!profile) {
        return res.status(400).send({ msg: "Profile not found" });
      }

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  },
  deleteProfile: async (req, res) => {
    try {
      await Posts.deleteMany({ user: req.user.id });
      await Profile.deleteMany({ user: req.user.id });
      await User.findOneAndRemove({ _id: req.user.id });

      res.json({ msg: "User removed" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  },
};
