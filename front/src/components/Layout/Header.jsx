import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { BsInstagram, BsFillHouseHeartFill, BsFillKeyFill, BsFillLockFill } from "react-icons/bs";
import Font from 'react-font';

const Header = () => {
  // Vérifiez si un token est présent dans le localStorage
  const token = localStorage.getItem('token');
  const isUserLoggedIn = !!token;
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedFullName = localStorage.getItem("FullName");
    if (storedFullName) {
      setFullName(storedFullName);
    }

    // Vérifier si l'utilisateur est administrateur
    if (isUserLoggedIn) {
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      checkIsAdmin(userId);
    }
  }, [token]);

  // Fonction pour vérifier si un utilisateur est administrateur
  const checkIsAdmin = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/isAdmin/${userId}`);
      const isAdmin = response.data.isAdmin;

      // Mettre à jour l'état isAdmin
      setIsAdmin(isAdmin);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    // Supprimer le token et le FullName du localStorage séparément
    localStorage.removeItem('token');
    localStorage.removeItem('FullName');
    // Rediriger l'utilisateur vers la page de connexion ou une autre page
    navigate('/login');
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/" className='fs-2 fw-bolder'>
          <Font family='Dancing Script'>
            {" YelmousS".split("").map((letter, index) => {
              return (
                <span key={index} className="text-fun-pink">
                  {letter}
                </span>
              );
            })}
          </Font>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">

          </Nav>
          <Nav>
            <Link to={'/'} className={'nav-link text-center'}>
              <BsFillHouseHeartFill className='fs-4' />
              <br />
              <i>Home</i>
            </Link>

            <Link to={'/instagram'} className={'nav-link text-center'}>
              <BsInstagram className='fs-4' />
              <br />
              <i>IG Api</i>
            </Link>
            {/* Affichez le lien "Logout" si l'utilisateur est connecté */}
            {isUserLoggedIn ? (
              <>
                <NavDropdown title={fullName && <> <br /> {fullName}</>} id="collapsible-nav-dropdown">
                  <Link to={'/Dashboard'} className={'nav-link'}>
                    Dashboard
                  </Link>
                  <Link to={'/ImageGallery'} className={'nav-link'}>
                    Gallery
                  </Link>
                  {/* Conditionnellement rendre l'élément "Admin Panel" */}
                  {isAdmin && (
                    <Link to={'/AdminPanel'} className={'nav-link'}>
                      Admin Panel
                    </Link>
                  )}
                  <NavDropdown.Divider />
                  <Nav.Link eventKey={2} onClick={logout}>
                    <BsFillLockFill /> Logout
                  </Nav.Link>
                </NavDropdown>
              </>
            ) : (
              <Link to={'/login'} className={'nav-link text-center'}>
                <BsFillKeyFill className='fs-4' />
                <br />
                <i>Login</i>
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
