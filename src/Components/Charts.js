import React, { Component } from 'react';
import { Doughnut, Line, Radar, Bar } from 'react-chartjs-2';
import '../customCSS/chart.css'
import { connect } from 'react-redux';



class charts extends Component {

    constructor(props) {

        super(props);

        this.state = {


        }



    }

    componentDidMount() {

    }

    bar() {
        const data = {
            labels: ['Very positive',
                'Positive trend',
                'Negative trend',
                'Very negative'],
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(103, 116, 172,0.2)',
                    borderColor: 'rgba(103, 116, 172,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(104, 131, 243,0.4)',
                    hoverBorderColor: 'rgba(104, 131, 243,1)',
                    data: [this.props.json["Muy positivo"], this.props.json["Tendencia positiva"], this.props.json["Tendencia negativa"], this.props.json["Muy negativo"]]
                }
            ]
        };

        return <div>
            <h2 className="titleGraphic">Trend Analysis {this.props.json['Archivo'].split(".")[0]}</h2>
            <Bar
                data={data}
                width={100}
                height={50}


            />
        </div>
    }

    radar() {
        const data = {
            labels: ['Very Positive Favorite',
                'Favorite Positive Trend',
                'Favorite Negative Trend',
                'Favorite Very Negative'],
            datasets: [

                {
                    label: 'Data Favorite',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    pointBackgroundColor: 'rgba(255,99,132,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(255,99,132,1)',
                    data: [this.props.json["Mayor Favorito Muy Positivo"], this.props.json["Mayor Favorito Tendencia positiva"], this.props.json["Mayor Favorito Tendencia Negativa"], this.props.json["Mayor Favorito Muy Negativo"]]
                }
            ]
        };

        return <div>
            <h2 className="titleGraphic">Favorite Analysis {this.props.json['Archivo'].split(".")[0]}</h2>
            <Radar data={data} />
        </div>

    }



    line() {
        const data = {
            labels: ['RT Very positive',
                'Rt Positive trend',
                'Rt Negative trend',
                'RtVery negative'],
            datasets: [
                {
                    label: 'My First dataset',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [this.props.json["Maximo RT Muy positivo"], this.props.json["Maximo Rt Tendencia Positiva"], this.props.json["Maximo Rt Tendencia Negativa"], this.props.json["Maximo Rt Muy negativos"]]
                }
            ]
        };

        return <div>
            <h2 className="titleGraphic">ReTweet Analysis {this.props.json['Archivo'].split(".")[0]}</h2>
            <Line data={data} />
        </div>
    }

    Doughnut() {
        const data = {
            labels: [
                'Very positive',
                'Positive trend',
                'Negative trend',
                'Very negative'
            ],
            datasets: [{
                data: [this.props.json["Muy positivo"], this.props.json["Tendencia positiva"], this.props.json["Tendencia negativa"], this.props.json["Muy negativo"]],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#001a57'
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#001a57'
                ]
            }]
        };

        return <div>
            <h2 className="titleGraphic">
                Acceptance Analysis {this.props.json['Archivo'].split(".")[0]}</h2>
            <Doughnut data={data} />
        </div>
    }



    render() {

        return (
            <div>

                <div className="container" id="containerGeneral">
                    <div className="row">
                        <div className="col-md-6 mb-4">
                            {this.Doughnut()}

                        </div>
                        <div className="col-md-6 mb-4">
                            {this.line()}
                        </div>

                        <div className="col-md-6 mb-4">
                            {this.radar()}
                        </div>
                        <div className="col-md-6 mb-4">
                            {this.bar()}
                        </div>

                    </div>
                </div>

            </div>
        );
    }

}

const mapStateProps = state => ({
    json: state.json,
    search: state.search,
    searchALterno: state.searchALterno

})

const mapDispatchToProps = dispactch => ({

})
export default connect(mapStateProps, mapDispatchToProps)(charts);