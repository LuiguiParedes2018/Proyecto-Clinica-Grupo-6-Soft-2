import React, { useState, useEffect } from "react";
import "./SacarCita.css";
import HeaderPaciente from "../HeaderPaciente/HeaderPaciente";

function SacarCita() {
  const [doctores, setDoctores] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState("");
  const [doctorSeleccionado, setDoctorSeleccionado] = useState("");
  const [horarioSeleccionado, setHorarioSeleccionado] = useState("");
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);

  // Cargar los doctores desde el JSON
  useEffect(() => {
    fetch("/doctores.json")
      .then((response) => response.json())
      .then((data) => {
        setDoctores(data);
        // Obtener especialidades únicas
        const especialidadesUnicas = [...new Set(data.map((doctor) => doctor.especialidad))];
        setEspecialidades(especialidadesUnicas);
      })
      .catch((error) => console.error("Error al cargar los doctores:", error));
  }, []);

  // Manejar el cambio de especialidad seleccionada
  const handleEspecialidadChange = (event) => {
    setEspecialidadSeleccionada(event.target.value);
    setDoctorSeleccionado(""); // Reiniciar el doctor cuando cambia la especialidad
  };

  // Manejar el cambio de doctor seleccionado
  const handleDoctorChange = (event) => {
    const doctorId = event.target.value;
    setDoctorSeleccionado(doctorId);
    // Aquí puedes definir los horarios disponibles para este doctor
    setHorariosDisponibles(["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"]); // Puedes cambiar esto por datos reales.
  };

  // Manejar el cambio de horario
  const handleHorarioChange = (event) => {
    setHorarioSeleccionado(event.target.value);
  };

  const handleSacarCita = () => {
    if (especialidadSeleccionada && doctorSeleccionado && horarioSeleccionado) {
      alert(`Cita creada con éxito para el Doctor ID: ${doctorSeleccionado} a las ${horarioSeleccionado}`);
      // Aquí podrías hacer una llamada POST para guardar la cita en la base de datos.
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  const doctoresFiltrados = doctores.filter(
    (doctor) => doctor.especialidad === especialidadSeleccionada
  );

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
            {especialidades.map((especialidad, index) => (
              <option key={index} value={especialidad}>
                {especialidad}
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
              {doctoresFiltrados.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.nombre}
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
              {horariosDisponibles.map((horario, index) => (
                <option key={index} value={horario}>
                  {horario}
                </option>
              ))}
            </select>
          </div>
        )}

        <button onClick={handleSacarCita} className="sacar-cita-button">
          Reservar Cita
        </button>
      </div>
    </div>
  );
}

export default SacarCita;
