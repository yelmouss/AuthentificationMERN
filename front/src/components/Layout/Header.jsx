import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import AuthGuard from '../AuthGuard';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { BsInstagram, BsFillHouseHeartFill, BsFillKeyFill, BsFillLockFill, BsFillPersonFill } from "react-icons/bs";


const Header = () => {
  // Vérifiez si un token est présent dans le localStorage
  const isUserLoggedIn = !!localStorage.getItem('token');
  const navigate = useNavigate()
  const logout = () => {
    // Supprimer le token et le FullName du localStorage séparément
    localStorage.removeItem('token');
    localStorage.removeItem('FullName');
    // Rediriger l'utilisateur vers la page de connexion ou une autre page
    navigate('/login');
  };
  const [fullName, setFullName] = useState("");
  useEffect(() => {
    const storedFullName = localStorage.getItem("FullName");
    if (storedFullName) {
      setFullName(storedFullName);
    }
  }, []);


  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">MernDev</Navbar.Brand>
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

                <NavDropdown  title={fullName && <> <br /> {fullName}</>} id="collapsible-nav-dropdown">

                  <Link to={'/Dashboard'} className={'nav-link'}>
                    Dashboard
                  </Link>
                  <Link to={'/ImageGallery'} className={'nav-link'}>
                    Gallery
                  </Link>

                  <NavDropdown.Divider />
                  <Nav.Link eventKey={2} onClick={logout}>
                    <BsFillLockFill />  Logout
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
