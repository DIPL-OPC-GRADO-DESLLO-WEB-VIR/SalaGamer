import React, { useState, useEffect } from 'react';
import spinnerImage from '../../assets/img/spinner.gif';

export default function Container_sala({ children }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {isLoading ? (
                <div className="container">
                    <div className="d-flex justify-content-center align-items-center vh-100">
                        <img src={spinnerImage} alt="Spinner" />
                        <br />
                        Cargando...
                    </div>
                </div>
            ) : (
                <>
                    <br />
                    <div className="container">{children}</div>
                    <br />
                </>
            )}
        </>
    );
}