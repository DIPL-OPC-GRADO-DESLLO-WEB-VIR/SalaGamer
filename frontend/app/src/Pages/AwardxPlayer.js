import React from 'react'
import Container from '../components/Container'
import { useParams } from 'react-router-dom';
import CardAward from '../components/CardAward'
export default function AwardxPlayer() {
    const { id, hour, name } = useParams();
    return (
        <Container><CardAward id={id} hour={hour} name={name} /></Container>

    )
}
