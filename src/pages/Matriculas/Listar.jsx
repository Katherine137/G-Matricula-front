import { MdDeleteForever, MdPublishedWithChanges } from "react-icons/md";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../../css/listar.css"

const ListMatricula = () => {
    const navigate = useNavigate()
    const [matriculas, setMatriculas] = useState([])
    const [loading, setLoading] = useState(true)

    const listMa = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/Matricula/listarMa`)
        setMatriculas(response.data.matriculas)
      } catch (error) {
        console.error("Error al cargar matriculas:", error)
      } finally {
        setLoading(false)
      }
    }
    const eliminarMatriculas = async (id) => {
      const confirmar = window.confirm("¿Seguro que deseas eliminar?")
      if (!confirmar) return

      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/Matricula/eliminarMa/${id}`)
        listMa()
      } catch (error) {
        console.error(error)
      }
    }

    useEffect(() => {
      listMa()
    }, [])

    if (loading) return <p className="loading">Cargando...</p>

    if (matriculas.length === 0) {
      return (
        <div className="alert">
          <strong>No existen registros de matriculas</strong>
        </div>
      )
    }

    return (
      <table className="tabla">
        <thead>
          <tr>
            <th>N°</th>
            <th>Código</th>
            <th>Descripción</th>
            <th>Estudiante</th>
            <th>Materia</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {matriculas.map((matriculas, index) => (
            <tr key={matriculas._id}>
              <td>{index + 1}</td>
              <td>{matriculas.codigo}</td>
              <td>{matriculas.descripcion}</td>
              <td>{matriculas.estudiante?.nombre} {matriculas.estudiante?.apellido}</td>
              <td>{matriculas.materia?.codigo} {matriculas.materia?.nombre}</td>

              <td className="acciones">
                <MdPublishedWithChanges
                  title="Actualizar"
                  className="icon actualizar"
                  size={30}
                  onClick={() => navigate(`/ActMatricula/${matriculas._id}`)}
                />
                <MdDeleteForever
                  title="Eliminar"
                  className="icon eliminar"
                  size={30}
                  onClick={() => eliminarMatriculas(matriculas._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="10" className="footer-tabla">
              <Link to="/Matricula" className="reg">Regresar</Link>
            </td>
          </tr>
        </tfoot>
      </table>
  )
}

export default ListMatricula
