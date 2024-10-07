package com.clinica.ulisana_back.service;

import com.clinica.ulisana_back.entity.Doctor;
import com.clinica.ulisana_back.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    // CRUD basico

    public List<Doctor> findAll() {
        return doctorRepository.findAll();
    }

    public Optional<Doctor> findById(Long id) {
        return doctorRepository.findById(id);
    }

    public Doctor save(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    public void deleteById(Long id) {
        doctorRepository.deleteById(id);
    }

    // Métodos especificos

    public Optional<Doctor> findByCorreo(String correo) {
        return doctorRepository.findByCorreo(correo);
    }

    public Optional<Doctor> authenticateDoctor(String correo, String password) {
        Optional<Doctor> doctor = doctorRepository.findByCorreo(correo);
        if (doctor.isPresent() && doctor.get().getPassword().equals(password)) {
            return doctor;  // Las credenciales son correctas
        } else {
            return Optional.empty();  // Las credenciales no coinciden
        }
    }

    public List<Doctor> findByEspecialidadId(Long especialidadId) {
        return doctorRepository.findByEspecialidadId(especialidadId);
    }



}
