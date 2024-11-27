import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Index({ expenseTypes }) {
    const { delete: destroy, processing } = useForm();

    const handleDelete = (id) => {
        if (confirm("¿Estás seguro de que deseas eliminar este tipo de gasto?")) {
            destroy(route("expense-types.destroy", id));
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tipos de Gastos</h2>}
        >
            <Head title="Tipos de Gastos" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <Link
                                href={route("expense-types.create")}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            >
                                Crear Tipo de Gasto
                            </Link>
                            <table className="table-auto w-full mt-4">
                                <thead>
                                    <tr>
                                        <th className="border px-4 py-2">Nombre</th>
                                        <th className="border px-4 py-2">Código</th>
                                        <th className="border px-4 py-2">Estado</th>
                                        <th className="border px-4 py-2">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {expenseTypes.data.map((type) => (
                                        <tr key={type.id}>
                                            <td className="border px-4 py-2">{type.name}</td>
                                            <td className="border px-4 py-2">{type.code}</td>
                                            <td className="border px-4 py-2">{type.status}</td>
                                            <td className="border px-4 py-2 flex space-x-2">
                                                {/* Editar */}
                                                <Link
                                                    href={route("expense-types.edit", type.id)}
                                                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                                                >
                                                    Editar
                                                </Link>

                                                {/* Eliminar */}
                                                <button
                                                    onClick={() => handleDelete(type.id)}
                                                    disabled={processing}
                                                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
