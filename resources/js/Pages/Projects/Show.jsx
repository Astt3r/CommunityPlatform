import React from "react";
import { usePage, Link } from "@inertiajs/react";

export default function ProjectShow() {
    const { project } = usePage().props;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center md:text-left">
                {project.name}
            </h1>

            <div className="bg-white shadow rounded p-4 mb-4">
                <h2 className="text-xl font-semibold mb-2">
                    Detalles del Proyecto
                </h2>
                <p className="mb-2">
                    <strong>Descripción:</strong> {project.description}
                </p>
                <p className="mb-2">
                    <strong>Problema Abordado:</strong> {project.issue}
                </p>
                <p className="mb-2">
                    <strong>Fecha de Inicio:</strong> {project.start_date}
                </p>
                <p className="mb-2">
                    <strong>Fecha de Finalización:</strong> {project.end_date}
                </p>
                <p className="mb-2">
                    <strong>Estado:</strong>{" "}
                    {project.status || "No especificado"}
                </p>
                <p className="mb-2">
                    <strong>Presupuesto:</strong> ${project.budget}
                </p>

                {project.files?.length > 0 && (
                    <div className="mb-2">
                        <strong>Archivos Adjuntos:</strong>
                        <ul className="list-disc list-inside mt-2">
                            {project.files.map((file) => (
                                <li key={file.id}>
                                    <a
                                        href={`/storage/${file.file_path}`}
                                        className="text-blue-500 hover:text-blue-700"
                                        download
                                    >
                                        Descargar{" "}
                                        {file.file_path.split("/").pop()}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Sección de vecinos asignados */}
            <div className="bg-white shadow rounded p-4 mb-4">
                <h2 className="text-xl font-semibold mb-2">
                    Vecinos Asignados
                </h2>
                {project.neighbors?.length > 0 ? (
                    <ul className="list-disc list-inside">
                        {project.neighbors.map((neighbor) => (
                            <li key={neighbor.id} className="mb-2">
                                <strong>Nombre:</strong> {neighbor.user.name}{" "}
                                <br />
                                <strong>Dirección:</strong> {neighbor.address}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No hay vecinos asignados a este proyecto.</p>
                )}
            </div>

            {/* Sección de historial de cambios */}
            <div className="bg-white shadow rounded p-4">
                <h2 className="text-xl font-semibold mb-2">
                    Historial de Cambios
                </h2>
                {project.changes ? (
                    <ul className="list-disc list-inside">
                        {project.changes.split("\n").map((change, index) => (
                            <li key={index} className="mb-2">
                                {change}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No hay cambios registrados.</p>
                )}
            </div>

            <div className="flex justify-between mt-4">
                <Link
                    href="/projects"
                    className="text-blue-500 hover:text-blue-700"
                >
                    Volver a la lista
                </Link>
                <Link
                    href={`/projects/${project.id}/edit`}
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
                >
                    Editar Proyecto
                </Link>
            </div>
        </div>
    );
}
