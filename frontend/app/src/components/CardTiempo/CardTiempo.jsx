import React from "react";
import {
  Card,
  FormControl,
  Button,
  Grid,
  FormLabel,
  Divider,
  CardActions,
  CardHeader,
  CardContent,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";

export default function CardTiempo({
  Consola,
  hora,
  minuto,
  setTiempoHora,
  setTiempoMinutos,
  handleSubmit,
}) {
  const horas = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0")
  ); // Arreglo de horas del 00 al 23

  const minutos = Array.from({ length: 60 / 15 }, (_, i) =>
    (i * 15).toString().padStart(2, "0")
  ); // Arreglo de minutos en incrementos de 15

  return (
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
        </CardContent>
        <br />
        <CardActions>
          <Button
            variant="contained"
            sx={{ width: "100%" }}
            color="error"
            size="large"
            type="submit"
          >
            Registrar
          </Button>
        </CardActions>
      </form>
    </Card>
  );
}
