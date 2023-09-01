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
} from "@mui/material";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import MenuIcon from "@mui/icons-material/Menu";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FilterListIcon from "@mui/icons-material/FilterList";
import CardTotalConsole from "../CardTotalConsole";
import { DataContext } from "../../contexts/DataContextConsola";

export default function TablaProductos({ registros }) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
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
            onClick={() => setOpen(true)}
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
        <Divider variant="middle" />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tiempo</TableCell>
              <TableCell>Productos</TableCell>
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
      <Modal open={open}>
        <ModalDialog
          color="neutral"
          layout="center"
          size="lg"
          variant="outlined"
        >
          <ModalClose onClick={() => setOpen(false)} />
          <Typography>Modal title</Typography>
        </ModalDialog>
      </Modal>
    </>
  );
}
