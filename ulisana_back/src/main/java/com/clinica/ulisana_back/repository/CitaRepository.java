package com.clinica.ulisana_back.repository;

import com.clinica.ulisana_back.entity.Cita;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CitaRepository extends JpaRepository<Cita, Long> {
    List<Cita> findByDoctorId(Long doctorId);  // Obtener todas las citas de un doctor
    List<Cita> findByPacienteId(Long pacienteId);  // Obtener todas las citas de un paciente
}
