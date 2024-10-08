import React, { useEffect, useState } from "react";
import "./HorariosDoctor.css";
import HeaderDoctor from "../HeaderDoctor/HeaderDoctor.jsx";
import { getHorariosByDoctor } from "../../../servicios/horarioService"; // Importa el servicio para obtener los horarios del doctor

function HorariosDoctor() {
  const [horarios, setHorarios] = useState([]); // Estado para los horarios del doctor
  const doctorId = 1; // Simulando el ID del doctor logueado

  useEffect(() => {
    // Llamada a la API para obtener los horarios del doctor
    getHorariosByDoctor(doctorId)
      .then((response) => {
        setHorarios(response.data); // Guardar los horarios obtenidos
      })
      .catch((error) => {
        console.error("Error al obtener los horarios:", error);
      });
  }, [doctorId]);

  return (
    <div>
      <HeaderDoctor />
      <div className="horarios-container">
        <h1>Horarios del Doctor</h1>
        {horarios.length === 0 ? (
          <p>No tienes horarios creados.</p>
        ) : (
          <ul className="lista-horarios">
            {horarios.map((horario, index) => (
              <li key={index} className="horario-item">
                <p><strong>Fecha:</strong> {horario.fecha}</p>
                <p><strong>Hora:</strong> {horario.hora}</p>
                <p><strong>Consultorio:</strong> {horario.consultorio}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default HorariosDoctor;
