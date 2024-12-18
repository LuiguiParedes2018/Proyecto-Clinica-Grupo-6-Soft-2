package com.clinica.ulisana_back.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
@Table(name = "doctores")
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombreCompleto;

    @Column(nullable = false, unique = true)
    private String correo;

    @Column(nullable = false)
    private String telefono;

    @Column(nullable = false)
    private String password;

    @ManyToOne
    @JoinColumn(name = "especialidad_id")
    private Especialidad especialidad;

    @OneToMany(mappedBy = "doctor")
    @JsonIgnore // Ignorar esta lista para evitar ciclos infinitos
    private List<Horario> horarios;

    @OneToMany(mappedBy = "doctor")
    @JsonIgnore // Ignorar esta lista para evitar ciclos infinitos
    private List<Cita> citas;

    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL)
    @JsonIgnore // Evitar ciclos infinitos en la serialización
    private List<Calificacion> calificaciones; // Relación con Calificacion

    // Método para calcular el promedio de calificaciones
    public double getPromedioCalificacion() {
        if (calificaciones == null || calificaciones.isEmpty()) {
            return 0.0;
        }
        return calificaciones.stream().mapToInt(Calificacion::getPuntaje).average().orElse(0.0);
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public String getCorreo() {
        return correo;
    }

    public String getNombreCompleto() {
        return nombreCompleto;
    }

    public Long getId() {
        return id;
    }
}
