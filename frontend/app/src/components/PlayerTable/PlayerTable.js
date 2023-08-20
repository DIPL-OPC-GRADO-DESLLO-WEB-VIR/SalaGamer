import React, { useEffect, useState } from 'react'
import { Button, Card, Table } from 'react-bootstrap'
import axios from 'axios';
import { FaHourglassEnd, FaAward, FaHistory, FaCalendarPlus } from "react-icons/fa";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom';
export default function PlayerTable() {
  const url = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal)
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    fetchPlayer()
  }, []);
  const fetchPlayer = async () => {
    try {
      const response = await axios.get(`${url}api/users`);
      setPlayers(response.data);
    } catch (error) {
      console.log('Error al obtener los awardos:', error);
    }
  }

  const handleAward = async (player) => {
    navigate(`/AwardxPlayer/${player.id}/${player.hour_played}/${player.nombres}`);
  };
  const handlePlusHour = async (player) => {
    MySwal.fire({
      title: `Cuantas horas jugó ${player.nombres}`,
      input: 'number',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Look up',
      showLoaderOnConfirm: true,
      preConfirm: (hour_numb) => {
        if (!hour_numb || 0 === hour_numb.trim().length) {
          Swal.showValidationMessage(
            `Campo vacio`
          )
          return
        }
        let params = {
          "hour_played": hour_numb,
          "fk_id_player": player.id,
          "fk_id_employee": 42
        }
        return params
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          const reponses = axios.post(`${url}api/player_time`, result.value)
          reponses.then(res => {
            if (res.status === 201) {
              MySwal.fire({
                icon: 'success',
                title: 'Premios',
                text: 'Se agrego La hora!',

              })
              fetchPlayer()
            }
          }).catch(error => {
            console.error(error)
            if (error.response && error.response.status === 400) {
              MySwal.fire({
                icon: 'warning',
                title: '!Alerta',
                text: error.response.data.message || 'Error 400: Bad Request',
              });
            }
          })
        } catch (error) {
          console.error(error)
          if (error.response && error.response.status === 400) {
            MySwal.fire({
              icon: 'warning',
              title: '!Alerta',
              text: error.response.data.message || 'Error 400: Bad Request',
            });
          }
        }

      }
    });
  }
  return (
    <Card>

      <Card.Body>
        <Card.Title>
          PlayerTable
        </Card.Title>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombres</th>
              <th>Email</th>
              <th>Celular</th>
              <th>Horas Acumuladas</th>
              {/* <th>Acciones</th> */}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              players.map((player) => (
                <tr key={player.id}>
                  <td>{player.id}</td>
                  <td>{player.nombres}</td>
                  <td>{player.email}</td>
                  <td>{player.celular}</td>
                  <td>{player.hour_played}</td>
                  <Button variant="success" onClick={() => { handlePlusHour(player) }} data-placement="top" title="Agregar Hora">{' '}
                    <FaCalendarPlus />
                  </Button>
                  <Button variant="warning" data-placement="top" title="Horas para vencer">{' '}
                    <FaHourglassEnd />
                  </Button>
                  {player.hour_played > 0 ? (
                    <Button
                      variant="primary"
                      data-placement="top"
                      title="Premios"
                      onClick={() => handleAward(player)}
                    >
                      <FaAward />
                    </Button>
                  ) : (
                    <Button variant="secondary" data-placement="top" title="Premios">
                      <FaAward />
                    </Button>
                  )}
                  <Button variant="info" data-toggle="tooltip" data-placement="top" title="Premios reclamados" >{' '}
                    <FaHistory />
                  </Button>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </Card.Body>


    </Card>
  )
}
