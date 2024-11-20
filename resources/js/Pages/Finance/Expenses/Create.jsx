import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";

export default function CreateExpense({ expenseTypes }) {
    const { data, setData, post, errors } = useForm({
        concept: "",
        responsible: "",
        date: "",
        amount: "",
        type_id: "",
        receipt: null,
        status: "pending",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("expenses.store"));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Crear Gasto</h2>}
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="concept" className="block font-medium text-sm text-gray-700">
                                        Concepto
                                    </label>
                                    <input
                                        id="concept"
                                        type="text"
                                        value={data.concept}
                                        onChange={(e) => setData("concept", e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    />
                                    {errors.concept && <p className="text-red-500 text-xs">{errors.concept}</p>}
                                </div>

                                <div>
                                    <label htmlFor="responsible" className="block font-medium text-sm text-gray-700">
                                        Responsable
                                    </label>
                                    <input
                                        id="responsible"
                                        type="text"
                                        value={data.responsible}
                                        onChange={(e) => setData("responsible", e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    />
                                    {errors.responsible && <p className="text-red-500 text-xs">{errors.responsible}</p>}
                                </div>

                                <div>
                                    <label htmlFor="date" className="block font-medium text-sm text-gray-700">
                                        Fecha
                                    </label>
                                    <input
                                        id="date"
                                        type="date"
                                        value={data.date}
                                        onChange={(e) => setData("date", e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    />
                                    {errors.date && <p className="text-red-500 text-xs">{errors.date}</p>}
                                </div>

                                <div>
                                    <label htmlFor="amount" className="block font-medium text-sm text-gray-700">
                                        Monto
                                    </label>
                                    <input
                                        id="amount"
                                        type="number"
                                        value={data.amount}
                                        onChange={(e) => setData("amount", e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    />
                                    {errors.amount && <p className="text-red-500 text-xs">{errors.amount}</p>}
                                </div>

                                <div>
                                    <label htmlFor="type_id" className="block font-medium text-sm text-gray-700">
                                        Tipo de Gasto
                                    </label>
                                    <select
                                        id="type_id"
                                        value={data.type_id}
                                        onChange={(e) => setData("type_id", e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    >
                                        <option value="">Seleccione un tipo</option>
                                        {expenseTypes.map((type) => (
                                            <option key={type.id} value={type.id}>
                                                {type.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.type_id && <p className="text-red-500 text-xs">{errors.type_id}</p>}
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                    >
                                        Crear Gasto
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
