import axios from 'axios';

const API_URL = 'http://localhost:8080/api/administrador';

// Registrar un nuevo administrador
export const registerAdministrador = (administrador) => {
  return axios.post(`${API_URL}`, administrador);
};

// Login de administrador
export const loginAdministrador = (correo, password) => {
  return axios.post(`${API_URL}/login`, { correo, password });
};

// Obtener todos los administradores
export const getAdministradores = () => {
  return axios.get(API_URL);
};

// Obtener un administrador por ID
export const getAdministradorById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

// Actualizar un administrador
export const updateAdministrador = (id, administrador) => {
  return axios.put(`${API_URL}/${id}`, administrador);
};

// Eliminar un administrador
export const deleteAdministrador = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};


