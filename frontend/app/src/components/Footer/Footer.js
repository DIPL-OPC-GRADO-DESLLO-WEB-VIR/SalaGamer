import React from "react";
import { Col, Container, Row } from "react-bootstrap";
export default function Footer() {
  return (
    <>


      <footer className="p-3 mb-2 bg-info text-white">
        <Container>
          <Row>
            <Col>
              <p>Tu contenido de pie de página aquí</p>
            </Col>
            <Col>
              <p>Tu contenido de pie de página aquí</p>
            </Col>
            <Col>
              <p>Tu contenido de pie de página aquí</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </>);
}
