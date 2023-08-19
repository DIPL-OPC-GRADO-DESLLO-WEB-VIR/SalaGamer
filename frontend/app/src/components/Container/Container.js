import React, { useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';

export default function Container_sala({ children }) {
    const [isLoading, setIsLoading] = useState(true);

    // Simulación de una carga de datos
    setTimeout(() => {
        setIsLoading(false);
    }, 2000);

    return (
        <>
            {isLoading ? (
                <Container className="p-3 mb-2 bg-light text-dark">
                    <div class="d-flex text-dange justify-content-center">
                        <div class="spinner-grow  text-danger m-5" role="status">
                            {/* <span class="visually-hidden">Loading...</span> */}
                        </div>
                    </div>
                </Container>

            ) : (
                <>
                    <br />
                    <Container>
                        {children}
                    </Container>
                    <br />
                </>
            )}
        </>
    );
}