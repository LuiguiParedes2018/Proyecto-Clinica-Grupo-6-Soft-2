// src/servicios/calificacionService.js

import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/calificaciones"; // Cambia por tu URL base si es diferente

export const enviarCalificacion = (doctorId, pacienteId, puntaje) => {
    return axios.post(`${API_BASE_URL}/doctor/${doctorId}/paciente/${pacienteId}`, null, {
      params: { puntaje },
    });
  };

// Obtener el promedio de calificaciones de un doctor
export const getPromedioCalificacion = (doctorId) => {
  return axios.get(`${API_BASE_URL}/doctor/${doctorId}/promedio`);
};
