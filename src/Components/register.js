import React, { Component } from 'react';
import '../customCSS/login.css'
import { NavLink } from "react-router-dom"
import { connect } from 'react-redux';
import 'react-notifications/lib/notifications.css'
import sha256 from 'crypto-js/sha256'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import logo from '../Images/Grupo 1263.png';





class Register extends Component {

    constructor(props) {

        super(props);



        this.state = {
            URL: "http://34.238.51.175:5002/"

        }
    }


    onChangeNombre(e) {
        this.props.cambiarNombre(e.target.value)
        console.log(e.target.value)

    }


    onChangeCorreo(e) {
        this.props.cambiarCorreo(e.target.value)
        console.log(e.target.value)

    }

    onChangePassword(e) {
        this.props.cambiarPassword(sha256(e.target.value))
        console.log(e.target.value)



    }


    onChangePassword1(e) {
        this.props.cambiarPassword1(sha256(e.target.value))
        console.log(e.target.value)

    }


    register() {
        let password = this.props.password
        let password1 = this.props.password1
        let nombre = this.props.nombre
        let correo = this.props.correo

        console.log("password " + password + " " + "password1 " + password1)


        if (password + "" === password1 + "") {

            let options = {
                method: 'POST',
                body: JSON.stringify({ "nombre": this.props.nombre, "correo": this.props.correo, "password": this.props.password + "" }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
            }


            fetch(this.state.URL + "insertarUsuario", options)
                .then(response => response.json())
                .then((responseJson) => {

                    if (responseJson['Value'] === "success") {
                        NotificationManager.success("Succes message", "You have successfully registered", 3000)
                        console.log("este es response fff " + responseJson['state'])
                        setTimeout(() => {
                            window.location.href = '/login'
                        }, 3000)





                    }


                    if (responseJson['Value'] === "exist") {
                        NotificationManager.warning("Warning message", "the user is already registered", 3000)
                        console.log("este es response fff " + responseJson['state'])





                    }

                    console.log("este es response " + responseJson['Value'])

                }).catch(error => NotificationManager.error("Error message", "Server error", 3000)
                )


        } else if (password !== password1) {

            NotificationManager.warning("Warning Message", 'The password entered is not the same in both fields', 4000)


        }

        if (nombre === "" || correo === "" || password === "" || password1 === "") {

            NotificationManager.warning("Warning Message", 'Enter the information in all fields', 4000)

        }






    }

    volver() {
        window.location.href = '/login'


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
                                <a href="http://prescriptiva-uploadfile.s3-website-us-east-1.amazonaws.com/">  <button type="button" id="redirect" className="btn btn-primary" value="Log In"> Upload File</button>
                                </a>

                            </form>
                        </div>
                    </nav>
                </div>
                <div className="container">



                    <NotificationContainer></NotificationContainer>


                    <div id="formContent">



                        <form>
                            <h1 className="title-login">Sign Up</h1>
                            <input type="text" id="login" className="fadeIn second" name="login" placeholder="name" onChange={e => this.onChangeNombre(e)} />

                            <input type="text" id="login1" className="fadeIn second" name="login" placeholder="email" onChange={e => this.onChangeCorreo(e)} />


                            <input type="password" id="password" className="fadeIn third" name="login" placeholder="password" onChange={e => this.onChangePassword(e)} />
                            <input type="password" id="password1" className="fadeIn third" name="login" placeholder=" Repeat password" onChange={e => this.onChangePassword1(e)} />

                            <button type="button" id="fadeInfourt" className="btn btn-primary" onClick={this.register.bind(this)} > Save</button>
                            <button type="button" id="fadeInfourt" className="btn btn-primary" onClick={this.volver.bind(this)} > Back</button>

                        </form>

                        <div id="formFooter">
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
    nombre: state.nombre,
    password1: state.password1
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

    },


    cambiarPassword1(e) {
        dispactch({
            type: "cambiarPassword1",
            input: e

        })

    },

    cambiarNombre(e) {
        dispactch({
            type: "cambiarNombre",
            input: e

        })

    }


})

export default connect(mapStateProps, mapDispatchToProps)(Register);