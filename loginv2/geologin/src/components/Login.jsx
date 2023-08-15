import React from 'react';
import '../assetss/css/Login.css';
import logo from '../assetss/img/Logo.png';
import { withRouter } from 'react-router-dom';

class Login extends React.Component{ //con extends le digo que la clase login hereda de react

    state ={
        form:{
            "usuario":"",
            "password":""
        },
        error:false,
        errorMsg:"",
        mostrarError: false
    }

    usuarios = [
        {
          usuario: "German",
          password: "Lanus",
          latitud: "",
          longitud: "",
          fechaYhora: ""
        },
        {
          usuario: "Messi",
          password: "Campeon",
          latitud: "",
          longitud: "",
          fechaYhora: ""
        },
        {
            usuario: "Maradona",
            password: "Campeon",
            latitud: "",
            longitud: "",
            fechaYhora: ""
        },
      ];

    manejadorSubmit= (e) =>{
        e.preventDefault();
    }

manejadorChange = async e => {
    await this.setState({
        form:{
            ...this.state.form,
            [e.target.name] : e.target.value
        }
    })
    console.log(this.state.form);
}

manejadorBoton = (e) => {
    e.preventDefault();

    const { usuario, password } = this.state.form;

    const usuarioEncontrado = this.usuarios.find(
      (usr) => usr.usuario === usuario && usr.password === password
    );

    if (usuarioEncontrado) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            usuarioEncontrado.latitud = position.coords.latitude;
            usuarioEncontrado.longitud = position.coords.longitude;
            let fechaHoraActual = new Date();
            fechaHoraActual = this.formatearFechaHora(fechaHoraActual);
            usuarioEncontrado.fechaYhora = fechaHoraActual;
            console.log("Usuario logueado:", usuarioEncontrado);
            this.setState({ mostrarError: false });
            // Aquí puedes redirigir a otra página o realizar otras acciones
            this.props.history.push('/dashboard', {usuarioLogueado : usuarioEncontrado});
          },
          (error) => {
            console.error("Error al obtener la ubicación:", error);
          }
        );
      } else {
        console.log("El navegador no soporta geolocalización");
      }
    } else {
      console.log("Credenciales incorrectas");
      this.setState({ mostrarError: true });
    }
  };

  formatearFechaHora(fecha) {
    const opciones = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Intl.DateTimeFormat("es-ES", opciones).format(fecha);
  }

    render(){
        return(
        <React.Fragment>        
            <div className="wrapper fadeInDown">

                <div id="formContent">
                    <br></br>
                    <div className="fadeIn first">
                    <br></br>
                    <img src= {logo} width="100px" alt="User Icon" />
                    </div>

         
                    <form onSubmit={this.manejadorSubmit}>
                    <input type="text" className="fadeIn second" name="usuario" placeholder="Usuario" onChange={this.manejadorChange}/>
                    <input type="password" className="fadeIn third" name="password" placeholder="Password" onChange={this.manejadorChange}/>
                    <input type="submit" className="fadeIn fourth" value="Log In" onClick={this.manejadorBoton}/>
                    </form>

                    <div className="alert alert-danger" role="alert" style={{ display: this.state.mostrarError ? 'block' : 'none' }}>
                        Error al iniciar sesión, usuario o contraseña incorrectos
                    </div>

                </div>
            </div>
        </React.Fragment>
        );
    }
} 

export default Login