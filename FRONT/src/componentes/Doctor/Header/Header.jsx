import React from "react";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">Clinica</h1>
        <nav className="nav-buttons">
          <button className="nav-button">Perfil</button>
          <button className="nav-button">Crear Horario</button>
          <button className="nav-button">Citas Creadas</button>
          <button className="nav-button">Cerrar Sesion</button>
        </nav>
      </div>
    </header>
  );
}

export default Header;