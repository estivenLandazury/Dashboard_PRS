import React, { Component } from 'react';

import logo from '../Images/Grupo 1263.png';
import '../customCSS/navbar.css';
import { FaUserAlt } from 'react-icons/fa';




class navbar extends Component {

    constructor(props) {

        super(props);



        this.state = {


        }
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
            </div>
        );
    }

}

export default navbar;


