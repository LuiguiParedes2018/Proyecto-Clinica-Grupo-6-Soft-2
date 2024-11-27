import React, { useState, useEffect } from "react";
import axios from "axios";
import CrearHorario from "../CrearHorario/CrearHorario";
import "./ListaDoctores.css";
import HeaderAdministrador from "../../Administrador/HeaderAdministrador/HeaderAdministrador.jsx";

import { getDoctores2 } from "../../../servicios/doctorService.js"; // Servicio para obtener datos del doctor
import { useNavigate } from "react-router-dom";

const ListaDoctores = () => {
    const [doctores, setDoctores] = useState([]);
    const [doctorSeleccionado, setDoctorSeleccionado] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchDoctores = async () => {
        try {
            const data = await getDoctores2();
            console.log("Datos obtenidos de la API:", data); // Verifica lo que devuelve la API
            setDoctores(Array.isArray(data) ? data : []); // Asegura que sea un array
          } catch (error) {
            console.error("Error al obtener doctores:", error); // Para debugging
            setError("No se pudo cargar la lista de doctores. Intente nuevamente.");
          }
      };
  
      fetchDoctores();
    }, []);
  
    const seleccionarDoctor = (doctor) => {
        console.log("Doctor seleccionado:", doctor);
        setDoctorSeleccionado(doctor);
        navigate(`/crearHorario/${doctor.id}`); // Redirige a CrearHorario con el doctorId
    };
  
    return (
        <div>
          <HeaderAdministrador />
          <h1>Gestión de Horarios</h1>
          {error && <p style={{ color: "red" }}>{error}</p>}
          
          
            
          {!doctorSeleccionado ? (
            <div className="lista-doctores-container">

              <h2>Seleccione un Doctor</h2>
              
              <div>
                <form>
              
              <ul className="lista-doctores">
                {doctores.map((doctor) => (
                  <li
                  key={doctor.id} // Usa la clave única (id)
                  onClick={() => seleccionarDoctor(doctor)} // Maneja el clic
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      doctorSeleccionado?.id === doctor.id ? "lightgray" : "white", // Resalta el doctor seleccionado
                  }}
                >
                  <strong>{doctor.nombreCompleto || "Nombre no disponible"}</strong>
                  <span>{doctor.especialidad?.nombre || "Especialidad no disponible"}</span>
                </li>
              ))}
            </ul>
            
          </form>
        </div>
      </div>
    ) : (
      // Cuando hay un doctor seleccionado, muestra el componente CrearHorario
      <CrearHorario doctorId={doctorSeleccionado.id} />
    )}
  </div>
);
};

export default ListaDoctores;