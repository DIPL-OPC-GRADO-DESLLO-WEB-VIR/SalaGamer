import React, { createContext, useEffect, useReducer } from "react";
import DataReducerConsola from "../reducer/DataReducerConsola";

export const DataContext = createContext();

export function DataContextConsola(props) {
  const initialState = {
    Consola: {
      id: 1,
      title: "Consola 1",
      timecard: 0,
      start_time: new Date(),
      crono_hour: "02",
      crono_minute: "00",
      pay: 0,
      end_time: "00:00:00",
      products: [],
    },
    valor: "10000",
    productos: [],
    hora: "",
    minuto: "",
    consolas: [
      {
        id: 1,
        title: "Consola 1",
        timecard: 0,
        start_time: new Date(),
        crono_hour: "00",
        crono_minute: "00",
        pay: 0,
        end_time: "00:00:00",
        products: [],
      },
      {
        id: 2,
        title: "Consola 2",
        timecard: 0,
        start_time: new Date(),
        crono_hour: "00",
        crono_minute: "00",
        pay: 0,
        end_time: "00:00:00",
        products: [],
      },
      {
        id: 3,
        title: "Consola 3",
        timecard: 0,
        start_time: new Date(),
        crono_hour: "00",
        crono_minute: "00",
        pay: 0,
        end_time: "00:00:00",
        products: [],
      },
      {
        id: 4,
        title: "Consola 4",
        timecard: 0,
        start_time: new Date(),
        crono_hour: "00",
        crono_minute: "00",
        pay: 0,
        end_time: "00:00:00",
        products: [],
      },
      {
        id: 5,
        title: "Consola 5",
        timecard: 0,
        start_time: new Date(),
        crono_hour: "00",
        crono_minute: "00",
        pay: 0,
        end_time: "00:00:00",
        products: [],
      },
    ],
  };

  const [state, dispatch] = useReducer(DataReducerConsola, initialState);

  const setproductos = () => {
    dispatch({ type: "setprodustos" });
  };

  const setTiempoHora = (hora) => {
    dispatch({ type: "setTiempoHora", payload: hora });
  };

  const setTiempoMinutos = (minuto) => {
    dispatch({ type: "setTiempoMinutos", payload: minuto });
  };
  const setConsoles = (consola) => {
    const ConsolaP = initialState.consolas.find((c) => c.id === consola.id);
    ConsolaP.crono_hour = consola.crono_hour;
    ConsolaP.crono_minute = consola.crono_minute;
    ConsolaP.timecard = consola.timecard;
    ConsolaP.start_time = consola.start_time;
    ConsolaP.end_time = consola.end_time;
    // console.log(initialState.consolas);
    dispatch({ type: "setConsoles", payload: initialState.consolas });
  };
  const setConsole = (consola) => {
    dispatch({ type: "setConsole", payload: consola });
  };

  const value = {
    Consola: state.Consola,
    valor: state.valor,
    productos: state.productos,
    consolas: state.consolas,
    hora: state.hora,
    minuto: state.minuto,
    setproductos,
    setTiempoHora,
    setTiempoMinutos,
    setConsole,
    setConsoles,
  };

  return (
    <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
  );
}
