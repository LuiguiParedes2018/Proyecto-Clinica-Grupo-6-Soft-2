import React, { useState, useEffect } from "react";
import "./CrearHorario.css";
import HeaderDoctor from "../HeaderDoctor/HeaderDoctor.jsx";
import { createHorarioForDoctor } from "../../../servicios/horarioService"; 
import { useNavigate } from "react-router-dom";

function CrearHorario() {
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [consultorio, setConsultorio] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [minFecha, setMinFecha] = useState(""); // Estado para la fecha mínima
  const [minHora, setMinHora] = useState("");  // Estado para la hora mínima si es hoy
  const navigate = useNavigate();

  // Obtener el ID del doctor desde localStorage
  const doctorId = localStorage.getItem("doctorId");

  useEffect(() => {
    // Calcular la fecha mínima (día siguiente al día actual)
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // A partir del día siguiente

    // Formatear la fecha a "YYYY-MM-DD" para establecerla como valor mínimo
    const minFechaFormateada = tomorrow.toISOString().split("T")[0];
    setMinFecha(minFechaFormateada);
  }, []);

  // Crear Horario
  const confirmarHorario = async () => {
    if (!doctorId) {
      setError("No se pudo obtener el ID del doctor.");
      return;
    }

    try {
      const nuevoHorario = {
        fecha: fecha,
        hora: hora,
        consultorio: consultorio,
        doctor: { id: doctorId }, // Usar el doctorId desde localStorage
      };

      // Crear el horario
      const horarioResponse = await createHorarioForDoctor(nuevoHorario);
      if (horarioResponse.data) {
        alert("Horario creado correctamente.");
        setError(""); // Limpiar errores
        setSuccessMessage("Horario creado con éxito.");
      }
    } catch (err) {
      setError("Error al crear el horario. Inténtalo de nuevo.");
      console.error("Error al crear el horario:", err);
    }
  };

  // Verificar si la fecha seleccionada es el día actual y restringir la hora
  const handleFechaChange = (e) => {
    const selectedDate = e.target.value;
    setFecha(selectedDate);

    const today = new Date();
    const selectedDateObj = new Date(selectedDate);

    // Si la fecha seleccionada es hoy, establecer la hora mínima
    if (selectedDateObj.toDateString() === today.toDateString()) {
      const currentHour = today.toTimeString().split(" ")[0].slice(0, 5); // "HH:MM"
      setMinHora(currentHour);
    } else {
      setMinHora(""); // No restringir la hora si no es hoy
    }
  };

  const isFormValid = fecha && hora && consultorio;

  return (
    <div>
      <HeaderDoctor />
      <div className="crear-horario-container">
        <div className="input-box">
          <label htmlFor="fecha">Fecha</label>
          <input
            type="date"
            id="fecha"
            value={fecha}
            onChange={handleFechaChange}
            min={minFecha} // Establecer la fecha mínima
            required
          />
        </div>
        <div className="input-box">
          <label htmlFor="hora">Hora</label>
          <input
            type="time"
            id="hora"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            min={minHora} // Establecer la hora mínima si la fecha es hoy
            required
          />
        </div>
        <div className="input-box">
          <label htmlFor="consultorio">Consultorio</label>
          <select
            className="select-doctor"
            id="consultorio"
            value={consultorio}
            onChange={(e) => setConsultorio(e.target.value)}
            required
          >
            <option value="">Seleccione Consultorio</option>
            <option value="Consultorio 1">Consultorio 1</option>
            <option value="Consultorio 2">Consultorio 2</option>
            <option value="Consultorio 3">Consultorio 3</option>
          </select>
        </div>


        {successMessage && <p className="success-message">{successMessage}</p>}
        {/* Mostrar errores */}
        {error && <p className="error-message">{error}</p>}

        {/* Botón para crear el horario */}
        <button
          className="confirm-button"
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
