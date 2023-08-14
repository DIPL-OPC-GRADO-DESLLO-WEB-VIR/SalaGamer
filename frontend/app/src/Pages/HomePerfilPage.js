import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Container from '../components/Container';
export default function HomePerfilPage() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    useEffect(() => {
        if (!token) {
            return navigate("/")

        }
    }, [])
    if (!token) {
        return navigate("/")

    }
    return (
        <Container>
            <h1>Hola</h1>
        </Container>
    )
}
