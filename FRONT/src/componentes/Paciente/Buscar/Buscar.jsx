import React, { useState, useEffect } from "react";
import "./Buscar.css";
import HeaderPaciente from "../HeaderPaciente/HeaderPaciente";

function Buscar() {
  const [doctores, setDoctores] = useState([]);  
  const [busqueda, setBusqueda] = useState("");  
  const [doctoresFiltrados, setDoctoresFiltrados] = useState([]); 

  useEffect(() => {
    fetch("/doctores.json") 
      .then((response) => response.json())
      .then((data) => {
        setDoctores(data);         
        setDoctoresFiltrados(data); 
      })
      .catch((error) => console.error("Error al cargar los doctores:", error));
  }, []);

  const handleBusquedaChange = (event) => {
    setBusqueda(event.target.value); 
  };

  const handleBuscarClick = () => {
    if (busqueda === "") {
      setDoctoresFiltrados(doctores); 
    } else {
      const filtrados = doctores.filter((doctor) =>
        doctor.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        doctor.especialidad.toLowerCase().includes(busqueda.toLowerCase())
      );
      setDoctoresFiltrados(filtrados); 
    }

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
                  src={doctor.imagen}
                  alt={`Foto de ${doctor.nombre}`}
                  className="doctor-imagen"
                />
                <div className="doctor-detalles">
                  <h2>{doctor.nombre}</h2>
                  <p><strong>Especialidad:</strong> {doctor.especialidad}</p>
                  <p>{doctor.bio}</p>
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

