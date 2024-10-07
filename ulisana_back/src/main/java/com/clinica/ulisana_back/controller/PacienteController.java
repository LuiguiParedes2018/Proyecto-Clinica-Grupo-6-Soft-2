package com.clinica.ulisana_back.controller;

import com.clinica.ulisana_back.entity.Paciente;
import com.clinica.ulisana_back.service.PacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/paciente")
public class PacienteController {

    @Autowired
    private PacienteService pacienteService;

    @GetMapping
    public List<Paciente> getAllPacientes() {
        return pacienteService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Paciente> getPacienteById(@PathVariable Long id) {
        Optional<Paciente> paciente = pacienteService.findById(id);
        return paciente.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Paciente createPaciente(@RequestBody Paciente paciente) {
        return pacienteService.save(paciente);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Paciente> updatePaciente(@PathVariable Long id, @RequestBody Paciente updatedPaciente) {
        Optional<Paciente> paciente = pacienteService.findById(id);
        if (paciente.isPresent()) {
            updatedPaciente.setId(id);
            return ResponseEntity.ok(pacienteService.save(updatedPaciente));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePaciente(@PathVariable Long id) {
        if (pacienteService.findById(id).isPresent()) {
            pacienteService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/correo/{correo}")
    public ResponseEntity<Paciente> getPacienteByCorreo(@PathVariable String correo) {
        Optional<Paciente> paciente = pacienteService.findByCorreo(correo);
        return paciente.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Paciente paciente) {
        Optional<Paciente> authenticatedPaciente = pacienteService.authenticatePaciente(paciente.getCorreo(), paciente.getPassword());
        if (authenticatedPaciente.isPresent()) {
            return ResponseEntity.ok("Login exitoso para el paciente: " + authenticatedPaciente.get().getNombreCompleto());
        } else {
            return ResponseEntity.status(401).body("Credenciales incorrectas para el paciente!");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Paciente> registerPaciente(@RequestBody Paciente paciente) {
        Optional<Paciente> existingPaciente = pacienteService.findByCorreo(paciente.getCorreo());
        if (existingPaciente.isPresent()) {
            return ResponseEntity.status(409).body(null);
        }

        Paciente nuevoPaciente = pacienteService.save(paciente);
        return ResponseEntity.ok(nuevoPaciente);
    }


}
