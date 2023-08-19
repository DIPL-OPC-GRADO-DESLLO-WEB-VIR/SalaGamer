import React from 'react';
import { useParams } from 'react-router-dom';
import Container from '../components/Container';
import FormAward from '../components/FormAward';
const UpdatePremiosPage = () => {
    const { id } = useParams();

    return (
        <Container>
            {/* <div>
                <h1>User Detail</h1>
                <p>ID: {id}</p>
            </div> */}
            <FormAward />

        </Container>

    );
};

export default UpdatePremiosPage;