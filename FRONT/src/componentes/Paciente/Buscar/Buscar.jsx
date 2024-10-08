import React, { useState, useEffect } from "react";
import "./Buscar.css";
import HeaderPaciente from "../HeaderPaciente/HeaderPaciente";
import { getDoctores } from "../../../servicios/doctorService"; // Importar el servicio para obtener doctores

function Buscar() {
  const [doctores, setDoctores] = useState([]);  
  const [busqueda, setBusqueda] = useState("");  
  const [doctoresFiltrados, setDoctoresFiltrados] = useState([]); 

  useEffect(() => {
    // Utiliza el servicio getDoctores para obtener los doctores desde la API
    getDoctores()
      .then((response) => {
        setDoctores(response.data); // Guardar los doctores obtenidos
        setDoctoresFiltrados(response.data); // Iniciar con todos los doctores
      })
      .catch((error) => console.error("Error al cargar los doctores:", error));
  }, []);

  const handleBusquedaChange = (event) => {
    setBusqueda(event.target.value); 
  };

  const handleBuscarClick = () => {
    if (busqueda === "") {
      setDoctoresFiltrados(doctores); // Si la búsqueda está vacía, muestra todos los doctores
    } else {
      // Filtrar doctores por nombre o especialidad
      const filtrados = doctores.filter((doctor) =>
        doctor.nombreCompleto.toLowerCase().includes(busqueda.toLowerCase()) || 
        doctor.especialidad.nombre.toLowerCase().includes(busqueda.toLowerCase())
      );
      setDoctoresFiltrados(filtrados); // Actualizar la lista filtrada
    }

    // Hacer scroll a la lista de doctores si existe
    const doctorList = document.querySelector(".doctor-list");
    if (doctorList) {
      doctorList.scrollIntoView({ behavior: "smooth" });
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
          <button onClick={handleBuscarClick} className="buscar-button">Buscar</button>
        </div>

        <div className="doctor-list">
          {doctoresFiltrados.length > 0 ? (
            doctoresFiltrados.map((doctor) => (
              <div key={doctor.id} className="doctor-card">
                <img
                  src={doctor.imagen} // Asegúrate de tener la URL de la imagen en el backend
                  alt={`Foto de ${doctor.nombreCompleto}`}
                  className="doctor-imagen"
                />
                <div className="doctor-detalles">
                  <h2>{doctor.nombreCompleto}</h2>
                  <p><strong>Especialidad:</strong> {doctor.especialidad.nombre}</p>
                  <p>{doctor.bio}</p> {/* Si tienes una descripción del doctor */}
                  <button className="ver-perfil-button">Ver Perfil</button>
                </div>
              </div>
            ))
          ) : (
            <p>No se encontraron doctores.</p>
          )}
        </div>
      </div> {/* Cierre del contenedor principal */}
    </div>
  );
}

export default Buscar;
