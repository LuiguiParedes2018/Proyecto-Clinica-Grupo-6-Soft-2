import React from "react";
import { Link } from "react-router-dom";
import "./HeaderDoctor.css";

function HeaderDoctor() {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">Doctor</h1>
        <nav className="nav-buttons">
          <Link to="/perfildoctor" className="nav-button">Perfil</Link>
          <Link to="/crearhorario" className="nav-button">Crear Horario</Link>
          <Link to="/citascreadas" className="nav-button">Citas Creadas</Link>
          <Link to="/" className="nav-button">Cerrar Sesión</Link>
        </nav>
      </div>
    </header>
  );
}

export default HeaderDoctor;