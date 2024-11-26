import React, { useState, useEffect } from "react";
import { usePage, Link, useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import axios from "axios";

export default function NeighborhoodAssociationsIndex() {
    const { associations, filters, flash, userRole } = usePage().props;
    const { data, setData, get } = useForm({
        name: filters.name || "",
    });
    const [showAlert, setShowAlert] = useState(!!flash.success);
    const [latest, setLatest] = useState(""); // Estado para capturar el filtro "últimas"

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
                responseType: 'blob', // Descargar como blob
                params: { latest: latest || undefined }, // Asegura que solo envíe si hay valor
            });

            // Crear una URL para el archivo descargado
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'neighborhood_associations.xlsx'); // Nombre del archivo
            document.body.appendChild(link);
            link.click();
            link.remove(); // Eliminar el enlace después de la descarga
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
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Junta de Vecinos
                </h2>
            }
        >
            <Head title="Asociaciones de Vecinos" />

            {/* Alerta de éxito */}
            {showAlert && (
                <div
                    className="alert alert-success flex items-center justify-between p-4 mb-4 text-green-700 bg-green-100 rounded-lg"
                    role="alert"
                >
                    <span>{flash.success}</span>
                    <button
                        type="button"
                        className="text-green-700 hover:text-green-900"
                        onClick={() => setShowAlert(false)}
                    >
                        <span className="sr-only">Cerrar</span>✖
                    </button>
                </div>
            )}

            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <Link
                    href="/neighborhood-associations/create"
                    className="text-blue-500 hover:text-blue-700 mb-4 md:mb-0"
                >
                    Crear Nueva Asociación
                </Link>

                {/* Campo para seleccionar cuántas asociaciones exportar */}
                <div className="flex items-center gap-2">
                    <label htmlFor="latest" className="text-sm text-gray-700">
                        Últimas Asociaciones:
                    </label>
                    <input
                        type="number"
                        id="latest"
                        value={latest}
                        onChange={(e) => setLatest(e.target.value)}
                        placeholder="Ej: 5"
                        className="border rounded px-2 py-1"
                    />
                </div>

                {/* Botón de exportar */}
                <button
                    onClick={handleExport}
                    className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-700 mb-4 md:mb-0"
                >
                    Exportar a Excel
                </button>

                {/* Filtro de búsqueda */}
                <form
                    onSubmit={handleSearch}
                    className="flex flex-col md:flex-row"
                >
                    <input
                        type="text"
                        placeholder="Buscar por nombre"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="border rounded px-2 py-1 mb-2 md:mb-0 md:mr-2 w-full md:w-auto"
                    />
                    <button
                        type="submit"
                        className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 w-full md:w-auto"
                    >
                        Buscar
                    </button>
                </form>
            </div>

            {/* Tabla responsive */}
            <div className="overflow-x-auto">
                <table className="table-auto w-full mt-4 text-sm md:text-base">
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
                        {associations.data.map((association) => (
                            <tr key={association.id} className="border-t">
                                <td className="px-4 py-2">
                                    {association.name}
                                </td>
                                <td className="px-4 py-2">
                                    {association.address}
                                </td>
                                <td className="px-4 py-2">
                                    {association.phone}
                                </td>
                                <td className="px-4 py-2">
                                    {association.email}
                                </td>
                                <td className="px-4 py-2 flex flex-col md:flex-row gap-2">
                                    <Link
                                        href={`/neighborhood-associations/${association.id}`}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        Ver
                                    </Link>
                                    <Link
                                        href={`/neighborhood-associations/${association.id}/edit`}
                                        className="text-yellow-500 hover:text-yellow-700"
                                    >
                                        Editar
                                    </Link>
                                    <button
                                        onClick={() =>
                                            handleDelete(association.id)
                                        }
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

            {/* Paginación */}
            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                {associations.links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.url || ""}
                        className={`px-4 py-2 border rounded ${
                            link.active ? "font-bold" : ""
                        } ${
                            link.url
                                ? "text-blue-500 hover:text-blue-700"
                                : "text-gray-400"
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    ></Link>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
