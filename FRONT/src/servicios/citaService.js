import axios from 'axios';

const API_URL = 'http://localhost:8080/api/cita';

// Crear una cita
export const reservarCita = (cita) => {
  return axios.post(`${API_URL}/paciente/reservar`, cita);
};

// Obtener todas las citas
export const getCitas = () => {
  return axios.get(API_URL);
};

// Obtener una cita por ID
export const getCitaById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

// Obtener citas por doctor
export const getCitasByDoctorId = (doctorId) => {
  return axios.get(`${API_URL}/doctor/${doctorId}`);
};

// Obtener citas por paciente
export const getCitasByPacienteId = (pacienteId) => {
  return axios.get(`${API_URL}/paciente/${pacienteId}`);
};

// Actualizar una cita
export const updateCita = (id, cita) => {
  return axios.put(`${API_URL}/${id}`, cita);
};

// Eliminar una cita
export const deleteCita = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

// Marcar una cita como pagada
export const marcarCitaComoPagada = (id) => {
  return axios.put(`${API_URL}/${id}/marcar-pagada`);
};
