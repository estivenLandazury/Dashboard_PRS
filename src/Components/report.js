import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../customCSS/report.css'
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';





class report extends Component {

    constructor(props) {

        super(props);

        this.state = {


            URL: "http://192.168.96.37:5002/get-csv/",
            URL1: "http://192.168.96.37:5002/",
            file: "file",
            json: [{}],

        }



    }

    componentDidMount() {

        const js = localStorage.getItem('datos');
        const vl = JSON.parse(js)
        console.log("jjjjjj " + vl['nombre'])
        this.obtainUrls()

    }


    obtainUrls() {
        const js = localStorage.getItem('datos');
        const vl = JSON.parse(js)

        let options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },

            body: JSON.stringify({ "nombre": vl['nombre'] })

        }

        fetch(this.state.URL1 + "consultar", options)
            .then(response => response.json())
            .then((responseJson) => {

                this.setState({
                    json: responseJson
                })



                console.log("este es response " + responseJson)


            }).catch(function (error) {
                NotificationManager.error("Error message", "Connection error verify server", 5000)
                console.log("Opa vv ")

            }
            )


    }



    dowloadFile() {
        let options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        }


        fetch(this.state.URL + "file", options)
            .then(response => response.json())
            .then((responseJson) => {

                console.log("este es response " + responseJson)


            }).catch(function (error) {
                /*NotificationManager.error("Error message", "Connection error verify server", 5000)*/
                console.log("Opa vv")

            }
            )

    }

    reporte() {
        return <div>
            <h1 className="report">Report File</h1>
            {/**            <button type="button" id="user-date" className="btn btn-primary" onClick={() => this.props.cambiarEstao()}> Cambiar Estado</button>
  */}

        </div>
    }





    render() {





        return (

            <div>

                <NotificationContainer></NotificationContainer>

                {this.reporte()}
                <div className="content">

                    <table className="table" >
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name Report</th>
                                <th scope="col">Date</th>
                                <th scope="col">Csv</th>
                                <th scope="col">Draw Graphic</th>

                            </tr>
                        </thead>
                        <tbody>
                            {this.state.json.map((cand, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index}</th>
                                        <td>{cand["url"]}</td>
                                        <td>{cand["fecha"]}</td>
                                        <td> < a href={this.state.URL + cand["url"]} role="button" > Link</a >
                                        </td>
                                        <td>{cand["Dibujar Grafica"]}</td>

                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>


                </div >
            </div>


        );
    }

}




const mapStateToProps = state => {
    return {
        search1: state.search1
    }
}

const mapDispatchToProps = dispactch => ({

    cambiarEstao() {

        dispactch({
            type: "CAMBIAR STADO"

        })

    }

})

export default connect(mapStateToProps, mapDispatchToProps)(report)