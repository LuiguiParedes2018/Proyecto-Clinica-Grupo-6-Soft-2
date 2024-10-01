import React, { useState } from "react";
import "./PerfilDoctor.css";
import HeaderDoctor from "../HeaderDoctor/HeaderDoctor.jsx";

function PerfilDoctor() {
  const [isEditing, setIsEditing] = useState(false);
  const [doctorData, setDoctorData] = useState({
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
  });

  const [formData, setFormData] = useState(doctorData);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      setDoctorData(formData); // Actualiza los datos del doctor con los del formulario
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [key, subKey] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          [subKey]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const porcentajeCitas = Math.round((doctorData.citasRealizadas / doctorData.objetivoCitas) * 100);

  return (
    <div>
      <HeaderDoctor />
      <div className="perfil-doctor-container">
        <div className="perfil-header">
          <img src={doctorData.imagen} alt="Foto del doctor" className="perfil-imagen" />
          <div className="perfil-detalles">
            <h2>{isEditing ? <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} /> : doctorData.nombre}</h2>
            <p>
              <strong>Especialidad:</strong>
              {isEditing ? <input type="text" name="especialidad" value={formData.especialidad} onChange={handleChange} /> : doctorData.especialidad}
            </p>
            <p>
              {isEditing ? (
                <textarea name="bio" value={formData.bio} onChange={handleChange} />
              ) : (
                doctorData.bio
              )}
            </p>
            <button className="edit-button" onClick={handleEditClick}>
              {isEditing ? "Guardar" : "Editar Perfil"}
            </button>
          </div>
        </div>

        <div className="perfil-extra">
          <div className="perfil-card">
            <h3>Educación</h3>
            {isEditing ? (
              <input type="text" name="educacion" value={formData.educacion} onChange={handleChange} />
            ) : (
              <p>{doctorData.educacion}</p>
            )}
          </div>
          <div className="perfil-card">
            <h3>Contacto</h3>
            <p>
              <strong>Teléfono:</strong>
              {isEditing ? (
                <input type="text" name="contacto.telefono" value={formData.contacto.telefono} onChange={handleChange} />
              ) : (
                doctorData.contacto.telefono
              )}
            </p>
            <p>
              <strong>Email:</strong>
              {isEditing ? (
                <input type="text" name="contacto.correo" value={formData.contacto.correo} onChange={handleChange} />
              ) : (
                doctorData.contacto.correo
              )}
            </p>
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

