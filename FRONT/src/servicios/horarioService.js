import axios from 'axios';

const API_URL = 'http://localhost:8080/api/horario';

// Crear un nuevo horario para un doctor
export const createHorarioForDoctor = (horario) => {
  return axios.post(`${API_URL}/doctor/create`, horario);
};

// Obtener todos los horarios
export const getHorarios = () => {
  return axios.get(API_URL);
};

// Obtener un horario por ID
export const getHorarioById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

// Obtener horarios por doctor
export const getHorariosByDoctor = (doctorId) => {
  return axios.get(`${API_URL}/doctor/${doctorId}`);
};

// Obtener horarios por especialidad
export const getHorariosByEspecialidad = (especialidadId) => {
  return axios.get(`${API_URL}/especialidad/${especialidadId}`);
};

// Actualizar un horario
export const updateHorario = (id, horario) => {
  return axios.put(`${API_URL}/${id}`, horario);
};

// Eliminar un horario
export const deleteHorario = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};



