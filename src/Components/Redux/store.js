import { createStore } from 'redux'


const stateInitial = {
    /** Search normal */
    keyWord: "",

    /** Data search advanced */
    search: "",
    searchALterno: "",
    nombre: "",
    correo: "",
    password: "",
    password1: "",
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
        'Tweet mas Rt': "",
        'Promedio RT': 1,
        'Mayor Favorito Muy Positivo': 1,
        'Mayor Favorito Tendencia positiva': 1,
        'Mayor Favorito Tendencia Negativa': 1,
        'Mayor Favorito Muy Negativo': 1,
        'Tweet mas Fv': "",
        'Promedio Favorito': 1,
        'Hashtags populares': [],
        'Menciones populares': "",
        'Trama': "",
        'Archivo': "",
        'Fecha': ""
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
            json: action.input,
            cambio: action.camb
        }

    }

    else if (action.type == "ESTADO_INPUT_FIRTS") {
        console.log("desde store input search " + action.input)

        return {
            ...state,
            search: action.input,
        }

    } else if (action.type == "ESTADO_INPUT_FIRTS_1") {
        console.log("desde store input search " + action.input)

        return {
            ...state,
            search: action.input,
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

    } else if (action.type == "cambiarCorreo") {

        return {
            ...state,
            correo: action.input
        }

    }
    else if (action.type == "cambiarPassword") {

        return {
            ...state,
            password: action.input
        }

    }

    else if (action.type == "cambiarPassword1") {

        return {
            ...state,
            password1: action.input
        }

    }

    else if (action.type == "cambiarNombre") {

        return {
            ...state,
            nombre: action.input
        }

    }

    return state

}

/**  Es necesario crea la función reductora que hace cambios en la aplicación */
export default createStore(reducerSearch)