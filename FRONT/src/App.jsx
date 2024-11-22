import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

//funciones del paciente
import LoginPaciente from "./componentes/Paciente/LoginPaciente/LoginPaciente.jsx"
import RegisterPaciente from "./componentes/Paciente/RegisterPaciente/RegisterPaciente.jsx"
import PerfilPaciente from "./componentes/Paciente/PerfilPaciente/PerfilPaciente.jsx"
import SacarCita from "./componentes/Paciente/SacarCita/SacarCita.jsx"
import TuCita from "./componentes/Paciente/TuCita/TuCita.jsx"
import Buscar from "./componentes/Paciente/Buscar/Buscar.jsx"
import HistorialCitas from "./componentes/Paciente/HistorialCitas/HistorialCitas.jsx"

//funciones del doctor
import LoginDoctor from "./componentes/Doctor/LoginDoctor/LoginDoctor.jsx"
import RegisterDoctor from "./componentes/Doctor/RegisterDoctor/RegisterDoctor.jsx"
import PerfilDoctor from "./componentes/Doctor/PerfilDoctor/PerfilDoctor.jsx"
import CrearHorario from "./componentes/Doctor/CrearHorario/CrearHorario.jsx"
import HorariosDoctor from "./componentes/Doctor/HorariosDoctor/HorariosDoctor.jsx"
import CitasCreadas from "./componentes/Doctor/CitasCreadas/CitasCreadas.jsx"

function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<LoginPaciente/>}/>
        <Route path="/register-paciente" element={<RegisterPaciente/>}/>
        <Route path="/perfil-paciente/:id" element={<PerfilPaciente />} />
        <Route path="/sacar-cita" element={<SacarCita/>}/>
        <Route path="/tu-cita" element={<TuCita/>}/>
        <Route path="/buscar" element={<Buscar/>}/>

        <Route path="/login-doctor" element={<LoginDoctor/>}/>
        <Route path="/register-doctor" element={<RegisterDoctor/>}/>
        <Route path="/perfil-doctor/:id" element={<PerfilDoctor/>}/>
        <Route path="/crear-horario" element={<CrearHorario/>}/>
        <Route path="/horarios-doctor/:id" element={<HorariosDoctor />} />
        <Route path="/citas-creadas/:id" element={<CitasCreadas/>}/>
        <Route path="/historial-citas" element={<HistorialCitas />} />
      </Routes>
    </Router>
  )
}

export default App