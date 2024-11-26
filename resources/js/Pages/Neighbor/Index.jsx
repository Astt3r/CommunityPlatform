
import React, { useState, useEffect } from "react";
import { usePage, Link, useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function NeighborIndex() {
    const { neighbors, filters, flash, userRole } = usePage().props;
    const { data, setData, get } = useForm({
        name: filters.name || "",
    });
    const [showAlert, setShowAlert] = useState(!!flash.success);

    const handleDelete = (id) => {
        if (confirm("¿Estás seguro de que deseas eliminar este vecino?")) {
            router.delete(route("neighbors.destroy", id), {
                onSuccess: () => {
                    setShowAlert(true); // Mostrar alerta de éxito
                },
            });
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        get(route("neighbors.index"));
    };

    useEffect(() => {
        if (flash.success) {
            setShowAlert(true);
        }
    }, [flash.success]);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold text-gray-800">Vecinos</h2>
            }
        >
            <Head title="Vecinos" />

            {/* Alerta de éxito */}
            {showAlert && (
                <div
                    className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg flex justify-between"
                    role="alert"
                >
                    <span>{flash.success}</span>
                    <button
                        type="button"
                        onClick={() => setShowAlert(false)}
                        className="text-green-700 hover:text-green-900"
                    >
                        ✖
                    </button>
                </div>
            )}

            {/* Controles de Acciones */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <Link
                    href={route("neighbors.create")}
                    className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
                >
                    Crear Nuevo Vecino
                </Link>

                {/* Filtro de búsqueda */}
                <form
                    onSubmit={handleSearch}
                    className="flex flex-col md:flex-row items-center gap-4"
                >
                    <input
                        type="text"
                        placeholder="Buscar por nombre"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="px-4 py-2 border rounded focus:ring focus:ring-blue-200"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                        Buscar
                    </button>
                </form>
            </div>

            {/* Tabla de Vecinos */}
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="table-auto w-full text-left text-gray-600">
                    <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
                        <tr>
                            <th className="px-6 py-3">Rut</th>
                            <th className="px-6 py-3">Usuario Asignado</th>
                            <th className="px-6 py-3">Estado</th>
                            <th className="px-6 py-3">Dirección</th>
                            <th className="px-6 py-3">Fecha de Registro</th>
                            <th className="px-6 py-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {neighbors.data.map((neighbor, index) => (
                            <tr
                                key={neighbor.id}
                                className={`border-t ${index % 2 === 0 ? "bg-gray-50" : ""}`}
                            >
                                <td className="px-6 py-3">
                                    {neighbor.identification_number}
                                </td>
                                <td className="px-6 py-3">
                                    {neighbor.user ? neighbor.user.name : "--USUARIO POR ASIGNAR--"}
                                </td>
                                <td className={`px-6 py-3 ${neighbor.status === "active" ? "text-green-500" : "text-red-500"}`}>
                                    {neighbor.status === "active" ? "Activo" : "Inactivo"}
                                </td>
                                <td className="px-6 py-3">{neighbor.address}</td>
                                <td className="px-6 py-3">{neighbor.registration_date}</td>
                                <td className="px-6 py-3 flex gap-2">
                                    <Link
                                        href={`/neighbors/${neighbor.id}`}
                                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
                                    >
                                        Ver
                                    </Link>
                                    <Link
                                        href={`/neighbors/${neighbor.id}/edit`}
                                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-700"
                                    >
                                        Editar
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(neighbor.id)}
                                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Paginación */}
            <div className="mt-6 flex justify-center gap-2">
                {neighbors.links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.url || ""}
                        className={`px-4 py-2 border rounded ${
                            link.active
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    ></Link>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
