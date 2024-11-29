package com.clinica.ulisana_back.controller;

import com.clinica.ulisana_back.entity.Administrador;
import com.clinica.ulisana_back.service.AdministradorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/administrador")
public class AdministradorController {

    @Autowired
    private AdministradorService administradorService;

    @GetMapping
    public List<Administrador> getAllAdministradores() {
        return administradorService.findAllAdministradores();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Administrador> getAdministradorById(@PathVariable Long id) {
        Optional<Administrador> administrador = administradorService.findAdministradorById(id);
        return administrador.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Administrador> createAdministrador(@RequestBody Administrador administrador) {
        if (administradorService.existsAdministradorByCorreo(administrador.getCorreo())) {
            return ResponseEntity.badRequest().body(null); // Correo ya existe
        }
        Administrador nuevoAdministrador = administradorService.saveAdministrador(administrador);
        return ResponseEntity.ok(nuevoAdministrador);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Administrador> updateAdministrador(@PathVariable Long id, @RequestBody Administrador updatedAdministrador) {
        if (!administradorService.findAdministradorById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        updatedAdministrador.setId(id);
        Administrador savedAdministrador = administradorService.saveAdministrador(updatedAdministrador);
        return ResponseEntity.ok(savedAdministrador);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdministrador(@PathVariable Long id) {
        if (!administradorService.findAdministradorById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        administradorService.deleteAdministradorById(id);
        return ResponseEntity.noContent().build();
    }

    // Endpoint para login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Administrador administrador) {
        Optional<Administrador> authenticatedAdministrador = administradorService.authenticateAdministrador(administrador.getCorreo(), administrador.getPassword());
        if (authenticatedAdministrador.isPresent()) {
            return ResponseEntity.ok(authenticatedAdministrador.get()); // Devuelve el objeto completo
        } else {
            return ResponseEntity.status(401).body("Credenciales incorrectas para el administrador!");
        }
    }
}


