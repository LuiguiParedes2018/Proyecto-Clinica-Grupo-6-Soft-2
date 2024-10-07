package com.clinica.ulisana_back.repository;

import com.clinica.ulisana_back.entity.Horario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface HorarioRepository extends JpaRepository<Horario, Long> {
    List<Horario> findByDoctorId(Long doctorId);  // Obtener todos los horarios de un doctor

    @Query("SELECT h FROM Horario h WHERE h.doctor.especialidad.id = :especialidadId")
    List<Horario> findHorariosByEspecialidad(@Param("especialidadId") Long especialidadId);


}
