import React from "react";


function ResultadosBusqueda({ resultados, tipoBusqueda }) {
  return (
    <div className="resultados-container">
      <h2>Resultados de {tipoBusqueda === "doctor" ? "Doctores" : "Pacientes"}</h2>
      {resultados.length === 0 ? (
        <p>No se encontraron resultados.</p>
      ) : (
        <ul className="lista-resultados">
          {resultados.map((item) => (
            <li key={item.id} className="resultado-item">
              <p><strong>Nombre:</strong> {item.nombreCompleto}</p>
              <p><strong>Correo:</strong> {item.correo}</p>
              <p><strong>Teléfono:</strong> {item.telefono}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ResultadosBusqueda;
