const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, trim: true, unique: true, required: true },
  password: { type: String, required: true },
  birthday: { type: Date, required: true },
  dateJoined: { type: Date, default: Date.now },
});

module.exports = mongoose.model("user", UserSchema);
