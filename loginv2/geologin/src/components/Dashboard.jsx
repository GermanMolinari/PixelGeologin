import React from 'react';
import Header from '../template/header';


class Dashboard extends React.Component{ //con extends le digo que la clase login hereda de react

    render(){

        let usuarioLogueado = this.props.location.state.usuarioLogueado;
        return(
            <React.Fragment>
                <Header></Header>
                <div calssName = "container">
                <table className="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Fecha y hora</th>
                    <th scope="col">Latitud</th>
                    <th scope="col">Longitud</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>{usuarioLogueado.usuario}</td>
                    <td>{usuarioLogueado.fechaYhora}</td>
                    <td>{usuarioLogueado.latitud}</td>
                    <td>{usuarioLogueado.longitud}</td>
                    </tr>
                </tbody>
                </table>
                </div>
            </React.Fragment>
        );
    }
} 

export default Dashboard