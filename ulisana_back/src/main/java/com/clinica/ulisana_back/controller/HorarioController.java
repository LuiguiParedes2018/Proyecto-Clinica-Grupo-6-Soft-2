package com.clinica.ulisana_back.controller;
import com.clinica.ulisana_back.entity.Horario;
import com.clinica.ulisana_back.service.HorarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/horario")
public class HorarioController {

    @Autowired
    private HorarioService horarioService;

    @GetMapping
    public List<Horario> getAllHorarios() {
        return horarioService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Horario> getHorarioById(@PathVariable Long id) {
        Optional<Horario> horario = horarioService.findById(id);
        return horario.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Horario createHorario(@RequestBody Horario horario) {
        return horarioService.save(horario);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Horario> updateHorario(@PathVariable Long id, @RequestBody Horario updatedHorario) {
        Optional<Horario> horario = horarioService.findById(id);
        if (horario.isPresent()) {
            updatedHorario.setId(id);
            return ResponseEntity.ok(horarioService.save(updatedHorario));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHorario(@PathVariable Long id) {
        if (horarioService.findById(id).isPresent()) {
            horarioService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/doctor/{doctorId}")
    public List<Horario> getHorariosByDoctorId(@PathVariable Long doctorId) {
        return horarioService.findByDoctorId(doctorId);
    }

    @PostMapping("/doctor/create")
    public ResponseEntity<Horario> createHorarioForDoctor(@RequestBody Horario horario) {
        if (horario.getDoctor() == null || horario.getDoctor().getId() == null) {
            return ResponseEntity.badRequest().build();
        }

        Horario nuevoHorario = horarioService.save(horario);
        return ResponseEntity.ok(nuevoHorario);
    }


    // Endpoint para filtrar horarios por especialidad
    @GetMapping("/especialidad/{especialidadId}")
    public List<Horario> getHorariosByEspecialidad(@PathVariable Long especialidadId) {
        return horarioService.findByEspecialidad(especialidadId);
    }


}
