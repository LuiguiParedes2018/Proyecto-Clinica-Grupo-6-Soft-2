import React, { useState, useEffect } from "react";
import "./PerfilDoctor.css";
import HeaderDoctor from "../HeaderDoctor/HeaderDoctor.jsx";
import { getDoctorById, updateDoctor } from "../../../servicios/doctorService";

function PerfilDoctor() {
  const [isEditing, setIsEditing] = useState(false);
  const [doctorData, setDoctorData] = useState(null); // Datos reales del doctor
  const [formData, setFormData] = useState(null); // Datos temporales para edición
  const doctorId = 1; // Suponiendo que el ID del doctor es 1 (esto debe obtenerse desde sesión o contexto en la aplicación)

  useEffect(() => {
    // Obtener los datos del doctor desde la API
    getDoctorById(doctorId)
      .then((response) => {
        setDoctorData(response.data);
        setFormData(response.data); // Inicializa el formulario con los datos del doctor
      })
      .catch((error) => {
        console.error("Error al cargar el perfil del doctor:", error);
      });
  }, [doctorId]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    if (isEditing && formData) {
      // Guardar los datos cuando se hace clic en "Guardar"
      updateDoctor(doctorId, formData)
        .then((response) => {
          setDoctorData(response.data); // Actualiza los datos del doctor
          alert("Perfil actualizado con éxito.");
        })
        .catch((error) => {
          console.error("Error al actualizar el perfil:", error);
          alert("Hubo un error al actualizar el perfil.");
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!doctorData) {
    return <p>Cargando datos...</p>;
  }

  return (
    <div>
      <HeaderDoctor />
      <div className="perfil-doctor-container">
        <div className="perfil-header">
          <img
            src={doctorData.imagen || "https://via.placeholder.com/150"}
            alt="Foto del doctor"
            className="perfil-imagen"
          />
          <div className="perfil-detalles">
            <h2>
              {isEditing ? (
                <input
                  type="text"
                  name="nombreCompleto"
                  value={formData.nombreCompleto}
                  onChange={handleChange}
                />
              ) : (
                doctorData.nombreCompleto
              )}
            </h2>
            <button className="edit-button" onClick={handleEditClick}>
              {isEditing ? "Guardar" : "Editar Perfil"}
            </button>
          </div>
        </div>

        <div className="perfil-extra">
          <div className="perfil-card">
            <h3>Contacto</h3>
            <p>
              <strong>Teléfono:</strong>
              {isEditing ? (
                <input
                  type="text"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                />
              ) : (
                doctorData.telefono
              )}
            </p>
            <p>
              <strong>Email:</strong>
              {isEditing ? (
                <input
                  type="text"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                />
              ) : (
                doctorData.correo
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerfilDoctor;
