import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

//funciones del paciente
import LoginPaciente from "./componentes/Paciente/LoginPaciente/LoginPaciente.jsx"
import RegisterPaciente from "./componentes/Paciente/RegisterPaciente/RegisterPaciente.jsx"
import PerfilPaciente from "./componentes/Paciente/PerfilPaciente/PerfilPaciente.jsx"


function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<LoginPaciente/>}/>
        <Route path="/register-paciente" element={<RegisterPaciente/>}/>
        <Route path="/perfil-paciente" element={<PerfilPaciente/>}/>
      </Routes>
    </Router>
  )
}

export default App