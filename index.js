//server.js

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());

const serverless = require("serverless-http");

// Connexion à la base de données MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

//header d'accès global à l'API
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
// Importer les routes d'authentification
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);
// Importer les routes d'envoi d'email
const MailingRoutes = require("./routes/MailingRoutes");
app.use("/api", MailingRoutes);

// Importer d'ajout de photos et articles
const ImagesRoutes = require("./routes/Images");
app.use("/api", ImagesRoutes);

const IgRoutes = require("./routes/IgRoutes");
app.use("/api", IgRoutes);

const AdminRoutes = require("./routes/adminRoutes");
app.use("/api", AdminRoutes);

const path = require("path");

// Serve the static React app (build) from the "client/build" directory
// app.use(express.static(path.join(__dirname, "front/build")));
app.use("/images", express.static(path.join(__dirname, "images")));

app.get("/api/public", (req, res) => {
  res.status(200).send({
    data: "test",
  });
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports.handler = serverless(app);
