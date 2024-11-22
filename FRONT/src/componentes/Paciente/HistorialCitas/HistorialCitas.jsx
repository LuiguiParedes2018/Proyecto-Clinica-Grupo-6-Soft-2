import React, { useEffect, useState } from "react";
import "./HistorialCitas.css"; // Puedes crear un archivo CSS para estilos
import { getCitasByPacienteId } from "../../../servicios/citaService";
import { useNavigate } from "react-router-dom"; // Importar useNavigate

function HistorialCitas() {
  const [citas, setCitas] = useState([]);
  const pacienteId = localStorage.getItem("pacienteId");
  const navigate = useNavigate(); // Hook para navegación

  useEffect(() => {
    if (pacienteId) {
      getCitasByPacienteId(pacienteId)
        .then((response) => {
          setCitas(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener el historial de citas:", error);
        });
    }
  }, [pacienteId]);

  return (
    <div className="historial-citas">
      <h1>Historial de Citas</h1>
      {citas.length === 0 ? (
        <p>No se encontraron citas en el historial.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Especialidad</th>
              <th>Doctor</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {citas.map((cita) => (
              <tr key={cita.id}>
                <td>{cita.horario.fecha}</td>
                <td>{cita.horario.hora}</td>
                <td>{cita.doctor.especialidad.nombre}</td>
                <td>{cita.doctor.nombreCompleto}</td>
                <td>
                  <span
                    className={`estado-cita ${
                      cita.citaPagada
                        ? "estado-pagada"
                        : cita.estado === "Cancelada"
                        ? "estado-cancelada"
                        : "estado-pendiente"
                    }`}
                  >
                    {cita.citaPagada
                      ? "Pagada"
                      : cita.estado === "Cancelada"
                      ? "Cancelada"
                      : "Pendiente"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button className="btn-regresar" onClick={() => navigate("/tu-cita")}>
        Regresar a Mis Citas
      </button>
    </div>
  );
}

export default HistorialCitas;
