import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/joy/Card";
import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
import Button from "@mui/joy/Button";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import useSound from "use-sound";
import sonido from "../../assets/mp3/game_over.mp3";
import image from "../../assets/img/console_xbox.jpg";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function CardConsole(props) {
  // const [play] = useSound(sonido);
  const [time, setTime] = useState(60); // Inicializa el tiempo en 3600 segundos (1 hora)
  const [startTime, setStartTime] = useState(null);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [color, setColor] = useState("light");
  const { title, timecard } = props;

  useEffect(() => {
    if (startTime) {
      const timer = setInterval(() => {
        const currentTime = Math.floor(
          (new Date().getTime() - startTime.getTime()) / 1000
        );
        const remainingTime = timecard - currentTime;

        const hours = Math.floor(remainingTime / 3600);
        const minutes = Math.floor((remainingTime % 3600) / 60);
        const seconds = remainingTime % 60;
        if (remainingTime > 0) {
          setHours(hours);
          setMinutes(minutes);
          setSeconds(seconds);
          setTime(remainingTime);
        }

        if (remainingTime === 0) {
          playSound(); // Reproduce el sonido cuando el tiempo se agota
          setHours(0);
          setMinutes(0);
          setSeconds(0);
          setColor("danger");
        }
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
    // else {
    //   setStartTime(new Date());
    // }
  }, [startTime]);

  const handleStartTimer = () => {
    setStartTime(new Date());
  };

  const playSound = () => {
    new Audio(sonido).play();
  };

  return (
    <Card color={color} invertedColors={false} variant="outlined">
      <CardOverflow>
        <AspectRatio ratio="2">
          <img
            src={image}
            srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x"
            loading="lazy"
            alt=""
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="h5">
          <AccessTimeIcon /> 0{hours}:0{minutes}:0{seconds}
        </Typography>
      </CardContent>
      <CardOverflow>
        <Button
          variant="solid"
          color="primary"
          // size="lg"
          onClick={() => {
            handleStartTimer();
          }}
        >
          Comenzar
        </Button>
      </CardOverflow>
    </Card>
  );
}
