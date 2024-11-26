import React, { useState } from "react";
import { usePage, Link } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import axios from "axios";

export default function ProjectsIndex() {
    const { projects = { data: [], links: [] } } = usePage().props;
    const [latest, setLatest] = useState("");

    const handleDelete = (id) => {
        if (confirm("¿Estás seguro de que deseas eliminar este proyecto?")) {
            router.delete(route("projects.destroy", id));
        }
    };

    const handleExport = async () => {
        try {
            const response = await axios.get('/export-projects', {
                responseType: 'blob',
                params: { latest },
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'projects.xlsx');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error al exportar los datos:', error);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold text-gray-800">Proyectos</h2>
            }
        >
            <Head title="Proyectos" />

            {/* Controles de Acciones */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <Link
                    href={route("projects.create")}
                    className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
                >
                    Crear Nuevo Proyecto
                </Link>

                <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="flex items-center gap-2">
                        <label htmlFor="latest" className="text-sm text-gray-700">
                            Exportar los últimos:
                        </label>
                        <input
                            type="number"
                            id="latest"
                            value={latest}
                            onChange={(e) => setLatest(e.target.value)}
                            placeholder="Ejemplo: 5"
                            className="px-4 py-2 border rounded focus:ring focus:ring-green-200"
                        />
                    </div>
                    <button
                        onClick={handleExport}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                    >
                        Exportar a Excel
                    </button>
                </div>
            </div>

            {/* Tabla de Proyectos */}
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="table-auto w-full text-left text-gray-600">
                    <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
                        <tr>
                            <th className="px-6 py-3">Nombre</th>
                            <th className="px-6 py-3">Descripción</th>
                            <th className="px-6 py-3">Estado</th>
                            <th className="px-6 py-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.data.map((project, index) => (
                            <tr
                                key={project.id}
                                className={`border-t ${index % 2 === 0 ? "bg-gray-50" : ""}`}
                            >
                                <td className="px-6 py-3">{project.name}</td>
                                <td className="px-6 py-3">{project.description}</td>
                                <td className="px-6 py-3">{project.status}</td>
                                <td className="px-6 py-3 flex gap-2">
                                    <Link
                                        href={route("projects.show", project.id)}
                                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
                                    >
                                        Ver
                                    </Link>
                                    <Link
                                        href={route("projects.edit", project.id)}
                                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-700"
                                    >
                                        Editar
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(project.id)}
                                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Paginación */}
            <div className="mt-6 flex justify-center gap-2">
                {projects.links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.url || ""}
                        className={`px-4 py-2 border rounded ${
                            link.active
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    ></Link>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
