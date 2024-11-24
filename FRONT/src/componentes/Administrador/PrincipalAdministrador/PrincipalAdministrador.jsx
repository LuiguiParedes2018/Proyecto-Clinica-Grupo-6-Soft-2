import React, { useState } from "react";
import "./PrincipalAdministrador.css";
import HeaderAdministrador from "../HeaderAdministrador/HeaderAdministrador";
import BuscadorAdministrador from "../BuscadorAdministrador/BuscadorAdministrador";
import ResultadosBusqueda from "../ResultadosBusqueda/ResultadosBusqueda";

function PrincipalAdministrador() {
  const [tipoBusqueda, setTipoBusqueda] = useState("doctor"); // Estado para alternar entre buscar doctores o pacientes
  const [resultados, setResultados] = useState([]); // Estado para almacenar los resultados de la búsqueda

  return (
    <div>
      <HeaderAdministrador />
      <BuscadorAdministrador
        tipoBusqueda={tipoBusqueda}
        setTipoBusqueda={setTipoBusqueda}
        setResultados={setResultados}
      />
      <ResultadosBusqueda resultados={resultados} tipoBusqueda={tipoBusqueda} />
    </div>
  );
}

export default PrincipalAdministrador;


