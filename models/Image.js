// Image.js
const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  title: String, // Titre de l'image
  description: String, // Description de l'image (facultatif)
  imageUrl: String, // URL de l'image
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Tableau des utilisateurs qui ont aimé l'image
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Utilisateur qui a ajouté l'image
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
