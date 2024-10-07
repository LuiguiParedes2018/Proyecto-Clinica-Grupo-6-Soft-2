package com.clinica.ulisana_back.service;

import com.clinica.ulisana_back.entity.Horario;
import com.clinica.ulisana_back.repository.HorarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HorarioService {

    @Autowired
    private HorarioRepository horarioRepository;

    // CRUD basico

    public List<Horario> findAll() {
        return horarioRepository.findAll();
    }

    public Optional<Horario> findById(Long id) {
        return horarioRepository.findById(id);
    }

    public Horario save(Horario horario) {
        return horarioRepository.save(horario);
    }

    public void deleteById(Long id) {
        horarioRepository.deleteById(id);
    }

    // Metodo especifico

    public List<Horario> findByDoctorId(Long doctorId) {
        return horarioRepository.findByDoctorId(doctorId);
    }

    public List<Horario> findByEspecialidad(Long especialidadId) {
        return horarioRepository.findHorariosByEspecialidad(especialidadId);
    }

    public List<Horario> findByDoctor(Long doctorId) {
        return horarioRepository.findByDoctorId(doctorId);
    }

}
