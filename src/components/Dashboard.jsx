import React from "react";
import Header from "../template/Header";
import axios from "axios";

class Dashboard extends React.Component{
    
    state = {
        registros: []
    };
    
    componentDidMount() {
    const url = "http://localhost:3200/api/registro";
    axios.get(url)
        .then(response => {
        this.setState({
            registros: response.data.resultado
        });
        });
    }

    render(){
        return(
            <React.Fragment>
                <Header></Header>
                <div className="container">   
                    <table className="table table-hover">
                        <thead>
                            <tr>
                            <th scope="col">DNI</th>
                            <th scope="col">Fecha y hora</th>
                            <th scope="col">Latitud</th>
                            <th scope="col">Longitud</th>
                            <th scope="col">Zona</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.registros && this.state.registros.map((value, i) => {
                            return (
                                <tr key={i}>
                                    <td>{value.idUser}</td>
                                    <td>{value.fechaHora}</td>
                                    <td>{value.latitud}</td>
                                    <td>{value.longitud}</td>
                                    <td>{value.zona}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        );
    }
}

export default Dashboard;