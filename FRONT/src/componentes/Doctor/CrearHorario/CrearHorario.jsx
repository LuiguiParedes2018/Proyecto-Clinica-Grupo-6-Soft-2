import React, { useState, useEffect } from "react";
import "./CrearHorario.css"; // El archivo de CSS mantiene su nombre.
import HeaderDoctor from "../HeaderDoctor/HeaderDoctor.jsx";
import { createHorarioForDoctor } from "../../../servicios/horarioService"; 
import { useNavigate } from "react-router-dom";
import { getDoctorById } from "../../../servicios/doctorService";

function CrearHorario() {
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [consultorio, setConsultorio] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [minFecha, setMinFecha] = useState("");
  const [minHora, setMinHora] = useState("");
  const navigate = useNavigate();

  const [especialidad, setEspecialidad] = useState("");

  const doctorId = localStorage.getItem("doctorId");

  useEffect(() => {
    // Calcular la fecha mínima -- día siguiente al día actual
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const minFechaFormateada = tomorrow.toISOString().split("T")[0];
    setMinFecha(minFechaFormateada);

    if (doctorId) {
      getDoctorById(doctorId)
        .then((response) => {
          const especialidadNombre = response.data.especialidad?.nombre;
          setEspecialidad(especialidadNombre || "");
        })
        .catch((error) => {
          console.error("Error al obtener la especialidad del doctor: ", error);
        });
    }
  }, [doctorId]);

  const confirmarHorario = async () => {
    if (!doctorId) {
      console.error("El ID del doctor no está disponible");
      setError("No se pudo obtener el ID del doctor.");
      return;
    }

    try {
      const nuevoHorario = {
        fecha: fecha,
        hora: hora,
        consultorio: consultorio,
        doctor: { id: doctorId },
      };

      const horarioResponse = await createHorarioForDoctor(nuevoHorario);
      if (horarioResponse.data) {
        alert("Horario creado correctamente.");
        setError("");
        setSuccessMessage("Horario creado con éxito.");
      }
    } catch (err) {
      setError("Error al crear el horario. Inténtalo de nuevo.");
      console.error("Error al crear el horario:", err);
    }
  };

  // Verificar si la fecha seleccionada es el día actual - restriccion
  const handleFechaChange = (e) => {
    const selectedDate = e.target.value;
    setFecha(selectedDate);

    const today = new Date();
    const selectedDateObj = new Date(selectedDate);

    // Si la fecha seleccionada es hoy, se establecera la hora minima
    if (selectedDateObj.toDateString() === today.toDateString()) {
      const currentHour = today.toTimeString().split(" ")[0].slice(0, 5);
      setMinHora(currentHour);
    } else {
      setMinHora("");
    }
  };

  const getConsultorioOptiones = () => {
    if (!especialidad) {
      return <option value="">Cargando consultorios...</option>;
    }
    return (
      <>
        <option value={`${especialidad} 1`}>{`${especialidad} 1`}</option>
        <option value={`${especialidad} 2`}>{`${especialidad} 2`}</option>
      </>
    );
  };

  const isFormValid = fecha && hora && consultorio;

  return (
    <div>
      <HeaderDoctor />
      <div className="schedule-form-container">
        <div className="field-box">
          <label htmlFor="fecha">Fecha</label>
          <input
            type="date"
            id="fecha"
            value={fecha}
            onChange={handleFechaChange}
            min={minFecha}
            required
          />
        </div>
        <div className="field-box">
          <label htmlFor="hora">Hora</label>
          <input
            type="time"
            id="hora"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            min={minHora}
            required
          />
        </div>
        <div className="field-box">
          <label htmlFor="consultorio">Consultorio</label>
          <select
            className="select-room"
            id="consultorio"
            value={consultorio}
            onChange={(e) => setConsultorio(e.target.value)}
            required
          >
            <option value="">Seleccione Consultorio</option>
            {getConsultorioOptiones()}
          </select>
        </div>

        {successMessage && <p className="success-message">{successMessage}</p>}
        {error && <p className="error-message">{error}</p>}

        <button
          className="submit-button"
          onClick={confirmarHorario}
          disabled={!isFormValid}
        >
          Crear Horario
        </button>
      </div>
    </div>
  );
}

export default CrearHorario;
