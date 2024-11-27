package com.clinica.ulisana_back.repository;

import com.clinica.ulisana_back.entity.Calificacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CalificacionRepository extends JpaRepository<Calificacion, Long> {

    // Obtener todas las calificaciones de un doctor por su ID
    List<Calificacion> findByDoctorId(Long doctorId);

    Optional<Calificacion> findByDoctorIdAndPacienteId(Long doctorId, Long pacienteId);
}
