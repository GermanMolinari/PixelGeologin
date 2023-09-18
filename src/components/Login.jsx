import React from "react";
import '../assetss/css/Login.css';
import logo from '../img/logo.png';
import axios from 'axios';
import {obtenerZona} from "../services/geocoding";
import { DateTime } from "luxon";

class Login extends React.Component{

    constructor(props){
        super(props);
    }

    state ={
        form:{
            "username" : "",
            "password" : ""
        },
        error:false,
        errorMsg:""
    };
    
    
    manejadorSubmit = async (e) => {
        e.preventDefault(); 
        try {
            const { username, password } = this.state.form;
            const url = "http://localhost:3200/api/usuario/login"; 
            
            const response = await axios.post(url, { username, password }); 

            if (response.data.exito) {
              
                //console.log("Autenticación exitosa");
                const dni = response.data.dni;

                if(dni == 111111111)
                {
                    this.props.history.push("/dashboard");
                    return;
                }
                
                const fechaHora = DateTime.now().setZone('America/Argentina/Buenos_Aires').minus({ hours: 3 }).toFormat('yyyy-MM-dd HH:mm:ss');
                

                navigator.geolocation.getCurrentPosition(async (position) => {
                    try {
                      const latitud = position.coords.latitude;
                      const longitud = position.coords.longitude;
                      const apiKeyGeocoding = "6d42eadf81834451b066a77e172433a5";
                  
                      const zonaInicial = await obtenerZona(latitud, longitud, apiKeyGeocoding);
                      const partes = zonaInicial.split(',');
                      const zona = partes[partes.length - 2].trim();
      
                        
                      const fechaHora = DateTime.now()
                        .setZone('America/Argentina/Buenos_Aires')
                        .minus({ hours: 3 })
                        .toFormat('yyyy-MM-dd HH:mm:ss');
                  
                      const postData = {
                        dni,
                        fechaHora,
                        latitud,
                        longitud,
                        zona
                      };
                  
                      axios.post("http://localhost:3200/api/registro", postData)
                        .then((secondResponse) => {
                          console.log("Segunda solicitud POST exitosa", secondResponse.data);
                          this.setState({
                            error: false,
                            errorMsg: ""
                          });
                          alert("Ubicación registrada correctamente");
                        })
                        .catch((error) => {
                          console.error("Error en la segunda solicitud POST:", error);
                        });
                    } catch (error) {
                      console.error("Error al obtener la zona:", error);
                    }
                  });
            } 
            else {
              
              this.setState({
                error: true,
                errorMsg: "Credenciales incorrectas"
              });
            }
          } catch (error) {
            console.error("Error en la autenticación:", error);
            this.setState({
              error: true,
              errorMsg: "Error en la autenticación"
            });
          }
        };

    manejadorChange = async e =>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name] : e.target.value
            }
        });
    };

    render(){
        return(
            <React.Fragment>
                <div className="wrapper fadeInDown">
                    <div id="formContent">
           
                        <div className="fadeIn first">
                            <br/><br/>
                        <img src={logo} width = "50px" id="icon" alt="User Icon" />
                            <br/><br/>
                        </div>

                        <form onSubmit={this.manejadorSubmit}>
                        <input type="text" id="login" className="fadeIn second" name="username" placeholder="Usuario" onChange={this.manejadorChange} />
                        <input type="password" id="password" className="fadeIn third" name="password" placeholder="Password" onChange={this.manejadorChange}/>
                        <input type="submit" className="fadeIn fourth" value="Log In"/>
                    {this.state.error === true &&
                        <div className="alert alert-danger" role="alert">
                            {this.state.errorMsg}
                        </div>
                    }
                      
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Login;