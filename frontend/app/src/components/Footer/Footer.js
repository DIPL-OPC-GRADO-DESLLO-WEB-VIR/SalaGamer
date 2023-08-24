import React from "react";
import './Footer.css'
import { Col, Container, Row } from "react-bootstrap";
export default function Footer() {
  return (
    <>


      <footer className="p-3 mb-2 bg-info text-white">
        <Container>
          <Row>
            <Col>
              <h2 class="danger">Bienvenido a la Sala de Juegos</h2>
              <p class="lead">¡Diviértete jugando nuestros emocionantes juegos!</p>
            </Col>
            <Col>
              <h2>Redes Sociales</h2>
              <ul class="list-unstyled">
                <li><a href="#">Facebook</a></li>
                <li><a href="#">Twitter</a></li>
                <li><a href="#">Instagram</a></li>
              </ul>
            </Col>
            <Col>
              <p>&copy; 2023 Sala de Juegos. Todos los derechos reservados.</p>
              <p>Autor: Miguel Angel Cifuentes Osorio</p>
              <p>Contacto: info@saladejuegos.com</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </>);
}
