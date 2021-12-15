const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  bio: { type: String },
  location: { type: String },
  state: { type: String },
  social: {
    twitter: { type: String },
    linkedin: { type: String },
    facebook: { type: String },
  },
});

module.exports = mongoose.model("profile", ProfileSchema);
