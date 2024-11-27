import axios from 'axios';

const API_URL = 'http://localhost:8080/api/paciente';

// Registrar un nuevo paciente
export const registerPaciente = (paciente) => {
  return axios.post(`${API_URL}/register`, paciente);
};

// Login de paciente
export const loginPaciente = (correo, password) => {
  return axios.post(`${API_URL}/login`, { correo, password });
};

// Obtener todos los pacientes
export const getPacientes = () => {
  return axios.get(API_URL);
};

// Obtener un paciente por ID
export const getPacienteById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

// Actualizar un paciente
export const updatePaciente = (id, paciente) => {
  return axios.put(`${API_URL}/${id}`, paciente);
};

// Eliminar un paciente
export const deletePaciente = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};



