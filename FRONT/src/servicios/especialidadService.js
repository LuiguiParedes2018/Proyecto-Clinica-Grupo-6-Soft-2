import axios from 'axios';

const API_URL = 'http://localhost:8080/api/especialidad';

// Obtener todas las especialidades
export const getEspecialidades = () => {
  return axios.get(API_URL);
};

// Obtener una especialidad por ID
export const getEspecialidadById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

// Crear una nueva especialidad
export const createEspecialidad = (especialidad) => {
  return axios.post(API_URL, especialidad);
};

// Actualizar una especialidad
export const updateEspecialidad = (id, especialidad) => {
  return axios.put(`${API_URL}/${id}`, especialidad);
};

// Eliminar una especialidad
export const deleteEspecialidad = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
