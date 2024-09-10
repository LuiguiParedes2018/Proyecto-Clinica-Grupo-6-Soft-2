import React from "react"
import "./Login.css"
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

function Login(){
    return(
        <div className="login">
            <div className="cosas-login">
                <form action="">
                    <h1>INICIAR SESION</h1>
                    <div className="input-box">
                        <FaUser className="icono"/><input type="text" placeholder="Usuario" required/>
                    </div>
                    <div className="input-box">
                        <FaLock className="icono"/><input type="password" placeholder="Contraseña" required/>
                    </div>
                    <div className="recuperar-contraseña">
                        <a href="#"><p>¿Olvidaste tu contraseña?</p></a>
                    </div>
                    <button type="submit">Ingresar</button>
                    <div className="registrarse">
                        <p>¿No tienes cuenta? <a href="#">Registrate ahora</a></p>            
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login

