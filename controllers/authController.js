// authController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Configuration de Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSMAIL,
  },
});

// Fonction pour gérer l'inscription
exports.signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur
    const user = new User({ username, password: hashedPassword });
    await user.save();

    // Envoyer l'e-mail de confirmation avec le lien de redirection
    const mailOptions = {
      from: "yelmouss.devt@gmail.com",
      to: username,
      subject: "Confirmation de votre inscription",
      text: `Cliquez sur ce lien pour confirmer votre inscription : http://localhost:8000/confirmation/${user._id}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.json({ message: "Signup successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.confirmSignup = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("Received confirmation request for userId: ", userId);

    const user = await User.findById(userId);
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }
    
    if (user.confirmed) {
      console.log("User already confirmed");
      return res.status(200).json({ message: "User already confirmed" });
    }

    // Mettre à jour l'état de confirmation de l'utilisateur
    user.confirmed = true;
    await user.save();

    console.log("User confirmed successfully");
    res.redirect("http://localhost:3000/login");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Fonction pour gérer la connexion
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Vérifier si l'utilisateur a confirmé son email
    if (!user.confirmed) {
      return res.status(401).json({ message: "Email not confirmed" });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Générer un token JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

