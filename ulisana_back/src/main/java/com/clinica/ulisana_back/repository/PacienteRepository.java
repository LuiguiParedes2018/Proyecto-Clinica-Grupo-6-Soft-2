package com.clinica.ulisana_back.repository;

import com.clinica.ulisana_back.entity.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PacienteRepository extends JpaRepository<Paciente, Long> {
    Optional<Paciente> findByCorreo(String correo);  // Para buscar por correo electrónico
}


