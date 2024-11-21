package com.clinica.ulisana_back.service;

import com.clinica.ulisana_back.entity.Cita;
import com.clinica.ulisana_back.repository.CitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CitaService {

    @Autowired
    private CitaRepository citaRepository;

    // CRUD basico

    public List<Cita> findAll() {
        return citaRepository.findAll();
    }

    public Optional<Cita> findById(Long id) {
        return citaRepository.findById(id);
    }

    public Cita save(Cita cita) {
        return citaRepository.save(cita);
    }

    public void deleteById(Long id) {
        citaRepository.deleteById(id);
    }

    // Métodos específicos

    public List<Cita> findByDoctorId(Long doctorId) {
        return citaRepository.findByDoctorId(doctorId);
    }

    public List<Cita> findByPacienteId(Long pacienteId) {
        return citaRepository.findByPacienteId(pacienteId);
    }

    public Optional<Cita> findByHorarioId(Long horarioId) {
        return citaRepository.findByHorarioId(horarioId);
    }

    public Cita marcarCitaComoPagada(Long citaId) {
        Optional<Cita> citaOptional = citaRepository.findById(citaId);

        if (citaOptional.isPresent()) {
            Cita cita = citaOptional.get();
            cita.setCitaPagada(true);
            return citaRepository.save(cita); // Actualizar en la base de datos
        } else {
            throw new RuntimeException("La cita con ID " + citaId + " no fue encontrada.");
        }
    }
}
