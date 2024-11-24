package com.clinica.ulisana_back.repository;

import com.clinica.ulisana_back.entity.Administrador;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AdministradorRepository extends JpaRepository<Administrador, Long> {

    Optional<Administrador> findByCorreo(String correo);

    boolean existsByCorreo(String correo);
}
