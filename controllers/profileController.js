const Profile = require("../models/Profile");
const Post = require("../models/Post");
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
      location,
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
};
