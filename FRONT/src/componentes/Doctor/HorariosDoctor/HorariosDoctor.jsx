import React, { useEffect, useState } from "react";
import "./HorariosDoctor.css";
import HeaderDoctor from "../HeaderDoctor/HeaderDoctor.jsx";
import { getHorariosByDoctor } from "../../../servicios/horarioService"; 

function HorariosDoctor() {
  const [horarios, setHorarios] = useState([]); // Estado para todos los horarios del doctor
  const [filteredHorarios, setFilteredHorarios] = useState([]); // Estado para los horarios filtrados
  const [filterYear, setFilterYear] = useState(""); // Estado para el año
  const [filterMonth, setFilterMonth] = useState(""); // Estado para el mes
  const [filterDay, setFilterDay] = useState(""); // Estado para el día

  useEffect(() => {
    // Obtener el ID del doctor desde localStorage
    const doctorId = localStorage.getItem("doctorId");

    if (!doctorId) {
      console.error("No se pudo obtener el ID del doctor desde localStorage.");
      return;
    }

    // Llamada a la API para obtener los horarios del doctor
    getHorariosByDoctor(doctorId)
      .then((response) => {
        setHorarios(response.data); // Guardar los horarios obtenidos
        setFilteredHorarios(response.data); // Mostrar todos los horarios inicialmente
      })
      .catch((error) => {
        console.error("Error al obtener los horarios:", error);
      });
  }, []);

  const handleFilter = () => {
    let filtered = horarios;

    // Filtrar por año
    if (filterYear) {
      filtered = filtered.filter((horario) => horario.fecha.startsWith(filterYear));
    }

    if (filterMonth) {
      const months = {
        enero: "01",
        febrero: "02",
        marzo: "03",
        abril: "04",
        mayo: "05",
        junio: "06",
        julio: "07",
        agosto: "08",
        septiembre: "09",
        octubre: "10",
        noviembre: "11",
        diciembre: "12",
      };

      const monthNumber = months[filterMonth.toLowerCase()];
      if (monthNumber) {
        filtered = filtered.filter((horario) => horario.fecha.includes(`-${monthNumber}-`));
      }
    }

    // Filtrar por día
    if (filterDay) {
      const formattedDay = filterDay.padStart(2, "0"); // Asegurar formato de dos dígitos
      filtered = filtered.filter((horario) => horario.fecha.endsWith(`-${formattedDay}`));
    }

    setFilteredHorarios(filtered);
  };

  return (
    <div>
      <HeaderDoctor />
      <div className="horarios-container">
        <h1>Tus horarios</h1>
        <div className="filtro-palabras">
          <div className="entrada">
          <label htmlFor="year">Año</label>
          <input
            type="text"
            id="year"
            placeholder="Año"
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
          />
          </div>
          <div className="entrada">
          <label htmlFor="month">Mes</label>
          <input
            type="text"
            id="month"
            placeholder="Mes"
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
          />
          </div>
          <div className="entrada">
          <label htmlFor="day">Dia</label>
          <input
            type="text"
            id="day"
            placeholder="Dia"
            value={filterDay}
            onChange={(e) => setFilterDay(e.target.value)}
          />
          </div>
          <button onClick={handleFilter} className="btn-buscar">Buscar</button>
        </div>
        {filteredHorarios.length === 0 ? (
          <p>No tienes horarios que coincidan con los filtros aplicados.</p>
        ) : (
          <ul className="lista-horarios">
            {filteredHorarios.map((horario, index) => (
              <li key={index} className="horario-item">
                <p><strong>Fecha: </strong> {horario.fecha}</p>
                <p><strong>Hora: </strong> {horario.hora}</p>
                <p><strong>Consultorio: </strong> {horario.consultorio}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default HorariosDoctor;
