import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
export default function HomePerfilPage() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    console.log(token)
    useEffect(() => {
        if (!token) {
            return navigate("/")

        }
    }, [])
    if (!token) {
        return navigate("/")

    }
    return (
        <div>HomePerfilPage</div>
    )
}
