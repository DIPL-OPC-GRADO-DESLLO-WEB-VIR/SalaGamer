import React, { useContext, useState } from "react";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardContent from "@mui/joy/CardContent";
import Checkbox from "@mui/joy/Checkbox";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import { DataContext } from "../../contexts/DataContextConsola";
import { useEffect } from "react";

export default function CardTotalConsole(props) {
  // const { contextData, setcontextData } = useContext(DataContext);
  const { valor2 } = useContext(DataContext);
  const [valor_total, setValorTotal] = useState("10");
  const [valor_pago, setValorPago] = useState("0");
  const [valor_cambio, setValorCambio] = useState("0");

  useEffect(() => {
    // let { valor } = contextData;
    // setValorTotal(valor);
  }, []);

  const calcularCambio = () => {
    const cambio = parseFloat(valor_pago) - parseFloat(valor_total);
    const valorCambioFinal = cambio < 0 ? 0 : cambio; // Verificar si el cambio es menor que cero
    setValorCambio(valorCambioFinal.toFixed(0));
  };

  const handleInputChange = (event) => {
    const pago = event.target.value;
    setValorPago(pago);
    calcularCambio();
  };

  return (
    <Card
      variant="outlined"
      sx={{
        maxHeight: "max-content",
        maxWidth: "100%",
        mx: "auto",
        // to make the demo resizable
        overflow: "auto",
        resize: "horizontal",
      }}
    >
      <Typography level="title-lg" startDecorator={<PointOfSaleIcon />}>
        Total
      </Typography>
      <Divider inset="none" />
      <CardContent
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(80px, 1fr))",
          gap: 1.5,
        }}
      >
        <FormControl sx={{ gridColumn: "1/-1" }}>
          <FormLabel>Paga</FormLabel>
          <Input
            endDecorator={<CreditCardIcon />}
            value={valor2}
            onInput={handleInputChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Total</FormLabel>
          <Input
            disabled={true}
            value={valor_total}
            endDecorator={<AttachMoneyIcon />}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Cambio</FormLabel>
          <Input
            disabled={true}
            value={valor_cambio}
            endDecorator={<PriceChangeIcon />}
          />
        </FormControl>
        <CardActions sx={{ gridColumn: "1/-1" }}>
          <Button variant="solid" color="primary" onClick={calcularCambio}>
            Cobrar
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}
