import React, { useContext, useEffect, useState } from "react";
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
  FormLabel,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FilterListIcon from "@mui/icons-material/FilterList";
import CardTotalConsole from "../CardTotalConsole";
import TablaProductos from "../TablaProductos";
import { DataContext } from "../../contexts/DataContextConsola";

export default function TabConsoleShooping() {
  // const { contextData, setcontextData } = useContext(DataContext);
  const { consola, setproductos } = useContext(DataContext);
  const [tiempoHora, setTiempoHora] = useState("");
  const [tiempoMinutos, setTiempoMinutos] = useState("");
  const [productos, setProductos] = useState("");
  const [registros, setRegistros] = useState([]);
  const [age, setAge] = React.useState("");
  const [title, setTitle] = React.useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  useEffect(() => {
    // let { consola } = contextData;
    setTitle(`Consola: ${consola} 😍`);
    // setproductos();
  }, []);
  const horas = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0")
  ); // Arreglo de horas del 00 al 23
  const minutos = Array.from({ length: 60 / 15 }, (_, i) =>
    (i * 15).toString().padStart(2, "0")
  ); // Arreglo de minutos en incrementos de 15
  const handleSubmit = (e) => {
    setproductos();
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
    <div>
      <Card>
        <CardHeader
          color="light"
          title={`consola ${consola}`}
          sx={{ color: "text.primary" }}
        />
        <Divider variant="middle" />
        <CardContent>
          <form component="form" onSubmit={handleSubmit}>
            <Grid>
              <FormLabel>Tiempo</FormLabel>
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
      <TablaProductos registros={registros} />
      <br />
      <CardTotalConsole />
      <br />
    </div>
  );
}
