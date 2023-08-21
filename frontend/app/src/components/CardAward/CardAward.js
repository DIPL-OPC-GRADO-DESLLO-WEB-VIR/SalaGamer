import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Alert, Badge, Button, Card, Col, Row } from 'react-bootstrap'
import { FaAward } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
export default function CardAward(params) {
  const { id, hour, name } = params
  const url = process.env.REACT_APP_API_BASE_URL;
  const MySwal = withReactContent(Swal)
  const [awards, setAwards] = useState([])
  const navigate = useNavigate();
  useEffect(() => {
    fetchAwards()
  }, [])
  const fetchAwards = async () => {
    try {
      const response = await axios.get(`${url}api/wards`);
      console.table(response.data)
      setAwards(response.data);
    } catch (error) {
      console.log('Error al obtener los awardos:', error);
    }
  }
  const handleActiveAwards = (award) => {
    console.log(award)
    MySwal.fire({
      title: 'Premio',
      text: "Desea el premio?",
      icon: 'success',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',

      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        params = {
          "regulated_hours": award.id,
          "regulated_hours_award": award.point,
          "fk_id_player": id,
          "fk_id_employee": 42,
          "fk_id_awards": award.id
        }
        console.log(params)
        axios.post(`${url}api/player_x_awards`, params).then(res => {
          if (res.status === 201) {
            MySwal.fire({
              icon: 'success',
              title: 'Premios',
              text: 'Se agrego La hora!',

            })
            // fetchPlayer()
            navigate('/PlayerPage')
          }
        }).catch(
          (error) => {
            console.error(error)
            if (error.response && error.response.status === 400) {
              MySwal.fire({
                icon: 'warning',
                title: '!Alerta',
                text: error.response.data.message || 'Error 400: Bad Request',
              });
            }
          }
        )
        // MySwal.fire(
        //   'Deleted!',
        //   'Your file has been deleted.',
        //   'success'
        // )
      }
    })
  }
  return (
    // <div>CardAward {id}</div>
    <Card>

      <Card.Body>
        <Card.Title>
          {name},   Horas Acumuladas  {hour}
        </Card.Title>
        <Row>
          {awards.map((award) => (
            <Col key={award.id} sm={6} md={4} lg={3}>
              <Card>
                <Card.Img variant="top" src={award.base64} />
                <Card.Header>{award.name_award}<Badge variant="success">{award.point}</Badge>{' '}</Card.Header>
                <Card.Body>
                  {
                    (award.point - hour) <= 0 ? (
                      <>
                        <Card.Subtitle >
                          Horas  : <Badge pill bg="success"> {award.point}</Badge>{' '}
                        </Card.Subtitle >
                        <Card.Subtitle >
                          Horas Restantes: <Badge pill bg="warning"> {award.point - hour}</Badge>{' '}
                        </Card.Subtitle >


                        <Button variant="primary" onClick={() => { handleActiveAwards(award) }}>Selecciona</Button>
                      </>

                    ) : <>
                      <Card.Subtitle >
                        Horas  : <Badge pill bg="success"> {award.point}</Badge>{' '}
                      </Card.Subtitle >
                      <Card.Subtitle >
                        Horas Restantes: <Badge pill bg="warning"> {award.point - hour}</Badge>{' '}
                      </Card.Subtitle >


                    </>
                  }
                  {/* <Card.Text>{award.point}</Card.Text> */}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Card.Body>

    </Card>

  )
}
