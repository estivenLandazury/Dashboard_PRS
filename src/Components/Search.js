import React, { Component } from 'react';
import '../customCSS/search.css'
import buttonSearch from '../Images/Grupo 681.png';
import advancedbuttonSearch from '../Images/Grupo 1270.png';
import add from '../Images/Grupo 1269@2x.png';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

/** ----Importaciones de REDUX---- */
import { Provider } from "react-redux"
import Store from "../Components/Redux/store"

/** ---- END Importaciones de REDUX -----*/

import Admin from './Admin'
import { connect } from 'react-redux';





class search extends Component {

    constructor(props) {

        super(props);



        this.state = {

            estado: true,
            startDate: new Date(),
            /* URL: "http://192.168.96.37:5002/",*/
            URL: "http://172.19.15.30:5002/",

            loader: true,

            /** Search normal */
            /*keyWord: "",*/
            /** Data search advanced */
            /*search: "sdf",*/
            Hashtags: "",
            Usernames: "",
            Ubication: "",
            Date: ""
        }
    }




    componentDidMount() {
        console.log("REDUX STATE " + this.props.search1)
        console.log("REDUX Date " + this.state.startDate)
        console.log("REDUX Ubicacion " + this.state.Ubication)
        const js = localStorage.getItem('datos');
        const vl = JSON.parse(js)
        console.log("dddddddddddddd" + js)

        console.log("dddddddddddddd" + vl['hotmail'])




    }

    inputsearch_1(e) {

        console.log("Valor search " + e.target.value)


        this.props.cambiarInputsearch_1(e.target.value)

        /* this.setState({
             keyWord: e.target.value
         })*/
    }

    inputsearch(e) {
        /** 
                var valor = document.getElementById('inputPassword').value
                console.log("valor inputsearch " + valor)
                */
        this.props.cambiarEstado(e.target.value)
        /*this.setState({
            search: e.target.value
        })
        console.log(this.state.search)
        */
    }

    inputsearch1(e) {

        this.setState({
            Hashtags: e.target.value
        })

    }

    inputsearch2(e) {
        this.setState({
            Usernames: e.target.value
        })

    }

    inputsearch3(e) {
        this.setState({
            Ubication: e.target.value
        })
        console.log("ubication " + this.state.Ubication)

    }

    handleChange = date => {

        this.setState({
            startDate: date
        })

        var datoString = JSON.stringify(date);
        var listString = datoString.split(" ");
        var string1 = listString[0];
        var dateReducer = string1.substring(1, 11)
        console.log("Date " + date)
        console.log("Date " + listString[0])
        console.log("Date " + dateReducer)
        this.props.cambiarDate(dateReducer)

    }


    search() {
        this.setState({
            estado: false
        })

        console.log(this.state.estado)
    }

    searchAdvanced() {
        this.setState({
            estado: true
        })
        console.log(this.state.estado)


    }

    addcamp() {
        return <div>  </div>

    }

    loader() {

        /**timeout={30000} */

        if (this.props.cambio == false) {

            return <div className="loader"></div>
        } else {
            return <div className="loader">
                <Loader type="BallTriangle" color="#00BFFF" height={100} width={100} > </Loader>
                <h1 className="Loader">Analizando Información...</h1>
            </div>



        }




    }




    sendInfo_1() {
        console.log("hashtagBusqueda send info " + this.state.Hashtags)
        console.log("palabra busqueda sen info " + this.props.search)
        const js = localStorage.getItem('datos');
        const vl = JSON.parse(js)

        let data = { "palabraBusqueda": this.props.search, "hashtagBusqueda": "", "usuarioBusqueda": "", "fechaMinBusqueda": "", "cercaniaBusqueda": "", "correo": vl['hotmail'] }

        this.props.cambiarLoader(true)


        let options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }


