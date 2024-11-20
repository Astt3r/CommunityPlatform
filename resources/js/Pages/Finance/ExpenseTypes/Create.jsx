import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        description: "",
        code: "",
        status: "active",
        effective_date: "",
        end_date: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("expense-types.store"));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Crear Tipo de Gasto</h2>}
        >
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Nombre */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Nombre del Tipo de Gasto
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                />
                                {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                            </div>

                            {/* Descripción */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                    Descripción
                                </label>
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData("description", e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                ></textarea>
                                {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
                            </div>

                            {/* Código */}
                            <div>
                                <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                                    Código
                                </label>
                                <input
                                    type="text"
                                    id="code"
                                    value={data.code}
                                    onChange={(e) => setData("code", e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                />
                                {errors.code && <span className="text-red-500 text-sm">{errors.code}</span>}
                            </div>

                            {/* Estado */}
                            <div>
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                    Estado
                                </label>
                                <select
                                    id="status"
                                    value={data.status}
                                    onChange={(e) => setData("status", e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                >
                                    <option value="active">Activo</option>
                                    <option value="inactive">Inactivo</option>
                                </select>
                                {errors.status && <span className="text-red-500 text-sm">{errors.status}</span>}
                            </div>

                            {/* Fecha de Inicio */}
                            <div>
                                <label htmlFor="effective_date" className="block text-sm font-medium text-gray-700">
                                    Fecha de Inicio
                                </label>
                                <input
                                    type="date"
                                    id="effective_date"
                                    value={data.effective_date}
                                    onChange={(e) => setData("effective_date", e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                />
                                {errors.effective_date && (
                                    <span className="text-red-500 text-sm">{errors.effective_date}</span>
                                )}
                            </div>

                            {/* Fecha de Fin */}
                            <div>
                                <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">
                                    Fecha de Fin (Opcional)
                                </label>
                                <input
                                    type="date"
                                    id="end_date"
                                    value={data.end_date}
                                    onChange={(e) => setData("end_date", e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                />
                                {errors.end_date && <span className="text-red-500 text-sm">{errors.end_date}</span>}
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                >
                                    Crear
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
