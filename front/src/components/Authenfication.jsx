import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import Atropos from 'atropos/react';

const initialState = {
  username: "",
  password: "",
  FullName: "",
  signupSuccessMessage: "",
  signupErrorMessage: "",
  loginSuccessMessage: "",
  loginErrorMessage: ""
};

const Authenfication = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post(
        "https://apitest-ruby.vercel.app/api/auth/signup",
        {
          username: formData.username,
          password: formData.password,
          FullName: formData.FullName
        }
      );

      setFormData({
        ...formData,
        signupSuccessMessage: response.data.message,
        signupErrorMessage: ""
      });
    } catch (err) {
      setFormData({
        ...formData,
        signupSuccessMessage: "",
        signupErrorMessage: err.response.data.message
      });
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://apitest-ruby.vercel.app/api/auth/login",
        {
          username: formData.username,
          password: formData.password
        }
      );

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('FullName', response.data.FullName);
      localStorage.setItem('UserEmail', response.data.UserEmail);

      setFormData({
        ...formData,
        loginSuccessMessage: "Login successful",
        loginErrorMessage: ""
      });
      navigate('/Dashboard');
    } catch (err) {
      setFormData({
        ...formData,
        loginSuccessMessage: "",
        loginErrorMessage: err.response.data.message
      });
    }
  };

  return (
    <Container className="p-5 mt-5">
      <Row className="justify-content-md-center">
        <Col xs lg="5">
          <Atropos className="my-atropos">
            <Accordion defaultActiveKey="0" flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Login</Accordion.Header>
                <Accordion.Body className="text-center p-5">
                  <Form>
                    <Form.Group controlId="formLoginUsername">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="formLoginPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <hr />
                    <Button variant="dark" onClick={handleLogin}>
                      Login
                    </Button>
                  </Form>
                  {formData.loginSuccessMessage && <Alert variant="success">{formData.loginSuccessMessage}</Alert>}
                  {formData.loginErrorMessage && <Alert variant="danger">{formData.loginErrorMessage}</Alert>}
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
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="formSignupPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="formSignupFullName">
                      <Form.Label>FullName</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="FullName"
                        name="FullName"
                        value={formData.FullName}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <hr />
                    <Button variant="dark" onClick={handleSignup}>
                      Signup
                    </Button>
                  </Form>
                  {formData.signupSuccessMessage && <Alert variant="success">{formData.signupSuccessMessage}</Alert>}
                  {formData.signupErrorMessage && <Alert variant="danger">{formData.signupErrorMessage}</Alert>}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Atropos>
        </Col>
      </Row>
    </Container>
  )
}

export default Authenfication
