import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

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
        <div>Award_claimed {id}</div>
    )
}
