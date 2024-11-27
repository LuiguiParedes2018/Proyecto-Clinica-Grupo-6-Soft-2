package com.clinica.ulisana_back.service;

import com.clinica.ulisana_back.entity.Calificacion;
import com.clinica.ulisana_back.entity.Doctor;
import com.clinica.ulisana_back.entity.Paciente;
import com.clinica.ulisana_back.repository.CalificacionRepository;
import com.clinica.ulisana_back.repository.DoctorRepository;
import com.clinica.ulisana_back.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CalificacionService {

    @Autowired
    private CalificacionRepository calificacionRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PacienteRepository pacienteRepository;

    // Registrar o actualizar una calificación
    public Calificacion calificarDoctor(Long doctorId, Long pacienteId, int puntaje) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new IllegalArgumentException("Doctor no encontrado"));

        Paciente paciente = pacienteRepository.findById(pacienteId)
                .orElseThrow(() -> new IllegalArgumentException("Paciente no encontrado"));

        // Buscar una calificación existente
        Calificacion calificacion = calificacionRepository.findByDoctorIdAndPacienteId(doctorId, pacienteId)
                .orElseGet(() -> {
                    Calificacion nueva = new Calificacion();
                    nueva.setDoctor(doctor);
                    nueva.setPaciente(paciente);
                    return nueva;
                });

        // Actualizar la calificación
        calificacion.setPuntaje(puntaje);
        calificacion.setFechaCalificacion(LocalDateTime.now());

        return calificacionRepository.save(calificacion);
    }

    // Obtener todas las calificaciones de un doctor
    public List<Calificacion> obtenerCalificacionesPorDoctor(Long doctorId) {
        return calificacionRepository.findByDoctorId(doctorId);
    }

    // Obtener el promedio de calificaciones de un doctor
    public double obtenerPromedioCalificacion(Long doctorId) {
        List<Calificacion> calificaciones = calificacionRepository.findByDoctorId(doctorId);

        if (calificaciones.isEmpty()) {
            return 0.0;
        }

        return calificaciones.stream().mapToInt(Calificacion::getPuntaje).average().orElse(0.0);
    }
}
