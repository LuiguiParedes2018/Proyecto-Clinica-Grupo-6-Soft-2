import React, { useState } from "react";
import "./PerfilPaciente.css";
import HeaderPaciente from "../HeaderPaciente/HeaderPaciente.jsx";

function PerfilPaciente() {
  const [isEditing, setIsEditing] = useState(false);
  const [pacienteData, setPacienteData] = useState({
    nombre: "Carlos González",
    edad: 30,
    bio: "Paciente con un historial de salud activo.",
    imagen: "https://via.placeholder.com/150",
    contacto: {
      telefono: "+123 456 789",
      correo: "carlos.gonzalez@clinica.com",
    },
  });

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPacienteData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setPacienteData((prevData) => ({
      ...prevData,
      contacto: {
        ...prevData.contacto,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para guardar los cambios, por ejemplo, enviando a una API.
    console.log("Datos actualizados:", pacienteData);
    setIsEditing(false); // Cierra el modo de edición después de guardar
  };

  return (
    <div>
      <HeaderPaciente />
      <div className="perfil-paciente-container">
        <div className="perfil-header">
          <img src={pacienteData.imagen} alt="Foto del paciente" className="perfil-imagen" />
          {!isEditing ? (
            <div className="perfil-detalles">
              <h2>{pacienteData.nombre}</h2>
              <p><strong>Edad:</strong> {pacienteData.edad}</p>
              <p><strong>Teléfono:</strong> {pacienteData.contacto.telefono}</p>
              <p><strong>Email:</strong> {pacienteData.contacto.correo}</p>
              <p>{pacienteData.bio}</p>
              <button className="edit-button" onClick={handleEditClick}>Editar Perfil</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="perfil-detalles">
              <div className="form-group">
                <label htmlFor="nombre">Nombre:</label>
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  value={pacienteData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="edad">Edad:</label>
                <input
                  type="number"
                  name="edad"
                  id="edad"
                  value={pacienteData.edad}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="telefono">Teléfono:</label>
                <input
                  type="text"
                  name="telefono"
                  id="telefono"
                  value={pacienteData.contacto.telefono}
                  onChange={handleContactChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="correo">Email:</label>
                <input
                  type="email"
                  name="correo"
                  id="correo"
                  value={pacienteData.contacto.correo}
                  onChange={handleContactChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="bio">Biografía:</label>
                <textarea
                  name="bio"
                  id="bio"
                  value={pacienteData.bio}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="save-button">Guardar Cambios</button>
              <button type="button" className="cancel-button" onClick={handleEditClick}>Cancelar</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default PerfilPaciente;





