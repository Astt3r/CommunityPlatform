import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { formatDate } from "@/Components/formatDate";

export default function ExpensesIndex({ expenses }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm("¿Estás seguro de que deseas eliminar este gasto?")) {
            destroy(route("expenses.destroy", id), {
                onError: (error) => console.error("Error al eliminar el gasto:", error),
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Lista de Gastos
                    </h2>
                    <Link
                        href={route("expenses.create")}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                        Crear Nuevo Gasto
                    </Link>
                </div>
            }
        >
            <Head title="Gastos" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="text-lg font-semibold mb-4">
                                Listado de Gastos
                            </h2>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                                {(expenses.data || []).map((expense) => (
                                    <div
                                        key={expense.id}
                                        className="p-4 border rounded-lg shadow-sm"
                                    >
                                        <h3 className="font-bold text-lg">
                                            {expense.concept}
                                        </h3>
                                        <p>
                                            <strong>Responsable:</strong>{" "}
                                            {expense.responsible || "No especificado"}
                                        </p>
                                        <p>
                                            <strong>Monto:</strong> ${expense.amount}
                                        </p>
                                        <p>
                                            <strong>Estado:</strong>{" "}
                                            {expense.status || "Desconocido"}
                                        </p>
                                        <p>
                                            <strong>Fecha:</strong>{" "}
                                            {formatDate(expense.date)}
                                        </p>
                                        <div className="flex space-x-4 mt-2">
                                            <Link
                                                href={route(
                                                    "expenses.edit",
                                                    expense.id
                                                )}
                                                className="text-blue-500 hover:underline"
                                            >
                                                Editar
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(expense.id)}
                                                className="text-red-500 hover:underline"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {expenses.data.length === 0 && (
                                <p className="text-center text-gray-600 mt-6">
                                    No hay gastos registrados.
                                </p>
                            )}

                            <div className="mt-6">
                                <div className="flex justify-between">
                                    {expenses.prev_page_url && (
                                        <Link
                                            href={expenses.prev_page_url}
                                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
                                        >
                                            Anterior
                                        </Link>
                                    )}
                                    {expenses.next_page_url && (
                                        <Link
                                            href={expenses.next_page_url}
                                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
                                        >
                                            Siguiente
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
