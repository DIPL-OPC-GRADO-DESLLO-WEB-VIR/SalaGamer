import axios from 'axios';
import React, { useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function FormProducto() {
  const url = process.env.REACT_APP_API_BASE_URL;
  const [productName, setProductName] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [horas_puntos, setHoras_puntos] = useState('');
  const MySwal = withReactContent(Swal)
  const handleInputChange = (e) => {
    setProductName(e.target.value);
  };
  const handleHoras_puntos = (e) => {
    setHoras_puntos(e.target.value);
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageBase64(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const response = await axios.post(`${url}api/wards`, {
        point: horas_puntos,
        name_award: productName,
        base64: imageBase64,
      });
      if (response.status == 201) {
        // navigate("/HomePerfilPage");
        MySwal.fire({
          icon: 'success',
          title: 'Premios',
          text: 'Se agrego un nuevo premio!',

        })
        setProductName('');
        setHoras_puntos('');
        setImageBase64('');
      }
    } catch (error) {
      console.error(error);
    }
    // MySwal.fire({
    //   icon: 'error',
    //   title: 'Oops...',
    //   text: 'Something went wrong!',

    // })
  };

  return (
    <>
      <Card >
        <Card.Header>Premio 🏆🎮</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="Name">
              <Form.Label>Nombre del Premio</Form.Label>
              <Form.Control type="text" value={productName} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="Horas_puntos">
              <Form.Label>Horas</Form.Label>
              <Form.Control type="number" value={horas_puntos} onChange={handleHoras_puntos} />
            </Form.Group>
            <Form.Group controlId="Image">
              <Form.Label>Imagen</Form.Label>
              <Form.Control type="file" onChange={handleImageUpload} />
            </Form.Group>
            <br />
            <Button variant="primary" type="submit">
              Enviar
            </Button>
          </Form>
        </Card.Body>

      </Card>


    </>

  );
};
