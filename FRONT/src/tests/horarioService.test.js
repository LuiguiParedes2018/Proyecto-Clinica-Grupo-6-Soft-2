import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { 
  createHorarioForDoctor, 
  getHorarios, 
  getHorarioById, 
  getHorariosByDoctor, 
  getHorariosByEspecialidad, 
  updateHorario, 
  deleteHorario 
} from '../../src/servicios/horarioService.js';

describe('horarioService', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios); // Inicializar el mock de Axios
  });

  afterEach(() => {
    mock.reset(); // Limpiar el mock después de cada prueba
  });

  // Prueba para createHorarioForDoctor
  it('debería crear un nuevo horario para un doctor', async () => {
    const horario = { doctorId: 1, dia: '2024-12-10', horaInicio: '10:00', horaFin: '12:00' };
    const response = { id: 1, ...horario };

    mock.onPost('http://localhost:8080/api/horario/doctor/create').reply(201, response);

    const result = await createHorarioForDoctor(horario);

    expect(result.status).toBe(201);
    expect(result.data).toEqual(response);
  });

  // Prueba para getHorarios
  it('debería obtener todos los horarios', async () => {
    const horarios = [
      { id: 1, doctorId: 1, dia: '2024-12-10', horaInicio: '10:00', horaFin: '12:00' },
      { id: 2, doctorId: 2, dia: '2024-12-11', horaInicio: '14:00', horaFin: '16:00' },
    ];

    mock.onGet('http://localhost:8080/api/horario').reply(200, horarios);

    const result = await getHorarios();

    expect(result.status).toBe(200);
    expect(result.data).toEqual(horarios);
  });

  // Prueba para getHorarioById
  it('debería obtener un horario por ID', async () => {
    const horario = { id: 1, doctorId: 1, dia: '2024-12-10', horaInicio: '10:00', horaFin: '12:00' };

    mock.onGet('http://localhost:8080/api/horario/1').reply(200, horario);

    const result = await getHorarioById(1);

    expect(result.status).toBe(200);
    expect(result.data).toEqual(horario);
  });

  // Prueba para getHorariosByDoctor
  it('debería obtener horarios por doctor', async () => {
    const horarios = [
      { id: 1, doctorId: 1, dia: '2024-12-10', horaInicio: '10:00', horaFin: '12:00' },
    ];

    mock.onGet('http://localhost:8080/api/horario/doctor/1').reply(200, horarios);

    const result = await getHorariosByDoctor(1);

    expect(result.status).toBe(200);
    expect(result.data).toEqual(horarios);
  });

  // Prueba para getHorariosByEspecialidad
  it('debería obtener horarios por especialidad', async () => {
    const horarios = [
      { id: 1, especialidadId: 1, dia: '2024-12-10', horaInicio: '10:00', horaFin: '12:00' },
    ];

    mock.onGet('http://localhost:8080/api/horario/especialidad/1').reply(200, horarios);

    const result = await getHorariosByEspecialidad(1);

    expect(result.status).toBe(200);
    expect(result.data).toEqual(horarios);
  });

  // Prueba para updateHorario
  it('debería actualizar un horario correctamente', async () => {
    const horario = { doctorId: 1, dia: '2024-12-10', horaInicio: '10:00', horaFin: '12:00' };
    const response = { id: 1, ...horario };

    mock.onPut('http://localhost:8080/api/horario/1').reply(200, response);

    const result = await updateHorario(1, horario);

    expect(result.status).toBe(200);
    expect(result.data).toEqual(response);
  });

  // Prueba para deleteHorario
  it('debería eliminar un horario correctamente', async () => {
    mock.onDelete('http://localhost:8080/api/horario/1').reply(200);

    const result = await deleteHorario(1);

    expect(result.status).toBe(200);
  });
});
