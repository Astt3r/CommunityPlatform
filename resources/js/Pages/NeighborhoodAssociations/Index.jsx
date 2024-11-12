import React from "react";
import { usePage, Link } from "@inertiajs/react";

export default function NeighborhoodAssociationsIndex() {
    const { associations } = usePage().props;

    const handleDelete = (id) => {
        if (confirm("¿Estás seguro de que deseas eliminar esta asociación?")) {
            destroy(route("neighborhood-associations.destroy", id));
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Asociaciones de Vecinos</h1>
            <Link
                href="/neighborhood-associations/create"
                className="text-blue-500 hover:text-blue-700"
            >
                Crear Nueva Asociación
            </Link>

            <table className="table-auto w-full mt-4">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Nombre</th>
                        <th className="px-4 py-2">Dirección</th>
                        <th className="px-4 py-2">Teléfono</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {associations.map((association) => (
                        <tr key={association.id} className="border-t">
                            <td className="px-4 py-2">{association.name}</td>
                            <td className="px-4 py-2">{association.address}</td>
                            <td className="px-4 py-2">{association.phone}</td>
                            <td className="px-4 py-2">{association.email}</td>
                            <td className="px-4 py-2">
                                <Link
                                    href={`/neighborhood-associations/${association.id}`}
                                    className="text-blue-500 hover:text-blue-700 mr-2"
                                >
                                    Ver
                                </Link>
                                <Link
                                    href={`/neighborhood-associations/${association.id}/edit`}
                                    className="text-yellow-500 hover:text-yellow-700 mr-2"
                                >
                                    Editar
                                </Link>
                                <button
                                    onClick={() => handleDelete(association.id)}
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
    );
}
