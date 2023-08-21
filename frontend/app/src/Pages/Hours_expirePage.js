import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export default function Hours_expirePage() {

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
        <div>Hours_expire {id}</div>
    )
}
