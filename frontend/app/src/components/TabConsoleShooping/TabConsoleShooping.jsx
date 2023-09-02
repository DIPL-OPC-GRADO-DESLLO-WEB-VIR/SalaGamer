import React, { useContext, useEffect, useState } from "react";
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
  CardActions,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FilterListIcon from "@mui/icons-material/FilterList";
import CardTotalConsole from "../CardTotalConsole";
import TablaProductos from "../TablaProductos";
import { DataContext } from "../../contexts/DataContextConsola";

export default function TabConsoleShooping() {
  const {
    Consola,
    setproductos,
    hora,
    minuto,
    setTiempoHora,
    setTiempoMinutos,
    productos,
    setConsoles,
  } = useContext(DataContext);
  // const [productos, setProductos] = useState("");
  const [registros, setRegistros] = useState([]);
  // const [tiempoHora, setTiempoHora] = useState("");
  // const [tiempoMinutos, setTiempoMinutos] = useState("");

  useEffect(() => {
    setTiempoHora("");
    setTiempoMinutos("");
    // console.log(consola);
    // setProductos("");
  }, []);
  const horas = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0")
  ); // Arreglo de horas del 00 al 23
  const minutos = Array.from({ length: 60 / 15 }, (_, i) =>
    (i * 15).toString().padStart(2, "0")
  ); // Arreglo de minutos en incrementos de 15
  const handleSubmit = (e) => {
    console.log("Submit");
    e.preventDefault();
    // const nuevoRegistro = {
    //   // tiempo: `${consola.hora}:${consola.minutos}`,
    //   // productos: productos,

    // };
    const segundos = parseInt(hora) * 3600 + parseInt(minuto) * 60;
    // console.log(segundos);
    Consola.timecard = segundos;
    Consola.crono_hour = hora;
    Consola.crono_minute = minuto;
    Consola.start_time = new Date();

    // Calcular la hora de finalización sumando los segundos adicionales
    const horaFinalizacion = new Date(
      Consola.start_time.getTime() + segundos * 1000
    );
    // Obtener los componentes de la hora de finalización
    const hora2 = horaFinalizacion.getHours();
    const minutos2 = horaFinalizacion.getMinutes();
    const segundos2 = horaFinalizacion.getSeconds();

    // Imprimir la hora de finalización
    // console.log(
    //   `La hora de finalización será: ${hora2}:${minutos2}:${segundos2}`
    // );
    Consola.end_time = `${hora2}:${minutos2}:${segundos2}`;
    // console.log(Consola);
    setConsoles(Consola);
    // setRegistros([...registros, nuevoRegistro]);
    // setProductos("");
  };

  const handleProductosChange = (e) => {
    // setProductos(e.target.value);
  };

  return (
    <div>
      <Card>
        <CardHeader
          color="light"
          title={`${Consola.title}`}
          sx={{ color: "text.primary" }}
        />
        <Divider variant="middle" />

        <form component="form" onSubmit={handleSubmit}>
          <CardContent>
            <Grid>
              <FormLabel>Tiempo</FormLabel>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="select-label">Hora</InputLabel>
                <Select
                  labelId="select-label"
                  id="select"
                  value={hora}
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
                  defaultValue={30}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={minuto}
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
            {/* <FormControl>
              <label htmlFor="productos">Productos</label>
              <input
                type="text"
                placeholder="Ingrese los productos"
                value={productos}
                onChange={handleProductosChange}
              />
            </FormControl> */}
          </CardContent>
          <br />
          <CardActions>
            <Button
              variant="contained"
              sx={{ width: "100% " }}
              color="error"
              size="large"
              type="submit"
            >
              Registrar
            </Button>
          </CardActions>
        </form>
      </Card>
      <br />
      <TablaProductos registros={productos} />
      <br />
      <CardTotalConsole />
      <br />
    </div>
  );
}
