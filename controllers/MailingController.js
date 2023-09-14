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

// Fonction pour envoyer un e-mail
// Fonction pour envoyer un e-mail au format HTML
const sendEmail = async (to, subject, htmlContent) => {
    try {
      await transporter.sendMail({
        from: "yelmouss.devt@gmail.com",
        to: [to, "yelmouss.devt@gmail.com"],
        subject,
        html: htmlContent, // Utilisez html au lieu de text
      });
      console.log("E-mail envoyé avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'e-mail :", error);
    }
  };
  

module.exports = sendEmail;
