import React, { useEffect } from 'react'
import Container from '../components/Container';
import PlayerTable from '../components/PlayerTable';
import { useNavigate } from 'react-router-dom';
export default function PlayerPage() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    useEffect(() => {
        if (!token) {
            return navigate("/")

        }
    },)
    if (!token) {
        return navigate("/")

    }
    return (
        <Container>
            <PlayerTable></PlayerTable>
        </Container>

    )
}
