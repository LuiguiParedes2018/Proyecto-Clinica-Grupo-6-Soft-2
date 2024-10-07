package com.clinica.ulisana_back.controller;

import com.clinica.ulisana_back.entity.Especialidad;
import com.clinica.ulisana_back.service.EspecialidadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/especialidad")
public class EspecialidadController {

    @Autowired
    private EspecialidadService especialidadService;

    @GetMapping
    public List<Especialidad> getAllEspecialidades() {
        return especialidadService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Especialidad> getEspecialidadById(@PathVariable Long id) {
        Optional<Especialidad> especialidad = especialidadService.findById(id);
        return especialidad.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Especialidad createEspecialidad(@RequestBody Especialidad especialidad) {
        return especialidadService.save(especialidad);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Especialidad> updateEspecialidad(@PathVariable Long id, @RequestBody Especialidad updatedEspecialidad) {
        Optional<Especialidad> especialidad = especialidadService.findById(id);
        if (especialidad.isPresent()) {
            updatedEspecialidad.setId(id);
            return ResponseEntity.ok(especialidadService.save(updatedEspecialidad));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEspecialidad(@PathVariable Long id) {
        if (especialidadService.findById(id).isPresent()) {
            especialidadService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
