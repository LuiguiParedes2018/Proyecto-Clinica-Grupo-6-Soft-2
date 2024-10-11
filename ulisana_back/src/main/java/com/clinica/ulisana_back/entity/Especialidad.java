package com.clinica.ulisana_back.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
@Table(name = "especialidades")
public class Especialidad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String nombre;

    @JsonIgnore // Ignorar esta lista para evitar ciclos infinitos
    @OneToMany(mappedBy = "especialidad")
    private List<Doctor> doctores;

    public void setId(Long id) {
        this.id = id;
    }
}
