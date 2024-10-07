package com.clinica.ulisana_back.controller;

import com.clinica.ulisana_back.entity.Doctor;
import com.clinica.ulisana_back.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/doctor")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @GetMapping
    public List<Doctor> getAllDoctores() {
        return doctorService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable Long id) {
        Optional<Doctor> doctor = doctorService.findById(id);
        return doctor.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Doctor createDoctor(@RequestBody Doctor doctor) {
        return doctorService.save(doctor);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Doctor> updateDoctor(@PathVariable Long id, @RequestBody Doctor updatedDoctor) {
        Optional<Doctor> doctor = doctorService.findById(id);
        if (doctor.isPresent()) {
            updatedDoctor.setId(id);
            return ResponseEntity.ok(doctorService.save(updatedDoctor));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDoctor(@PathVariable Long id) {
        if (doctorService.findById(id).isPresent()) {
            doctorService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/correo/{correo}")
    public ResponseEntity<Doctor> getDoctorByCorreo(@PathVariable String correo) {
        Optional<Doctor> doctor = doctorService.findByCorreo(correo);
        return doctor.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Doctor doctor) {
        Optional<Doctor> authenticatedDoctor = doctorService.authenticateDoctor(doctor.getCorreo(), doctor.getPassword());
        if (authenticatedDoctor.isPresent()) {
            return ResponseEntity.ok("Login exitoso para el doctor: " + authenticatedDoctor.get().getNombreCompleto());
        } else {
            return ResponseEntity.status(401).body("Credenciales incorrectas para el doctor!");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Doctor> registerDoctor(@RequestBody Doctor doctor) {
        // Validar si el correo ya existe
        Optional<Doctor> existingDoctor = doctorService.findByCorreo(doctor.getCorreo());
        if (existingDoctor.isPresent()) {
            return ResponseEntity.status(409).body(null); // El correo ya está registrado
        }

        // Guardar el nuevo doctor
        Doctor nuevoDoctor = doctorService.save(doctor);
        return ResponseEntity.ok(nuevoDoctor);
    }

    @GetMapping("/especialidad/{especialidadId}")
    public List<Doctor> getDoctoresByEspecialidad(@PathVariable Long especialidadId) {
        return doctorService.findByEspecialidadId(especialidadId);
    }



}
