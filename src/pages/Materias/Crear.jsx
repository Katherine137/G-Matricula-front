import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../../css/MateriaAC.css"

const CrearMateria = () => {
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = async (data) => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/Materia/Materias`, data)
            alert("Materia creada correctamente")
            navigate("/ListMateria")
            } catch (error) {
            console.error("Error al actualizar:", error)
        }
    }

  return (
    <div className="container-crear-flex">
        <form onSubmit={handleSubmit(onSubmit)} className="form-materia">
            <h2>Crear Materia</h2>
            
            <label>Nombre</label>
            <input
            type="text"
            placeholder="Nombre"
            {...register("nombre", { required: true })}
            />
            {errors.nombre && <p>Nombre obligatorio</p>}

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

            <label>Creditos</label>
            <input
            type="number"
            placeholder="Creditos"
            {...register("creditos", { required: true })}
            />
            {errors.creditos && <p>Creditos obligatorio</p>} 

            <button type="submit">Crear</button>
            <Link to="/Materia" className="reg">
            Regresar
            </Link>
            
        </form>
    </div>
  )
}

export default CrearMateria
