import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';

class Login extends Component {
  render() {
    return (

    <Form>
     <Row form>
       <Col md={6}>
         <FormGroup>
           <Input type="email" name="email" id="email" placeholder="email"/>
         </FormGroup>
       </Col>
      </Row>
      <Row form>
       <Col md={6}>
         <FormGroup>
           <Input type="password" name="password" id="examplePassword" placeholder="password" />
         </FormGroup>
       </Col>
     </Row>
     <Row form>
      <Button color="primary" tag={Link} to="/login">Login</Button>
    </Row>
     </Form>
    );
  }
}

export default Login;
