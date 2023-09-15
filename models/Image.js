// Image.js
const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  userId: { type: String },
  title: { type: String, required: true },
  description: { type: String, required: true },  
  imageUrl: { type: String },  
  likes: { type: Number },
  dislikes: { type: Number },
  usersLiked: [{ type: String }],
  usersDisliked: [{ type: String }],
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
