import axios from 'axios';

const API_URL = 'http://localhost:8080/api/paciente';

// Registrar paciente
export const registerPaciente = (paciente) => {
  return axios.post(`${API_URL}/register`, paciente);
};

// Login de paciente
export const loginPaciente = (correo, password) => {
  return axios.post(`${API_URL}/login`, { correo, password });
};

// Obtener pacientes
export const getPacientes = () => {
  return axios.get(API_URL);
};

