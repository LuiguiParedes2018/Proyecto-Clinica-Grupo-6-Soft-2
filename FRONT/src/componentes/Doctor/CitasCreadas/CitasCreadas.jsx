import React, { useEffect, useState } from "react";
import "./CitasCreadas.css";
import HeaderDoctor from "../HeaderDoctor/HeaderDoctor.jsx";
import { getCitasByDoctorId, marcarCitaComoPagada } from "../../../servicios/citaService"; // Importamos la nueva función

function CitasCreadas() {
  const [citas, setCitas] = useState([]); // Estado para las citas

  // Obtener el ID del doctor desde localStorage
  const doctorId = localStorage.getItem("doctorId");

  useEffect(() => {
    if (!doctorId) {
      console.error("No se pudo obtener el ID del doctor.");
      return;
    }

    // Llamada a la API para obtener las citas del doctor
    getCitasByDoctorId(doctorId)
      .then((response) => {
        setCitas(response.data); // Guardar las citas obtenidas
      })
      .catch((error) => {
        console.error("Error al obtener las citas:", error);
      });
  }, [doctorId]);

  const handleMarcarPagado = (id) => {
    // Llamar al servicio para marcar la cita como pagada
    marcarCitaComoPagada(id)
      .then(() => {
        // Actualizar el estado de las citas en el frontend
        setCitas((prevCitas) =>
          prevCitas.map((cita) =>
            cita.id === id ? { ...cita, citaPagada: true } : cita
          )
        );
      })
      .catch((error) => {
        console.error("Error al marcar la cita como pagada:", error);
      });
  };

  return (
    <div>
      <HeaderDoctor />
      <div className="ver-citas-container">
        {citas.length === 0 ? (
          <p className="mensaje-vacio">No tienes citas creadas.</p>
        ) : (
          <ul className="lista-citas">
            {citas.map((cita, index) => (
              <li
                key={index}
                className={`cita-item ${
                  cita.citaPagada
                    ? "cita-pagada" // Clase para citas pagadas (verde)
                    : cita.paciente
                    ? "cita-reservada-no-pagada" // Clase para citas reservadas pero no pagadas (amarillo)
                    : "cita-no-reservada" // Clase para citas no reservadas (rojo)
                }`}
              >
                <p><strong>Fecha:</strong> {cita.horario.fecha}</p>
                <p><strong>Hora:</strong> {cita.horario.hora}</p>
                <p><strong>Consultorio:</strong> {cita.horario.consultorio}</p>
                <p>
                  <strong>Estado de la Cita:</strong>{" "}
                  {cita.paciente
                    ? `Reservada por ${cita.paciente.nombreCompleto}`
                    : "Aún no reservada"}
                </p>
                <p>
                  <strong>Estado del Pago:</strong>{" "}
                  {cita.citaPagada ? "Pagado" : "No pagado"}
                </p>
                {!cita.citaPagada && (
                  <button
                    className="btn-pagar"
                    onClick={() => handleMarcarPagado(cita.id)}
                  >
                    Confirmar Pago
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CitasCreadas;
