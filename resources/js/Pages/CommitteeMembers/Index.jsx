import React from "react";
import { Link, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function CommitteeMembersIndex() {
    const { committeeMembers } = usePage().props; // Datos enviados desde el controlador

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Miembros del Comité
                </h2>
            }
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-xl">Miembros de Directivas</h3>
                            <div className="flex space-x-4">
                                <Link
                                    href="/committee-members/create"
                                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Agregar Miembro
                                </Link>
                                <Link
                                    href={route('committees.index')}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Ver Tipos de Directivas
                                </Link>
                            </div>
                        </div>

                        {committeeMembers.length > 0 ? (
                            <table className="table-auto w-full border-collapse border border-gray-300">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="border border-gray-300 px-4 py-2 text-left">#</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">Comité</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">Usuario</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">Estado</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">Fecha de Ingreso</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">Fecha de Salida</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {committeeMembers.map((member, index) => (
                                        <tr key={member.id} className="hover:bg-gray-50">
                                            <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                                            <td className="border border-gray-300 px-4 py-2">{member.committee.name}</td>
                                            <td className="border border-gray-300 px-4 py-2">{member.user.name}</td>
                                            <td className="border border-gray-300 px-4 py-2 capitalize">{member.status}</td>
                                            <td className="border border-gray-300 px-4 py-2">{member.joined_date}</td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {member.left_date ? member.left_date : "N/A"}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2 space-x-2">
                                                <Link
                                                    href={`/committee-members/${member.id}/edit`}
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    Editar
                                                </Link>
                                                <Link
                                                    href={`/committee-members/${member.id}`}
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
                            <p className="text-gray-500">No hay miembros registrados.</p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
