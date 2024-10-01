import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function FinanceDashboard() {
    const [ingresos, setIngresos] = useState(0);
    const [gastos, setGastos] = useState(0);

    const handleIngresosChange = (e) => {
        setIngresos(parseFloat(e.target.value));
    };

    const handleGastosChange = (e) => {
        setGastos(parseFloat(e.target.value));
    };

    const balance = ingresos - gastos;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Finanzas de la Junta de Vecinos
                </h2>
            }
        >
            <Head title="Finanzas" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-semibold mb-4">prueba/test</h3>
                            
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700">Ingresos</label>
                                <input
                                    type="number"
                                    value={ingresos}
                                    onChange={handleIngresosChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="Ingresa los ingresos"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700">Gastos</label>
                                <input
                                    type="number"
                                    value={gastos}
                                    onChange={handleGastosChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="Ingresa los gastos"
                                />
                            </div>

                            <div className="mt-6">
                                <h4 className="text-lg font-semibold">Balance</h4>
                                <p className={`text-lg font-bold ${balance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    {balance >= 0 ? `Saldo positivo: $${balance}` : `Saldo negativo: $${balance}`}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}