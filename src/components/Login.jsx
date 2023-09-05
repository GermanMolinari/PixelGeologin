import React from "react";
import '../assetss/css/Login.css';
import logo from '../img/logo.png';
import axios from 'axios';


class Login extends React.Component{

    state ={
        form:{
            "username" : "",
            "password" : ""
        },
        error:false,
        errorMsg:""
    }
    
    async manejadorSubmit = e => {
        e.preventDefault();
        try {
            const { username, password } = this.state.form;
            const url = "http://localhost:3200/api/usuario/login"; 
      
            const response = await axios.post(url, { username, password });
      
            if (response.data.exito) {
              
              console.log("Autenticación exitosa");
            
            } else {
              
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
        }
    }

    manejadorChange = async e =>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name] : e.target.value
            }
        })
    }

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
                        <input type="text" id="login" className="fadeIn second" name="usuario" placeholder="Usuario" onChange={this.manejadorChange} />
                        <input type="password" id="password" className="fadeIn third" name="password" placeholder="Password" onChange={this.manejadorChange}/>
                        <input type="submit" class="fadeIn fourth" value="Log In"/>
                        </form>

                      
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Login 