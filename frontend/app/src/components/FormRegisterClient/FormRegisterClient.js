import React, { useState } from 'react'
import Container from '../Container/Container';
import { UseFetch } from '../../UseFetch';
import { Card, Button, Form, Col } from 'react-bootstrap';
// import url from "../../config"
import axios from "axios";
export default function FormRegisterClient() {
  const url = process.env.REACT_APP_API_BASE_URL;
  // const url = import.meta.env.REACT;
  // console.log(process.env['REACT_APP_API_URL'])
  // console.log(process.env.REACT_APP_API_URl)
  console.log(url)
  // const url = "http://localhost";
  const { data } = UseFetch(`${url}api/users`, null);
  const [formData, setFormData] = useState({
    "id": "1",
    "nombres": "",
    "email": "",
    "celular": "",
    "fk_tipo_user": "1",
    "passworld": null
  });
  function enviar() {
    console.log("hola");
    console.log(data)
  }
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes utilizar los valores de formData como desees
    console.log(formData);
    axios.post(`${url}api/users`, formData).then((result) => {
      console.log(result)
    }).catch((err) => {

    });
    // UseFetch("api/users", "POST", formData)
  };
  return (
    <div>
      <Container>
        <Card>
          <Card.Header>Formulario de Registro</Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formHorizontalEmail">
                <Form.Label column sm={2}>
                  Nombres
                </Form.Label>
                <Col sm={10}>
                  <Form.Control type="text" name="nombres" value={formData.nombres} placeholder="Nombres" onChange={handleChange} />
                </Col>
              </Form.Group>
              <Form.Group controlId="formHorizontalEmail">
                <Form.Label column sm={2}>
                  Email
                </Form.Label>
                <Col sm={10}>
                  <Form.Control type="email" name="email" value={formData.email} placeholder="Email" onChange={handleChange} />
                </Col>
              </Form.Group>
              {/* <Form.Group controlId="formHorizontalPassword">
                <Form.Label column sm={2}>
                  Password
                </Form.Label>
                <Col sm={10}>
                  <Form.Control type="password" placeholder="Password" />
                </Col>
              </Form.Group> */}
              <fieldset>
                <Form.Group controlId="formHorizontalEmail">
                  <Form.Label column sm={2}>
                    Celular:
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control type="number" name="celular" value={formData.celular} placeholder="Celular" onChange={handleChange} />
                  </Col>
                </Form.Group>

              </fieldset>
              {/* <Form.Group controlId="formHorizontalCheck">
                <Col sm={{ span: 10, offset: 2 }}>
                  <Form.Check label="Remember me" />
                </Col>
              </Form.Group> */}

              <Form.Group >
                <Col sm={{ span: 10, offset: 2 }}>
                  <Button type="submit" >Sign in</Button>
                </Col>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}
