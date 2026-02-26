import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../../css/MatriculaAC.css"

const CrearMatricula = () => {
  const navigate = useNavigate()
  const [estudiantes, setEstudiantes] = useState([])
  const [materias, setMateria] = useState([])
  const [loading, setLoading] = useState(true)

  const { register, handleSubmit, formState: { errors } } = useForm()

  const cargarDatos = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } }
      
      const resEs = await axios.get(`${import.meta.env.VITE_API_URL}/api/Estudiante/listarEs`, config)
      const resMat = await axios.get(`${import.meta.env.VITE_API_URL}/api/Materia/listarMat`, config) 

      setEstudiantes(resEs.data.estudiantes)
      setMateria(resMat.data.materias)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    cargarDatos()
  }, [])

  const onSubmit = async (data) => {
    console.log("data enviada:", data)
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${import.meta.env.VITE_API_URL}/api/Matricula/Matriculas`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      alert("Matricula creada correctamente")
      navigate("/ListMatricula")
    } catch (error) {
      const mensaje = error.response?.data?.message || "Error al crear la matrícula"
      alert(mensaje)
    }
  }

  if (loading) return <p className="loading">Cargando datos...</p>

  return (
    <div className="container-crear-flex">
      <form onSubmit={handleSubmit(onSubmit)} className="form-matricula">
        <h2>Crear Matricula</h2>

        <label>Código</label>
        <input
          type="text"
          placeholder="Código"
          {...register("codigo", { required: true })}
        />
        {errors.codigo && <p className="error">Código obligatorio</p>}

        <label>Descripción</label>
        <input
          type="text"
          placeholder="Descripción"
          {...register("descripcion", { required: true })}
        />
        {errors.descripcion && <p className="error">Descripción obligatoria</p>}

        <label>Estudiante</label>
        <select {...register("estudiante", { required: true })}>
          <option value="">Selecciona un estudiante</option>
          {Array.isArray(estudiantes) && estudiantes.map((es) => (
            <option key={es._id} value={es._id}>
              {es.nombre} {es.apellido}
            </option>
          ))}
        </select>
        {errors.estudiante && <p className="error">Estudiante obligatorio</p>}
        
        <label>Materia</label>
        <select {...register("materia", { required: true })}>
          <option value="">Selecciona una materia</option>
          {Array.isArray(materias) && materias.map((mat) => (
            <option key={mat._id} value={mat._id}>
              {mat.codigo} {mat.nombre}
            </option>
          ))}
        </select>
        {errors.materia && <p className="error">Materia obligatoria</p>}

        <button type="submit">Crear</button>

        <Link to="/Matricula" className="reg">
          Regresar
        </Link>
      </form>
    </div>
  )
}

export default CrearMatricula