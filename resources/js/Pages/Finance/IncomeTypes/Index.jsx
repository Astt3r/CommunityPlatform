import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function IncomeTypesIndex({ incomeTypes }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm("¿Estás seguro de que deseas eliminar este tipo de ingreso?")) {
            destroy(route("income-types.destroy", id), {
                onSuccess: () => console.log("Tipo de ingreso eliminado."),
                onError: (error) => console.error("Error al eliminar:", error),
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Tipos de Ingresos
                    </h2>
                    <Link
                        href={route("income-types.create")}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Crear Tipo de Ingreso
                    </Link>
                </div>
            }
        >
            <Head title="Tipos de Ingresos" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        {incomeTypes.data.length > 0 ? (
                            <table className="w-full border-collapse border border-gray-200">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border border-gray-300 px-4 py-2 text-left">
                                            Nombre
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">
                                            Descripción
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">
                                            Código
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
                                    {incomeTypes.data.map((type) => (
                                        <tr key={type.id} className="hover:bg-gray-50">
                                            <td className="border border-gray-300 px-4 py-2">
                                                {type.name}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {type.description || "Sin descripción"}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {type.code}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {type.status === "active" ? "Activo" : "Inactivo"}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2 text-center">
                                                <div className="flex justify-center space-x-4">
                                                    <Link
                                                        href={route(
                                                            "income-types.edit",
                                                            type.id
                                                        )}
                                                        className="text-blue-500 hover:underline"
                                                    >
                                                        Editar
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(type.id)}
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
                                No hay tipos de ingresos registrados.
                            </p>
                        )}

                        <div className="mt-4">
                            {incomeTypes.links && (
                                <div className="flex justify-between">
                                    {incomeTypes.links.prev && (
                                        <Link
                                            href={incomeTypes.links.prev}
                                            className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
                                        >
                                            Anterior
                                        </Link>
                                    )}
                                    {incomeTypes.links.next && (
                                        <Link
                                            href={incomeTypes.links.next}
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
