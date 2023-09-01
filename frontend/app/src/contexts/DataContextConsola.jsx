import DataReducerConsola from "../reducer/DataReducerConsola.js";
import React, { createContext, useEffect, useReducer, useState } from "react";
export const DataContext = createContext();
// import DataReducerConsola from "../reducer/DataReducerConsola";
// import DataReducer from "../reducer/DataReducerConsola";

function reducer(state, action) {
  console.log(action);
}
export function DataContextConsola(props) {
  // const [contextData, setcontextData] = useState({
  //   consola: "0",
  //   valor: "10000",
  //   productos: [],
  //   setprodustos,
  // });
  const Inicistate = {
    consola: 1,
    valor: "10000",
    productos: [],
    consolas: [
      { title: "Consola 1", timecard: 3600, start_time: new Date() },
      { title: "Consola 2", timecard: 600, start_time: new Date() },
      { title: "Consola 3", timecard: 600, start_time: new Date() },
      { title: "Consola 4", timecard: 0, start_time: new Date() },
      { title: "Consola 5", timecard: 0, start_time: new Date() },
    ],
  };

  const [state, dispatch] = useReducer(DataReducerConsola, Inicistate);
  const setproductos = () => {
    console.log("hola mac2");
    dispatch({ type: "setprodustos" });
  };
  const valor = {
    consola: state.consola,
    valor2: state.valor,
    productos: state.productos,
    consolas: state.consolas,
    setproductos,
  };
  return (
    <DataContext.Provider value={valor}>{props.children}</DataContext.Provider>
  );
}
