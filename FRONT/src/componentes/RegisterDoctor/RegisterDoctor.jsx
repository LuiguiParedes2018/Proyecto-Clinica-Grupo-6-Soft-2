import React, { useState } from "react";
import "./RegisterDoctor.css";
import { FaUser, FaLock, FaEnvelope, FaPhone, FaHospital, FaBriefcase } from "react-icons/fa";

function RegisterDoctor() {
  const [sede, setSede] = useState("");
  const [especialidad, setEspecialidad] = useState("");

  const handleSedeChange = (event) => {
    setSede(event.target.value);
  };

  const handleEspecialidadChange = (event) => {
    setEspecialidad(event.target.value);
  };

  return (
    <div className="register-doctor">
      <div className="cosas-register">
        <form action="">
          <h1>REGISTRAR DOCTOR</h1>
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
          {/* De momento estos datos seran estaticos */}
          <div className="input-box">
            <FaBriefcase className="icono" />
            <select value={especialidad} onChange={handleEspecialidadChange} required>
              <option value="">Seleccione Especialidad</option>
              <option value="Cardiología">Cardiologia</option>
              <option value="Dermatología">Dermatologia</option>
              <option value="Pediatría">Pediatria</option>
              <option value="Neurología">Neurologia</option>
              <option value="Traumatología">Traumatologia</option>
            </select>
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

export default RegisterDoctor;
