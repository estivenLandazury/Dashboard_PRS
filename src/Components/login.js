import React, { Component } from 'react';
import '../customCSS/login.css'
import { NavLink } from "react-router-dom"
import logo from '../Images/Grupo 1263.png';

import { connect } from 'react-redux';
import sha256 from 'crypto-js/sha256'
import 'react-notifications/lib/notifications.css'
import { NotificationContainer, NotificationManager } from 'react-notifications';






class login extends Component {

    constructor(props) {

        super(props);



        this.state = {
            URL: "http://34.238.51.175:5002/",
            login: false



        }
    }

    onChangeCorreo(e) {
        this.props.cambiarCorreo(e.target.value)
        console.log(e.target.value)
    }

    onChangePassword(e) {
        this.props.cambiarPassword(sha256(e.target.value))
        console.log(e.target.value)

    }

    cargando() {
        if (this.state.login === true) {
            return <div> <h1 className="load_sign">Sign in...</h1></div>
        } else if (this.state.login === false) {
            return <div></div>

        }
    }





    verificarusuario() {


        if (this.props.password === "" || this.props.correo === "") {

            NotificationManager.warning("Warning Message", 'Ingrese La información en todos los campos', 4000)


        } else if (this.props.password !== "" || this.props.correo !== "") {

            this.setState({
                login: true


            })



            let options = {
                method: 'POST',
                body: JSON.stringify({ "password": this.props.password + "", "correo": this.props.correo }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
            }


            fetch(this.state.URL + "verificarUsuario", options)
                .then(response => response.json())
                .then((responseJson) => {

                    if (responseJson['state'] === "Successful") {
                        console.log("correommmmm " + responseJson['correo'])
                        this.setState({
                            login: false


                        })


                        localStorage.setItem("datos", JSON.stringify({ 'nombre': responseJson['nombre'], 'id': responseJson['id'], "hotmail": responseJson['correo'] }))
                        window.location.href = '/homes'


                    }


                    if (responseJson['state'] === "Failed") {
                        NotificationManager.warning("Warning Message", 'La información ingresada no es correcta', 4000)

                        this.setState({
                            login: false


                        })
                    }

                    console.log("este es response " + responseJson['state'])


                }).catch(function (error) {
                    NotificationManager.error("Warning error", 'Error de Servidor', 4000)


                })
        }



    }










    pageRegister() {
        window.location.href = '/Register'

    }

    render() {

        return (
            <div>


                <div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <img src={logo} className="prescriptiva_logo1" />

                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">



                            </ul>
                            <form className="form-inline my-2 my-lg-0">
                                <a href="#">                                 <button type="button" id="redirect" className="btn btn-primary" value="Log In"> Upload File</button>
                                </a>

                            </form>
                        </div>
                    </nav>
                </div>

                <div className="container ">
                    <NotificationContainer></NotificationContainer>





                    <div id="formContent">



                        <form>
                            <h1 className="title-login">Login</h1>
                            <input type="text" id="login" className="fadeIn second" name="login" placeholder="hotmail" onChange={e => this.onChangeCorreo(e)} />
                            <input type="password" id="password" className="fadeIn third" name="login" placeholder="password" onChange={e => this.onChangePassword(e)} />
                            <button type="button" id="fadeIn fourth" className="btn btn-primary" value="Log In" onClick={this.verificarusuario.bind(this)}> Sign in</button>
                            <button type="button" id="fadeInfourt" className="btn btn-primary" onClick={this.pageRegister.bind(this)} > Sign up</button>
                            {this.cargando()}
                        </form>

                        <div id="formFooter">
                            <a className="underlineHover" href="#">Forgot Password?</a>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}


const mapStateProps = state => ({
    correo: state.correo,
    password: state.password,


})

const mapDispatchToProps = dispactch => ({

    cambiarCorreo(e) {
        dispactch({
            type: "cambiarCorreo",
            input: e

        })

    },

    cambiarPassword(e) {
        dispactch({
            type: "cambiarPassword",
            input: e

        })

    }

})

export default connect(mapStateProps, mapDispatchToProps)(login);
