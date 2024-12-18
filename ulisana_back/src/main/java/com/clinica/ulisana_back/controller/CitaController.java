package com.clinica.ulisana_back.controller;

import com.clinica.ulisana_back.entity.Cita;
import com.clinica.ulisana_back.service.CitaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cita")
public class CitaController {

    @Autowired
    private CitaService citaService;

    //API para mostrar todas las citas
    @GetMapping
    public List<Cita> getAllCitas() {
        return citaService.findAll();
    }

    //API para obtener una cita por el ID
    @GetMapping("/{id}")
    public ResponseEntity<Cita> getCitaById(@PathVariable Long id) {
        Optional<Cita> cita = citaService.findById(id);
        return cita.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    //API para crear una cita
    @PostMapping
    public Cita createCita(@RequestBody Cita cita) {
        return citaService.save(cita);
    }

    //API para actualizar informacion de una cita
    @PutMapping("/{id}")
    public ResponseEntity<Cita> updateCita(@PathVariable Long id, @RequestBody Cita updatedCita) {
        Optional<Cita> cita = citaService.findById(id);
        if (cita.isPresent()) {
            updatedCita.setId(id);
            return ResponseEntity.ok(citaService.save(updatedCita));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //API para eliminar una cita
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCita(@PathVariable Long id) {
        if (citaService.findById(id).isPresent()) {
            citaService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //API para obtener las citas de un doctor
    @GetMapping("/doctor/{doctorId}")
    public List<Cita> getCitasByDoctorId(@PathVariable Long doctorId) {
        return citaService.findByDoctorId(doctorId);
    }

    //API para que el obtener las citas de un paciente
    @GetMapping("/paciente/{pacienteId}")
    public List<Cita> getCitasByPacienteId(@PathVariable Long pacienteId) {
        return citaService.findByPacienteId(pacienteId);
    }

    //API para que un paciente pueda reservar su cita
    @PostMapping("/paciente/reservar")
    public ResponseEntity<?> reservarCita(@RequestBody Cita cita) {
        // Verificar si el horario existe
        if (cita.getHorario() == null || cita.getHorario().getId() == null) {
            return ResponseEntity.badRequest().body("El horario es requerido.");
        }

        // Verificar si el doctor existe
        if (cita.getDoctor() == null || cita.getDoctor().getId() == null) {
            return ResponseEntity.badRequest().body("El doctor es requerido.");
        }

        // Verificar si el horario ya está reservado (si ya tiene un paciente asignado)
        Optional<Cita> citaExistente = citaService.findByHorarioId(cita.getHorario().getId());

        if (citaExistente.isPresent() && citaExistente.get().getPaciente() != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("La cita ya ha sido reservada por otro paciente.");
        }

        // Guardar la cita con el paciente asignado
        Cita nuevaCita = citaService.save(cita);
        return ResponseEntity.ok(nuevaCita);
    }

    @PutMapping("/{id}/marcar-pagada")
    public ResponseEntity<?> marcarCitaComoPagada(@PathVariable Long id) {
        try {
            Cita citaActualizada = citaService.marcarCitaComoPagada(id);
            return ResponseEntity.ok(citaActualizada);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

}
