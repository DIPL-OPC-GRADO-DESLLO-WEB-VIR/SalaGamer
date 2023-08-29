import React, { useState } from "react";
// import { Card, Form, Button, Table, Row, Col } from "react-bootstrap";
import {
  Card,
  FormControl,
  Button,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  CardContent,
  CardHeader,
  Select,
  InputLabel,
  MenuItem,
  Grid,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FilterListIcon from "@mui/icons-material/FilterList";

export default function TabConsoleShooping() {
  const [tiempoHora, setTiempoHora] = useState("");
  const [tiempoMinutos, setTiempoMinutos] = useState("");
  const [productos, setProductos] = useState("");
  const [registros, setRegistros] = useState([]);
  const [age, setAge] = React.useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const horas = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0")
  ); // Arreglo de horas del 00 al 23
  const minutos = Array.from({ length: 60 / 15 }, (_, i) =>
    (i * 15).toString().padStart(2, "0")
  ); // Arreglo de minutos en incrementos de 15

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoRegistro = {
      tiempo: `${tiempoHora}:${tiempoMinutos}`,
      productos: productos,
    };
    setRegistros([...registros, nuevoRegistro]);
    setTiempoHora("");
    setTiempoMinutos("");
    setProductos("");
  };

  return (
    // <div>
    //   <Card>
    //     <Card.Header>
    //       <Row>
    //         <Col>Console 1</Col>
    //         <Col></Col>
    //         <Col>sss</Col>
    //       </Row>
    //     </Card.Header>
    //     <Card.Body>
    //       <Form onSubmit={handleSubmit}>
    //         <Form.Group controlId="tiempo">
    //           <Form.Label>Tiempo</Form.Label>
    //           <div className="d-flex">
    //             <Form.Control
    //               as="select"
    //               value={tiempoHora}
    //               onChange={(e) => setTiempoHora(e.target.value)}
    //             >
    //               <option value="">Hora</option>
    //               {horas.map((hora) => (
    //                 <option key={hora} value={hora}>
    //                   {hora}
    //                 </option>
    //               ))}
    //             </Form.Control>
    //             <span style={{ margin: "0 10px" }}>:</span>
    //             <Form.Control
    //               as="select"
    //               value={tiempoMinutos}
    //               onChange={(e) => setTiempoMinutos(e.target.value)}
    //             >
    //               <option value="">Minutos</option>
    //               {minutos.map((minuto) => (
    //                 <option key={minuto} value={minuto}>
    //                   {minuto}
    //                 </option>
    //               ))}
    //             </Form.Control>
    //           </div>
    //         </Form.Group>

    //         <Form.Group controlId="productos">
    //           <Form.Label>Productos</Form.Label>
    //           <Form.Control
    //             type="text"
    //             placeholder="Ingrese los productos"
    //             value={productos}
    //             onChange={(e) => setProductos(e.target.value)}
    //           />
    //         </Form.Group>

    //         <Button variant="primary" type="submit">
    //           Registrar
    //         </Button>
    //       </Form>
    //     </Card.Body>
    //   </Card>
    //   <br />
    //   <Card>
    //     <Card.Header>Productos</Card.Header>
    //     <Card.Body>
    //       <Table>
    //         <thead>
    //           <tr>
    //             <th>Tiempo</th>
    //             <th>Productos</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {registros.map((registro, index) => (
    //             <tr key={index}>
    //               <td>{registro.tiempo}</td>
    //               <td>{registro.productos}</td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </Table>
    //     </Card.Body>
    //   </Card>
    // </div>
    // <FormControl>
    //   {/* <InputLabel htmlFor="my-input">Email address</InputLabel>
    //   <Input id="my-input" aria-describedby="my-helper-text" />
    //   <FormHelperText id="my-helper-text">
    //     We'll never share your email.
    //   </FormHelperText> */}
    // </FormControl>
    <div>
      <Card>
        {/* <Card.Header>Consola 1</Card.Header> */}
        <CardHeader
          color="light"
          title="Consola 1"
          sx={{ color: "text.primary" }}
        />
        <CardContent>
          <form component="form" onSubmit={handleSubmit}>
            <Grid>
              <label htmlFor="tiempo">Tiempo</label>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="select-label">Hora</InputLabel>
                <Select
                  labelId="select-label"
                  id="select"
                  value={tiempoHora}
                  label="Minutos"
                  onChange={(e) => setTiempoHora(e.target.value)}
                >
                  {horas.map((hora) => (
                    <MenuItem key={hora} value={hora}>
                      {hora}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">Minutos</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={tiempoMinutos}
                  label="Minutos"
                  onChange={(e) => setTiempoMinutos(e.target.value)}
                >
                  {minutos.map((minuto) => (
                    <MenuItem key={minuto} value={minuto}>
                      {minuto}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <FormControl>
              <label htmlFor="productos">Productos</label>
              <input
                type="text"
                placeholder="Ingrese los productos"
                value={productos}
                onChange={(e) => setProductos(e.target.value)}
              />
            </FormControl>
            <br />
            <Button variant="contained" color="error" type="submit">
              Registrar
            </Button>
          </form>
        </CardContent>
      </Card>
      <br />
      <Card>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Productos
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <AddShoppingCartIcon />
          </IconButton>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <FilterListIcon />
          </IconButton>
        </Toolbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Dessert </TableCell>
              <TableCell>Dessert </TableCell>
              <TableCell>Dessert </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {registros.map((registro, index) => (
              <TableRow key={index}>
                <TableCell>{registro.tiempo}</TableCell>
                <TableCell>{registro.productos}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
