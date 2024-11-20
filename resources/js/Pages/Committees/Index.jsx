import React from "react";
import { Link, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function CommitteesIndex() {
    const { committees } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Tipos de Directivas
                </h2>
            }
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-xl">Listado de Tipos de Directivas</h3>
                            <Link
                                href="/committees/create"
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Crear Nuevo Comité
                            </Link>
                        </div>
                        {committees.length > 0 ? (
                            <table className="table-auto w-full border-collapse border border-gray-300">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="border border-gray-300 px-4 py-2">#</th>
                                        <th className="border border-gray-300 px-4 py-2">Nombre</th>
                                        <th className="border border-gray-300 px-4 py-2">Descripción</th>
                                        <th className="border border-gray-300 px-4 py-2">Código</th>
                                        <th className="border border-gray-300 px-4 py-2">Tipo</th>
                                        <th className="border border-gray-300 px-4 py-2">Estado</th>
                                        <th className="border border-gray-300 px-4 py-2">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {committees.map((committee, index) => (
                                        <tr key={committee.id} className="hover:bg-gray-50">
                                            <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                                            <td className="border border-gray-300 px-4 py-2">{committee.name}</td>
                                            <td className="border border-gray-300 px-4 py-2">{committee.description}</td>
                                            <td className="border border-gray-300 px-4 py-2">{committee.code}</td>
                                            <td className="border border-gray-300 px-4 py-2 capitalize">
                                                {committee.type}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2 capitalize">
                                                {committee.status}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2 space-x-2">
                                                <Link
                                                    href={`/committees/${committee.id}/edit`}
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    Editar
                                                </Link>
                                                <Link
                                                    href={`/committees/${committee.id}`}
                                                    method="delete"
                                                    as="button"
                                                    className="text-red-600 hover:underline"
                                                >
                                                    Eliminar
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-gray-500">No hay comités registrados.</p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
