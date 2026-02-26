import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../../css/EstudianteAC.css"

const ActEstudiante = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const { register, handleSubmit, setValue, formState: { errors } } = useForm()

    useEffect(() => {
        const obtenerEstudiante = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/Estudiante/obtenerEs/${id}`)
                console.log(response.data)
                const estudiante = response.data.estudiante

                setValue("nombre", estudiante.nombre)
                setValue("apellido", estudiante.apellido)
                setValue("cedula", estudiante.cedula)
                setValue("fecha_nacimiento", estudiante.fecha_nacimiento)
                setValue("ciudad", estudiante.ciudad)
                setValue("direccion", estudiante.direccion)
                setValue("telefono", estudiante.telefono)
                setValue("email", estudiante.email)

            } catch (error) {
                console.error("Error al cargar estudiante:", error)
            }
        }

        obtenerEstudiante()
    }, [id, setValue])

    const onSubmit = async (data) => {
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/api/Estudiante/actualizarEs/${id}`, data)
            alert("Estudiante actualizado correctamente")
            navigate("/ListEstudiante")
        } catch (error) {
            console.error("Error al actualizar:", error)
        }
    }


    return (
        <div className="container-crear-flex">
            <form onSubmit={handleSubmit(onSubmit)} className="form-estudiante">
                <h2>Actualizar Estudiante</h2>
                
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

                <button type="submit">Actualizar</button>
                <Link to="/Estudiante" className="reg">
                Regresar
                </Link>
            </form>

        </div>
    )
}

export default ActEstudiante
