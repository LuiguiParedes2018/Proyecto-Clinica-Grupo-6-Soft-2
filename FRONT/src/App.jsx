import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
//componentes importados

//funciones generales
import Login from "./componentes/Login/Login.jsx"
import SeleccionRol from"./componentes/SeleccionRol/SeleccionRol.jsx"
import RegisterPaciente from "./componentes/RegisterPaciente/RegisterPaciente.jsx"
import RegisterDoctor from "./componentes/RegisterDoctor/RegisterDoctor.jsx"
//funciones del doctor
import PerfilDoctor from "./componentes/Doctor/PerfilDoctor/PerfilDoctor.jsx"
import CrearHorario from "./componentes/Doctor/CrearHorario/CrearHorario.jsx"
import CitasCreadas from "./componentes/Doctor/CitasCreadas/CitasCreadas.jsx"
//funciones del paciente
import PerfilPaciente from "./componentes/Paciente/PerfilPaciente/PerfilPaciente.jsx"
import Buscar from "./componentes/Paciente/Buscar/Buscar.jsx"
import SacarCita from "./componentes/Paciente/SacarCita/SacarCita.jsx"
import TuCita from "./componentes/Paciente/TuCita/TuCita.jsx"

function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/seleccionrol" element={<SeleccionRol/>}/>
        <Route path="/registerpaciente" element={<RegisterPaciente/>}/>
        <Route path="/registerdoctor" element={<RegisterDoctor/>}/>
        <Route path="/perfildoctor" element={<PerfilDoctor/>}/>
        <Route path="/crearhorario" element={<CrearHorario/>}/>
        <Route path="/citascreadas" element={<CitasCreadas/>}/>
        <Route path="/perfilpaciente" element={<PerfilPaciente/>}/>
        <Route path="/sacarcita" element={<SacarCita/>}/>
        <Route path="/tucita" element={<TuCita/>}/>
        <Route path="/buscar" element={<Buscar/>}/>
      </Routes>
    </Router>
  )
}

export default App