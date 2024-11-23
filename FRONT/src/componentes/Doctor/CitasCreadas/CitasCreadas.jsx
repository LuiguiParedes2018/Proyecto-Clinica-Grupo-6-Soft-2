import React, { useEffect, useState } from "react";
import "./CitasCreadas.css";
import HeaderDoctor from "../HeaderDoctor/HeaderDoctor.jsx";
import { getCitasByDoctorId, marcarCitaComoPagada, deleteCita } from "../../../servicios/citaService"; // Importamos la nueva función
import emailjs from "emailjs-com";

function CitasCreadas() {
  const [citas, setCitas] = useState([]); // Estado para las citas

  // Obtener el ID del doctor desde localStorage
  const doctorId = localStorage.getItem("doctorId");

  useEffect(() => {
    if (!doctorId) {
      console.error("No se pudo obtener el ID del doctor.");
      return;
    }

    // Llamada a la API para obtener las citas del doctor
    getCitasByDoctorId(doctorId)
      .then((response) => {
        setCitas(response.data); // Guardar las citas obtenidas
      })
      .catch((error) => {
        console.error("Error al obtener las citas:", error);
      });
  }, [doctorId]);

  const handleMarcarPagado = (id) => {
    // Llamar al servicio para marcar la cita como pagada
    marcarCitaComoPagada(id)
      .then(() => {
        // Actualizar el estado de las citas en el frontend
        setCitas((prevCitas) =>
          prevCitas.map((cita) =>
            cita.id === id ? { ...cita, citaPagada: true } : cita
          )
        );
      })
      .catch((error) => {
        console.error("Error al marcar la cita como pagada:", error);
      });
  };

  const cancelarCita = async (id) => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas cancelar esta cita?");
    if (confirmacion) {
      try {
        await deleteCita(id); // Llamada a la API para eliminar la cita
        setCitas(citas.filter((cita) => cita.id !== id)); // Actualizar el estado para eliminar la cita cancelada
        
        // Confirmar si se debe enviar un correo al paciente
        const enviarCorreo = window.confirm("¿Deseas notificar al paciente sobre la cancelación por correo?");
        if (enviarCorreo) {
          const citaCancelada = citas.find((cita) => cita.id === id);
          if (citaCancelada && citaCancelada.paciente) {
            // Enviar correo al paciente
            emailjs.send(
              "service_6uh3fgt", //  Service ID
              "template_91gq15h", //  Template ID
              {
                patient_email: citaCancelada.paciente.email,
                appointment_details: `Fecha: ${citaCancelada.horario.fecha}, Hora: ${citaCancelada.horario.hora}`,
              },
              "LQHqbEXiyzeGIJsmX" //  Public Key
            )
            .then(() => {
              alert("Correo enviado exitosamente al paciente.");
            })
            .catch((error) => {
              console.error("Error al enviar el correo:", error);
              alert("Hubo un error al enviar el correo.");
            });
          } else {
            alert("No se pudo encontrar la información del paciente.");
          }
        }

        alert("Cita cancelada con éxito.");
      } catch (error) {
        console.error("Error al cancelar la cita:", error);
        alert("Hubo un error al cancelar la cita.");
      }
    }

  };



  return (
    <div>
      <HeaderDoctor />
      <div className="ver-citas-container">
        {citas.length === 0 ? (
          <p className="mensaje-vacio">No tienes citas creadas.</p>
        ) : (
          <ul className="lista-citas">
            {citas.map((cita, index) => (
              <li
                key={index}
                className={`cita-item ${
                  cita.citaPagada
                    ? "cita-pagada" // Clase para citas pagadas (verde)
                    : cita.paciente
                    ? "cita-reservada-no-pagada" // Clase para citas reservadas pero no pagadas (amarillo)
                    : "cita-no-reservada" // Clase para citas no reservadas (rojo)
                }`}
              >
                <p><strong>Fecha:</strong> {cita.horario.fecha}</p>
                <p><strong>Hora:</strong> {cita.horario.hora}</p>
                <p><strong>Consultorio:</strong> {cita.horario.consultorio}</p>
                <p>
                  <strong>Estado de la Cita:</strong>{" "}
                  {cita.paciente
                    ? `Reservada por ${cita.paciente.nombreCompleto}`
                    : "Aún no reservada"}
                </p>
                <p>
                  <strong>Estado del Pago:</strong>{" "}
                  {cita.citaPagada ? "Pagado" : "No pagado"}
                </p>
                {!cita.citaPagada && (
                  <button
                    className="btn-pagar"
                    onClick={() => handleMarcarPagado(cita.id)}
                  >
                    Confirmar Pago
                  </button>
                )}

                <button
                  onClick={() => cancelarCita(cita.id)}
                  className="btn-cancelar"
                  >
                    Eliminar cita
                  </button>


              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CitasCreadas;
