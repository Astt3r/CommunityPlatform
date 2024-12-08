import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { formatDate } from "@/Components/formatDate";

export default function ExpensesIndex({ expenses, flash, auth }) {
    const { delete: destroy, processing } = useForm();
    const [showAlert, setShowAlert] = useState(!!flash?.success);

    const userRole = auth.user.role; // Acceder al rol del usuario

    const handleDelete = (id) => {
        if (confirm("¿Estás seguro de que deseas eliminar este gasto?")) {
            destroy(route("expenses.destroy", id), {
                onSuccess: () => setShowAlert(true),
                onError: (error) =>
                    console.error("Error al eliminar el gasto:", error),
            });
        }
    };

    // Función para traducir y estilizar los estados
    const getStatusLabel = (status) => {
        const statusMap = {
            approved: { label: "Aprobado", className: "text-green-500" },
            pending: { label: "Pendiente", className: "text-yellow-500" },
            rejected: { label: "Rechazado", className: "text-red-500" },
        };

        return (
            statusMap[status] || {
                label: "Desconocido",
                className: "text-gray-500",
            }
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold text-gray-800">
                    Lista de Gastos
                </h2>
            }
        >
            <Head title="Gastos" />

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
                {userRole !== "resident" && ( // Ocultar para "resident"
                    <Link
                        href={route("expenses.create")}
                        className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 text-center"
                    >
                        Crear Nuevo Gasto
                    </Link>
                )}
            </div>

            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="table-auto w-full text-left text-gray-600">
                    <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
                        <tr>
                            <th className="px-6 py-3">Concepto</th>
                            <th className="px-6 py-3">Responsable</th>
                            <th className="px-6 py-3">Monto</th>
                            <th className="px-6 py-3">Estado</th>
                            <th className="px-6 py-3">Fecha</th>
                            <th className="px-6 py-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(expenses.data || []).map((expense, index) => {
                            const { label, className } = getStatusLabel(
                                expense.status
                            );

                            return (
                                <tr
                                    key={expense.id}
                                    className={`border-t ${
                                        index % 2 === 0 ? "bg-gray-50" : ""
                                    }`}
                                >
                                    <td className="px-6 py-3">
                                        {expense.concept}
                                    </td>
                                    <td className="px-6 py-3">
                                        {expense.responsible ||
                                            "No especificado"}
                                    </td>
                                    <td className="px-6 py-3">
                                        ${expense.amount}
                                    </td>
                                    <td className={`px-6 py-3 ${className}`}>
                                        {label}
                                    </td>
                                    <td className="px-6 py-3">
                                        {formatDate(expense.date)}
                                    </td>
                                    <td className="px-6 py-3 flex flex-col md:flex-row gap-2">
                                        {userRole !== "resident" && ( // Ocultar para "resident"
                                            <>
                                                <Link
                                                    href={route(
                                                        "expenses.edit",
                                                        expense.id
                                                    )}
                                                    className="w-full md:w-auto px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-700 text-center"
                                                >
                                                    Editar
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(expense.id)
                                                    }
                                                    disabled={processing}
                                                    className="w-full md:w-auto px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700 text-center"
                                                >
                                                    Eliminar
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Mensaje cuando no hay datos */}
            {expenses.data.length === 0 && (
                <p className="text-center text-gray-600 mt-6">
                    No hay gastos registrados.
                </p>
            )}

            {/* Paginación */}
            <div className="mt-6 flex justify-center gap-2">
                {expenses.links.map((link, index) => (
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
