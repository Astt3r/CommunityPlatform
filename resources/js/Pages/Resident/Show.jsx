import React from "react";
import { usePage, Link } from "@inertiajs/react";

export default function ResidentShow() {
    const { resident } = usePage().props;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center md:text-left">
                {resident.user_name}
            </h1>

            <div className="bg-white shadow rounded p-4 mb-4">
                <h2 className="text-xl font-semibold mb-2">
                    Detalles del Residente
                </h2>
                <p className="mb-2">
                    <strong>Dirección:</strong> {resident.address}
                </p>
                <p className="mb-2">
                    <strong>Número de Identificación:</strong> {resident.identification_number}
                </p>
                <p className="mb-2">
                    <strong>Fecha de Registro:</strong> {resident.registration_date}
                </p>
                <p className="mb-2">
                    <strong>Fecha de Nacimiento:</strong> {resident.birth_date}
                </p>
                <p className="mb-2">
                    <strong>Estado:</strong> {resident.status}
                </p>
                <p className="mb-2">
                    <strong>Última Participación:</strong> {resident.last_participation_date}
                </p>
                <p className="mb-2">
                    <strong>Asociación Vecinal:</strong> {resident.neighborhood_association_name || 'N/A'}
                </p>
            </div>

            <div className="flex justify-between mt-4">
                <Link
                    href="/residents"
                    className="text-blue-500 hover:text-blue-700"
                >
                    Volver a la lista
                </Link>
                <Link
                    href={`/residents/${resident.id}/edit`}
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
                >
                    Editar Residente
                </Link>
            </div>
        </div>
    );
}
