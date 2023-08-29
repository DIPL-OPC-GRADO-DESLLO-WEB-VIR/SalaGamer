import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../contexts/DataContextConsola";
import { Button, Card, Col, Row } from "react-bootstrap";
import CardConsole from "../CardConsole";
import { Grid } from "@mui/material";
export default function CardConsolaTime() {
  const { contextData, setcontextData } = useContext(DataContext);
  const FaStarHalfAlt = () => {
    setcontextData({ name: "22", description: "sasa" });
  };
  const [consolas, setconsolas] = useState([]);
  useEffect(() => {
    let x = [
      { name: "sss", description: "sasa" },
      { name: "sss", description: "sasa" },
    ];
    console.table(x);
  }, []);
  const header = (
    <img
      alt="Card"
      src="https://primefaces.org/cdn/primereact/images/usercard.png"
    />
  );
  const footer = (
    <div className="flex flex-wrap justify-content-end gap-2">
      <Button label="Save" icon="pi pi-check" />
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-outlined p-button-secondary"
      />
    </div>
  );
  return (
    <>
      <br />
      <Grid container alignItems="center" direction="row">
        <Grid xs={6} md={3}>
          <CardConsole title="Consola 1" timecard="3600" />{" "}
        </Grid>
        <Grid xs={1} md={0}>
          {/* {" "} */}
        </Grid>
        <Grid xs={6} md={3}>
          <CardConsole title="Consola 2" timecard="600" />
        </Grid>
        <Grid xs={1} md={0}>
          {/* {" "} */}
        </Grid>
        <Grid xs={6} md={3}>
          <CardConsole title="Consola 3" timecard="10" />
        </Grid>
      </Grid>

      {/* <div>
        CardConsolaTime {contextData.name} {contextData.description}
      </div> */}
      {/* <Button
        onClick={() => {
          FaStarHalfAlt();
        }}
      >
        click
      </Button> */}
    </>
  );
}
