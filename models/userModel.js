const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: false,
  },
  profile: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: false,
    default: "flexUp user",
  },
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },

 
});
module.exports = mongoose.model("User", userSchema);
