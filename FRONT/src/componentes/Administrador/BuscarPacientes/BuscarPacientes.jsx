import React, { useState, useEffect } from "react";
import "./BuscarPacientes.css";
import HeaderAdministrador from "../HeaderAdministrador/HeaderAdministrador";
import {
  getPacientes,
  deletePaciente,
  updatePaciente,
} from "../../../servicios/pacienteService";

function BuscarPacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModalEditar, setShowModalEditar] = useState(false);
  const [pacienteEditar, setPacienteEditar] = useState(null);
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    telefono: "",
    correo: "",
    password: "",
  });

  useEffect(() => {
    getPacientes()
      .then((response) => {
        setPacientes(response.data);
      })
      .catch((error) => console.error("Error al cargar pacientes:", error));
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() === "") return pacientes;
    return pacientes.filter((paciente) =>
      paciente.nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleEliminar = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este paciente?")) {
      deletePaciente(id)
        .then(() => {
          setPacientes((prevPacientes) =>
            prevPacientes.filter((paciente) => paciente.id !== id)
          );
          alert("Paciente eliminado con éxito.");
        })
        .catch((error) => console.error("Error al eliminar paciente:", error));
    }
  };

  const handleShowModalEditar = (paciente) => {
    setPacienteEditar(paciente);
    setFormData({
      nombreCompleto: paciente.nombreCompleto,
      telefono: paciente.telefono,
      correo: paciente.correo,  // Cargar correo
      password: "",  // Dejar campo de password vacío para permitir no cambiarlo
    });
    setShowModalEditar(true);
  };

  const handleUpdate = () => {
    if (!formData.nombreCompleto || !formData.telefono) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    // Solo actualizar los campos que no estén vacíos
    const updatedPaciente = {
      ...pacienteEditar,
      nombreCompleto: formData.nombreCompleto,
      telefono: formData.telefono,
      correo: formData.correo || pacienteEditar.correo,  // No cambiar si está vacío
      password: formData.password || pacienteEditar.password,  // No cambiar si está vacío
    };

    updatePaciente(pacienteEditar.id, updatedPaciente)
      .then(() => {
        setPacientes((prevPacientes) =>
          prevPacientes.map((paciente) =>
            paciente.id === pacienteEditar.id ? updatedPaciente : paciente
          )
        );
        setShowModalEditar(false);
        alert("Paciente actualizado con éxito.");
      })
      .catch((error) => console.error("Error al actualizar paciente:", error));
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
            placeholder="Buscar paciente por nombre"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Buscar</button>
        </div>
      </div>

      <div className="resultados-container">
        {handleSearch().length === 0 ? (
          <p>No se encontraron pacientes.</p>
        ) : (
          <ul className="lista-resultados">
            {handleSearch().map((paciente) => (
              <li key={paciente.id} className="resultado-item">
                <p>
                  <strong>Nombre:</strong> {paciente.nombreCompleto}
                </p>
                <p>
                  <strong>Correo:</strong> {paciente.correo}
                </p>
                <p>
                  <strong>Teléfono:</strong> {paciente.telefono}
                </p>
                <div className="botones-accion">
                  <button
                    className="editar-button"
                    onClick={() => handleShowModalEditar(paciente)}
                  >
                    Editar
                  </button>
                  <button
                    className="eliminar-button"
                    onClick={() => handleEliminar(paciente.id)}
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
            <h3>Editar Paciente</h3>
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
              <label>
                Correo:
                <input
                  type="email"
                  name="correo"
                  value={formData.correo}
                  onChange={(e) =>
                    setFormData({ ...formData, correo: e.target.value })
                  }
                />
              </label>
              <label>
                Contraseña:
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </label>
              <div className="modal-buttons">
                <button
                  type="button"
                  className="confirm-button"
                  onClick={handleUpdate}
                >
                  Guardar
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

export default BuscarPacientes;


