package com.clinica.ulisana_back.repository;

import com.clinica.ulisana_back.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    Optional<Doctor> findByCorreo(String correo);  // Para buscar por correo electrónico
    public List<Doctor> findByEspecialidadId(Long especialidadId);



}
