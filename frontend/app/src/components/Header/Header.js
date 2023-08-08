import React from 'react'
import { Alert, Button, Navbar } from 'react-bootstrap';
import logo from '../../assets/img/consola.png'
import { NavLink } from 'react-router-dom';
export default function Header() {
  return (

    <>
      <Navbar bg="dark" variant="dark">
        <NavLink to="/" >
          <Navbar.Brand >
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
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <NavLink to="/FormRegister" >
              <Button variant="info">Crear</Button>{' '}
            </NavLink>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </>

  )
}
