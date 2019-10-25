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

    render() {
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

                            <button type="button" id="user-date" className="btn btn-primary"> <FaUserAlt>  </FaUserAlt> Camilo Charria</button>
                        </form>
                    </div>
                </nav>
            </div>
        );
    }

}

export default navbar;


