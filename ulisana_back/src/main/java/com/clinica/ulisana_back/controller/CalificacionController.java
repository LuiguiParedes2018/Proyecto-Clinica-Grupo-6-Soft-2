package com.clinica.ulisana_back.controller;

import com.clinica.ulisana_back.entity.Calificacion;
import com.clinica.ulisana_back.service.CalificacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/calificaciones")
public class CalificacionController {

    @Autowired
    private CalificacionService calificacionService;

    // Endpoint para calificar o actualizar la calificación de un doctor
    @PostMapping("/doctor/{doctorId}/paciente/{pacienteId}")
    public ResponseEntity<Calificacion> calificarDoctor(
            @PathVariable Long doctorId,
            @PathVariable Long pacienteId,
            @RequestParam int puntaje
    ) {
        if (puntaje < 1 || puntaje > 20) {
            return ResponseEntity.badRequest().body(null);
        }

        Calificacion nuevaCalificacion = calificacionService.calificarDoctor(doctorId, pacienteId, puntaje);
        return ResponseEntity.ok(nuevaCalificacion);
    }

    // Endpoint para obtener todas las calificaciones de un doctor
    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<Calificacion>> obtenerCalificaciones(@PathVariable Long doctorId) {
        List<Calificacion> calificaciones = calificacionService.obtenerCalificacionesPorDoctor(doctorId);
        return ResponseEntity.ok(calificaciones);
    }

    // Endpoint para obtener el promedio de calificaciones de un doctor
    @GetMapping("/doctor/{doctorId}/promedio")
    public ResponseEntity<Double> obtenerPromedio(@PathVariable Long doctorId) {
        double promedio = calificacionService.obtenerPromedioCalificacion(doctorId);
        return ResponseEntity.ok(promedio);
    }
}
