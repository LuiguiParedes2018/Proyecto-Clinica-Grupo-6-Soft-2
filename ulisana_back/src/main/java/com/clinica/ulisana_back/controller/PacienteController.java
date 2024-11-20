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
    public ResponseEntity<?> login(@RequestBody Paciente paciente) {
        Optional<Paciente> authenticatedPaciente = pacienteService.authenticatePaciente(paciente.getCorreo(), paciente.getPassword());
        if (authenticatedPaciente.isPresent()) {
            Paciente pacienteData = authenticatedPaciente.get(); // Obtener los datos del paciente
            return ResponseEntity.ok(pacienteData); // Devolver el objeto Paciente completo en la respuesta
        } else {
            return ResponseEntity.status(401).body("Credenciales incorrectas para el paciente!");
        }
    }


    @PostMapping("/register")
    public ResponseEntity<?> registerPaciente(@RequestBody Paciente paciente) {
        // Validaciones
        if (paciente.getTelefono() == null || !paciente.getTelefono().matches("\\d{9}")) {
            return ResponseEntity.status(400).body("El número de teléfono debe contener exactamente 9 dígitos y no puede incluir letras.");
        }
        if (paciente.getCorreo() == null ||
                (!paciente.getCorreo().endsWith("@gmail.com") && !paciente.getCorreo().endsWith("@hotmail.com"))) {
            return ResponseEntity.status(400).body("El correo debe terminar con '@gmail.com' o '@hotmail.com'.");
        }
        if (paciente.getNombreCompleto() == null || paciente.getNombreCompleto().length() <= 2) {
            return ResponseEntity.status(400).body("El nombre debe tener más de 2 caracteres.");
        }
        if (paciente.getPassword() == null || paciente.getPassword().length() <= 5) {
            return ResponseEntity.status(400).body("La contraseña debe tener más de 5 caracteres.");
        }
        if (!paciente.getPassword().matches("^[\\S]+$")) {
            return ResponseEntity.status(400).body("La contraseña no debe contener espacios.");
        }

        // Validar si el correo ya existe
        Optional<Paciente> existingPaciente = pacienteService.findByCorreo(paciente.getCorreo());
        if (existingPaciente.isPresent()) {
            return ResponseEntity.status(409).body("El correo ya está registrado."); // El correo ya está registrado
        }

        // Guardar el nuevo paciente
        Paciente nuevoPaciente = pacienteService.save(paciente);
        return ResponseEntity.ok(nuevoPaciente);
    }



}
