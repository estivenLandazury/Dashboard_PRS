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
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
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
            URL: "http://34.238.51.175:5002/",
            /*URL: "http://172.19.15.30:5002/",*/

            loader: true,

            /** Search normal */
            /*keyWord: "",*/
            /** Data search advanced */
            /*search: "sdf",*/
            Hashtags: "",
            open: false,
            modalIsopen: false,
            showDetails: false,
            Usernames: "",
            Ubication: "",
            Date: ""
        }
    }




    componentDidMount() {

        console.log("REDUX STATE " + this.props.search1)
        console.log("REDUX Date " + this.state.startDate)
        console.log("REDUX Ubicacion " + this.state.Ubication)
        /*
         const js = localStorage.getItem('datos');
         const vl = JSON.parse(js)
         console.log("dddddddddddddd" + js)
 
         console.log("dddddddddddddd" + vl['hotmail'])
 
 */


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



    /** Este metodo permite realizar un busqueda sencilla por labra ingresada en el campo correspondiente  */

    search() {
        this.setState({
            estado: false
        })

        console.log(this.state.estado)
    }

    /** Este metodo permite realizar un busqueda avanzada  por las palabras ingresadas en los campos correspondientes */


    searchAdvanced() {
        this.setState({
            estado: true
        })
        console.log(this.state.estado)


    }

    addcamp() {
        return <div>  </div>

    }


    /** Loader que se encarga de mostrar un imagen que indica que el proceso esta cargando */

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



    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };




    toggleModal = value => {
        this.setState({
            modalIsopen: !this.state.modalIsopen
        });


    }


    /** Este metodo consume el servicio d ela función de busqueda simple y obtiene un json con  los indices corresppondientes a la busqueda */

    sendInfo_1() {
        if (this.props.search !== "") {
            console.log("hashtagBusqueda send info " + this.state.Hashtags)
            console.log("palabra busqueda sen info " + this.props.search)
            const js = localStorage.getItem('datos');
            const vl = JSON.parse(js)

            let data = { "palabraBusqueda": this.props.search, "hashtagBusqueda": "", "usuarioBusqueda": "", "fechaMinBusqueda": "", "cercaniaBusqueda": "", "correo": vl['hotmail'] }







            this.props.cambiarLoader(true)
            this.onOpenModal();
            const that = this

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
                    NotificationManager.success("Success message", "The data can be visualized in the graphs", 5000)
                    this.onCloseModal()







                }).catch(function (error) {
                    NotificationManager.error("Error message", "Connection error verify server", 5000)
                    that.props.cambiarLoader(false)
                    console.log("Opa vv")

                }
                )

        } else if (this.props.search === "") {
            NotificationManager.warning("Warning message", "Enter the search data", 5000)


        }

    }



    /** Este metodo consume el servicio d ela función de busqueda avanzada  y obtiene un json con  los indices corresppondientes a la busqueda avanzada  */

    sendInfo() {

        if (this.props.search !== "" || this.state.Hashtags !== "" || this.state.Usernames !== "") {


            const js = localStorage.getItem('datos');
            const vl = JSON.parse(js)
            const that = this

            console.log("hashtagBusqueda send info " + this.state.Hashtags)
            console.log("palabra busqueda sen info " + this.props.search)

            let data = { "palabraBusqueda": this.props.search, "hashtagBusqueda": this.state.Hashtags, "usuarioBusqueda": this.state.Usernames, "fechaMinBusqueda": this.props.Date, "cercaniaBusqueda": this.state.Ubication, "correo": vl['hotmail'] }

            this.props.cambiarLoader(true)
            this.onOpenModal()

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
                    this.props.IndicesGrafica(responseJson, false)


                    NotificationManager.success("Succes message", "The data can be visualized in the graphs", 5000)

                    this.props.cambiarLoader(false)
                    this.onCloseModal()




                }).catch(function (error, ) {
                    NotificationManager.error("Error message", "Connection error verify server", 5000)
                    that.props.cambiarLoader(false)
                    console.log("Opa vv")

                }

                    /**    NotificationManager.error("Error message", "Connection error verify server", 5000),
                      */

                )
        } else if (this.props.search === "" && this.state.Hashtags === "" && this.state.Usernames === "") {
            NotificationManager.warning("Warning message", "Enter the search data", 3000)


        }


    }



    /**  Este metodo Renderiza los formularios de buisqueda avanzada y simple según elk estado si es verdadero o falso */



    campKey() {

        /** Renderiza la busqueda simple, si el estado es falso */

        if (this.state.estado == false) {

            return <div className="container" >
                <form>
                    <div className="form-group">
                        {/**<input type="email" className="form-control" id="exampleFormControlInput1" placeholder="KeyWord" /> */}

                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="KeyWord" onChange={e => this.inputsearch_1(e)} />
                    </div>
                    <button type="button" className="btn btn-primary" id="Search-button" onClick={this.sendInfo_1.bind(this)}>search</button>
                </form>

            </div>

            /** Renderiza la busqueda avanzada, si el estado es  verdadera */

        } else if (this.state.estado == true) {

            return <div className="container">
                <h1 className="Social_title2" id="advancedSearch"> Advanced search</h1>

                <h1 className="Social_title" id="especifSearch"> Words</h1>


                <form>
                    <div className="form-group row">
                        <label for="staticEmail" class="col-sm-2 col-form-label"> <h1 className="labelh1">search  </h1></label>
                        <div className="col-xl-10">
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
                            <input type="text" className="form-control" id="inputPassword2" placeholder="#search by hashtag" onChange={e => this.inputsearch1(e)} />
                        </div>
                    </div>

                    <h1 className="Title-person">People</h1>


                    <div className="form-group row">
                        <label for="inputPassword" className="col-sm-2 col-form-label"><h1 className="labelh1">Usernames </h1> </label>
                        <div className="col-xl-10">
                            <input type="text" className="form-control" id="inputPassword3" placeholder="search by name" onChange={e => this.inputsearch2(e)} />
                        </div>
                    </div>

                    {/*<div className="form-group row">
                        <label for="inputPassword" className="col-sm-2 col-form-label"><h1 className="labelh1">Mentions</h1></label>
                        <div className="col-xl-10">
                            <input type="text" className="form-control" id="inputPassword4" placeholder="Petro" />
                        </div>
                    </div>  */}

                    <h1 className="Title-person"> Search by Location</h1>

                    <div className="form-group row">
                        <label for="inputPassword" className="col-sm-2 col-form-label"><h1 className="labelh1">Ubication</h1></label>
                        <div className="col-xl-10">
                            <select type="text" className="form-control " id="selectWid" onChange={e => this.inputsearch3(e)} >
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

                <Modal isOpen={this.state.open}>
                    <ModalHeader >Analysis</ModalHeader>
                    <ModalBody>
                        <h1 className="title_body">We are finishing the analysis please wait a moment, at the end of the process you will be notified</h1>
                        {this.loader()}

                    </ModalBody>

                    <ModalFooter>

                        <Button color="secondary" onClick={this.onCloseModal}>Ok</Button>
                    </ModalFooter>

                </Modal>



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