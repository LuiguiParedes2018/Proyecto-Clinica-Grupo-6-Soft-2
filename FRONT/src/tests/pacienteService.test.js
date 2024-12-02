import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { 
  registerPaciente, 
  loginPaciente, 
  getPacientes, 
  getPacienteById, 
  updatePaciente, 
  deletePaciente 
} from '../../src/servicios/pacienteService.js';

describe('pacienteService', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios); // Inicializar el mock de Axios
  });

  afterEach(() => {
    mock.reset(); // Limpiar el mock después de cada prueba
  });

  // Prueba para registerPaciente
  it('debería registrar un nuevo paciente', async () => {
    const paciente = { nombre: 'Juan Pérez', correo: 'juan@example.com', password: '123456' };
    const response = { id: 1, ...paciente };

    mock.onPost('http://localhost:8080/api/paciente/register').reply(201, response);

    const result = await registerPaciente(paciente);

    expect(result.status).toBe(201);
    expect(result.data).toEqual(response);
  });

  // Prueba para loginPaciente
  it('debería realizar login de un paciente correctamente', async () => {
    const loginData = { correo: 'juan@example.com', password: '123456' };
    const response = { token: 'abcd1234', pacienteId: 1 };

    mock.onPost('http://localhost:8080/api/paciente/login').reply(200, response);

    const result = await loginPaciente(loginData.correo, loginData.password);

    expect(result.status).toBe(200);
    expect(result.data).toEqual(response);
  });

  // Prueba para getPacientes
  it('debería obtener todos los pacientes', async () => {
    const pacientes = [
      { id: 1, nombre: 'Juan Pérez', correo: 'juan@example.com' },
      { id: 2, nombre: 'Ana García', correo: 'ana@example.com' },
    ];

    mock.onGet('http://localhost:8080/api/paciente').reply(200, pacientes);

    const result = await getPacientes();

    expect(result.status).toBe(200);
    expect(result.data).toEqual(pacientes);
  });

  // Prueba para getPacienteById
  it('debería obtener un paciente por ID', async () => {
    const paciente = { id: 1, nombre: 'Juan Pérez', correo: 'juan@example.com' };

    mock.onGet('http://localhost:8080/api/paciente/1').reply(200, paciente);

    const result = await getPacienteById(1);

    expect(result.status).toBe(200);
    expect(result.data).toEqual(paciente);
  });

  // Prueba para updatePaciente
  it('debería actualizar un paciente correctamente', async () => {
    const paciente = { nombre: 'Juan Pérez', correo: 'juan@example.com' };
    const response = { id: 1, ...paciente };

    mock.onPut('http://localhost:8080/api/paciente/1').reply(200, response);

    const result = await updatePaciente(1, paciente);

    expect(result.status).toBe(200);
    expect(result.data).toEqual(response);
  });

  // Prueba para deletePaciente
  it('debería eliminar un paciente correctamente', async () => {
    mock.onDelete('http://localhost:8080/api/paciente/1').reply(200);

    const result = await deletePaciente(1);

    expect(result.status).toBe(200);
  });
});
