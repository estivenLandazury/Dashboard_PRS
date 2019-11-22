import React, { Component } from 'react';

import logo from '../Images/Grupo 1263.png';
import '../customCSS/navbar.css';
import { FaUserAlt } from 'react-icons/fa';
import Home from './Home'
import Charts from './Charts'
import Report from './report'
import home from '../Images/001-home.png'
import chart from '../Images/002-bar-chart.png'
import docs from '../Images/003-docs.png'




class navbar extends Component {

    constructor(props) {

        super(props);



        this.state = {
            change: true,
            change1: false

        }
    }

    change() {
        this.setState({
            change: true,
            change1: false,
            change2: false

        })
    }

    change1() {
        this.setState({
            change1: true,
            change: false,
            change2: false


        })
    }

    change2() {
        this.setState({
            change1: false,
            change: false,
            change2: true


        })
    }

    openNav() {
        document.getElementById("mySidenav").style.width = "250px";
    }

    closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }

    singOut() {
        localStorage.clear();
        window.location.href = '/login'
        console.log("Ya salimos")
    }

    render() {

        const js = localStorage.getItem('datos');
        const vl = JSON.parse(js)
        console.log("conversion " + vl)
        console.log("storage" + vl['nombre'])

        return (

            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">

                    <div id="mySidenav" className="sidenav">
                        <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav.bind(this)}>&times;</a>
                        <a className="User Name">{vl['nombre'].trim()}</a>
                        <a className="line" ><hr className="LineHr"></hr></a>


                        <a href="#home" onClick={this.change.bind(this)} > Home</a>

                        <a href="#chart" onClick={this.change1.bind(this)} >Charts</a>
                        <a href="#Report" onClick={this.change2.bind(this)}>Report</a>
                        <a href="#" onClick={this.singOut.bind(this)}>Sign out</a>
                    </div >




                    <span className="menuSid" onClick={this.openNav.bind(this)} >&#9776; Menu</span>


                    <img src={logo} className="prescriptiva_logo" />

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">



                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <div class="dropdown">
                                <button className="btn btn-primary dropdown-toggle" id="user-date" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {vl['nombre'].trim()}
                                </button>

                                <div className="dropdown-menu" id="option" aria-labelledby="dropdownMenuButton">
                                    <a class="dropdown-item" href="#" onClick={this.singOut.bind(this)}>Sign-out</a>
                                </div>
                            </div>

                        </form>
                    </div>
                </nav>


                {

                    this.state.change === true ? (
                        <Home></Home>) : ("")


                }


                {

                    this.state.change1 === true ? (
                        <Charts></Charts>) : ("")


                }

                {

                    this.state.change2 === true ? (
                        <Report></Report>) : ("")


                }

            </div>
        );
    }

}

export default navbar;


