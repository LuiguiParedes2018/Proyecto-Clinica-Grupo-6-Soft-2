import React, { useState, useEffect } from "react";
import "./CrearHorario.css";
import HeaderDoctor from "../HeaderDoctor/HeaderDoctor.jsx";
import { createHorarioForDoctor } from "../../../servicios/horarioService"; 
import { useNavigate } from "react-router-dom";
import { getDoctorById } from "../../../servicios/doctorService"; // Servicio para obtener datos del doctor

function CrearHorario() {
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [consultorio, setConsultorio] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [minFecha, setMinFecha] = useState(""); // Estado para la fecha mínima
  const [minHora, setMinHora] = useState("");  // Estado para la hora mínima si es hoy
  const navigate = useNavigate();


  const [especialidad, setEspecialidad] = useState(""); // posible uso para llamar datos de medico

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

    if (doctorId) {
      getDoctorById(doctorId)
        .then((response) => {
          const especialidadNombre = response.data.especialidad?.nombre; // Accede al nombre de la especialidad
          setEspecialidad(especialidadNombre || "");
        })
        .catch((error) => {
          console.error("Error al obtener la especialidad del doctor: ", error);
        });
    }
  }, [doctorId]);

    
  // Crear Horario
  const confirmarHorario = async () => {
    if (!doctorId) {
      console.error("El ID del doctor no esta diponible")
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


  // Función que maneja el cambio de fecha
  const handleFechaChange = (e) => {
    const selectedDate = e.target.value;
    setFecha(selectedDate);

    const today = new Date();
    const selectedDateObj = new Date(selectedDate);

    const dayOfWeek = selectedDateObj.getDay(); // 0 - Domingo, 6 - Sábado

    // Si es sábado o domingo, mostrar el error y limpiar la fecha
    if (dayOfWeek === 5 || dayOfWeek === 6) {
        setError("No hay atención los sábados y domingos");
        setFecha(""); // Limpiar la fecha seleccionada
    } else {
        setError(""); // Limpiar el error si la fecha es válida
    }

    // Si la fecha seleccionada es hoy, establecer la hora mínima
    if (selectedDateObj.toDateString() === today.toDateString()) {
        const currentHour = today.toTimeString().split(" ")[0].slice(0, 5); // "HH:MM"
        setMinHora(currentHour);
    } else {
        setMinHora(""); // No restringir la hora si no es hoy
    }
};

// Funcion que maneja el cambio de hora
const handleHoraChange = (e) => {
  const selectedTime = e.target.value;
  setHora(selectedTime);

  // Establecer las restricciones de horario laboral
  const horaInicio = "08:00";
  const horaFin = "17:00";

  const [horaSeleccionada, minutosSeleccionados] = selectedTime.split(":");

  // Verificar si la hora seleccionada está dentro del rango laboral (8 AM - 5 PM)
  if (selectedTime < horaInicio || selectedTime > horaFin) {
    setError("La hora debe estar entre las 08:00 y las 17:00.");
    return;
  }

  // Verificar si los minutos están entre 00, 20 o 40
  if (![0, 20, 40].includes(parseInt(minutosSeleccionados))) {
    setError("Los minutos deben ser 00, 20 o 40.");
    return;
  }

  setError(""); // Limpiar error si la hora es válida
};


const calculateMinMaxDate = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1); // Para evitar seleccionar fechas anteriores a hoy
  const minDate = tomorrow.toISOString().split("T")[0]; // Establecer el min a mañana

  // Si hoy es viernes, aseguramos que no se seleccione sábado
  let maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 30); // Para asegurar que no haya selección de fechas pasadas

  return { minDate, maxDate: maxDate.toISOString().split("T")[0] };
};

//Consultorios
useEffect(() => {
  const { minDate, maxDate } = calculateMinMaxDate();
  document.getElementById("fecha").setAttribute("min", minDate);
  document.getElementById("fecha").setAttribute("max", maxDate);
}, []);


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

  const horasDisponibles = Array.from({ length: 10 }, (_, index) => {
    const hora = 8 + index;
    return `${hora < 10 ? "0" + hora : hora}:00`; // Generar formato 08:00, 09:00...
  });

  // Opciones de minutos (solo 00, 20, 40)
  const minutosDisponibles = ["00", "20", "40"];

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
        
        <div className="hora_minuto_container">
          <label htmlFor="hora" className="hora_texto">Hora</label>
          <div className="hora-select">
            <select
              className="hora_doctor"
              value={hora.split(":")[0]} // Tomamos solo la hora (sin minutos)
              onChange={(e) => setHora(`${e.target.value}:${hora.split(":")[1]}`)} 
            >
              {horasDisponibles.map((hora) => (
                <option key={hora} value={hora.split(":")[0]}>
                  {hora}
                </option>
              ))}
            </select>
            <select
              className="minutos_doctor"
              value={hora.split(":")[1]} // Tomamos solo los minutos
              onChange={(e) => setHora(`${hora.split(":")[0]}:${e.target.value}`)}
            >
              {minutosDisponibles.map((minuto) => (
                <option key={minuto} value={minuto}>
                  {minuto}
                </option>
              ))}
            </select>
            <h3>Hora de atencion de 8am a 5 pm</h3>
          </div>
          {error && <div className="error-message">{error}</div>}
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
            {getConsultorioOptiones()}
          </select>
        </div>


        {successMessage && <p className="success-message">{successMessage}</p>}
        {/* Mostrar errores */}
        {error && <p className="error-message">{error}</p>}

        {/* Mostrar mensaje si los campos no están completos */}
        {!isFormValid && !error && (
          <div className="warning-message" style={{ color: "orange" }}>
            Por favor, complete todos los campos.
          </div>
        )}

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