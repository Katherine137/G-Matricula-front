import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../../css/EstudianteAC.css"

const CrearEstudiante = () => {
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = async (data) => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/Estudiante/Estudiantes`, data)
            alert("Estudiante creada correctamente")
            navigate("/ListEstudiante")
            } catch (error) {
            console.error("Error al actualizar:", error)
        }
    }

  return (
    <div className="container-crear-flex">
        <form onSubmit={handleSubmit(onSubmit)} className="form-estudiante">
            <h2>Crear Estudiante</h2>
            
            <div className="form-grid">

                <div>
                    <label>Nombre</label>
                    <input
                    type="text"
                    placeholder="Ingresa el nombre"
                    {...register("nombre", { required: "El nombre es obligatorio" })}
                    />
                    {errors.nombre && <p className="error">{errors.nombre.message}</p>}
                </div>

                <div>
                    <label>Apellido</label>
                    <input
                    type="text"
                    placeholder="Ingresa el apellido"
                    {...register("apellido", { required: "El apellido es obligatorio" })}
                    />
                    {errors.apellido && <p className="error">{errors.apellido.message}</p>}
                </div>

                <div>
                    <label>Cédula</label>
                    <input
                    type="text"
                    placeholder="Ingresa la cédula"
                    {...register("cedula", { required: "La cédula es obligatoria" })}
                    />
                    {errors.cedula && <p className="error">{errors.cedula.message}</p>}
                </div>

                <div>
                    <label>Fecha de Nacimiento</label>
                    <input
                    type="date"
                    {...register("fecha_nacimiento", { required: "La fecha es obligatoria" })}
                    />
                    {errors.fecha_nacimiento && <p className="error">{errors.fecha_nacimiento.message}</p>}
                </div>

                <div>
                    <label>Ciudad</label>
                    <input
                    type="text"
                    placeholder="Ingresa la ciudad"
                    {...register("ciudad", { required: "La ciudad es obligatoria" })}
                    />
                    {errors.ciudad && <p className="error">{errors.ciudad.message}</p>}
                </div>

                <div>
                    <label>Dirección</label>
                    <input
                    type="text"
                    placeholder="Ingresa la dirección"
                    {...register("direccion", { required: "La dirección es obligatoria" })}
                    />
                    {errors.direccion && <p className="error">{errors.direccion.message}</p>}
                </div>

                <div>
                    <label>Teléfono</label>
                    <input
                    type="text"
                    placeholder="Ingresa el teléfono"
                    {...register("telefono", { required: "El teléfono es obligatorio" })}
                    />
                    {errors.telefono && <p className="error">{errors.telefono.message}</p>}
                </div>

                <div>
                    <label>Email</label>
                    <input
                    type="email"
                    placeholder="Ingresa el email"
                    {...register("email", { required: "El email es obligatorio" })}
                    />
                    {errors.email && <p className="error">{errors.email.message}</p>}
                </div>

            </div>

            <button type="submit">Crear</button>
            <Link to="/Estudiante" className="reg">
            Regresar
            </Link>
            
        </form>
    </div>
  )
}

export default CrearEstudiante
