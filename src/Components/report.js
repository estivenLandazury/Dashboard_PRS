import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../customCSS/report.css'
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';





class report extends Component {

    constructor(props) {

        super(props);

        this.state = {


            URL: "http://34.238.51.175:5002/get-csv/", /** Permite descargar un archivo csv  que contiene la información obtenida de las busquedas avanzada y simple */
            URL1: "http://34.238.51.175:5002/",
            URL2: "http://34.238.51.175:5002/get-json/", /** Permite obtener un json que contiene la información de los reportes consultados anteriormente */
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



    /** Este método permite  establecer una url por reporte consultado para que pueda ser descargado */

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



    /** Este método permite dibujar de nuevo en las gráficas los reportes consultados anteriormente  
     * @param: filename, es el nombre del archivo que se creó en el momento de la busqueda y con éste se obtiene toda l ainformación del mismo
     *
     */
    drauGraphic(filename) {

        console.log("nombre de archivo " + filename)



        let options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        }


        fetch(this.state.URL2 + filename, options)
            .then(response => response.json())
            .then((responseJson) => {


                this.props.IndicesGrafica(responseJson, false)
                NotificationManager.success("Success message", "The data can be visualized in the graphs", 6000)


                console.log("este es response del drwaGraphic " + responseJson)


            }).catch(function (error) {
                NotificationManager.error("Error message", "Connection error verify server", 5000)

            }
            )


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
                                        <td><button type="button" onClick={this.drauGraphic.bind(this, cand["url"])} className="btn btn-link"> Draw Graphic</button></td>

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

    },


    IndicesGrafica(e, v) {
        dispactch({
            type: "INDICE_GRAFICA",
            input: e,
            camb: v

        })

    },

})

export default connect(mapStateToProps, mapDispatchToProps)(report)