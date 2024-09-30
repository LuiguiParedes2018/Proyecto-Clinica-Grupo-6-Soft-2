import React from "react";
import "./CitasCreadas.css";
import HeaderDoctor from "../HeaderDoctor/HeaderDoctor.jsx";

function CitasCreadas() {
  
  const citas = [];

  return (
    <div>
      <HeaderDoctor />
      <h1>Citas</h1>
      <div className="ver-citas-container">
        {citas.length === 0 ? (
          <p className="mensaje-vacio">No tienes citas programadas.</p>
        ) : (
          <ul className="lista-citas">
            {citas.map((cita, index) => (
              <li key={index} className="cita-item">
                <p><strong>Fecha:</strong> {cita.fecha}</p>
                <p><strong>Hora:</strong> {cita.hora}</p>
                <p><strong>Paciente:</strong> {cita.paciente}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CitasCreadas;
