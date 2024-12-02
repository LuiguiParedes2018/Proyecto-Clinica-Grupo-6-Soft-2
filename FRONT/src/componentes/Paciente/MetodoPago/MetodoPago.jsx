import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./MetodoPago.css";
import tarjeta from "../../../assets/imagenes/tarjetas.png";
import yape from "../../../assets/imagenes/yape.png";
import qr from "../../../assets/imagenes/qr.png";

function MetodoPago() {
  const { id } = useParams(); // ID de la cita desde la URL
  const navigate = useNavigate(); // Para volver a "Tu Cita"
  const [tipoPago, setTipoPago] = useState(""); // Estado para el tipo de pago seleccionado

  const handlePago = () => {
    if (!tipoPago) {
      alert("Por favor, selecciona un método de pago.");
      return;
    }

    if (tipoPago === "tarjeta") {
      alert("Pago realizado con tarjeta.");
    } else if (tipoPago === "billetera") {
      alert("Pago realizado con billetera electrónica.");
    }
  };

  return (
    <div className="metodo-pago-container">
      <h1 className="titulo">Selecciona tu Método de Pago</h1>

      <div className="opciones-pago">
        {/* Opción de pago con tarjeta */}
        <div className="opcion">
          <img src={tarjeta} alt="Tarjeta" className="icono-pago" />
          <button
            className={`opcion-btn ${tipoPago === "tarjeta" ? "activo" : ""}`}
            onClick={() => setTipoPago(tipoPago === "tarjeta" ? "" : "tarjeta")}
          >
            Pago con Tarjeta
          </button>
        </div>

        {/* Formulario de tarjeta */}
        {tipoPago === "tarjeta" && (
          <div className="formulario-tarjeta">
            <h2>Introduce los datos de tu tarjeta</h2>
            <input type="text" placeholder="Número de tarjeta" required />
            <input type="text" placeholder="Nombre en la tarjeta" required />
            <input type="text" placeholder="Fecha de vencimiento (MM/AA)" required />
            <input type="text" placeholder="CVV" required />
          </div>
        )}

        {/* Opción de pago con billetera electrónica */}
        <div className="opcion">
          <img src={yape} alt="Billetera Electrónica" className="icono-pago" />
          <button
            className={`opcion-btn ${tipoPago === "billetera" ? "activo" : ""}`}
            onClick={() => setTipoPago(tipoPago === "billetera" ? "" : "billetera")}
          >
            Pago con Billetera Electrónica
          </button>
        </div>

        {/* QR de billetera electrónica */}
        {tipoPago === "billetera" && (
          <div className="qr-billetera">
            <h2>Escanea el Código QR</h2>
            <img src={qr} alt="Código QR" className="qr-img" />
          </div>
        )}
      </div>

      {/* Botones de acción */}
      <div className="acciones">
      <button
        className="btn-confirmar"
        onClick={() => {
          handlePago(); // Llama a la función de pago
          navigate("/tu-cita"); // Navega a la ruta "/tu-cita"
        }}
      >
        Confirmar Pago
      </button>

        <button
          className="btn-volver"
          onClick={() => navigate("/tu-cita")}
        >
          Volver a Tus Citas
        </button>
      </div>
    </div>
  );
}

export default MetodoPago;
