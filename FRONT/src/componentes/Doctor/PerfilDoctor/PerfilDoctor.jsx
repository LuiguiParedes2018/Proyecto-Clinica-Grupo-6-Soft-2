import React from "react";
import "./PerfilDoctor.css";
import HeaderDoctor from "../HeaderDoctor/HeaderDoctor.jsx";

function PerfilDoctor() {
  const doctorData = {
    nombre: "Dr. Juan Pérez",
    especialidad: "Cardiología",
    bio: "Experto en enfermedades cardíacas, con más de 10 años de experiencia. Ha realizado más de 500 procedimientos exitosos.",
    imagen: "ruta-a-imagen-del-doctor.jpg", // Coloca una URL de imagen si tienes una
  };

  return (
    <div>
      <HeaderDoctor />
      <div className="perfil-doctor-container">
        <h1>Perfil del Doctor</h1>
        <div className="perfil-info">
          <img src={doctorData.imagen} alt="Foto del doctor" className="perfil-imagen" />
          <div className="perfil-detalles">
            <h2>{doctorData.nombre}</h2>
            <p><strong>Especialidad:</strong> {doctorData.especialidad}</p>
            <p>{doctorData.bio}</p>
            <button className="edit-button">Editar Perfil</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerfilDoctor;
