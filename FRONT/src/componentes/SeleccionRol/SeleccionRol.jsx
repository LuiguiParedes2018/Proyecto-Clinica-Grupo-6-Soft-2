import React from "react"
import "./SeleccionRol.css"
import { useNavigate } from "react-router-dom";

function SeleccionRol(){
    const navegar = useNavigate();
    const seleccionado = (rol) =>{
        if(rol == "paciente"){
            navegar("/registerpaciente")
        }
        else{
            navegar("/registerdoctor")
        }    
    }

    return(
        <div className="contenedor-SeleccionRol">
            <h1>¿Eres doctor o paciente?</h1>
            <div className="opciones-rol">
                <button onClick={()=> seleccionado("paciente")}>Soy Paciente</button>
                <button onClick={()=> seleccionado("doctor")}>Soy Doctor</button>
            </div>
        </div>
    )
}

export default SeleccionRol