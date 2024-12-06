import React from "react";
import { usePage, Link } from "@inertiajs/react";

export default function NeighborShow() {
    const { neighbor, attendanceSummary } = usePage().props;

    if (!neighbor) {
        return <div className="container mx-auto p-4">No se encontraron datos del vecino.</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center md:text-left">
                {neighbor.user_name || "Usuario no asignado"}
            </h1>
            <h2 className="text-lg font-semibold mb-2 text-center md:text-left">
                Nombre del Usuario: {neighbor.user_name || "N/A"}
            </h2>

            <div className="bg-white shadow rounded p-4 mb-4">
                <h2 className="text-xl font-semibold mb-2">Detalles del Vecino</h2>
                <p className="mb-2">
                    <strong>Dirección:</strong> {neighbor.address || "N/A"}
                </p>
                <p className="mb-2">
                    <strong>Número de Identificación:</strong> {neighbor.identification_number || "N/A"}
                </p>
                <p className="mb-2">
                    <strong>Fecha de Registro:</strong> {neighbor.registration_date || "N/A"}
                </p>
                <p className="mb-2">
                    <strong>Fecha de Nacimiento:</strong> {neighbor.birth_date || "N/A"}
                </p>
                <p className="mb-2">
                    <strong>Estado:</strong> {neighbor.status === "active" ? "Activo" : "Inactivo"}
                </p>
                <p className="mb-2">
                    <strong>Última Participación:</strong> {neighbor.last_participation_date || "N/A"}
                </p>
                <p className="mb-2">
                    <strong>Asociación Vecinal:</strong> {neighbor.neighborhood_association_name || "N/A"}
                </p>
                <p className="mb-2">
                    <strong>Correo Electrónico:</strong> {neighbor.user_email || "N/A"}
                </p>
                <p className="mb-2">
                    <strong>Rol:</strong> {neighbor.user_role || "N/A"}
                </p>
            </div>

            <div className="bg-white shadow rounded p-4 mb-4">
                <h2 className="text-xl font-semibold mb-2">Resumen de Asistencia</h2>
                <p className="mb-2">
                    <strong>Total de Reuniones:</strong> {attendanceSummary.totalMeetings}
                </p>
                <p className="mb-2">
                    <strong>Reuniones Asistidas:</strong> {attendanceSummary.attendedMeetings}
                </p>
                <p className="mb-2">
                    <strong>Porcentaje de Asistencia:</strong> {attendanceSummary.attendancePercentage}%
                </p>
            </div>

            <div className="flex justify-between mt-4">
                <Link
                    href="/neighbors"
                    className="text-blue-500 hover:text-blue-700"
                >
                    Volver a la lista
                </Link>
                <Link
                    href={`/neighbors/${neighbor.id}/edit`}
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
                >
                    Editar Vecino
                </Link>
            </div>
        </div>
    );
}
