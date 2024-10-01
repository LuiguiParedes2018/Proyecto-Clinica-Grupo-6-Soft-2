import React, { useState } from "react";
import "./PerfilPaciente.css";
import HeaderPaciente from "../HeaderPaciente/HeaderPaciente";

// Datos simulados de pacientes
const pacienteData = {
    id: 1,
    nombre: "Ana Gómez",
    correo: "ana.gomez@ejemplo.com",
    telefono: "+123456789",
    contrasena: "anaPassword123",
    descripcion: "Paciente registrada en el sistema."
};

function PerfilPaciente() {
    const [isEditing, setIsEditing] = useState(false);
    const [perfil, setPerfil] = useState(pacienteData);

    // Manejar el cambio de los inputs del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPerfil((prevPerfil) => ({
            ...prevPerfil,
            [name]: value,
        }));
    };

    // Guardar los cambios y dejar de editar
    const handleSave = () => {
        // Aquí puedes hacer una llamada API para guardar los cambios en el servidor
        setIsEditing(false);
        console.log("Perfil actualizado:", perfil);
    };

    return (
        <div>
            <HeaderPaciente />
            <div className="perfil-paciente">
                <h1>Perfil de {perfil.nombre}</h1>
                {isEditing ? (
                    <div>
                        <label>Nombre:</label>
                        <input
                            type="text"
                            name="nombre"
                            value={perfil.nombre}
                            onChange={handleChange}
                        />
                        <label>Correo:</label>
                        <input
                            type="email"
                            name="correo"
                            value={perfil.correo}
                            onChange={handleChange}
                        />
                        <label>Teléfono:</label>
                        <input
                            type="text"
                            name="telefono"
                            value={perfil.telefono}
                            onChange={handleChange}
                        />
                        <label>Descripción:</label>
                        <textarea
                            name="descripcion"
                            value={perfil.descripcion}
                            onChange={handleChange}
                        />
                        <button onClick={handleSave}>Guardar</button>
                    </div>
                ) : (
                    <div>
                        <p><strong>Correo:</strong> {perfil.correo}</p>
                        <p><strong>Teléfono:</strong> {perfil.telefono}</p>
                        <p><strong>Descripción:</strong> {perfil.descripcion}</p>
                        <button onClick={() => setIsEditing(true)}>Editar Perfil</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PerfilPaciente;
