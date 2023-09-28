// User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  FullName: String,
  confirmed: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false }, // Ajout du champ isAdmin
});

const User = mongoose.model("User", userSchema);

module.exports = User;
