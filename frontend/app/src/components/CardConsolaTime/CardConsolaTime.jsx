import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../contexts/DataContextConsola";
import { Button, Card, Col, Row } from "react-bootstrap";
import CardConsole from "../CardConsole";
import { Grid } from "@mui/material";

const CardConsolaTime = () => {
  const { consolas } = useContext(DataContext);

  useEffect(() => {
    // let x = [
    //   { name: "sss", description: "sasa" },
    //   { name: "sss", description: "sasa" },
    // ];
    // console.table(x);
  }, []);

  return (
    <>
      <br />
      <Grid container alignItems="center" direction="row">
        {consolas.map((consola, index) => (
          <Grid xs={6} md={3} key={index}>
            <CardConsole
              title={consola.title}
              timecard={consola.timecard}
              start_time={consola.start_time}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default CardConsolaTime;
