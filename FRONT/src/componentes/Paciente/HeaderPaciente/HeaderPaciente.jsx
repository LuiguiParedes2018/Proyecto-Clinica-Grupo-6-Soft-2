import React from "react";
import { Link } from "react-router-dom";
import "./HeaderPaciente.css";

function HeaderPaciente() {
  // Obtener el id del paciente desde localStorage
  const pacienteId = localStorage.getItem("pacienteId");

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">Paciente</h1>
        <nav className="nav-buttons">
          <Link to={`/perfil-paciente/${pacienteId}`} className="nav-button">Perfil</Link>
          <Link to="/sacar-cita" className="nav-button">Sacar Cita</Link>
          <Link to="/tu-cita" className="nav-button">Tu cita</Link>
          <Link to="/buscar" className="nav-button">Buscar</Link>
          <Link 
            to="/" 
            className="nav-button" 
            onClick={() => localStorage.removeItem("pacienteId")} // Limpiar el localStorage al cerrar sesión
          >
            Cerrar sesion
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default HeaderPaciente;
