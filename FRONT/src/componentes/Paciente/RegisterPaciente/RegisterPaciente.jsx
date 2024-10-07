import React, { useState } from "react";
import "./RegisterPaciente.css";
import { FaUser, FaLock, FaEnvelope, FaPhone } from "react-icons/fa";
import { registerPaciente } from "../../../servicios/pacienteService"; 
import { useNavigate } from "react-router-dom";

function RegisterPaciente() {
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const pacienteData = { nombreCompleto, correo, telefono, password };
      const response = await registerPaciente(pacienteData); 
      alert("Te has registrado correctamente!");
      navigate("/");
    } catch (err) {
      setError("Error en el registro. Intentalo de nuevo.");
    }
  };

  return (
    <div className="register-paciente">
      <div className="cosas-register">
        <form onSubmit={handleRegister}>
          <h1>REGISTRAR PACIENTE</h1>
          <div className="input-box">
            <FaUser className="icono" />
            <input
              type="text"
              placeholder="Nombre Completo"
              value={nombreCompleto}
              onChange={(e) => setNombreCompleto(e.target.value)}
              required
            />
          </div>
          <div className="input-box">
            <FaEnvelope className="icono" />
            <input
              type="email"
              placeholder="Correo Electrónico"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>
          <div className="input-box">
            <FaPhone className="icono" />
            <input
              type="tel"
              placeholder="Teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
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
          <div className="input-box">
            <FaLock className="icono" />
            <input
              type="password"
              placeholder="Confirmar Contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Registrar</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPaciente;

