import React, { useEffect } from 'react'
import Container from '../components/Container';
import PremiosTable from '../components/PremiosTable';
import { useNavigate } from 'react-router-dom';
export default function PremiosPage() {
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
        <Container >
            <PremiosTable />

        </Container>
    )
}
