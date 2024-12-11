import React from "react";
import { usePage, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";

export default function NeighborShow() {
    const { neighbor, attendanceSummary } = usePage().props;
    const role = usePage().props.auth.user.role;

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";

        const date = new Date(dateString);
        return new Intl.DateTimeFormat("es-CL", {
            year: "numeric",
            month: "long",
            day: "numeric",
        }).format(date);
    };

    if (!neighbor) {
        return (
            <div className="container mx-auto p-4">
                No se encontraron datos del vecino.
            </div>
        );
    }

    return (
        <AuthenticatedLayout>
            <div className="container mx-auto p-4">
                <div className="bg-white shadow rounded p-4 mb-4">
                    <h2 className="text-xl font-semibold mb-2">
                        Detalles del Vecino
                    </h2>
                    <h2 className="mb-2">
                        <strong>Nombre:</strong>{" "}
                        {neighbor.user_name || "N/A"}
                    </h2>
                    <p className="mb-2">
                        <strong>Dirección:</strong> {neighbor.address || "N/A"}
                    </p>
                    <p className="mb-2">
                        <strong>Número de Identificación (RUT):</strong>{" "}
                        {neighbor.identification_number || "N/A"}
                    </p>
                    <p className="mb-2">
                        <strong>Fecha de Registro:</strong>{" "}
                        {formatDate(neighbor.registration_date)}
                    </p>
                    <p className="mb-2">
                        <strong>Fecha de Nacimiento:</strong>{" "}
                        {formatDate(neighbor.birth_date)}
                    </p>
                    {role === "admin" && (
                        <p className="mb-2">
                            <strong>Estado:</strong>{" "}
                            {neighbor.status === "active"
                                ? "Activo"
                                : "Inactivo"}
                        </p>
                    )}
                    {/* 
                    <p className="mb-2">
                        <strong>Última Participación:</strong>{" "}
                        {formatDate(neighbor.last_participation_date)}
                    </p> */}
                    <p className="mb-2">
                        <strong>Junta de Vecinos:</strong>{" "}
                        {neighbor.neighborhood_association_name || "N/A"}
                    </p>
                    <p className="mb-2">
                        <strong>Correo Electrónico:</strong>{" "}
                        {neighbor.user_email || "N/A"}
                    </p>

                    {role === "admin" && (
                        <p className="mb-2">
                            <strong>Rol:</strong> {neighbor.user_role || "N/A"}
                        </p>
                    )}
                </div>

                <div className="bg-white shadow rounded p-4 mb-4">
                    <h2 className="text-xl font-semibold mb-2">
                        Resumen de Asistencia
                    </h2>
                    {attendanceSummary.totalMeetings === 0 && (
                        <p className="mb-2">
                            No se encontraron reuniones registradas.
                        </p>
                    )}

                    {attendanceSummary.totalMeetings > 0 && (
                        <div className="flex justify-between">
                            <p className="mb-2">
                                <strong>Reuniones Registradas:</strong>{" "}
                                {attendanceSummary.totalMeetings}
                            </p>
                            <p className="mb-2">
                                <strong>Reuniones Asistidas:</strong>{" "}
                                {attendanceSummary.attendedMeetings}
                            </p>
                            <p className="mb-2">
                                <strong>Porcentaje de Asistencia:</strong>{" "}
                                {attendanceSummary.attendancePercentage}%
                            </p>
                        </div>
                    )}
                </div>

                <div className="flex justify-between mt-4">
                    <PrimaryButton
                        href="/neighbors"
                        className="bg-blue-500 text-white px-4 py-2"
                    >
                        <Link href={route("neighbors.index")}>
                            Volver a la lista
                        </Link>
                    </PrimaryButton>

                    {role !== "resident" && (
                        <Link
                            href={`/neighbors/${neighbor.id}/edit`}
                            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
                        >
                            Editar Vecino
                        </Link>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
