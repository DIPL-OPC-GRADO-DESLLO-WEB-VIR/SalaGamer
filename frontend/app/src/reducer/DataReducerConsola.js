export default function DataReducerConsola(state, action) {
    const { type, payload } = action;
    switch (type) {
        case "setprodustos":
            return {
                ...state,
                Consola: state.consola + 1,
            };
        case "setTiempoHora":
            return {
                ...state,
                // consolas: state.consolas.map((consola, index) =>
                //     index + 1 === state.consola ? { ...consola, hora: payload } : consola
                // ),
                hora: payload
            };
        case "setTiempoMinutos":
            return {
                ...state,
                // consolas: state.consolas.map((consola, index) =>
                //     index + 1 === state.consola ? { ...consola, minutos: payload } : consola
                minuto: payload
                // ),
            };
        case "setConsole":
            return {
                ...state,
                Consola: payload
                // ),
            };
        case "setConsoles":
            return {
                ...state,
                consolas: payload
                // ),
            };
        default:
            throw new Error("Unknown action.");
    }
}