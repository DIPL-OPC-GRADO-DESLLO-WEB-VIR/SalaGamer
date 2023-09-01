import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/joy/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/joy/Button";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import useSound from "use-sound";
import sonido from "../../assets/mp3/game_over.mp3";
import image from "../../assets/img/console_xbox.jpg";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { ButtonGroup } from "@mui/joy";

const CardConsole = ({ title, timecard, start_time }) => {
  const [time, setTime] = useState(60);
  const [startTime, setStartTime] = useState(null);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [color, setColor] = useState("light");

  useEffect(() => {
    if (start_time && timecard > 0) {
      const timer = setInterval(() => {
        const currentTime = Math.floor(
          (new Date().getTime() - new Date(start_time).getTime()) / 1000
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
          playSound();
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
  }, [start_time, timecard]);

  const handleStartTimer = () => {
    setStartTime(new Date());
  };

  const playSound = () => {
    new Audio(sonido).play();
  };

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
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
          <AccessTimeIcon /> {formatTime(hours)}:{formatTime(minutes)}:
          {formatTime(seconds)}
        </Typography>
        {start_time && (
          <Typography variant="body2">
            Hora de inicio: {new Date(start_time).toLocaleTimeString()}
          </Typography>
        )}
      </CardContent>
      <CardOverflow sx={{ bgcolor: "background.level1" }}>
        <CardActions buttonFlex="1">
          {/* <ButtonGroup> */}
          <Button variant="outlined" onClick={handleStartTimer}>
            Comenzar
          </Button>
          <Button color="danger" onClick={function () {}} variant="outlined">
            Seleccionar
          </Button>
          {/* </ButtonGroup> */}
        </CardActions>
      </CardOverflow>
    </Card>
  );
};

export default CardConsole;
