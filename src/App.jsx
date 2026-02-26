import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Matricula from './pages/Matricula'
import CrearMatricula from './pages/Matriculas/Crear'
import ListMatricula from './pages/Matriculas/Listar'
import ActMatricula from './pages/Matriculas/Actualizar'
import Materia from './pages/Materia'
import CrearMateria from './pages/Materias/Crear'
import ListMateria from './pages/Materias/Listar'
import ActMateria from './pages/Materias/Actualizar'
import Estudiante from './pages/Estudiante'
import ListEstudiante from './pages/Estudiantes/Listar'
import CrearEstudiante from './pages/Estudiantes/Crear'
import ActEstudiante from './pages/Estudiantes/Actualizar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/Home' element={<Home/>}/>
        <Route path='/Matricula' element={<Matricula/>}/>
        <Route path='/crearMatricula' element={<CrearMatricula/>}/>
        <Route path='/ListMatricula' element={<ListMatricula/>}/>
        <Route path='/ActMatricula/:id' element={<ActMatricula/>}/>

        <Route path='/Materia' element={<Materia/>}/>
        <Route path='/crearMateria' element={<CrearMateria/>}/>
        <Route path='/ListMateria' element={<ListMateria/>}/>
        <Route path='/ActMateria/:id' element={<ActMateria/>}/>

        <Route path='/Estudiante' element={<Estudiante/>}/>
        <Route path='/crearEstudiante' element={<CrearEstudiante/>}/>
        <Route path='/ListEstudiante' element={<ListEstudiante/>}/>
        <Route path='/ActEstudiante/:id' element={<ActEstudiante/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