        fetch(this.state.URL + "pedir", options)
            .then(response => response.json())
            .then((responseJson) => {


                this.props.IndicesGrafica(responseJson, false)
                NotificationManager.success("Success message", "Se ha generado el reporte correctamente", 5000)






            }).catch(function (error) {
                NotificationManager.error("Error message", "Connection error verify server", 5000)
                this.props.cambiarLoader(false)
                console.log("Opa vv")

            }
            )

    }





    sendInfo() {
        const js = localStorage.getItem('datos');
        const vl = JSON.parse(js)

        console.log("hashtagBusqueda send info " + this.state.Hashtags)
        console.log("palabra busqueda sen info " + this.props.search)

        let data = { "palabraBusqueda": this.props.search, "hashtagBusqueda": this.state.Hashtags, "usuarioBusqueda": this.state.Usernames, "fechaMinBusqueda": this.props.Date, "cercaniaBusqueda": this.state.Ubication, "correo": vl['hotmail'] }

        this.props.cambiarLoader(true)

        let options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }


        fetch(this.state.URL + "pedir", options)
            .then(response => response.json())
            .then((responseJson) => {




                console.log("este es response " + responseJson)

                NotificationManager.error("Error message", "No se ha logrado Compleytar el analisis", 5000)
                this.props.cambiarLoader(false)






            }).catch(function (error) {
                NotificationManager.error("Error message", "Connection error verify server", 5000)
                this.props.cambiarLoader(false)
                console.log("Opa vv")

            }

                /**    NotificationManager.error("Error message", "Connection error verify server", 5000),
                  */

            )


    }





    campKey() {

        if (this.state.estado == false) {

            return <div>
                <form>
                    <div className="form-group">
                        {/**<input type="email" className="form-control" id="exampleFormControlInput1" placeholder="KeyWord" /> */}

                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="KeyWord" onChange={e => this.inputsearch_1(e)} />
                    </div>
                    <button type="button" className="btn btn-primary" id="Search-button" onClick={this.sendInfo_1.bind(this)}>search</button>
                </form>
                <img src={add} className="buttonSearch_logo" id="add" /> <h5 className="keyWord" >New Key word</h5>

            </div>
        } else if (this.state.estado == true) {

            return <div className="advancedSearch2">
                <h1 className="Social_title2" id="advancedSearch"> Advanced search</h1>

                <h1 className="Social_title" id="especifSearch"> Words</h1>


                <form>
                    <div className="form-group row">
                        <label for="staticEmail" class="col-sm-2 col-form-label"> <h1 className="labelh1">search  </h1></label>
                        <div className="col-sm-10">
                            {/** <input type="text" className="form-control" id="inputPassword" placeholder="keyWord" onChange={e => this.props.input1(e.target.value)} /> */}
                            <input type="text" className="form-control" id="inputPassword" placeholder="keyWord" onChange={e => this.inputsearch(e)} />
                            {/** <input type="text" className="form-control" id="inputPassword" placeholder="keyWord" />*/}
                        </div>
                    </div>

                    {/** <div className="form-group row">
                        <label for="inputPassword" className="col-sm-2 col-form-label"> <h1 className="labelh1">This exact phrase </h1> </label>
                        <div className="col-xl-10">
                            <input type="text" className="form-control" id="inputPassword1" placeholder="Elecciones" />
                        </div>
                    </div>  */}

                    <div className="form-group row">
                        <label for="inputPassword" className="col-sm-2 col-form-label"> <h1 className="labelh1">Hashtags</h1></label>
                        <div className="col-xl-10">
                            <input type="text" className="form-control" id="inputPassword2" placeholder="#votoElectrónico" onChange={e => this.inputsearch1(e)} />
                        </div>
                    </div>

                    <h1 className="Title-person">People</h1>


                    <div className="form-group row">
                        <label for="inputPassword" className="col-sm-2 col-form-label"><h1 className="labelh1">Usernames </h1> </label>
                        <div className="col-xl-10">
                            <input type="text" className="form-control" id="inputPassword3" placeholder="Claudia Lopez" onChange={e => this.inputsearch2(e)} />
                        </div>
                    </div>

                    {/*<div className="form-group row">
                        <label for="inputPassword" className="col-sm-2 col-form-label"><h1 className="labelh1">Mentions</h1></label>
                        <div className="col-xl-10">
                            <input type="text" className="form-control" id="inputPassword4" placeholder="Petro" />
                        </div>
                    </div>  */}

                    <h1 className="Title-person">Location</h1>

                    <div className="form-group row">
                        <label for="inputPassword" className="col-sm-2 col-form-label"><h1 className="labelh1">Ubication</h1></label>
                        <div className="col-xl-10">
                            <select className="form-control form-control-sm" id="selectWid" onChange={e => this.inputsearch3(e)} >
                                <option >Antioquia</option>
                                <option >Atlántico</option>
                                <option > Bolívar</option>
                                <option >Boyaca</option>
                                <option >Caldas</option>
                                <option >Caquetá</option>
                                <option  >Cundinamarca</option>
                                <option >Risaralda</option>
                                <option >San Andrés</option>
                                <option >Sucre</option>
                                <option >La Guajira</option>
                                <option >Quindio</option>
                                <option >Valle del Cauca</option>
                                <option >Vaupés</option>
                                <option >Vichada</option>
                            </select>
                        </div>

                    </div>

                    <h1 className="Title-person">Date</h1>

                    <div className="form-group row">
                        <label for="inputPassword" className="col-sm-2 col-form-label"> <h1 className="labelh1">Date </h1></label>
                        <div className="col-xl-10">
                            <DatePicker className="Date-picker" id="dataPicker" selected={this.state.startDate} onChange={this.handleChange} dateFormat="yyyy/MM/dd" maxDate={new Date()} />
                        </div>
                    </div>
                    <button type="button" className="btn btn-primary" id="Search-button1" onClick={this.sendInfo.bind(this)}>search</button>


                </form>
                <img src={add} className="buttonSearch_logo" id="add" style={{ display: 'none' }} /> <h5 className="keyWord" style={{ display: 'none' }}>New Key word</h5>
                <div className="ChartsModule" style={{ display: 'none' }}>
                </div>

            </div>
        }
    }

    render() {
        return (

            <div>
                <NotificationContainer></NotificationContainer>

                <div className="container" id="search-container">
                    <div className="row">
                        <div className="col-md-4">
                            {this.campKey()}
                        </div>
                        <div className="col-md-4">
                            <img src={buttonSearch} className="buttonSearch_logo" onClick={this.search.bind(this)} />
                            <br>
                            </br>

                            <img src={advancedbuttonSearch} className="buttonSearch_logo" onClick={this.searchAdvanced.bind(this)} /> <br></br>


                        </div>

                    </div>
                </div>

                {this.loader()}




            </div>
        );
    }

}

