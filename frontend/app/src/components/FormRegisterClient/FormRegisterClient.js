import React, { useState } from 'react'
import Container from '../Container/Container';
import { UseFetch } from '../../UseFetch';
import { Card, Button, Form, Col } from 'react-bootstrap';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
// import url from "../../config"
import axios from "axios";
export default function FormRegisterClient() {
  const MySwal = withReactContent(Swal)
  const url = process.env.REACT_APP_API_BASE_URL;
  const { data } = UseFetch(`${url}api/users`, null);
  const [formData, setFormData] = useState({
    "id": "1",
    "nombres": "",
    "email": "",
    "celular": "",
    "fk_tipo_user": "1",
    "passworld": null
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes utilizar los valores de formData como desees
    axios.post(`${url}api/users`, formData).then((result) => {
      if (result.status === 201) {
        // navigate("/HomePerfilPage");
        MySwal.fire({
          icon: 'success',
          title: 'Usuario Nuevo',
          text: `Se agrego El usuario ${formData.nombres}`,

        })
        setFormData(
          {
            "nombres": "",
            "email": "",
            "celular": "",
            "fk_tipo_user": "1",
            "passworld": null
          }
        )
      }

    }).catch((err) => {
      setFormData(
        {
          "nombres": "",
          "email": "",
          "celular": "",
          "fk_tipo_user": "1",
          "passworld": null
        }
      )
    });
    // UseFetch("api/users", "POST", formData)
  };
  return (
    <div>
      <Container>
        <Card bg='dark' text='light'>
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
                <Col sm={{ span: 10 }}>
                  <Button type="submit" >Registrarse</Button>
                </Col>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}
