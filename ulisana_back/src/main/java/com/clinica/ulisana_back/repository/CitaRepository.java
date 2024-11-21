package com.clinica.ulisana_back.repository;

import com.clinica.ulisana_back.entity.Cita;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface CitaRepository extends JpaRepository<Cita, Long> {
    List<Cita> findByDoctorId(Long doctorId);
    List<Cita> findByPacienteId(Long pacienteId);
    Optional<Cita> findByHorarioId(Long horarioId);

    // Nuevo: Obtener citas pagadas de un doctor
    List<Cita> findByDoctorIdAndCitaPagadaTrue(Long doctorId);
}