const mapStateProps = state => ({
    search1: state.search1,
    search: state.search,
    keyWord: state.keyWord,
    json: state.json,
    cambio: state.cambio,
    Date: state.Date,

})

const mapDispatchToProps = dispactch => ({

    input1(e) {

        dispactch({
            type: "INPUT1",
            input: e

        })

        /*
        this.setState({
            search: e.target.value
        })
        console.log("hola soy state" + this.state.search)
*/
    },


    IndicesGrafica(e, v) {
        dispactch({
            type: "INDICE_GRAFICA",
            input: e,
            camb: v

        })

    },

    cambiarEstado(e) {
        dispactch({
            type: "ESTADO_INPUT_FIRTS",
            input: e

        })

    },

    cambiarInputsearch_1(e) {
        dispactch({
            type: "ESTADO_INPUT_FIRTS_1",
            input: e

        })

    },


    cambiarDate(e) {
        dispactch({
            type: "SET_DATE",
            input: e

        })

    },

    cambiarLoader(e) {
        dispactch({
            type: "SET_LOADER",
            input: e

        })

    }



})

/**mapStateProps= mapea lo que tengo en el estado y lo convierte en propiedades
 * mapDispatchToProps= mapea las funciones y las convierte en propiedades
  */
export default connect(mapStateProps, mapDispatchToProps)(search)