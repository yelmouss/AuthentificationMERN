
import React, { useState } from 'react'
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Swal from 'sweetalert2';
import Atropos from 'atropos/react';

const Footer = () => {
  const position = [33.991980191627185, -6.874611381541911];
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const sendEmail = async () => {
    try {
      // Désactivez le bouton d'envoi pendant l'appel à l'API
      document.getElementById('sendEmailButton').setAttribute('disabled', 'true');

      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to, subject, text: message }),
      });

      if (response.ok) {
        // Affichez une alerte de succès avec SweetAlert
        Swal.fire({
          icon: 'success',
          title: 'E-mail envoyé avec succès !',
        });

        // Réinitialisez le formulaire après avoir envoyé l'e-mail
        setTo('');
        setSubject('');
        setMessage('');
      } else {
        const errorText = await response.json();
        // Affichez une alerte d'erreur avec SweetAlert
        Swal.fire({
          icon: 'error',
          title: `Erreur lors de l'envoi de l'e-mail : ${errorText.message}`,
        });
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
      // Affichez une alerte d'erreur avec SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Erreur lors de l\'envoi de l\'e-mail',
        text: error.toString(),
      });
    } finally {
      // Réactivez le bouton d'envoi après la fin de l'appel à l'API
      document.getElementById('sendEmailButton').removeAttribute('disabled');
    }
  };


  return (
    <footer className="footer mt-5 py-3 bg-black text-light p-5 bg-opacity-75">
      <Container fluid>
      <h5 className=" text-light">Contact Me 📧</h5>
      <hr />
        <Row lg={2} xs={1} className='d-flex align-items-start  justify-content-center'>
    
          <Col>
            <div className="container">       
              
                <Form className=' p-5 bg-opacity-50'>
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
                  <div className='text-end'>
                  <Button variant="dark" onClick={sendEmail} id="sendEmailButton">
                    Send 📤
                  </Button>
                  </div>                 
                </Form>          

            
            </div>
          </Col>
          <Col> <Container>
            <h5 className="text">Phone number</h5>
            <p>+212 6-12-86-56-81</p>
            <h5 className="text">Email</h5>
            <p>yelmouss.devt@gmail.com</p>
         
            <h5 className="text">You can find me here 👇</h5>
            <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
              <TileLayer
                attribution='&copy; <a href="http://yelmouss.com">yelmouss</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </Container></Col>
        </Row>

      </Container>


    </footer>
  )
}

export default Footer