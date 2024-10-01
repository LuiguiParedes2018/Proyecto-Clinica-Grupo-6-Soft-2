import React from "react";
import "./CitasCreadas.css";
import HeaderDoctor from "../HeaderDoctor/HeaderDoctor.jsx";

function CitasCreadas() {
  // Ejemplo de datos de citas
  const citas = [
    {
      fecha: "2024-10-01",
      hora: "10:00 AM",
      reservado: "Sí", // Si la cita fue reservada
      cancelado: "No", // Si la cita fue pagada (Cancelado = pagado)
      consultorio: "Consultorio 305",
    },
    {
      fecha: "2024-10-02",
      hora: "2:00 PM",
      reservado: "No",
      cancelado: "No",
      consultorio: "Consultorio 202",
    },
    {
      fecha: "2024-10-03",
      hora: "11:00 AM",
      reservado: "Sí",
      cancelado: "Sí", // La cita fue reservada y pagada
      consultorio: "Consultorio 101",
    },
  ];

  return (
    <div>
      <HeaderDoctor />
      <div className="ver-citas-container">
        {citas.length === 0 ? (
          <p className="mensaje-vacio">Tus horarios aparecerán aquí.</p>
        ) : (
          <ul className="lista-citas">
            {citas.map((cita, index) => {
              let claseCita = "";

              if (cita.reservado === "No") {
                claseCita = "cita-no-reservada";
              } else if (cita.reservado === "Sí" && cita.cancelado === "No") {
                claseCita = "cita-reservada-no-pagada";
              } else if (cita.reservado === "Sí" && cita.cancelado === "Sí") {
                claseCita = "cita-pagada";
              }

              return (
                <li key={index} className={`cita-item ${claseCita}`}>
                  <p><strong>Fecha:</strong> {cita.fecha}</p>
                  <p><strong>Hora:</strong> {cita.hora}</p>
                  <p><strong>Reservado:</strong> {cita.reservado}</p>
                  <p><strong>Cancelado (Pagado):</strong> {cita.cancelado}</p>
                  <p><strong>Consultorio:</strong> {cita.consultorio}</p>
                  
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CitasCreadas;



