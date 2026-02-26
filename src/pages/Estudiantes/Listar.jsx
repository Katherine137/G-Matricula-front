import { MdDeleteForever, MdPublishedWithChanges } from "react-icons/md";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../../css/listar.css"

const ListEstudiante = () => {
    const navigate = useNavigate()
    const [estudiantes, setEstudiantes] = useState([])
    const [loading, setLoading] = useState(true)

    const listEs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/Estudiante/listarEs`)
        setEstudiantes(response.data.estudiantes)
      } catch (error) {
        console.error("Error al cargar estudiantes:", error)
      } finally {
        setLoading(false)
      }
    }
    const eliminarEstudiantes = async (id) => {
      const confirmar = window.confirm("¿Seguro que deseas eliminar?")
      if (!confirmar) return

      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/Estudiante/eliminarEs/${id}`)
        listEs()
      } catch (error) {
        console.error(error)
      }
    }

    useEffect(() => {
      listEs()
    }, [])

    if (loading) return <p className="loading">Cargando...</p>

    if (estudiantes.length === 0) {
      return (
        <div className="alert">
          <strong>No existen registros de estudiantes</strong>
        </div>
      )
    }

    return (
      <table className="tabla">
        <thead>
          <tr>
            <th>N°</th>
            <th>Cédula</th>
            <th>Nombre</th>
            <th>Ciudad</th>
            <th>Email</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Fecha nacimiento</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {estudiantes.map((estudiantes, index) => (
            <tr key={estudiantes._id}>
                <td>{index + 1}</td>
                <td>{estudiantes.cedula}</td>
                <td>{estudiantes.nombre} {estudiantes.apellido}</td>
                <td>{estudiantes.ciudad}</td>
                <td>{estudiantes.email}</td>
                <td>{estudiantes.direccion}</td>
                <td>{estudiantes.telefono}</td>
                <td>{estudiantes.fecha_nacimiento}</td>

              <td className="acciones">
                <MdPublishedWithChanges
                  title="Actualizar"
                  className="icon actualizar"
                  size={30}
                  onClick={() => navigate(`/ActEstudiante/${estudiantes._id}`)}
                />
                <MdDeleteForever
                  title="Eliminar"
                  className="icon eliminar"
                  size={30}
                  onClick={() => eliminarEstudiantes(estudiantes._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="10" className="footer-tabla">
              <Link to="/Estudiante" className="reg">Regresar</Link>
            </td>
          </tr>
        </tfoot>
      </table>
  )
}

export default ListEstudiante
