import React, { useState, useEffect } from "react";
import "./SacarCita.css";
import HeaderPaciente from "../HeaderPaciente/HeaderPaciente";
import { getEspecialidades } from "../../../servicios/especialidadService";
import { getDoctoresByEspecialidad } from "../../../servicios/doctorService";
import { getHorariosByDoctor } from "../../../servicios/horarioService";
import { reservarCita } from "../../../servicios/citaService";

function SacarCita() {
  const [especialidades, setEspecialidades] = useState([]);
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState("");
  const [doctores, setDoctores] = useState([]);
  const [doctorSeleccionado, setDoctorSeleccionado] = useState("");
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState("");
  const [error, setError] = useState("");

  const pacienteId = localStorage.getItem("pacienteId"); // Obtener el ID del paciente logeado desde localStorage

  useEffect(() => {
    // Obtener especialidades desde la base de datos
    getEspecialidades()
      .then((response) => {
        setEspecialidades(response.data);
      })
      .catch((error) => console.error("Error al cargar las especialidades:", error));
  }, []);

  // Manejar el cambio de especialidad seleccionada
  const handleEspecialidadChange = (event) => {
    const especialidadId = event.target.value;
    setEspecialidadSeleccionada(especialidadId);
    setDoctorSeleccionado("");
    setHorarioSeleccionado("");
    setHorariosDisponibles([]);

    // Cargar doctores según la especialidad seleccionada
    getDoctoresByEspecialidad(especialidadId)
      .then((response) => {
        setDoctores(response.data);
      })
      .catch((error) => console.error("Error al cargar los doctores:", error));
  };

  // Manejar el cambio de doctor seleccionado
  const handleDoctorChange = (event) => {
    const doctorId = event.target.value;
    setDoctorSeleccionado(doctorId);
    setHorarioSeleccionado("");

    // Cargar horarios disponibles según el doctor seleccionado
    getHorariosByDoctor(doctorId)
      .then((response) => {
        setHorariosDisponibles(response.data);
      })
      .catch((error) => console.error("Error al cargar los horarios:", error));
  };

  // Manejar el cambio de horario seleccionado
  const handleHorarioChange = (event) => {
    setHorarioSeleccionado(event.target.value);
  };

  const handleSacarCita = () => {
    if (especialidadSeleccionada && doctorSeleccionado && horarioSeleccionado) {
      // Crear cita para el paciente con la API
      const nuevaCita = {
        horario: { id: horarioSeleccionado },
        doctor: { id: doctorSeleccionado },
        paciente: { id: pacienteId }, // Aquí usamos el ID del paciente logeado desde localStorage
      };

      reservarCita(nuevaCita)
        .then((response) => {
          alert("Cita creada con éxito.");
        })
        .catch((error) => {
          setError("Error al reservar la cita. Inténtalo de nuevo.");
          console.error("Error al reservar la cita:", error);
        });
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  return (
    <div>
      <HeaderPaciente />
      <div className="sacar-cita-container">
        
        {/* Selección de especialidad */}
        <div className="form-group">
          <label htmlFor="especialidad">Especialidad</label>
          <select
            id="especialidad"
            value={especialidadSeleccionada}
            onChange={handleEspecialidadChange}
          >
            <option value="">Selecciona una especialidad</option>
            {especialidades.map((especialidad) => (
              <option key={especialidad.id} value={especialidad.id}>
                {especialidad.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Selección de doctor */}
        {especialidadSeleccionada && (
          <div className="form-group">
            <label htmlFor="doctor">Doctor</label>
            <select
              id="doctor"
              value={doctorSeleccionado}
              onChange={handleDoctorChange}
            >
              <option value="">Selecciona un doctor</option>
              {doctores.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.nombreCompleto}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Selección de horario */}
        {doctorSeleccionado && (
          <div className="form-group">
            <label htmlFor="horario">Horario</label>
            <select
              id="horario"
              value={horarioSeleccionado}
              onChange={handleHorarioChange}
            >
              <option value="">Selecciona un horario</option>
              {horariosDisponibles.map((horario) => (
                <option key={horario.id} value={horario.id}>
                  {horario.fecha} - {horario.hora} - {horario.consultorio}
                </option>
              ))}
            </select>
          </div>
        )}

        <button onClick={handleSacarCita} className="sacar-cita-button">
          Reservar Cita
        </button>

        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default SacarCita;
