// import { GET_USERS } from '..types'

export default function DataReducerConsola(state, action) {
    const { type } = action
    console.log(type)
    if (type === 'setprodustos') {
        return {
            ...state,
            consola: state.consola + 1
        };
    }
    throw Error('Unknown action.');
}
