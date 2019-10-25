import React, { Component } from 'react';
import SocialNetwork from './SocialNetwork'
import '../customCSS/home.css'



import Search from './Search'


class home extends Component {

    constructor(props) {

        super(props);



        this.state = {


        }
    }

    render() {

        return (

            <div>

                <div className="container" id="containerGeneral">
                    <div className="row">
                        <div className="col-md-4">
                            <SocialNetwork></SocialNetwork>
                        </div>
                        <div className="col-md-4">
                            <Search></Search>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

}

export default home;