import React, { useEffect, useState } from "react";
import "./TuCita.css";
import HeaderPaciente from "../HeaderPaciente/HeaderPaciente";
import { getCitasByPacienteId } from "../../../servicios/citaService";

function TuCita() {
  const [citas, setCitas] = useState([]);
  
  // Obtener el ID del paciente desde localStorage
  const pacienteId = localStorage.getItem("pacienteId");

  useEffect(() => {
    if (pacienteId) {
      // Obtener citas del paciente logeado
      getCitasByPacienteId(pacienteId)
        .then((response) => {
          setCitas(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener las citas:", error);
        });
    }
  }, [pacienteId]);

  // Función para cancelar una cita
  const cancelarCita = (id) => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas cancelar esta cita?");
    if (confirmacion) {
      // Aquí podrías hacer una llamada para eliminar la cita en la base de datos.
      setCitas(citas.filter((cita) => cita.id !== id));
    }
  };

  return (
    <div>
      <HeaderPaciente />
      <div className="tu-cita">
        <h1>Estado de tus citas</h1>
        {citas.length === 0 ? (
          <p>No tienes citas reservadas.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Especialidad</th>
                <th>Doctor</th>
                <th>Consultorio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {citas.map((cita) => (
                <tr key={cita.id}>
                  <td>{cita.horario.fecha}</td>
                  <td>{cita.horario.hora}</td>
                  <td>{cita.doctor.especialidad.nombre}</td>
                  <td>{cita.doctor.nombreCompleto}</td>
                  <td>{cita.horario.consultorio}</td>
                  <td>
                    <button 
                      onClick={() => cancelarCita(cita.id)} 
                      className="btn-cancelar"
                    >
                      Cancelar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default TuCita;
