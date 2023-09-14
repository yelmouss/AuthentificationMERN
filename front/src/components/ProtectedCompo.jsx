import React from 'react'
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import Atropos from 'atropos/react';
import Geek from '../img/Geek.png'
import { useEffect } from 'react';


const ProtectedCompo = () => {
  const [fullName, setFullName] = useState("");
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const sendEmail = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to, subject, text: message }),
      });
  
      if (response.ok) {
        setSuccessMessage('E-mail envoyé avec succès !');
        setErrorMessage('');
      } else {
        const errorText = await response.text(); // Obtenir le texte de l'erreur
        setSuccessMessage('');
        setErrorMessage(`Erreur lors de l'envoi de l'e-mail : ${errorText}`);
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
      setSuccessMessage('');
      setErrorMessage('Erreur lors de l\'envoi de l\'e-mail :', error);
    }
  };
  

  useEffect(() => {
    const storedFullName = localStorage.getItem("FullName");
    if (storedFullName) {
      setFullName(storedFullName);
    }
  }, []);


  return (
    <Container className='mt-5'>

<Row xs={1} md={2} lg={2}>

        <Col>
          <Atropos shadow={false}>
            <img src={Geek} alt="Logo" className='col-8 img-fluid' />
          </Atropos>
        </Col>

        <Col>
        <Atropos shadow={true}>
          
        <Form className='bg-light p-5'>
        <h3> Hello {fullName && <p> {fullName}</p>} </h3>
            <Form.Group controlId="formTo">
              <Form.Label>Votre Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Adresse e-mail"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formSubject">
              <Form.Label>Sujet</Form.Label>
              <Form.Control
                type="text"
                placeholder="Sujet de l'e-mail"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Contenu du message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </Form.Group>
            <hr />
            <Button variant="dark" onClick={sendEmail}>
              Envoyer
            </Button>
          </Form>
        </Atropos>
        
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        </Col>
        
      </Row>
    </Container >
  )
}

export default ProtectedCompo