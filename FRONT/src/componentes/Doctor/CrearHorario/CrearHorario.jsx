import React, { useState } from "react";
import "./CrearHorario.css";
import HeaderDoctor from "../HeaderDoctor/HeaderDoctor.jsx";
import { createHorarioForDoctor } from "../../../servicios/horarioService"; // Importa la función para crear el horario
import { useNavigate } from "react-router-dom";

function CrearHorario() {
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [consultorio, setConsultorio] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Para redirigir después de crear el horario

  const handleFechaChange = (event) => {
    setFecha(event.target.value);
  };

  const handleHoraChange = (event) => {
    setHora(event.target.value);
  };

  const handleConsultorioChange = (event) => {
    setConsultorio(event.target.value);
  };

  // Aquí debes obtener el ID del doctor logeado (En este caso simulado como doctor 1)
  const doctorId = 1; 

  const confirmarHorario = async () => {
    try {
      const nuevoHorario = {
        fecha: fecha,
        hora: hora,
        consultorio: consultorio,
        doctor: { id: doctorId }, // Asigna el doctor logueado al horario
      };

      const response = await createHorarioForDoctor(nuevoHorario);
      console.log("Horario creado:", response.data);
      // Redirigir a la página de "CitasCreadas" una vez el horario se haya creado
      navigate("/doctor/citas-creadas"); 
    } catch (err) {
      setError("Error al crear el horario. Inténtalo de nuevo.");
      console.error("Error al crear el horario:", err);
    }
  };

  // Verifica si todos los campos están completos
  const isFormValid = fecha && hora && consultorio;

  return (
    <div>
      <HeaderDoctor />
      <div className="crear-horario-container">
        <div className="input-box">
          <label htmlFor="fecha">Fecha</label>
          <input
            type="date"
            id="fecha"
            value={fecha}
            onChange={handleFechaChange}
            required
          />
        </div>
        <div className="input-box">
          <label htmlFor="hora">Hora</label>
          <input
            type="time"
            id="hora"
            value={hora}
            onChange={handleHoraChange}
            required
          />
        </div>
        <div className="input-box">
          <label htmlFor="consultorio">Consultorio</label>
          <select
            className="select-doctor"
            id="consultorio"
            value={consultorio}
            onChange={handleConsultorioChange}
            required
          >
            <option value="">Seleccione Consultorio</option>
            <option value="Consultorio 1">Consultorio 1</option>
            <option value="Consultorio 2">Consultorio 2</option>
            <option value="Consultorio 3">Consultorio 3</option>
          </select>
        </div>
        {error && <p className="error-message">{error}</p>}
        <button
          className="confirm-button"
          onClick={confirmarHorario}
          disabled={!isFormValid} // Deshabilita el botón si el formulario no es válido
        >
          Confirmar
        </button>
      </div>
    </div>
  );
}

export default CrearHorario;
