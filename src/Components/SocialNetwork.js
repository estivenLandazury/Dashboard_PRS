import React, { Component } from 'react';
import forum from '../Images/Grupo 1283.png';
import facebook from '../Images/Grupo 1284.png';
import instagram from '../Images/Grupo 1285.png';
import twitter from '../Images/Grupo 1286.png';
import youtube from '../Images/Grupo 1292.png';
import linkedlink from '../Images/Grupo 1293.png';
import '../customCSS/Social.css'









class SocialNetwork extends Component {

    constructor(props) {

        super(props);



        this.state = {


        }
    }


    render() {
        return (
            <div className="network">
                <h1 className="Social_title"> Social Network</h1>
                <div className="container" id="container-social">
                    <div className="row">
                        <div className="col-md-4">
                            <img src={instagram} className="instagram_logo" />
                        </div>
                        <div className="col-md-4">
                            <img src={twitter} className="twitter_logo" />

                        </div>
                        <div className="w-60"></div>
                        <div className="col-md-4">
                            <img src={facebook} className="facebook_logo" />

                        </div>
                        <div className="col-md-4">
                            <img src={forum} className="forum_logo" />
                        </div>
                        <div className="w-60"></div>
                        <div className="col-md-4">
                            <img src={youtube} className="youtube_logo" />

                        </div>
                        <div className="col-md-4" >
                            <img src={linkedlink} className="linkedlink_logo" />

                        </div>
                    </div>
                </div>

            </div>

        );
    }
}

export default SocialNetwork;

