const express = require("express");
const sendEmail = require("../controllers/MailingController");
const router = express.Router();



// Route pour l'envoi de courrier
router.post("/send-email", async (req, res) => {
    const { to, subject, text } = req.body; // Extrayez les valeurs de req.body

    // Vous pouvez personnaliser l'objet et le message ici si nécessaire
    // Par exemple, pour ajouter un préfixe à l'objet et au message


/* ... */
const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Votre e-mail</title>
    <style>
    /* Styles globaux pour le corps de l'e-mail */
    body {
        font-family: Arial, sans-serif;
        background-color: #f0f0f0;
        margin: 0;
        padding: 0;
    }

    /* Conteneur principal */
    .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #fff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    /* En-tête */
    .header {
        background-color: #007bff;
        color: #fff;
        padding: 10px;
        text-align: center;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }

    /* Corps du message */
    .content {
        padding: 20px;
    }

    /* Pied de page */
    .footer {
        background-color: #007bff;
        color: #fff;
        padding: 10px;
        text-align: center;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1> Vous nous avez contacter à ce sujet : ${subject}</h1>
        </div>
        <div class="content">
            <p>Bonjour,</p>
            <p>Votre message dit : </p>
            <p>${text}</p> <!-- Utilisez ${text} ici -->
        </div>
        <div class="footer">
            <p>Cordialement,<br>yelmouss</p>
        </div>
    </div>
</body>
</html>`;
/* ... */

    
    try {
      await sendEmail(to, subject, htmlContent); // Utilisez les valeurs personnalisées
      res.json({ message: "E-mail envoyé avec succès !" });
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'e-mail :", error);
      res.status(500).json({ message: "Erreur lors de l'envoi de l'e-mail" });
    }
  });
  
  module.exports = router;
