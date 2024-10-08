import React from "react";
import { Link } from "react-router-dom";
import "./HeaderDoctor.css";

function HeaderDoctor() {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">Doctor</h1>
        <nav className="nav-buttons">
          <Link to="/perfil-doctor" className="nav-button">Perfil</Link>
          <Link to="/crear-horario" className="nav-button">Crear Horario</Link>
          <Link to="/citas-creadas" className="nav-button">Citas Creadas</Link>
          <Link to="/login-doctor" className="nav-button">Cerrar Sesión</Link>
        </nav>
      </div>
    </header>
  );
}

export default HeaderDoctor;