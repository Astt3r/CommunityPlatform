import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function IncomeIndex({ incomes }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm("¿Estás seguro de que deseas eliminar este ingreso?")) {
            destroy(route("incomes.destroy", id), {
                onSuccess: () => console.log("Ingreso eliminado correctamente."),
                onError: (error) => console.error("Error al eliminar ingreso:", error),
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Ingresos
                    </h2>
                    <Link
                        href={route("incomes.create")}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Crear Nuevo Ingreso
                    </Link>
                </div>
            }
        >
            <Head title="Ingresos" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        {incomes.data.length > 0 ? (
                            <table className="w-full border-collapse border border-gray-200">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border border-gray-300 px-4 py-2 text-left">
                                            Fuente
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">
                                            Responsable
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">
                                            Fecha
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">
                                            Monto
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">
                                            Tipo
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">
                                            Estado
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2 text-center">
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {incomes.data.map((income) => (
                                        <tr key={income.id} className="hover:bg-gray-50">
                                            <td className="border border-gray-300 px-4 py-2">
                                                {income.source}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {income.responsible}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {income.date}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                ${income.amount.toFixed(2)}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {income.type?.name || "No especificado"}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {income.status === "active" ? "Activo" : "Inactivo"}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2 text-center">
                                                <div className="flex justify-center space-x-4">
                                                    <Link
                                                        href={route(
                                                            "incomes.edit",
                                                            income.id
                                                        )}
                                                        className="text-blue-500 hover:underline"
                                                    >
                                                        Editar
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(income.id)}
                                                        className="text-red-500 hover:underline"
                                                    >
                                                        Eliminar
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-center text-gray-600">
                                No hay ingresos registrados.
                            </p>
                        )}

                        <div className="mt-4">
                            {incomes.links && (
                                <div className="flex justify-between">
                                    {incomes.links.prev && (
                                        <Link
                                            href={incomes.links.prev}
                                            className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
                                        >
                                            Anterior
                                        </Link>
                                    )}
                                    {incomes.links.next && (
                                        <Link
                                            href={incomes.links.next}
                                            className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
                                        >
                                            Siguiente
                                        </Link>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
