import React from "react";
import { useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function EditProject({ project }) {
    const { data, setData, put, errors } = useForm({
        nombre: project.nombre || "",
        descripcion: project.descripcion || "",
        problema: project.problema || "",
        fecha_inicio: project.fecha_inicio || "",
        fecha_fin: project.fecha_fin || "",
        estado: project.estado || "",
        responsable: project.responsable || "",
        presupuesto: project.presupuesto || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("project.update", project.id_proyecto)); // Asegúrate de usar el ID correcto
    };

    return (
        <AuthenticatedLayout header={<h2>Editar Proyecto</h2>}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label>Nombre del Proyecto</label>
                    <input
                        type="text"
                        value={data.nombre}
                        onChange={(e) => setData("nombre", e.target.value)}
                        className="mt-1 block w-full"
                    />
                    {errors.nombre && <div>{errors.nombre}</div>}
                </div>
                <div>
                    <label>Descripción</label>
                    <textarea
                        value={data.descripcion}
                        onChange={(e) => setData("descripcion", e.target.value)}
                        className="mt-1 block w-full"
                    />
                    {errors.descripcion && <div>{errors.descripcion}</div>}
                </div>
                <div>
                    <label>Problema</label>
                    <textarea
                        value={data.problema}
                        onChange={(e) => setData("problema", e.target.value)}
                        className="mt-1 block w-full"
                    />
                    {errors.problema && <div>{errors.problema}</div>}
                </div>
                <div>
                    <label>Fecha de Inicio</label>
                    <input
                        type="date"
                        value={data.fecha_inicio}
                        onChange={(e) =>
                            setData("fecha_de_inicio", e.target.value)
                        }
                        className="mt-1 block w-full"
                    />
                    {errors.fecha_de_inicio && <div>{errors.fecha_inicio}</div>}
                </div>
                <div>
                    <label>Fecha de fin</label>
                    <input
                        type="date"
                        value={data.fecha_fin}
                        onChange={(e) => setData("fecha_fin", e.target.value)}
                        className="mt-1 block w-full"
                    />
                    {errors.fecha_fin && <div>{errors.fecha_fin}</div>}
                </div>
                <div>
                    <label>Estado</label>
                    <input
                        type="text"
                        value={data.estado}
                        onChange={(e) => setData("estado", e.target.value)}
                        className="mt-1 block w-full"
                    />
                    {errors.estado && <div>{errors.estado}</div>}
                </div>
                <div>
                    <label>Responsable</label>
                    <input
                        type="text"
                        value={data.responsable}
                        onChange={(e) => setData("responsable", e.target.value)}
                        className="mt-1 block w-full"
                    />
                    {errors.responsable && <div>{errors.responsable}</div>}
                </div>
                <div>
                    <label>Presupuesto</label>
                    <input
                        type="number"
                        value={data.presupuesto}
                        onChange={(e) => setData("presupuesto", e.target.value)}
                        className="mt-1 block w-full"
                    />
                    {errors.presupuesto && <div>{errors.presupuesto}</div>}
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                >
                    Guardar Cambios
                </button>
            </form>
        </AuthenticatedLayout>
    );
}
