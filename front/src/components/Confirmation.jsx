import React, { useEffect, useState } from "react";
import { Container, Alert } from 'react-bootstrap';
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams

function Confirmation() {
  const { userId } = useParams(); // Use useParams to access route parameters
  const [confirmationMessage, setConfirmationMessage] = useState("Confirming...");

  useEffect(() => {
    // Effectuer une requête pour confirmer l'email ici
    const confirmEmail = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/auth/confirmation/${userId}`
        );
        
        // Check the response message and handle accordingly
        if (response.data.message === "User already confirmed") {
          setConfirmationMessage("Votre email a déjà été confirmé.");
        } else {
          setConfirmationMessage(response.data.message);
        }
      } catch (err) {
        setConfirmationMessage("Erreur lors de la confirmation de l'email." + err);
      }
    };
    
    confirmEmail();
  }, [userId]);

  return (
    <Container>
      <h1>Confirmation d'email</h1>
      <Alert variant="info">{confirmationMessage}</Alert>
    </Container>
  );
}

export default Confirmation;
