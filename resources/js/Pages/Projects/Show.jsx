import React from "react";
import { usePage, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";

export default function ProjectShow() {
    const { project, auth } = usePage().props;
    const isResident = auth.user.role === "resident";

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("es-CL", {
            year: "numeric",
            month: "long",
            day: "numeric",
        }).format(date);
    };

    if (!project) {
        return (
            <div className="container mx-auto p-4">
                No se encontraron datos del proyecto.
            </div>
        );
    }

    return (
        <AuthenticatedLayout>
            <div className="container mx-auto p-4">
                <div className="bg-white shadow rounded p-4 mb-4">
                    <h2 className="text-xl font-semibold mb-2">
                        Detalles del Proyecto
                    </h2>
                    <p className="mb-2">
                        <strong>Nombre:</strong> {project.name || "N/A"}
                    </p>
                    <p className="mb-2">
                        <strong>Descripción:</strong>{" "}
                        {project.description || "N/A"}
                    </p>
                    <p className="mb-2">
                        <strong>Problema Abordado:</strong>{" "}
                        {project.issue || "N/A"}
                    </p>
                    <p className="mb-2">
                        <strong>Fecha de Inicio:</strong>{" "}
                        {formatDate(project.start_date)}
                    </p>
                    <p className="mb-2">
                        <strong>Fecha de Finalización:</strong>{" "}
                        {formatDate(project.end_date)}
                    </p>
                    <p className="mb-2">
                        <strong>Estado:</strong>{" "}
                        {project.status
                            ? project.status
                                  .toLowerCase()
                                  .replace(/\b\w/g, (char) =>
                                      char.toUpperCase()
                                  )
                            : "No especificado"}
                    </p>
                    <p className="mb-2">
                        <strong>Presupuesto:</strong> ${project.budget || "N/A"}
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

                <div className="bg-white shadow rounded p-4 mb-4">
                    <h2 className="text-xl font-semibold mb-2">
                        Vecinos Asignados
                    </h2>
                    {project.neighbors?.length > 0 ? (
                        <ul className="list-disc list-inside">
                            {project.neighbors.map((neighbor) => (
                                <li key={neighbor.id} className="mb-2">
                                    <strong>Nombre:</strong>{" "}
                                    {neighbor.user.name || "N/A"} <br />
                                    <strong>Dirección:</strong>{" "}
                                    {neighbor.address || "N/A"}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No hay vecinos asignados a este proyecto.</p>
                    )}
                </div>

                <div className="bg-white shadow rounded p-4 mb-4">
                    <h2 className="text-xl font-semibold mb-2">
                        Historial de Cambios
                    </h2>
                    {project.changes ? (
                        <ul className="list-disc list-inside">
                            {project.changes
                                .split("\n")
                                .map((change, index) => {
                                    // Si la línea comienza con espacios, es una observación (subcomentario)
                                    const isObservation =
                                        change.startsWith("    ");
                                    return (
                                        <li
                                            key={index}
                                            className={`mb-2 ${
                                                isObservation
                                                    ? "ml-6 list-none text-gray-600"
                                                    : ""
                                            }`}
                                        >
                                            {change}
                                        </li>
                                    );
                                })}
                        </ul>
                    ) : (
                        <p>No hay cambios registrados.</p>
                    )}
                </div>

                <div className="flex justify-between mt-4">
                    <PrimaryButton
                        href="/projects"
                        className="bg-blue-500 text-white px-4 py-2"
                    >
                        <Link href={route("projects.index")}>
                            Volver a la lista
                        </Link>
                    </PrimaryButton>

                    {!isResident && (
                        <Link
                            href={`/projects/${project.id}/edit`}
                            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
                        >
                            Editar Proyecto
                        </Link>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
