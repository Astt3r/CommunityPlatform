import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";

export default function FinanceIndex() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Finanzas
                </h2>
            }
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                        {/* Gastos */}
                        <div className="p-6 bg-white shadow-md rounded-lg border border-gray-200">
                            <div className="flex items-center mb-4">
                                <div className="text-blue-500 text-3xl mr-4">
                                    💰
                                </div>
                                <h3 className="text-lg font-semibold">
                                    Gastos
                                </h3>
                            </div>
                            <p className="mt-2 text-gray-600">
                                Administra y registra los gastos.
                            </p>
                            <Link
                                href={route("expenses.index")}
                                className="text-blue-500 hover:underline mt-2 block"
                            >
                                Ver Gastos
                            </Link>
                        </div>

                        {/* Tipos de Gastos */}
                        <div className="p-6 bg-white shadow-md rounded-lg border border-gray-200">
                            <div className="flex items-center mb-4">
                                <div className="text-green-500 text-3xl mr-4">
                                    📊
                                </div>
                                <h3 className="text-lg font-semibold">
                                    Tipos de Gastos
                                </h3>
                            </div>
                            <p className="mt-2 text-gray-600">
                                Define y organiza las categorías de gastos.
                            </p>
                            <Link
                                href={route("expense-types.index")}
                                className="text-green-500 hover:underline mt-2 block"
                            >
                                Ver Tipos de Gastos
                            </Link>
                        </div>

                        {/* Ingresos */}
                        <div className="p-6 bg-white shadow-md rounded-lg border border-gray-200">
                            <div className="flex items-center mb-4">
                                <div className="text-purple-500 text-3xl mr-4">
                                    📥
                                </div>
                                <h3 className="text-lg font-semibold">
                                    Ingresos
                                </h3>
                            </div>
                            <p className="mt-2 text-gray-600">
                                Registra y administra los ingresos.
                            </p>
                            <Link
                                href={route("incomes.index")}
                                className="text-purple-500 hover:underline mt-2 block"
                            >
                                Ver Ingresos
                            </Link>
                        </div>

                        {/* Tipos de Ingresos */}
                        <div className="p-6 bg-white shadow-md rounded-lg border border-gray-200">
                            <div className="flex items-center mb-4">
                                <div className="text-yellow-500 text-3xl mr-4">
                                    🔧
                                </div>
                                <h3 className="text-lg font-semibold">
                                    Tipos de Ingresos
                                </h3>
                            </div>
                            <p className="mt-2 text-gray-600">
                                Define las fuentes de ingresos disponibles.
                            </p>
                            <Link
                                href={route("income-types.index")}
                                className="text-yellow-500 hover:underline mt-2 block"
                            >
                                Ver Tipos de Ingresos
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
