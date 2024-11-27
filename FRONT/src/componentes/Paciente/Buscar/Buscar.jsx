import React, { useState, useEffect } from "react";
import "./Buscar.css";
import HeaderPaciente from "../HeaderPaciente/HeaderPaciente";
import { getDoctores } from "../../../servicios/doctorService";
import { getPromedioCalificacion, enviarCalificacion } from "../../../servicios/calificacionService";

function Buscar() {
  const [doctores, setDoctores] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [doctoresFiltrados, setDoctoresFiltrados] = useState([]);
  const [calificaciones, setCalificaciones] = useState({});
  const [calificacionActual, setCalificacionActual] = useState({});
  
  // Obtener el ID del paciente desde localStorage
  const pacienteId = localStorage.getItem("pacienteId");

  useEffect(() => {
    if (!pacienteId) {
      alert("No se encontró el ID del paciente. Por favor, inicie sesión.");
      return;
    }

    getDoctores()
      .then((response) => {
        setDoctores(response.data);
        setDoctoresFiltrados(response.data);

        response.data.forEach((doctor) => {
          actualizarPromedio(doctor.id);
        });
      })
      .catch((error) => console.error("Error al cargar los doctores:", error));
  }, [pacienteId]);

  const actualizarPromedio = (doctorId) => {
    getPromedioCalificacion(doctorId)
      .then((response) => {
        setCalificaciones((prev) => ({
          ...prev,
          [doctorId]: response.data,
        }));
      })
      .catch((error) => console.error("Error al obtener el promedio:", error));
  };

  const handleCalificacionChange = (doctorId, value) => {
    setCalificacionActual((prev) => ({
      ...prev,
      [doctorId]: value,
    }));
  };

  const handleCalificar = (doctorId) => {
    if (!pacienteId) {
      alert("No se encontró el ID del paciente. Por favor, inicie sesión.");
      return;
    }

    const puntaje = parseInt(calificacionActual[doctorId], 10);
    if (isNaN(puntaje) || puntaje < 1 || puntaje > 20) {
      alert("La calificación debe estar entre 1 y 20");
      return;
    }

    enviarCalificacion(doctorId, pacienteId, puntaje)
      .then(() => {
        actualizarPromedio(doctorId);
        setCalificacionActual((prev) => ({ ...prev, [doctorId]: "" }));
      })
      .catch((error) => console.error("Error al enviar la calificación:", error));
  };

  const handleBusquedaChange = (event) => {
    setBusqueda(event.target.value);
  };

  const handleBuscarClick = () => {
    if (busqueda === "") {
      setDoctoresFiltrados(doctores);
    } else {
      const filtrados = doctores.filter((doctor) =>
        doctor.nombreCompleto.toLowerCase().includes(busqueda.toLowerCase()) ||
        doctor.especialidad.nombre.toLowerCase().includes(busqueda.toLowerCase())
      );
      setDoctoresFiltrados(filtrados);
    }
  };

  return (
    <div>
      <HeaderPaciente />
      <div className="buscar-wrapper">
        <div className="buscar-container">
          <input
            type="text"
            placeholder="Busca por nombre o especialidad..."
            value={busqueda}
            onChange={handleBusquedaChange}
            className="buscar-input"
          />
          <button onClick={handleBuscarClick} className="buscar-button">
            Buscar
          </button>
        </div>
        <div className="doctor-list">
          {doctoresFiltrados.length > 0 ? (
            doctoresFiltrados.map((doctor) => (
              <div key={doctor.id} className="doctor-card">
                <h2>{doctor.nombreCompleto}</h2>
                <p>
                  <strong>Especialidad:</strong> {doctor.especialidad.nombre}
                </p>
                <p>
                  <strong>Calificación Promedio:</strong>{" "}
                  {calificaciones[doctor.id] !== undefined
                    ? calificaciones[doctor.id].toFixed(1)
                    : "No disponible"}
                </p>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={calificacionActual[doctor.id] || ""}
                  onChange={(e) => handleCalificacionChange(doctor.id, e.target.value)}
                  placeholder="Calificar (1-20)"
                />
                <button onClick={() => handleCalificar(doctor.id)}>
                  Confirmar Calificación
                </button>
              </div>
            ))
          ) : (
            <p>No se encontraron doctores.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Buscar;
