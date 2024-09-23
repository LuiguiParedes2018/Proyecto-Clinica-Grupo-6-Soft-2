import React from "react";
import "./RegisterPaciente.css";
import { FaUser, FaLock, FaEnvelope, FaPhone } from "react-icons/fa";

function RegisterPaciente() {
  return (
    <div className="register-paciente">
      <div className="cosas-register">
        <form action="">
          <h1>REGISTRAR PACIENTE</h1>
          <div className="input-box">
            <FaUser className="icono" />
            <input type="text" placeholder="Nombre Completo" required />
          </div>
          <div className="input-box">
            <FaEnvelope className="icono" />
            <input type="email" placeholder="Correo Electrónico" required />
          </div>
          <div className="input-box">
            <FaPhone className="icono" />
            <input type="tel" placeholder="Teléfono" required />
          </div>
          <div className="input-box">
            <FaLock className="icono" />
            <input type="password" placeholder="Contraseña" required />
          </div>
          <div className="input-box">
            <FaLock className="icono" />
            <input type="password" placeholder="Confirmar Contraseña" required />
          </div>
          <button type="submit">Registrar</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPaciente;
