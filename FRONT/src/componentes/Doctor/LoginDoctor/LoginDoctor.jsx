import React, { useState } from "react";
import "./LoginDoctor.css";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { loginDoctor } from "../../../servicios/doctorService"; // Cambié a loginDoctor para autenticación del doctor

function LoginDoctor() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginDoctor(correo, password); 
      
      const doctorId = response.data.id; // Obtener el ID del doctor desde la respuesta

      // Guardar el doctorId en localStorage
      localStorage.setItem("doctorId", doctorId);

      // Redirigir al perfil del doctor con su ID
      navigate(`/perfil-doctor/${doctorId}`); 
    } catch (err) {
      setError("Credenciales incorrectas. Inténtalo de nuevo.");
    }
  };

  const redirectToRegister = () => {
    navigate("/register-doctor"); 
  };

  const redirectToPatientLogin = () => {
    navigate("/"); 
  };

  return (
    <div className="login-doctor">
      <div className="cosas-login">
        <form onSubmit={handleLogin}>
          <h1>INICIAR SESION DOCTOR</h1>
          <div className="input-box">
            <FaUser className="icono" />
            <input
              type="text"
              placeholder="Correo electrónico"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>
          <div className="input-box">
            <FaLock className="icono" />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="recuperar-contraseña">
            <a href="#">
              <p>¿Olvidaste tu contraseña?</p>
            </a>
          </div>
          <button type="submit">Ingresar</button>

          <div className="registrarse">
            <p>
              ¿No tienes cuenta?{" "}
              <span onClick={redirectToRegister} className="register-link" style={{ cursor: "pointer", color: "blue" }}>
                Regístrate ahora
              </span>
            </p>
          </div>

          <div className="login-paciente-link">
            <p>
              ¿No eres doctor?{" "}
              <span onClick={redirectToPatientLogin} className="patient-login-link" style={{ cursor: "pointer", color: "blue" }}>
                Inicia sesión como paciente
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginDoctor;
