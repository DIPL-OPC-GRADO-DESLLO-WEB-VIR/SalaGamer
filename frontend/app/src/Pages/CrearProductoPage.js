import React, { useEffect } from 'react'
import Container from '../components/Container';
import FormProducto from '../components/FormProducto';
import { useNavigate } from 'react-router-dom';
export default function CrearProductoPage() {
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
            <FormProducto />
        </Container>

    )
}
