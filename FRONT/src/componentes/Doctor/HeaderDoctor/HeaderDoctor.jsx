import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HeaderDoctor.css";
import logohsm from '../../../assets/imagenes/logo.jpg'

function HeaderDoctor() {
  const navigate = useNavigate();

  // Obtener el ID del doctor desde localStorage
  const doctorId = localStorage.getItem("doctorId");

  const handleLogout = () => {
    // Limpiar el localStorage cuando se cierra sesión
    localStorage.removeItem("doctorId");
    navigate("/login-doctor");
  };

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">Doctor</h1>
        <nav className="nav-buttons">
          <Link to={`/perfil-doctor/${doctorId}`} className="nav-button">Perfil</Link>
          <Link to="/crear-horario" className="nav-button">Crear Horario</Link>
          <Link to={`/citas-creadas/${doctorId}`} className="nav-button">Citas creadas</Link>
          <Link to={`/horarios-doctor/${doctorId}`} className="nav-button">Horarios</Link>
          <button onClick={handleLogout} className="nav-button">Cerrar Sesion</button>
        </nav>
        <img src={logohsm} alt="Logo del hospital" className="hospital-logo" />
      </div>
    </header>
  );
}

export default HeaderDoctor;

