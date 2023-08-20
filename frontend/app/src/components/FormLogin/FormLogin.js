import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import Container from '../Container';
import axios from 'axios';
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  const url = process.env.REACT_APP_API_BASE_URL;
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${url}api/login`, {
        email,
        password,
      });

      // Aquí puedes manejar la respuesta de la solicitud POST
      console.log(response.data);
      console.log(response.status);
      if (response.status == 201) {
        localStorage.setItem("token", response.data.token)
        // navigate("/HomePerfilPage");
        window.location.href = '/';
      }
    } catch (error) {
      // Aquí puedes manejar el error de la solicitud POST
      console.error(error);
    }
  };

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>Iniciar sesión</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formemail">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese su usuario"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formsubmit">
              <br />
              <Button variant="primary" type="submit">
                Iniciar sesión
              </Button>
            </Form.Group>

          </Form>
        </Card.Body>
      </Card>
    </Container>

  );
};

export default LoginForm;