import React, { useState, useEffect } from "react";
import { usePage, Link, useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import axios from "axios";

export default function NeighborhoodAssociationsIndex() {
    const { associations, filters, flash } = usePage().props;
    const { data, setData, get } = useForm({
        name: filters.name || "",
    });
    const [showAlert, setShowAlert] = useState(!!flash.success);
    const [latest, setLatest] = useState("");

    const handleDelete = (id) => {
        if (confirm("¿Estás seguro de que deseas eliminar esta asociación?")) {
            router.delete(route("neighborhood-associations.destroy", id));
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        get(route("neighborhood-associations.index"));
    };

    const handleExport = async () => {
        try {
            const response = await axios.get('/export-neighborhoods', {
                responseType: 'blob',
                params: { latest: latest || undefined },
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'neighborhood_associations.xlsx');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error al exportar los datos:', error);
        }
    };

    useEffect(() => {
        if (flash.success) {
            setShowAlert(true);
        }
    }, [flash.success]);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold text-gray-800">Junta de Vecinos</h2>
            }
        >
            <Head title="Asociaciones de Vecinos" />

            {/* Alerta de Éxito */}
            {showAlert && (
                <div
                    className="p-4 mb-4 text-green-800 bg-green-100 border border-green-300 rounded-lg"
                    role="alert"
                >
                    <span>{flash.success}</span>
                    <button
                        type="button"
                        className="ml-4 text-sm font-bold underline hover:text-green-900"
                        onClick={() => setShowAlert(false)}
                    >
                        Cerrar
                    </button>
                </div>
            )}

            {/* Controles de Búsqueda y Exportación */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <Link
                    href="/neighborhood-associations/create"
                    className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
                >
                    Crear Nueva Asociación
                </Link>

                <div className="flex items-center gap-4">
                    <form onSubmit={handleSearch} className="flex items-center gap-2">
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

                    <div className="flex items-center gap-2">
                        <label htmlFor="latest" className="text-sm text-gray-700">
                            Exportar últimas:
                        </label>
                        <input
                            type="number"
                            id="latest"
                            value={latest}
                            onChange={(e) => setLatest(e.target.value)}
                            placeholder="Ej: 5"
                            className="px-4 py-2 border rounded focus:ring focus:ring-green-200"
                        />
                        <button
                            onClick={handleExport}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                        >
                            Exportar
                        </button>
                    </div>
                </div>
            </div>

            {/* Tabla de Asociaciones */}
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="table-auto w-full text-left text-gray-600">
                    <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
                        <tr>
                            <th className="px-6 py-3">Nombre</th>
                            <th className="px-6 py-3">Dirección</th>
                            <th className="px-6 py-3">Teléfono</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {associations.data.map((association, index) => (
                            <tr
                                key={association.id}
                                className={`border-t ${index % 2 === 0 ? "bg-gray-50" : ""}`}
                            >
                                <td className="px-6 py-3">{association.name}</td>
                                <td className="px-6 py-3">{association.address}</td>
                                <td className="px-6 py-3">{association.phone}</td>
                                <td className="px-6 py-3">{association.email}</td>
                                <td className="px-6 py-3 flex gap-2">
                                    <Link
                                        href={`/neighborhood-associations/${association.id}`}
                                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
                                    >
                                        Ver
                                    </Link>
                                    <Link
                                        href={`/neighborhood-associations/${association.id}/edit`}
                                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-700"
                                    >
                                        Editar
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(association.id)}
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
                {associations.links.map((link, index) => (
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
