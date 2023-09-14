// User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  FullName: String,
  confirmed: { type: Boolean, default: false },
});


const User = mongoose.model("User", userSchema);

module.exports = User;