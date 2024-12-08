import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React, { useState } from "react";

export default function Index({ expenseTypes, flash }) {
    const { delete: destroy, processing } = useForm();
    const [showAlert, setShowAlert] = useState(!!flash?.success);

    const handleDelete = (id) => {
        if (
            confirm("¿Estás seguro de que deseas eliminar este tipo de gasto?")
        ) {
            destroy(route("expense-types.destroy", id), {
                onSuccess: () => setShowAlert(true),
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold text-gray-800">
                    Tipos de Gastos
                </h2>
            }
        >
            <Head title="Tipos de Gastos" />

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

            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <Link
                    href={route("expense-types.create")}
                    className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 text-center"
                >
                    Crear Tipo de Gasto
                </Link>
            </div>

            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="table-auto w-full text-left text-gray-600">
                    <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
                        <tr>
                            <th className="px-6 py-3">Nombre</th>
                            <th className="px-6 py-3">Código</th>
                            <th className="px-6 py-3">Estado</th>
                            <th className="px-6 py-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenseTypes.data.map((type, index) => (
                            <tr
                                key={type.id}
                                className={`border-t ${
                                    index % 2 === 0 ? "bg-gray-50" : ""
                                }`}
                            >
                                <td className="px-6 py-3">{type.name}</td>
                                <td className="px-6 py-3">{type.code}</td>
                                <td
                                    className={`px-6 py-3 ${
                                        type.status === "active"
                                            ? "text-green-500"
                                            : "text-red-500"
                                    }`}
                                >
                                    {type.status === "active"
                                        ? "Activo"
                                        : "Inactivo"}
                                </td>
                                <td className="px-6 py-3 flex flex-col md:flex-row gap-2">
                                    {/* Editar */}
                                    <Link
                                        href={route(
                                            "expense-types.edit",
                                            type.id
                                        )}
                                        className="w-full md:w-auto px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-700 text-center"
                                    >
                                        Editar
                                    </Link>

                                    {/* Eliminar */}
                                    <button
                                        onClick={() => handleDelete(type.id)}
                                        disabled={processing}
                                        className="w-full md:w-auto px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700 text-center"
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
                {expenseTypes.links.map((link, index) => (
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
