import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { formatDate } from "@/Components/formatDate";

export default function IncomeIndex({ incomes, flash }) {
    const { delete: destroy, processing } = useForm();
    const [showAlert, setShowAlert] = useState(!!flash?.success);

    const handleDelete = (id) => {
        if (confirm("¿Estás seguro de que deseas eliminar este ingreso?")) {
            destroy(route("incomes.destroy", id), {
                onSuccess: () => setShowAlert(true),
                onError: (error) =>
                    console.error("Error al eliminar ingreso:", error),
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold text-gray-800">Ingresos</h2>
            }
        >
            <Head title="Ingresos" />

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
                    href={route("incomes.create")}
                    className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 text-center"
                >
                    Crear Nuevo Ingreso
                </Link>
            </div>

            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                {incomes.data.length > 0 ? (
                    <table className="table-auto w-full text-left text-gray-600">
                        <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
                            <tr>
                                <th className="px-6 py-3">Fuente</th>
                                <th className="px-6 py-3">Responsable</th>
                                <th className="px-6 py-3">Fecha</th>
                                <th className="px-6 py-3">Monto</th>
                                <th className="px-6 py-3">Tipo</th>
                                <th className="px-6 py-3">Estado</th>
                                <th className="px-6 py-3">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {incomes.data.map((income, index) => (
                                <tr
                                    key={income.id}
                                    className={`border-t ${
                                        index % 2 === 0 ? "bg-gray-50" : ""
                                    }`}
                                >
                                    <td className="px-6 py-3">
                                        {income.source}
                                    </td>
                                    <td className="px-6 py-3">
                                        {income.responsible}
                                    </td>
                                    <td className="px-6 py-3">
                                        {formatDate(income.date)}
                                    </td>
                                    <td className="px-6 py-3">
                                        ${income.amount.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-3">
                                        {income.type?.name || "No especificado"}
                                    </td>
                                    <td
                                        className={`px-6 py-3 ${
                                            income.status === "active"
                                                ? "text-green-500"
                                                : "text-red-500"
                                        }`}
                                    >
                                        {income.status === "active"
                                            ? "Activo"
                                            : "Inactivo"}
                                    </td>
                                    <td className="px-6 py-3 flex flex-col md:flex-row gap-2">
                                        <Link
                                            href={route(
                                                "incomes.edit",
                                                income.id
                                            )}
                                            className="w-full md:w-auto px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-700 text-center"
                                        >
                                            Editar
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleDelete(income.id)
                                            }
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
                ) : (
                    <div className="p-6 text-center bg-gray-50 rounded-lg shadow">
                        <p className="text-lg font-semibold text-gray-600">
                            No hay ingresos registrados.
                        </p>
                    </div>
                )}
            </div>

            {/* Paginación */}
            <div className="mt-6 flex justify-center gap-2">
                {incomes.links.map((link, index) => (
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
