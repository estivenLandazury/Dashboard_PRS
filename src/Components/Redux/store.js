import { createStore } from 'redux'


const stateInitial = {
    /** Search normal */
    keyWord: "",

    /** Data search advanced */
    search: "",
    search1: "Developing...",
    Hashtags: "",
    Usernames: "",
    Ubication: "",
    Date: "",
    cambio: false,
    json: {
        'Muy positivo': 1,
        'Tendencia positiva': 1,
        'Tendencia negativa': 1,
        'Muy negativo': 1,
        'Maximo RT Muy positivo': 1,
        'Maximo Rt Tendencia Positiva': 1,
        'Maximo Rt Tendencia Negativa': 1,
        'Maximo Rt Muy negativos': 1,
        'Promedio RT': 1,
        'Mayor Favorito Muy Positivo': 1,
        'Mayor Favorito Tendencia positiva': 1,
        'Mayor Favorito Tendencia Negativa': 1,
        'Mayor Favorito Muy Negativo': 1,
        'Promedio Favorito': 1,
        'Menciones populares': ""
    }
}

const reducerSearch = (state = stateInitial, action) => {

    console.log("Action " + action)
    if (action.type == "CAMBIAR STADO") {
        return {
            ...state,
            search1: "ricura bella"
        }
    } else if (action.type == "INPUT1") {
        return {
            ...state,
            search1: action.input
        }
    } else if (action.type == "INDICE_GRAFICA") {

        return {
            ...state,
            json: action.input
        }

    }

    else if (action.type == "ESTADO_INPUT_FIRTS") {

        return {
            ...state,
            search: action.input,
            cambio: true
        }

    } else if (action.type == "ESTADO_INPUT_FIRTS_1") {

        return {
            ...state,
            search: action.input,
            cambio: true
        }

    } else if (action.type == "SET_DATE") {
        console.log("desde Store Date " + action.input)

        return {
            ...state,
            Date: action.input

        }

    }

    else if (action.type == "SET_LOADER") {

        return {
            ...state,
            cambio: action.input

        }

    }

    return state

}

/**  Es necesario crea la función reductora que hace cambios en la aplicación */
export default createStore(reducerSearch)