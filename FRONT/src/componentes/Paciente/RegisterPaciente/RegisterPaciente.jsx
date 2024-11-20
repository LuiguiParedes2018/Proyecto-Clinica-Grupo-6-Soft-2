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
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  const validateFields = () => {
    const errors = {};
    if (nombreCompleto.length <= 2) {
      errors.nombreCompleto = "Nombre muy corto, debe ser más largo.";
    }
    if (!correo.endsWith("@gmail.com") && !correo.endsWith("@hotmail.com")) {
      errors.correo = "Debe terminar en '@gmail.com' o '@hotmail.com'.";
    }
    if (!/^\d{9}$/.test(telefono)) {
      errors.telefono = "Debe tener 9 dígitos y no puede incluir letras.";
    }
    if (!/^\S+$/.test(password)) {
      errors.password = "La contraseña no puede contener espacios en blanco.";
    }
    if (password.length <= 5) {
      errors.password = "La contraseña debe tener más de 5 caracteres.";
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden.";
    }
    return errors;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    const errors = validateFields();
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      return; // Detener la ejecución si hay errores
    }

    try {
      const pacienteData = { nombreCompleto, correo, telefono, password };
      await registerPaciente(pacienteData); 
      alert("Te has registrado correctamente!");
      navigate("/");
    } catch (err) {
      setError("Error en el registro. Inténtalo de nuevo.");
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
            {fieldErrors.nombreCompleto && <p className="error-message">{fieldErrors.nombreCompleto}</p>}
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
            {fieldErrors.correo && <p className="error-message">{fieldErrors.correo}</p>}
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
            {fieldErrors.telefono && <p className="error-message">{fieldErrors.telefono}</p>}
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
            {fieldErrors.password && <p className="error-message">{fieldErrors.password}</p>}
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
            {fieldErrors.confirmPassword && <p className="error-message">{fieldErrors.confirmPassword}</p>}
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Registrar</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPaciente;
