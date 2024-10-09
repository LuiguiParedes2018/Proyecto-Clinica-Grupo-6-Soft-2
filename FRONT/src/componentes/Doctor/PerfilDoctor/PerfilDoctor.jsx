import React, { useState, useEffect } from "react";
import "./PerfilDoctor.css";
import HeaderDoctor from "../HeaderDoctor/HeaderDoctor.jsx";
import { getDoctorById, updateDoctor } from "../../../servicios/doctorService";
import { useParams } from "react-router-dom"; // Importar useParams para obtener el ID desde la URL

function PerfilDoctor() {
  const { id } = useParams(); // Obtener el ID del doctor desde la URL
  const [isEditing, setIsEditing] = useState(false);
  const [doctorData, setDoctorData] = useState(null); // Datos reales del doctor
  const [formData, setFormData] = useState(null); // Datos temporales para edición

  useEffect(() => {
    // Obtener los datos del doctor desde la API usando el ID de la URL
    getDoctorById(id)
      .then((response) => {
        setDoctorData(response.data);
        setFormData(response.data); // Inicializa el formulario con los datos del doctor
      })
      .catch((error) => {
        console.error("Error al cargar el perfil del doctor:", error);
      });
  }, [id]); // Se ejecuta cuando cambia el ID

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    if (isEditing && formData) {
      // Guardar los datos cuando se hace clic en "Guardar"
      updateDoctor(id, formData)
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
