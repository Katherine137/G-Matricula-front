import { MdDeleteForever, MdPublishedWithChanges } from "react-icons/md";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../../css/listar.css"

const ListMateria = () => {
    const navigate = useNavigate()
    const [materias, setMaterias] = useState([])
    const [loading, setLoading] = useState(true)

    const listMat = async () => {
      try {
        const response = await axios.get(`h${import.meta.env.VITE_API_URL}/api/Materia/listarMat`)
        setMaterias(response.data.materias)
      } catch (error) {
        console.error("Error al cargar materias:", error)
      } finally {
        setLoading(false)
      }
    }
    const eliminarMaterias = async (id) => {
      const confirmar = window.confirm("¿Seguro que deseas eliminar?")
      if (!confirmar) return

      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/Materia/eliminarMat/${id}`)
        listMat()
      } catch (error) {
        console.error(error)
      }
    }

    useEffect(() => {
      listMat()
    }, [])

    if (loading) return <p className="loading">Cargando...</p>

    if (materias.length === 0) {
      return (
        <div className="alert">
          <strong>No existen registros de materias</strong>
        </div>
      )
    }

    return (
      <table className="tabla">
        <thead>
          <tr>
            <th>N°</th>
            <th>Nombre</th>
            <th>Código</th>
            <th>Descripción</th>
            <th>Creditos</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {materias.map((materias, index) => (
            <tr key={materias._id}>
              <td>{index + 1}</td>
              <td>{materias.nombre}</td>
              <td>{materias.codigo}</td>
              <td>{materias.descripcion}</td>
              <td>{materias.creditos}</td>

              <td className="acciones">
                <MdPublishedWithChanges
                  title="Actualizar"
                  className="icon actualizar"
                  size={30}
                  onClick={() => navigate(`/ActMateria/${materias._id}`)}
                />
                <MdDeleteForever
                  title="Eliminar"
                  className="icon eliminar"
                  size={30}
                  onClick={() => eliminarMaterias(materias._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="10" className="footer-tabla">
              <Link to="/Materia" className="reg">Regresar</Link>
            </td>
          </tr>
        </tfoot>
      </table>
  )
}

export default ListMateria
