import React from 'react';
import { Container } from "react-bootstrap";
import Spinner from 'react-bootstrap/Spinner'
export default function Container_sala({ children }) {
    return (
        <>
            <br />
            <Container>
                {children}
            </Container>
            <br />
        </>
        // <div className={bg ? "" : "container-bg"}>
        //     <Content>{children}</Content>
        // </div>
    );
}