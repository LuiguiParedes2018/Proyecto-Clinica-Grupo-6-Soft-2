import React, { useState, useEffect } from "react";
import "./BuscarDoctores.css";
import HeaderAdministrador from "../HeaderAdministrador/HeaderAdministrador";
import {
  getDoctores,
  deleteDoctor,
  updateDoctor,
} from "../../../servicios/doctorService";

function BuscarDoctores() {
  const [doctores, setDoctores] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModalEditar, setShowModalEditar] = useState(false);
  const [doctorEditar, setDoctorEditar] = useState(null);
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    telefono: "",
  });

  useEffect(() => {
    getDoctores()
      .then((response) => {
        setDoctores(response.data);
      })
      .catch((error) => console.error("Error al cargar doctores:", error));
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() === "") return doctores;
    return doctores.filter((doctor) =>
      doctor.nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleEliminar = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este doctor?")) {
      deleteDoctor(id)
        .then(() => {
          setDoctores((prevDoctores) =>
            prevDoctores.filter((doctor) => doctor.id !== id)
          );
          alert("Doctor eliminado con éxito.");
        })
        .catch((error) => console.error("Error al eliminar doctor:", error));
    }
  };

  const handleShowModalEditar = (doctor) => {
    setDoctorEditar(doctor);
    setFormData({
      nombreCompleto: doctor.nombreCompleto,
      telefono: doctor.telefono,
    });
    setShowModalEditar(true);
  };

  const handleUpdate = () => {
    if (!formData.nombreCompleto || !formData.telefono) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const updatedDoctor = {
      ...doctorEditar,
      nombreCompleto: formData.nombreCompleto,
      telefono: formData.telefono,
    };

    updateDoctor(doctorEditar.id, updatedDoctor)
      .then(() => {
        setDoctores((prevDoctores) =>
          prevDoctores.map((doctor) =>
            doctor.id === doctorEditar.id ? updatedDoctor : doctor
          )
        );
        setShowModalEditar(false);
        alert("Doctor actualizado con éxito.");
      })
      .catch((error) =>
        console.error("Error al actualizar doctor:", error)
      );
  };

  const handleCancel = () => {
    setShowModalEditar(false);
  };

  return (
    <div>
      <HeaderAdministrador />
      <div className="buscador-container">
        <div className="campo-busqueda">
          <input
            type="text"
            placeholder="Buscar doctor por nombre"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Buscar</button>
        </div>
      </div>

      <div className="resultados-container">
        {handleSearch().length === 0 ? (
          <p>No se encontraron doctores.</p>
        ) : (
          <ul className="lista-resultados">
            {handleSearch().map((doctor) => (
              <li key={doctor.id} className="resultado-item">
                <p>
                  <strong>Nombre:</strong> {doctor.nombreCompleto}
                </p>
                <p>
                  <strong>Correo:</strong> {doctor.correo}
                </p>
                <p>
                  <strong>Teléfono:</strong> {doctor.telefono}
                </p>
                <div className="botones-accion">
                  <button
                    className="editar-button"
                    onClick={() => handleShowModalEditar(doctor)}
                  >
                    Editar
                  </button>
                  <button
                    className="eliminar-button"
                    onClick={() => handleEliminar(doctor.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {showModalEditar && (
        <div className="modal">
          <div className="modal-content">
            <h3>Editar Doctor</h3>
            <form>
              <label>
                Nombre Completo:
                <input
                  type="text"
                  name="nombreCompleto"
                  value={formData.nombreCompleto}
                  onChange={(e) =>
                    setFormData({ ...formData, nombreCompleto: e.target.value })
                  }
                />
              </label>
              <label>
                Teléfono:
                <input
                  type="text"
                  name="telefono"
                  value={formData.telefono}
                  onChange={(e) =>
                    setFormData({ ...formData, telefono: e.target.value })
                  }
                />
              </label>
              <div className="modal-buttons">
                <button
                  type="button"
                  className="confirm-button"
                  onClick={handleUpdate}
                >
                  Guardar Cambios
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={handleCancel}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default BuscarDoctores;
