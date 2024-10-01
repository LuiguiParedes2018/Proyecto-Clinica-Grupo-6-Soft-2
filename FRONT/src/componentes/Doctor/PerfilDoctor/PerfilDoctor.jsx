import React from "react";
import "./PerfilDoctor.css";
import HeaderDoctor from "../HeaderDoctor/HeaderDoctor.jsx";

function PerfilDoctor() {
  const doctorData = {
    nombre: "Dr. Juan Pérez",
    especialidad: "Cardiologia",
    bio: "Experto en enfermedades cardíacas, con más de 10 años de experiencia. Ha realizado más de 500 procedimientos exitosos.",
    imagen: "https://via.placeholder.com/150",
    educacion: "Universidad Nacional de Medicina, 2010",
    contacto: {
      telefono: "+123 456 789",
      correo: "juan.perez@clinica.com",
    },
    citasRealizadas: 100,
    objetivoCitas: 500,
  };

  const porcentajeCitas = Math.round((doctorData.citasRealizadas / doctorData.objetivoCitas) * 100);

  return (
    <div>
      <HeaderDoctor />
      <div className="perfil-doctor-container">
        <div className="perfil-header">
          <img src={doctorData.imagen} alt="Foto del doctor" className="perfil-imagen" />
          <div className="perfil-detalles">
            <h2>{doctorData.nombre}</h2>
            <p><strong>Especialidad:</strong> {doctorData.especialidad}</p>
            <p>{doctorData.bio}</p>
            <button className="edit-button">Editar Perfil</button>
          </div>
        </div>

        <div className="perfil-extra">
          <div className="perfil-card">
            <h3>Educación</h3>
            <p>{doctorData.educacion}</p>
          </div>
          <div className="perfil-card">
            <h3>Contacto</h3>
            <p><strong>Teléfono:</strong> {doctorData.contacto.telefono}</p>
            <p><strong>Email:</strong> {doctorData.contacto.correo}</p>
          </div>
        </div>

        <div className="perfil-citas">
          <h3>Citas realizadas este año</h3>
          <div className="citas-bar-container">
            <div className="citas-bar">
              <div className="citas-bar-fill" style={{ width: `${porcentajeCitas}%` }}>
                <span className="citas-bar-text">{porcentajeCitas}%</span>
              </div>
            </div>
            <p>
              {doctorData.citasRealizadas} de {doctorData.objetivoCitas} citas completadas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerfilDoctor;


