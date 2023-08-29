import React, { createContext, useEffect, useState } from 'react'
export const DataContext = createContext();
export function DataContextConsola(props) {
    const [contextData, setcontextData] = useState({ name: "sss", description: "sasa" });
    const valor = { contextData, setcontextData };
    return (
        <DataContext.Provider value={valor}>
            {props.children}
        </DataContext.Provider>
    )
}
