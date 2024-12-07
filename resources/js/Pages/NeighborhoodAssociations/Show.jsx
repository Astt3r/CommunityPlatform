import React from "react";
import { usePage, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function NeighborhoodAssociationShow() {
    const { association } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <h1 className="font-semibold text-xl text-gray-800 leading-tight">
                    Detalles de la Junta de Vecinos
                </h1>
            }
        >
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4 text-center md:text-left">
                    {association.name}
                </h1>

                <div className="bg-white shadow rounded p-4 mb-4">
                    <h2 className="text-xl font-semibold mb-2">
                        Detalles de la Asociación
                    </h2>
                    <p className="mb-2">
                        <strong>Dirección:</strong> {association.address}
                    </p>
                    <p className="mb-2">
                        <strong>Teléfono:</strong> {association.phone}
                    </p>
                    <p className="mb-2">
                        <strong>Email:</strong> {association.email}
                    </p>
                    <p className="mb-2">
                        <strong>Website:</strong>{" "}
                        <a
                            href={association.website_url}
                            className="text-blue-500 hover:text-blue-700"
                        >
                            {association.website_url}
                        </a>
                    </p>
                    <p className="mb-2">
                        <strong>Número de Miembros:</strong>{" "}
                        {association.number_of_members}
                    </p>
                    <p className="mb-2">
                        <strong>Fecha de Fundación:</strong>{" "}
                        {association.date_of_funding}
                    </p>
                    <p className="mb-2">
                        <strong>Estado:</strong>{" "}
                        {association.is_active ? "Activo" : "Inactivo"}
                    </p>
                </div>

                <div className="flex justify-between mt-4">
                    <Link
                        href="/neighborhood-associations"
                        className="text-blue-500 hover:text-blue-700"
                    >
                        Volver a la lista
                    </Link>
                    <Link
                        href={`/neighborhood-associations/${association.id}/edit`}
                        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
                    >
                        Editar Asociación
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
