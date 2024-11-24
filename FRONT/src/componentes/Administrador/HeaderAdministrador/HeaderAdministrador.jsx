import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HeaderAdministrador.css";
import logohsm from '../../../assets/imagenes/logo.jpg';

function HeaderAdministrador() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Redirigir a la ruta /login-doctor al cerrar sesión
    navigate("/login-doctor");
  };

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">Administrador</h1>
        <nav className="nav-buttons">
          <Link to="/principal-administrador" className="nav-button">Buscador</Link>
          <button onClick={handleLogout} className="nav-button">Cerrar Sesión</button>
        </nav>
        <img src={logohsm} alt="Logo del hospital" className="hospital-logo" />
      </div>
    </header>
  );
}

export default HeaderAdministrador;
