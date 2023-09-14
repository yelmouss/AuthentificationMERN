import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import Atropos from 'atropos/react';

const Authenfication = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [FullName, setFullName] = useState("");
    const [signupSuccessMessage, setSignupSuccessMessage] = useState("");
    const [signupErrorMessage, setSignupErrorMessage] = useState("");
    const [loginSuccessMessage, setLoginSuccessMessage] = useState("");
    const [loginErrorMessage, setLoginErrorMessage] = useState("");

    // Effect pour vérifier si l'utilisateur est déjà connecté
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Si l'utilisateur a déjà un token, redirigez-le vers la page d'accueil
            navigate('/');
        }
    }, [navigate]);

    const handleSignup = async () => {
        try {
            const response = await axios.post(
                "http://localhost:8000/api/auth/signup",
                {
                    username,
                    password,
                    FullName,
                }
            );

            setSignupSuccessMessage(response.data.message);
            setSignupErrorMessage("");
        } catch (err) {
            setSignupSuccessMessage("");
            setSignupErrorMessage(err.response.data.message);
        }
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post(
                "http://localhost:8000/api/auth/login",
                {
                    username,
                    password,
                }
            );

            // Stocker les infos que je souhaiterais utiliser depuis le front au localstorage pour optimiser ma database
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('FullName', response.data.FullName);
            localStorage.setItem('UserEmail', response.data.UserEmail);

            
            setLoginSuccessMessage("Login successful");
            setLoginErrorMessage("");
            navigate('/Dashboard'); // Redirigez vers la page d'accueil après la connexion réussie
        } catch (err) {
            setLoginSuccessMessage("");
            setLoginErrorMessage(err.response.data.message);
        }
    };

    return (
        <Container className="p-5 mt-5">
            <Row className="justify-content-md-center">
                <Col xs lg="5">
                <Atropos className="my-atropos">
                    <Accordion defaultActiveKey="0" flush >

                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Login</Accordion.Header>
                            <Accordion.Body className="text-center p-5">
                                <Form>
                                    <Form.Group controlId="formLoginUsername">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter email"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formLoginPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <hr />
                                    <Button variant="dark" onClick={handleLogin}>
                                        Login
                                    </Button>
                                </Form>
                                {loginSuccessMessage && <Alert variant="success">{loginSuccessMessage}</Alert>}
                                {loginErrorMessage && <Alert variant="danger">{loginErrorMessage}</Alert>}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Signup</Accordion.Header>
                            <Accordion.Body className="text-center p-5">
                                <Form>
                                    <Form.Group controlId="formSignupUsername">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter email"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formSignupPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formSignupFullName">
                                        <Form.Label>FullName</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="FullName"
                                            value={FullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <hr />
                                    <Button variant="dark" onClick={handleSignup}>
                                        Signup
                                    </Button>
                                </Form>
                                {signupSuccessMessage && <Alert variant="success">{signupSuccessMessage}</Alert>}
                                {signupErrorMessage && <Alert variant="danger">{signupErrorMessage}</Alert>}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    </Atropos>
                </Col>
            </Row>


        </Container>
    )
}

export default Authenfication;
