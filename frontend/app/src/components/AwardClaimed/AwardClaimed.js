import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Table } from 'react-bootstrap'

export default function AwardClaimed(params) {
  const { id } = params
  const url = process.env.REACT_APP_API_BASE_URL;
  const [awards, setAwards] = useState([]);
  useEffect(() => {
    fetchAwards();
  }, []);
  const fetchAwards = async () => {
    // setIsLoading(true);
    try {
      const response = await axios.get(`${url}api/playerxawards?id=${id}`);
      setAwards(response.data);
    } catch (error) {
      console.log('Error al obtener los awardos:', error);
    }
  };
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>
            Premios Reclamados
          </Card.Title>
          <hr />
          <Table striped bordered hover>
            <thead>
              <tr>
                {/* <th>ID</th> */}
                <th>premio</th>
                <th>Fecha</th>
                <th># Horas</th>
              </tr>
            </thead>
            <tbody>
              {awards.map((award) => (
                <tr key={award.id}>
                  {/* <td>{award.id}</td> */}
                  <td>{award.name_award}</td>
                  <td>{award.register_date}</td>
                  <td>{award.regulated_hours}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  )
}
