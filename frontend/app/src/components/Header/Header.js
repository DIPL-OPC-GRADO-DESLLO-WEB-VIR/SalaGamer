import React, { useEffect, useState } from 'react';
import { Alert, Button, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import logo from '../../assets/img/consola.png';
import { NavLink } from 'react-router-dom';
import './Header.css'

export default function Header() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogout = () => {
    // Lógica para cerrar sesión, como eliminar el token del LocalStorage
    localStorage.removeItem('token');
    setToken(null);
    window.location.href = '/';
  };
  useEffect(() => {
    let token_aux = localStorage.getItem('token')
    console.log(`toekn: ${token_aux}`)
    if (!!token) {
      console.log("Estoy en header");
    }
    else {
      console.log("Estoy en sin token");
    }
  })
  return (
    <>
      <Navbar variant="dark" className='bd-navbar'>
        <NavLink to="/">
          <Navbar.Brand>
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Playtopia
          </Navbar.Brand>
        </NavLink>
        {token ? (
          <>
            {/* 
            <NavLink to="/ProfilePage">
              <Navbar.Brand>
                Inicio
              </Navbar.Brand>

            </NavLink> */}
            <Nav className="mr-auto">
              {/* <Nav.Link href="/HomePerfilPage">Home</Nav.Link> */}
              <Nav.Link href="/ConsolaPage">Consolas</Nav.Link>
              <Nav.Link href="/ConsolaPage">Compras Directas</Nav.Link>
              {/* <Nav.Link href="#features">Features</Nav.Link> */}
              {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
              <NavDropdown title="Productos" id="basic-nav-dropdown">
                <NavDropdown.Item href="/PlayerPage">Jugadores</NavDropdown.Item>
                <NavDropdown.Item href="/FormRegister">Crear Jugador</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Jugadores" id="basic-nav-dropdown">
                <NavDropdown.Item href="/PlayerPage">Jugadores</NavDropdown.Item>
                <NavDropdown.Item href="/FormRegister">Crear Jugador</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Premios" id="basic-nav-dropdown">
                <NavDropdown.Item href="/PremiosPage">Premios</NavDropdown.Item>
                <NavDropdown.Item href="/CrearProductoPage">Crear Premios</NavDropdown.Item>
              </NavDropdown>
            </Nav>

          </>
        ) : (
          <>
          </>

        )}
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {token ? (
              <>

                <NavLink to="/ProfilePage">
                  <Button variant="info">Perfil</Button>{' '}
                </NavLink>
                <Button variant="danger" onClick={handleLogout}>Cerrar sesión</Button>
              </>
            ) : (
              <>
                <NavLink to="/FormRegister">
                  <Button variant="info">Crear</Button>{' '}
                </NavLink>
                <NavLink to="/LoginPage">
                  <Button variant="info">Login</Button>{' '}
                </NavLink>
              </>

            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}