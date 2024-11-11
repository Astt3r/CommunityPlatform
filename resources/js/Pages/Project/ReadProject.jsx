import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { formatDate } from "@/Components/formatDate";

export default function Projects({ projects = [] }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm("¿Estás seguro de que deseas eliminar este proyecto?")) {
            destroy(route("project.destroy", id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Proyectos Recientes
                    </h2>
                    <div className="flex justify-end">
                        <Link
                            href={route("project.create")}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                            Crear Nuevo Proyecto
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Proyectos" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="text-xl font-semibold mb-4">
                                Proyectos Realizados
                            </h2>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                                {projects.map((project) => (
                                    <div
                                        key={project.id_proyecto}
                                        className="p-4 border rounded-lg"
                                    >
                                        <h3 className="font-bold text-lg">
                                            {project.nombre}
                                        </h3>
                                        <p className="text-gray-600">
                                            {project.descripcion}
                                        </p>
                                        <p>
                                            <strong>Fecha de Inicio:</strong>{" "}
                                            {formatDate(project.fecha_inicio)}
                                        </p>
                                        <p>
                                            <strong>Fecha de Fin:</strong>{" "}
                                            {formatDate(project.fecha_fin)}
                                        </p>
                                        <p>
                                            <strong>Estado:</strong>{" "}
                                            {project.estado}
                                        </p>
                                        <div className="flex space-x-2 mt-2">
                                            <Link
                                                href={route(
                                                    "project.edit",
                                                    project.id_proyecto
                                                )}
                                                className="text-sky-500"
                                            >
                                                Editar
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        project.id_proyecto
                                                    )
                                                }
                                                className="text-red-500"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
