import React, { useContext, useEffect, useState } from "react";
import { Divider } from "@mui/material";
import TablaProductos from "../TablaProductos";
import CardTiempo from "../CardTiempo";
import CardTotalConsole from "../CardTotalConsole";
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

  useEffect(() => {
    setTiempoHora("");
    setTiempoMinutos("");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const segundos = parseInt(hora) * 3600 + parseInt(minuto) * 60;

    Consola.timecard = segundos;
    Consola.crono_hour = hora;
    Consola.crono_minute = minuto;
    Consola.start_time = new Date();

    const horaFinalizacion = new Date(
      Consola.start_time.getTime() + segundos * 1000
    );

    const hora2 = horaFinalizacion.getHours();
    const minutos2 = horaFinalizacion.getMinutes();
    const segundos2 = horaFinalizacion.getSeconds();

    Consola.end_time = `${hora2}:${minutos2}:${segundos2}`;
    // console.log(Consola);
    setConsoles(Consola);
  };

  return (
    <div>
      <CardTiempo
        Consola={Consola}
        hora={hora}
        minuto={minuto}
        setTiempoHora={setTiempoHora}
        setTiempoMinutos={setTiempoMinutos}
        handleSubmit={handleSubmit}
      />
      <br />
      <TablaProductos registros={productos} />
      <br />
      <CardTotalConsole />
      <br />
    </div>
  );
}
