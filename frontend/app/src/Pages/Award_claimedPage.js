import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Container from '../components/Container';
import AwardClaimed from '../components/AwardClaimed';
export default function Award_claimedPage() {
    const { id, hour, name } = useParams();
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
            <AwardClaimed id={id} />

        </Container>

    )
}
