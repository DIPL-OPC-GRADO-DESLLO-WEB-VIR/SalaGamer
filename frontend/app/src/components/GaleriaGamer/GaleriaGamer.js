import React from 'react'
import { Container, Row, Col, Card, Jumbotron } from 'react-bootstrap';
export default function GaleriaGamer() {
  // Array de imágenes
  var i = 0;
  const images = [
    { id: i++, src: 'https://naciongrita.com.mx/wp-content/uploads/2017/10/Fortnite-head.jpg', title: 'Fortnite', description: 'Fortnite es un videojuego del año 2017 desarrollado por la empresa Epic Games lanzado como diferentes paquetes de software que presentan diferentes modos de juego, pero que comparten el mismo motor de juego y mecánicas. Fue anunciado en los premios Spike Video Game Awards en 2011' },
    {
      id: i++, src: 'https://depor.com/resizer/PLuNTcq8cR35osHKvAkaAGkAx4o=/580x330/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/KJD63BKH5VFNFOMA6XTJ4DLZLA.jpg',
      title: 'Fall Guys', description: 'Fall Guys es un videojuego de plataformas y battle royale gratuito desarrollado por Mediatonic. En el videojuego participan hasta 40 jugadores que controlan criaturas parecidas a gominolas y compiten entre sí en una serie de minijuegos seleccionados al azar, como carreras de obstáculos o fútbol en equipo'
    },
    { id: i++, src: 'https://i.blogs.es/dfbccc/trucosgtavps4/1366_2000.webp', title: 'GTA V', description: 'Grand Theft Auto V es un videojuego de acción-aventura de mundo abierto en tercera persona desarrollado por el estudio escocés Rockstar North y distribuido por Rockstar Games. Fue lanzado el 17 de septiembre de 2013 para las consolas Xbox 360 y PlayStation 3' },
    { id: i++, src: 'https://culturageek.com.ar/wp-content/uploads/2022/09/REVIEWS-poster-FIFA-23.jpg', title: 'FIFA 23', description: 'Una de las grandes y más longevas alianzas del mundo de los videojuegos es, sin duda, la que había entre FIFA y EA Sports' },
    { id: i++, src: 'https://culturageek.com.ar/wp-content/uploads/2023/07/wo_long_46_culturageek.com_.ar_.jpeg', title: 'Wo Long', description: 'El equipo de Team Ninja, responsable de títulos como la saga Ninja Gaiden, Nioh o inclusive el experimental Stranger of Paradise Final Fantasy Origin, desde hace tiempo coquetea con el subgénero del Soulslike.' },
    { id: i++, src: 'https://culturageek.com.ar/wp-content/uploads/2023/06/jpg_20230626_104616_0000-1.jpg', title: 'Payday3', description: '¡Los asaltos a bancos más dinámicos y divertidos regresarán de la mano de Plaion y Starbreeze! El día 21 de septiembre de 2023 será una fecha especial para los amantes de los juegos cooperativos ya que durante ese periodo nos traerá el lanzamiento mundial de PAYDAY 3.' },
    { id: i++, src: 'https://culturageek.com.ar/wp-content/uploads/2023/05/REVIEWS-poster-RedFall.jpg', title: 'Redfall', description: 'Con los avances de la nueva generación y las enormes adquisiciones llevadas a cabo por Microsoft a lo largo de estos últimos años, todo apuntaba a que Redfall podría convertirse en ese primer tanque que ayude a Xbox a despegar en la generación.' },
    { id: i++, src: 'https://culturageek.com.ar/wp-content/uploads/2023/04/REVIEWS-poster-12.jpg', title: 'The Last of Us es quizás una de las sagas que más será recordada en la historia de los videojuegos.' },
  ];
  return (
    <Container>
      <br></br>
      <div class="jumbotron jumbotron-fluid p-3 mb-2 bg-danger text-white">
        <div class="container">
          <h1 class="display-4">Juegos</h1>
          <p class="lead">"¡Un mundo virtual, una pasión sin límites!"</p>
        </div>
      </div>
      <Row>
        {images.map((image) => (
          <Col key={image.id} sm={6} md={4} lg={3}>
            <Card>
              <Card.Img variant="top" src={image.src} />
              <Card.Body>
                <Card.Title>{image.title}</Card.Title>
                <Card.Text>{image.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}
