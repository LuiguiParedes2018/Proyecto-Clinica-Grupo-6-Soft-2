import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
//componentes importados
import Login from "./componentes/Login/Login.jsx"
import SeleccionRol from"./componentes/SeleccionRol/SeleccionRol.jsx"
import RegisterPaciente from "./componentes/RegisterPaciente/RegisterPaciente.jsx"
import RegisterDoctor from "./componentes/RegisterDoctor/RegisterDoctor.jsx"
import CrearHorario from "./componentes/Doctor/CrearHorario/CrearHorario.jsx"

function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/seleccionrol" element={<SeleccionRol/>}/>
        <Route path="/registerpaciente" element={<RegisterPaciente/>}/>
        <Route path="/registerdoctor" element={<RegisterDoctor/>}/>
        <Route path="/crearhorario" element={<CrearHorario/>}/>
      </Routes>
    </Router>
  )
}

export default App