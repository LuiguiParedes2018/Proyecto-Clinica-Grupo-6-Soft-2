import React, { useState } from "react";
import "./TuCita.css";
import HeaderPaciente from "../HeaderPaciente/HeaderPaciente";

// Datos simulados de citas
const citasData = [
    {
        id: 1,
        fecha: "2024-10-10",
        hora: "14:00",
        especialidad: "Cardiología",
        doctor: "Dr. Juan Perez",
        consultorio: "A1",
        pagado: false
    },
    {
        id: 2,
        fecha: "2024-11-02",
        hora: "09:00",
        especialidad: "Dermatología",
        doctor: "Dr. Javier Mendoza",
        consultorio: "B12",
        pagado: true
    }
];

function TuCita() {
    const [citas, setCitas] = useState(citasData);

    // Función para cancelar una cita
    const cancelarCita = (id) => {
        const confirmacion = window.confirm("¿Estás seguro de que deseas cancelar esta cita?");
        if (confirmacion) {
            setCitas(citas.filter((cita) => cita.id !== id));
        }
    };

    return (
        <div>
            <HeaderPaciente />
            <div className="tu-cita">
                <h1>Estado de tus citas</h1>
                {citas.length === 0 ? (
                    <p>No tienes citas reservadas.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Especialidad</th>
                                <th>Doctor</th>
                                <th>Consultorio</th>
                                <th>Estado de Pago</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {citas.map((cita) => (
                                <tr key={cita.id}>
                                    <td>{cita.fecha}</td>
                                    <td>{cita.hora}</td>
                                    <td>{cita.especialidad}</td>
                                    <td>{cita.doctor}</td>
                                    <td>{cita.consultorio}</td>
                                    <td>{cita.pagado ? "Pagado" : "Pendiente"}</td>
                                    <td>
                                        <button 
                                            onClick={() => cancelarCita(cita.id)} 
                                            className="btn-cancelar"
                                            disabled={cita.pagado}  // Deshabilita el botón si la cita ya está pagada
                                        >
                                            Cancelar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default TuCita;
