import React from "react";
import { usePage, Link } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function ProjectsIndex() {
    const { projects = { data: [], links: [] } } = usePage().props;

    const handleDelete = (id) => {
        if (confirm("¿Estás seguro de que deseas eliminar este proyecto?")) {
            router.delete(route("projects.destroy", id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Proyectos
                </h2>
            }
        >
            <Head title="Proyectos" />

            <div className="flex justify-end mb-4">
            <Link
    href={route("projects.create")}
    className="text-blue-500 hover:text-blue-700"
>
    Crear Nuevo Proyecto
</Link>
            </div>

            <div className="overflow-x-auto">
                <table className="table-auto w-full mt-4 text-sm md:text-base">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Nombre</th>
                            <th className="px-4 py-2">Descripción</th>
                            <th className="px-4 py-2">Estado</th>
                            <th className="px-4 py-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.data.map((project) => (
                            <tr key={project.id} className="border-t">
                                <td className="px-4 py-2">{project.name}</td>
                                <td className="px-4 py-2">{project.description}</td>
                                <td className="px-4 py-2">{project.status}</td>
                                <td className="px-4 py-2 flex flex-col md:flex-row gap-2">
                                    <Link
                                        href={route("projects.show", project.id)}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        Ver
                                    </Link>
                                    <Link
                                        href={route("projects.edit", project.id)}
                                        className="text-yellow-500 hover:text-yellow-700"
                                    >
                                        Editar
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(project.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                {projects.links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.url || ""}
                        className={`px-4 py-2 border rounded ${
                            link.active ? "font-bold" : ""
                        } ${
                            link.url
                                ? "text-blue-500 hover:text-blue-700"
                                : "text-gray-400 cursor-not-allowed"
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    ></Link>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
