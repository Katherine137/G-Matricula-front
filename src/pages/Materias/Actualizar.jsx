import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../../css/MateriaAC.css"

const ActMateria = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const { register, handleSubmit, setValue, formState: { errors } } = useForm()

    useEffect(() => {
        const obtenerMateria = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/Materia/obtenerMat/${id}`)
                console.log(response.data)
                const materia = response.data.materia

                setValue("nombre", materia.nombre)
                setValue("codigo", materia.codigo)
                setValue("descripcion", materia.descripcion)
                setValue("creditos", materia.creditos)

            } catch (error) {
                console.error("Error al cargar materia:", error)
            }
        }

        obtenerMateria()
    }, [id, setValue])

    const onSubmit = async (data) => {
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/api/Materia/actualizarMat/${id}`, data)
            alert("Materia actualizada correctamente")
            navigate("/ListMateria")
        } catch (error) {
            console.error("Error al actualizar:", error)
        }
    }


    return (
        <div className="container-crear-flex">
        <form onSubmit={handleSubmit(onSubmit)} className="form-materia">
            <h2>Editar Matricula</h2>

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

            <button type="submit">Actualizar</button>
            <Link to="/Materia" className="reg">
            Regresar
            </Link>
        </form>

        </div>
    )
}

export default ActMateria
