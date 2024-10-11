package com.clinica.ulisana_back.service;

import com.clinica.ulisana_back.entity.Paciente;
import com.clinica.ulisana_back.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PacienteService {

    @Autowired
    private PacienteRepository pacienteRepository;

    // CRUD basico

    public List<Paciente> findAll() {
        return pacienteRepository.findAll();
    }

    public Optional<Paciente> findById(Long id) {
        return pacienteRepository.findById(id);
    }

    public Paciente save(Paciente paciente) {
        return pacienteRepository.save(paciente);
    }

    public void deleteById(Long id) {
        pacienteRepository.deleteById(id);
    }

    // Metodo especifico

    public Optional<Paciente> findByCorreo(String correo) {
        return pacienteRepository.findByCorreo(correo);
    }

    public Optional<Paciente> authenticatePaciente(String correo, String password) {
        Optional<Paciente> paciente = pacienteRepository.findByCorreo(correo);
        if (paciente.isPresent() && paciente.get().getPassword().equals(password)) {
            return paciente;
        } else {
            return Optional.empty();
        }
    }

}
