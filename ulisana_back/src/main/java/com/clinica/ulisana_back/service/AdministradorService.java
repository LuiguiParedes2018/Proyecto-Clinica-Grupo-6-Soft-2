package com.clinica.ulisana_back.service;

import com.clinica.ulisana_back.entity.Administrador;
import com.clinica.ulisana_back.entity.Doctor;
import com.clinica.ulisana_back.entity.Paciente;
import com.clinica.ulisana_back.repository.AdministradorRepository;
import com.clinica.ulisana_back.repository.DoctorRepository;
import com.clinica.ulisana_back.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdministradorService {

    @Autowired
    private AdministradorRepository administradorRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PacienteRepository pacienteRepository;

    // Métodos para la entidad Administrador

    public List<Administrador> findAllAdministradores() {
        return administradorRepository.findAll();
    }

    public Optional<Administrador> findAdministradorById(Long id) {
        return administradorRepository.findById(id);
    }

    public Optional<Administrador> findAdministradorByCorreo(String correo) {
        return administradorRepository.findByCorreo(correo);
    }

    public Administrador saveAdministrador(Administrador administrador) {
        return administradorRepository.save(administrador);
    }

    public void deleteAdministradorById(Long id) {
        administradorRepository.deleteById(id);
    }

    public boolean existsAdministradorByCorreo(String correo) {
        return administradorRepository.existsByCorreo(correo);
    }

    // Métodos para gestionar cuentas de pacientes

    public List<Paciente> findAllPacientes() {
        return pacienteRepository.findAll();
    }

    public Optional<Paciente> findPacienteById(Long id) {
        return pacienteRepository.findById(id);
    }

    public Paciente savePaciente(Paciente paciente) {
        return pacienteRepository.save(paciente);
    }

    public void deletePacienteById(Long id) {
        pacienteRepository.deleteById(id);
    }

    // Métodos para gestionar cuentas de doctores

    public List<Doctor> findAllDoctores() {
        return doctorRepository.findAll();
    }

    public Optional<Doctor> findDoctorById(Long id) {
        return doctorRepository.findById(id);
    }

    public Doctor saveDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    public void deleteDoctorById(Long id) {
        doctorRepository.deleteById(id);
    }
}
