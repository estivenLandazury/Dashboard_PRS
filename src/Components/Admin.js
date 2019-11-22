import React, { Component } from 'react';
import { Router, BrowserRouter, Route } from 'react-router-dom';
import Home from './Home'
import Charts from './Charts'
import Report from './report'


import '../customCSS/admin.css'
import { NavLink } from "react-router-dom";

import home from '../Images/001-home.png'
import chart from '../Images/002-bar-chart.png'
import docs from '../Images/003-docs.png'



import { FaHome, FaRegChartBar, FaFileInvoice } from 'react-icons/fa';


import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { Provider } from "react-redux"
import Store from "../Components/Redux/store"
// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';


class admin extends Component {

    constructor(props) {

        super(props);



        this.state = {
            /** Data search advanced */
            search: "sdf",
            exactPhrase: "",
            Hashtags: "",
            Usernames: "",
            Mentions: "",
            Ubication: "",
            Date: "",
            change: false,
            change1: false



        }
    }


    openNav() {
        document.getElementById("mySidenav").style.width = "250px";
    }

    closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }

    home() {
        window.location.href = '/home'


    }

    change() {
        this.setState({
            change: true,
            change1: false
        })
    }

    change1() {
        this.setState({
            change1: true,
            change: false

        })
    }






    render() {
        return (
            <div>
                {/** 


                <div id="mySidenav" className="sidenav">
                    <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav.bind(this)}>&times;</a>
                    <a href="#ho" onClick={this.change.bind(this)} >Home</a>

                    <a href="#cha" onClick={this.change1.bind(this)} >Charts</a>
                    <a href="#">Clients</a>
                    <a href="#">Contact</a>
                </div >




                <span className="menuSid" onClick={this.openNav.bind(this)} >&#9776; <h1 className="men">Menu</h1></span>

                {

                    this.state.change === true ? (
                        <Home></Home>) : ("")


                }


                {

                    this.state.change1 === true ? (
                        <Charts></Charts>) : ("")


                }

                **/}

                {/** 


                <BrowserRouter>
                    <Route render={({ location, history }) => (
                        <React.Fragment>
                            <SideNav
                                onSelect={(selected) => {
                                    const to = '/' + selected;
                                    if (location.pathname !== to) {
                                        history.push(to);
                                    }




                                    console.log("Hola " + selected)
                                    // Add your code here
                                }}
                            >
                                <SideNav.Toggle />
                                <SideNav.Nav defaultSelected="/home">
                                    <NavItem eventKey="home">
                                        <NavIcon>
                                            <img src={home} className="home-logo" alt="home" />

                                        </NavIcon>
                                        <NavText>
                                            <h5 className="Titlle">Home </h5>
                                        </NavText>
                                    </NavItem>
                                    <NavItem eventKey="charts">
                                        <NavIcon>
                                            <img src={chart} className="home-logo" alt="chart" />

                                        </NavIcon>
                                        <NavText>
                                            <h5 className="Titlle">Charts </h5>


                                        </NavText>

                                    </NavItem>

                                    <NavItem eventKey="Report">
                                        <NavIcon>
                                            <img src={docs} className="home-logo" alt="chart" />

                                        </NavIcon>
                                        <NavText>
                                            <h5 className="Titlle">Report </h5>



                                        </NavText>
                                    </NavItem>
                                </SideNav.Nav>
                            </SideNav>


                            <main>
                                <Route path="/homes" component={props => <Home />} />
                                <Route exact path="/home" component={props => <Home />} />
                                <Route path="/charts" component={props => <Charts search="cosita bien hecha" />} />
                                <Route path="/Report" component={props => <Report />} />

                            </main>
                        </React.Fragment>
                    )} />
                </BrowserRouter>
 */}
            </div>

        );
    }


}

export default admin;