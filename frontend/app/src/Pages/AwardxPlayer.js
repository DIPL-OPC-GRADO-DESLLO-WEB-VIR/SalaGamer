import React, { useEffect } from 'react'
import Container from '../components/Container'
import { useNavigate, useParams } from 'react-router-dom';
import CardAward from '../components/CardAward'
export default function AwardxPlayer() {
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
        <Container><CardAward id={id} hour={hour} name={name} /></Container>

    )
}
