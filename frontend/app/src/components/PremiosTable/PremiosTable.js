import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
export default function PremiosTable({ setIsLoading }) {
  const navigate = useNavigate();
  const [awards, setAwards] = useState([]);
  const [selectedAward, setSelectedAward] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const url = process.env.REACT_APP_API_BASE_URL;
  const MySwal = withReactContent(Swal)
  useEffect(() => {
    fetchAwards();
  }, []);
  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };
  const fetchAwards = async () => {
    // setIsLoading(true);
    try {
      const response = await axios.get(`${url}api/wards`);
      console.table(response.data)
      setAwards(response.data);
    } catch (error) {
      console.log('Error al obtener los awardos:', error);
    }
  };

  const handleViewImage = (award) => {
    setSelectedAward(award);
    setShowModal(true);
  };

  const handleEditAward = (award) => {
    // Lógica para editar el awardo
    navigate(`/UpdatePremiosPage/${award.id}`);
    console.log('Editar awardo:', award);
  };

  const handleDeleteAward = async (award) => {
    // Lógica para eliminar el awardo
    console.log('Eliminar awardo:', award);
    try {
      const response = await axios.delete(`${url}api/wards?id=${award.id}`);
      // setAwards(response.data);
      if (response.status == 200) {
        MySwal.fire({
          icon: 'success',
          title: 'Premios',
          text: `Se elimino el premio ${award.id}`,

        })
        fetchAwards()
      }
    } catch (error) {
      console.log('Error al buscar awardos:', error);
    }

  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${url}api/wards_filter?name=${searchTerm}`);
      setAwards(response.data);

    } catch (error) {
      console.log('Error al buscar awardos:', error);
    }
  };
  return (
    <>
      <Form onSubmit={handleSearch}>
        <Form.Group controlId="searchTerm">
          <Form.Control type="text" placeholder="Buscar por nombre" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          {/* <Form.Control type="text" placeholder="Buscar por nombre" value={searchTerm} onClick={handleClick} /> */}
        </Form.Group>
        <Button variant="primary" type="submit">
          Buscar
        </Button>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre de Awardo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {awards.map((award) => (
            <tr key={award.id}>
              <td>{award.id}</td>
              <td>{award.name_award}</td>
              <td>
                <Button variant="primary" onClick={() => handleViewImage(award)}>{' '}
                  Ver Imagen
                </Button>
                <Button variant="warning" onClick={() => handleEditAward(award)}>{' '}
                  Editar
                </Button>
                <Button variant="danger" onClick={() => handleDeleteAward(award)}>{' '}
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedAward && (selectedAward.name_award)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAward && (
            <img src={`${selectedAward.base64}`} alt="Awardo" style={{ width: '100%' }} />
            // <img src={`data:image/png;base64,${selectedAward.base64}`} alt="Awardo" style={{ width: '100%' }} />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
