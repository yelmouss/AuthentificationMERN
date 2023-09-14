import React from 'react'
import Geek from '../img/Geek.png'
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import Atropos from 'atropos/react';

const Home = () => {


  return (
    <Container className='mt-5'>

      <Row>

        <Col>
          <Atropos shadow={false} rotateYMax={50}  rotateXMax={50}>
            <img src={Geek} alt="Logo" className='col-8 img-fluid' />
          </Atropos>
        </Col>


        <Col>
          {/* <Atropos shadow={false}>
            <img src={Geek} alt="Logo" className='col-8 img-fluid' />
          </Atropos> */}
        </Col>
        <Col>
          {/* <Atropos shadow={false}>
            <img src={Geek} alt="Logo" className='col-8 img-fluid' />
          </Atropos> */}
        </Col>
      </Row>
    </Container >
  )
}

export default Home