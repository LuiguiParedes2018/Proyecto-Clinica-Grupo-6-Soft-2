import axios from 'axios';

const API_URL = 'http://localhost:8080/api/doctor';

// Registrar un nuevo doctor
export const registerDoctor = (doctor) => {
  return axios.post(`${API_URL}/register`, doctor);
};

// Login de doctor
export const loginDoctor = (correo, password) => {
  return axios.post(`${API_URL}/login`, { correo, password });
};

// Obtener todos los doctores
export const getDoctores = () => {
  return axios.get(API_URL);
};

// Obtener un doctor por ID
export const getDoctorById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

// Obtener doctores por especialidad
export const getDoctoresByEspecialidad = (especialidadId) => {
  return axios.get(`${API_URL}/especialidad/${especialidadId}`);
};

// Actualizar un doctor
export const updateDoctor = (id, doctor) => {
  return axios.put(`${API_URL}/${id}`, doctor);
};

// Eliminar un doctor
export const deleteDoctor = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
