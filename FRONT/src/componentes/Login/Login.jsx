import React from "react";
import "./Login.css";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const seleccionado = () => {
    navigate("/seleccionrol"); 
  };

  return (
    <div className="login">
      <div className="cosas-login">
        <form action="">
          <h1>INICIAR SESIÓN</h1>
          <div className="input-box">
            <FaUser className="icono" />
            <input type="text" placeholder="Correo electronico" required />
          </div>
          <div className="input-box">
            <FaLock className="icono" />
            <input type="password" placeholder="Contraseña" required />
          </div>
          <div className="recuperar-contraseña">
            <a href="#"><p>¿Olvidaste tu contraseña?</p></a>
          </div>
          <button type="submit">Ingresar</button>
          <div className="registrarse">
            <p>
              ¿No tienes cuenta?{" "}
              <span onClick={seleccionado} className="register-link" style={{ cursor: "pointer", color: "blue" }}>
                Registrate ahora
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;


