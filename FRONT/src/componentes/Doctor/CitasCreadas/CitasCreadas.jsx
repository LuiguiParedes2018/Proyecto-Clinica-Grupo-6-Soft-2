import React, { useEffect, useState } from "react";
import "./CitasCreadas.css";
import HeaderDoctor from "../HeaderDoctor/HeaderDoctor.jsx";
import { getHorariosByDoctor } from "../../../servicios/horarioService"; // Importa el servicio para obtener horarios

function CitasCreadas() {
  const [horarios, setHorarios] = useState([]); // Estado para los horarios

  // Aquí puedes obtener el ID del doctor logeado (Simulado con doctorId 1)
  const doctorId = 1;

  useEffect(() => {
    // Llamada a la API para obtener los horarios creados por el doctor
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
      <div className="ver-citas-container">
        {horarios.length === 0 ? (
          <p className="mensaje-vacio">No tienes horarios creados.</p>
        ) : (
          <ul className="lista-citas">
            {horarios.map((horario, index) => (
              <li key={index} className="cita-item">
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

export default CitasCreadas;
