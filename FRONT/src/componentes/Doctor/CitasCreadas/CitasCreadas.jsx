import React, { useEffect, useState } from "react";
import "./CitasCreadas.css";
import HeaderDoctor from "../HeaderDoctor/HeaderDoctor.jsx";
import { getCitasByDoctorId } from "../../../servicios/citaService"; // Importa el servicio para obtener citas por doctor

function CitasCreadas() {
  const [citas, setCitas] = useState([]); // Estado para las citas

  // ID del doctor logueado (Simulado con doctorId 1)
  const doctorId = 1;

  useEffect(() => {
    // Llamada a la API para obtener las citas del doctor
    getCitasByDoctorId(doctorId)
      .then((response) => {
        setCitas(response.data); // Guardar las citas obtenidas
      })
      .catch((error) => {
        console.error("Error al obtener las citas:", error);
      });
  }, [doctorId]);

  return (
    <div>
      <HeaderDoctor />
      <div className="ver-citas-container">
        {citas.length === 0 ? (
          <p className="mensaje-vacio">No tienes citas creadas.</p>
        ) : (
          <ul className="lista-citas">
            {citas.map((cita, index) => (
              <li key={index} className="cita-item">
                <p><strong>Fecha:</strong> {cita.horario.fecha}</p>
                <p><strong>Hora:</strong> {cita.horario.hora}</p>
                <p><strong>Consultorio:</strong> {cita.horario.consultorio}</p>
                <p>
                  <strong>Estado de la Cita:</strong>{" "}
                  {cita.paciente
                    ? `Reservada por ${cita.paciente.nombreCompleto}`
                    : "Aún no reservada"}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CitasCreadas;
