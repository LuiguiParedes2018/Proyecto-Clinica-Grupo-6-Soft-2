import React, { useState } from "react";

import { getDoctores } from "../../../servicios/doctorService";
import { getPacientes } from "../../../servicios/pacienteService";

function BuscadorAdministrador({ tipoBusqueda, setTipoBusqueda, setResultados }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleBuscar = async () => {
    try {
      if (tipoBusqueda === "doctor") {
        const response = await getDoctores();
        const doctoresFiltrados = response.data.filter((doctor) =>
          doctor.nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setResultados(doctoresFiltrados);
      } else {
        const response = await getPacientes();
        const pacientesFiltrados = response.data.filter((paciente) =>
          paciente.nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setResultados(pacientesFiltrados);
      }
    } catch (error) {
      console.error("Error al buscar:", error);
    }
  };

  return (
    <div className="buscador-container">
      <div className="botones-tipo-busqueda">
        <button
          onClick={() => setTipoBusqueda("doctor")}
          className={tipoBusqueda === "doctor" ? "activo" : ""}
        >
          Buscar Doctor
        </button>
        <button
          onClick={() => setTipoBusqueda("paciente")}
          className={tipoBusqueda === "paciente" ? "activo" : ""}
        >
          Buscar Paciente
        </button>
      </div>
      <div className="campo-busqueda">
        <input
          type="text"
          placeholder={`Buscar ${tipoBusqueda} por nombre`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleBuscar}>Buscar</button>
      </div>
    </div>
  );
}

export default BuscadorAdministrador;
