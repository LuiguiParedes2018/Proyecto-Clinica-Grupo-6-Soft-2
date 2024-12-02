import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { reservarCita, getCitas, marcarCitaComoPagada } from '../../src/servicios/citaService.js';


describe('citaService', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios); // Inicializar el mock de Axios
  });

  afterEach(() => {
    mock.reset(); // Limpiar el mock después de cada prueba
  });

  // Prueba para reservarCita
  it('debería reservar una cita correctamente', async () => {
    const cita = { pacienteId: 1, doctorId: 2, fecha: '2024-12-10T10:00:00' };
    const response = { id: 1, ...cita };

    mock.onPost('http://localhost:8080/api/cita/paciente/reservar').reply(201, response);

    const result = await reservarCita(cita);

    expect(result.status).toBe(201);
    expect(result.data).toEqual(response);
  });
  it('debería marcar una cita como pagada correctamente', async () => {
    const citaId = 1;

    mock.onPut(`http://localhost:8080/api/cita/${citaId}/marcar-pagada`).reply(200, { success: true });

    const result = await marcarCitaComoPagada(citaId);
    
    expect(result.status).toBe(200);
    expect(result.data).toEqual({ success: true });
  });

  // Prueba para getCitas
  it('debería obtener todas las citas', async () => {
    const citas = [
      { id: 1, pacienteId: 1, doctorId: 2, fecha: '2024-12-10T10:00:00' },
      { id: 2, pacienteId: 3, doctorId: 4, fecha: '2024-12-11T15:30:00' },
    ];

    mock.onGet('http://localhost:8080/api/cita').reply(200, citas);

    const result = await getCitas();

    expect(result.status).toBe(200);
    expect(result.data).toEqual(citas);
  });
});
