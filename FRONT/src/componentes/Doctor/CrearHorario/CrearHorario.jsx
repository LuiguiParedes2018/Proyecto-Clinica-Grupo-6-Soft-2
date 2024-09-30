import React, { useState } from "react";
import "./CrearHorario.css";
import HeaderDoctor from "../HeaderDoctor/HeaderDoctor.jsx";

function CrearHorario() {

  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [consultorio, setConsultorio] = useState("");

  const handleFechaChange = (event) => {
    setFecha(event.target.value);
  };

  const handleHoraChange = (event) => {
    setHora(event.target.value);
  };

  const handleConsultorioChange = (event) => {
    setConsultorio(event.target.value);
  };

  const confirmarHorario = () => {
    alert(`Horario confirmado:\nFecha: ${fecha}\nHora: ${hora}\nConsultorio: ${consultorio}`);
  };

  return (
    <div>
      <HeaderDoctor />
      <div className="crear-horario-container">
        <h1>Selecciona tu horario</h1>
        <div className="input-box">
          <label htmlFor="fecha">Fecha:</label>
          <input
            type="date"
            id="fecha"
            value={fecha}
            onChange={handleFechaChange}
            required
          />
        </div>
        <div className="input-box">
          <label htmlFor="hora">Hora:</label>
          <input
            type="time"
            id="hora"
            value={hora}
            onChange={handleHoraChange}
            required
          />
        </div>
        <div className="input-box">
          <label htmlFor="consultorio">Consultorio:</label>
          <select className="select-doctor"
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
        <button className="confirm-button" onClick={confirmarHorario}>
          Confirmar Horario
        </button>
      </div>
    </div>
  );
}

export default CrearHorario;
