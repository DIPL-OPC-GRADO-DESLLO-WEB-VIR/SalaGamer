import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Container from '../components/Container';
import FormAward from '../components/FormAward';
const UpdatePremiosPage = () => {
    const { id } = useParams();
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
            {/* <div>
                <h1>User Detail</h1>
                <p>ID: {id}</p>
            </div> */}
            <FormAward id={id} />

        </Container>

    );
};

export default UpdatePremiosPage;