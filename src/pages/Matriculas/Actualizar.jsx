import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../../css/MatriculaAC.css"

const ActMatricula = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [estudiantes, setEstudiantes] = useState([])
    const [materias, setMaterias] = useState([])
    const [loading, setLoading] = useState(true)

    const { register, handleSubmit, setValue, formState: { errors } } = useForm()

    const cargarDatos = async () => {
        try {
        const token = localStorage.getItem("token")
        const config = { headers: { Authorization: `Bearer ${token}` } }

        const [resEs, resMat] = await Promise.all([
            axios.get(`${import.meta.env.VITE_API_URL}/api/Estudiante/listarEs`, config),
            axios.get(`${import.meta.env.VITE_API_URL}/api/Materia/listarMat`, config)
        ])

        setEstudiantes(Array.isArray(resEs.data?.estudiantes) ? resEs.data.estudiantes : [])
        setMaterias(Array.isArray(resMat.data?.materias) ? resMat.data.materias : [])
        } catch (error) {
        console.error("Error al cargar datos:", error)
        setEstudiantes([])
        setMaterias([])
        } finally {
        setLoading(false);
        }
    }

    useEffect(() => {
        const obtenerMatricula = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/Matricula/obtenerMa/${id}`)
            const matricula = response.data.matricula

            setValue("codigo", matricula.codigo)
            setValue("descripcion", matricula.descripcion)
            setValue("estudiante", matricula.estudiante?._id || matricula.estudiante)
            setValue("materia", matricula.materia?._id || matricula.materia)
        } catch (error) {
            console.error("Error al cargar matricula:", error)
        }
        }

        obtenerMatricula()
        cargarDatos()
    }, [id, setValue])

    const onSubmit = async (data) => {
        try {
        await axios.put(`${import.meta.env.VITE_API_URL}/api/Matricula/actualizarMa/${id}`, data)
        alert("Matricula actualizada correctamente")
        navigate("/ListMatricula")
        } catch (error) {
        console.error("Error al actualizar:", error)
        }
    }

    if (loading) return <p>Cargando datos...</p>

    return (
        <div className="container-crear-flex">
        <form onSubmit={handleSubmit(onSubmit)} className="form-matricula">
            <h2>Editar Matricula</h2>

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

            <button type="submit">Actualizar</button>
            <Link to="/Matricula" className="reg">
            Regresar
            </Link>
        </form>

        </div>
    )
}

export default ActMatricula
