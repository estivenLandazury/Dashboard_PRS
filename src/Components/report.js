import React, { Component } from 'react';
import { connect } from 'react-redux';




class report extends Component {

    constructor(props) {

        super(props);



    }

    reporte() {
        return <div>
            <h1>{this.props.search1}</h1>
            {/**            <button type="button" id="user-date" className="btn btn-primary" onClick={() => this.props.cambiarEstao()}> Cambiar Estado</button>
  */}

        </div>
    }





    render() {

        return (
            <div> {this.reporte()}</div>
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