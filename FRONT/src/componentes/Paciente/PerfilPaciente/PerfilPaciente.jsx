import React, { useState, useEffect } from "react";
import "./PerfilPaciente.css";
import HeaderPaciente from "../HeaderPaciente/HeaderPaciente.jsx";
import { getPacienteById, updatePaciente } from "../../../servicios/pacienteService";
import { useParams } from "react-router-dom";

function PerfilPaciente() {
  const { id } = useParams(); // Obtener el ID del paciente desde la URL
  const [isEditing, setIsEditing] = useState(false);
  const [pacienteData, setPacienteData] = useState(null); // Datos reales del paciente
  const [formData, setFormData] = useState(null); // Datos temporales para edición
  const pacienteId = id || localStorage.getItem("pacienteId"); // Usar el ID de la URL o de localStorage

  useEffect(() => {
    // Verificar si existe un ID de paciente
    if (pacienteId) {
      // Obtener los datos del paciente desde la API usando el ID
      getPacienteById(pacienteId)
        .then((response) => {
          setPacienteData(response.data);
          setFormData(response.data); // Inicializa el formulario con los datos del paciente
        })
        .catch((error) => {
          console.error("Error al cargar el perfil del paciente:", error);
        });
    } else {
      console.error("No se encontró el ID del paciente.");
    }
  }, [pacienteId]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    if (isEditing && formData) {
      // Guardar los datos cuando se hace clic en "Guardar"
      updatePaciente(pacienteId, formData)
        .then((response) => {
          setPacienteData(response.data); // Actualiza los datos del paciente
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

  if (!pacienteData) {
    return <p>Cargando datos...</p>;
  }

  return (
    <div>
      <HeaderPaciente />
      <div className="perfil-paciente-container">
        <div className="perfil-header">
          <img
            src={pacienteData.imagen || "https://st4.depositphotos.com/20523700/25897/i/450/depositphotos_258975518-stock-photo-illustration-add-user-icon.jpg"}
            alt="Foto del paciente"
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
                pacienteData.nombreCompleto
              )}
            </h2>
            <p>
              <strong>Edad: </strong>
              {isEditing ? (
                <input
                  type="number"
                  name="edad"
                  value={formData.edad}
                  onChange={handleChange}
                />
              ) : (
                pacienteData.edad
              )}
            </p>
            <p>
              <strong>Teléfono: </strong>
              {isEditing ? (
                <input
                  type="text"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                />
              ) : (
                pacienteData.telefono
              )}
            </p>
            <p>
              <strong>Email: </strong>
              {isEditing ? (
                <input
                  type="email"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                />
              ) : (
                pacienteData.correo
              )}
            </p>
            <button className="edit-button" onClick={handleEditClick}>
              {isEditing ? "Guardar" : "Editar Perfil"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerfilPaciente;
