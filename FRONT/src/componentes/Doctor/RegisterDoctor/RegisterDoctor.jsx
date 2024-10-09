import React, { useState, useEffect } from "react";
import "./RegisterDoctor.css";
import { FaUser, FaLock, FaEnvelope, FaPhone, FaBriefcase } from "react-icons/fa";
import { registerDoctor } from "../../../servicios/doctorService";
import { getEspecialidades } from "../../../servicios/especialidadService"; // Para obtener las especialidades
import { useNavigate } from "react-router-dom";

function RegisterDoctor() {
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [especialidadId, setEspecialidadId] = useState(""); // Ahora se maneja el ID de la especialidad
  const [especialidades, setEspecialidades] = useState([]); // Almacenar las especialidades disponibles
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
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
  }, []);

  const handleEspecialidadChange = (event) => {
    setEspecialidadId(event.target.value); // Almacena el ID de la especialidad seleccionada
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    // Crear el objeto doctor, asegurándose de enviar el ID de la especialidad
    const nuevoDoctor = {
      nombreCompleto,
      correo,
      telefono,
      especialidad: { id: especialidadId }, // Enviar la especialidad como un objeto con ID
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

export default RegisterDoctor;
