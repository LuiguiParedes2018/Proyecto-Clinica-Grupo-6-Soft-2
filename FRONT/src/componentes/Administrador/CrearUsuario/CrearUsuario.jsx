import React, { useState, useEffect } from "react";
import "./CrearUsuario.css";
import HeaderAdministrador from "../HeaderAdministrador/HeaderAdministrador";
import { registerDoctor } from "../../../servicios/doctorService";
import { registerPaciente } from "../../../servicios/pacienteService";
import { getEspecialidades } from "../../../servicios/especialidadService";
import { FaUser, FaLock, FaEnvelope, FaPhone, FaBriefcase } from "react-icons/fa";

function CrearUsuario() {
  const [selectedUserType, setSelectedUserType] = useState(""); // "doctor" o "paciente"
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [especialidadId, setEspecialidadId] = useState("");
  const [especialidades, setEspecialidades] = useState([]);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (selectedUserType === "doctor") {
      getEspecialidades()
        .then((response) => setEspecialidades(response.data))
        .catch((err) => console.error("Error al cargar especialidades:", err));
    }
  }, [selectedUserType]);

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
    if (selectedUserType === "doctor" && !especialidadId) {
      errors.especialidad = "Debes seleccionar una especialidad.";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const errors = validateFields();
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) return;

    try {
      if (selectedUserType === "paciente") {
        await registerPaciente({ nombreCompleto, correo, telefono, password });
        alert("Paciente creado con éxito.");
      } else if (selectedUserType === "doctor") {
        await registerDoctor({
          nombreCompleto,
          correo,
          telefono,
          password,
          especialidad: { id: especialidadId },
        });
        alert("Doctor creado con éxito.");
      }
      resetForm();
    } catch (err) {
      console.error("Error al crear el usuario:", err);
      setError("Hubo un error al crear el usuario. Inténtalo de nuevo.");
    }
  };

  const resetForm = () => {
    setNombreCompleto("");
    setCorreo("");
    setTelefono("");
    setPassword("");
    setConfirmPassword("");
    setEspecialidadId("");
    setFieldErrors({});
  };

  return (
    <div>
      <HeaderAdministrador />
      <div className="crear-usuario-container">
        <h1>Crear Usuario</h1>
        <div className="user-type-selector">
          <button
            className={`user-type-button ${selectedUserType === "paciente" ? "active" : ""}`}
            onClick={() => setSelectedUserType("paciente")}
          >
            Crear Paciente
          </button>
          <button
            className={`user-type-button ${selectedUserType === "doctor" ? "active" : ""}`}
            onClick={() => setSelectedUserType("doctor")}
          >
            Crear Doctor
          </button>
        </div>
        {selectedUserType && (
          <form onSubmit={handleSubmit} className="form-container">
            <div className="input-box">
              <FaUser className="crear-usuario-icono" />
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
              <FaEnvelope className="crear-usuario-icono" />
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
              <FaPhone className="crear-usuario-icono" />
              <input
                type="tel"
                placeholder="Teléfono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                required
              />
              {fieldErrors.telefono && <p className="error-message">{fieldErrors.telefono}</p>}
            </div>
            {selectedUserType === "doctor" && (
              <div className="input-box">
                <FaBriefcase className="crear-usuario-icono" />
                <select
                  value={especialidadId}
                  onChange={(e) => setEspecialidadId(e.target.value)}
                  required
                >
                  <option value="">Seleccione Especialidad</option>
                  {especialidades.map((especialidad) => (
                    <option key={especialidad.id} value={especialidad.id}>
                      {especialidad.nombre}
                    </option>
                  ))}
                </select>
                {fieldErrors.especialidad && <p className="error-message">{fieldErrors.especialidad}</p>}
              </div>
            )}
            <div className="input-box">
              <FaLock className="crear-usuario-icono" />
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
              <FaLock className="crear-usuario-icono" />
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
            <button type="submit">Crear {selectedUserType === "paciente" ? "Paciente" : "Doctor"}</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default CrearUsuario;



