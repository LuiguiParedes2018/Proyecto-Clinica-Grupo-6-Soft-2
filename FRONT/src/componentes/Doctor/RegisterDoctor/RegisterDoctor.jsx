import React, { useState, useEffect } from "react";
import "./RegisterDoctor.css";
import { FaUser, FaLock, FaEnvelope, FaPhone, FaBriefcase } from "react-icons/fa";
import { registerDoctor } from "../../../servicios/doctorService";
import { getEspecialidades } from "../../../servicios/especialidadService"; 
import { useNavigate } from "react-router-dom";

function RegisterDoctor() {
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [especialidadId, setEspecialidadId] = useState(""); 
  const [especialidades, setEspecialidades] = useState([]); 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [codigoSecreto, setCodigoSecreto] = useState("");
  const [codigoSecretoCorrecto, setCodigoSecretoCorrecto] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  // Cargar especialidades cuando el componente se monta
  useEffect(() => {
    getEspecialidades()
      .then((response) => {
        setEspecialidades(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar las especialidades:", error);
      });

    // Cargar el código secreto desde el archivo JSON
    fetch("/codigo.json")
      .then((response) => response.json())
      .then((data) => {
        setCodigoSecretoCorrecto(data[0].codigo);
      })
      .catch((error) => console.error("Error al cargar el código secreto:", error));
  }, []);

  const handleEspecialidadChange = (event) => {
    setEspecialidadId(event.target.value); 
  };

  const validateFields = () => {
    const errors = {};
    if (nombreCompleto.length <= 2) {
        errors.nombreCompleto = "Nombre muy corto, debe ser más largo.";
    }
    if (!correo.endsWith("@gmail.com") && !correo.endsWith("@hotmail.com")) {
        errors.correo = "Debe terminar en'@gmail.com' o '@hotmail.com'.";
    }
    if (!/^\d{9}$/.test(telefono)) {
        errors.telefono = "No puede incluir letras y debe tener 9 numeros";
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


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const errors = validateFields();
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      return; // Detener la ejecución si hay errores
    }

    // Crear el objeto doctor
    const nuevoDoctor = {
      nombreCompleto,
      correo,
      telefono,
      especialidad: { id: especialidadId }, 
      password,
    };

    try {
      // Llamar a la API para registrar el doctor
      await registerDoctor(nuevoDoctor);
      // Redirigir al login después del registro exitoso
      navigate("/login-doctor");
    } catch (error) {
      setError("Hubo un error al registrar el doctor. Inténtalo de nuevo.");
      console.error("Error al registrar el doctor:", error);
    }
  };

  return (
    <div className="register-doctor">
      <div className="cosas-register">
        <form onSubmit={handleSubmit}>
          <h1>REGISTRAR DOCTOR</h1>
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
            <FaBriefcase className="icono" />
            <select value={especialidadId} onChange={handleEspecialidadChange} required>
              <option value="">Seleccione Especialidad</option>
              {especialidades.map((especialidad) => (
                <option key={especialidad.id} value={especialidad.id}>
                  {especialidad.nombre}
                </option>
              ))}
            </select>
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
          <div className="input-box">
            <FaLock className="icono" />
            <input
              type="text"
              placeholder="Código Secreto"
              value={codigoSecreto}
              onChange={(e) => setCodigoSecreto(e.target.value)}
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

export default RegisterDoctor;
