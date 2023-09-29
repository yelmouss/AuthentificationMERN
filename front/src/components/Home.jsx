import React, { useState } from 'react'
import Geek from '../img/Geek.png'
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import Atropos from 'atropos/react';
import Typed from 'react-typed';
import { Technologies } from '../data/Tech';
import Font from 'react-font'
const Home = () => {
  document.title = 'Home'

 

  return (
    <Font family='Ubuntu'>

      <Container className='mt-5 p-2 text-center bg-light p-5 bg-opacity-50  '>
        <h1> <Typed
          strings={['Welcome to my MERN demonstration application!']}
          typeSpeed={50}
        /></h1>

        <hr />
      </Container>

      <Container>
        <Row xs="auto" className='d-flex justify-content-center align-items-center'>
          {Technologies.map((item) =>
            <Col className='text-center align-items-stretch'>
              <figure className='card h-100'>
                <img src={item.ImageUrl} alt={item.name} className='techimg' />

                <figcaption className='card-footer'>{item.name} </figcaption>
              </figure>

            </Col>
          )}
        </Row>
      </Container>


      <Container className='d-flex align-items-center justify-content-center col-11' fluid>






        <Row className=' p-3 rounded d-flex align-items-center justify-content-center '>
          <Col>
            <Atropos shadow={false}>
              <div className=" p-3 card bg-dark text-light bg-opacity-50">

                <h4>
                  <Typed
                    strings={[
                      '🚀 I invite you to explore this innovative platform that leverages public APIs to provide you with a unique experience. Whether you\'re a tech enthusiast or just curious, this application will showcase my skills as a MERN developer in action. 🌟',

                      '🔒 My features include secure authentication, integrations with popular public APIs, a user-friendly interface, and much more. Explore, learn, and appreciate the art of modern web development with me. 🌐',

                      '🎉 Join me on this exciting journey and discover everything my application has to offer. Are you ready to get started? 💡'
                    ]}
                    typeSpeed={40}
                  />
                </h4>


              </div>
            </Atropos>
          </Col>
          {/* <Col className='  ' lg={3}>
            <hr />
            <img src={Geek} alt="Logo" className='img-fluid bg-light rounded rounded-circle p-3 ' />
          </Col> */}
        </Row>



      </Container >
    
    </Font>



  )
}

export default Home