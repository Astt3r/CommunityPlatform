import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";

export default function CreateIncomeType() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        description: "",
        code: "",
        status: "active",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("income-types.store"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Crear Tipo de Ingreso
                </h2>
            }
        >
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-sm">
                        <div>
                            <label htmlFor="name" className="block font-medium text-gray-700">
                                Nombre
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                className="mt-1 block w-full"
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>

                        <div className="mt-4">
                            <label htmlFor="description" className="block font-medium text-gray-700">
                                Descripción
                            </label>
                            <textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData("description", e.target.value)}
                                className="mt-1 block w-full"
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm">{errors.description}</p>
                            )}
                        </div>

                        <div className="mt-4">
                            <label htmlFor="code" className="block font-medium text-gray-700">
                                Código
                            </label>
                            <input
                                id="code"
                                type="text"
                                value={data.code}
                                onChange={(e) => setData("code", e.target.value)}
                                className="mt-1 block w-full"
                            />
                            {errors.code && <p className="text-red-500 text-sm">{errors.code}</p>}
                        </div>

                        <div className="mt-4">
                            <label htmlFor="status" className="block font-medium text-gray-700">
                                Estado
                            </label>
                            <select
                                id="status"
                                value={data.status}
                                onChange={(e) => setData("status", e.target.value)}
                                className="mt-1 block w-full"
                            >
                                <option value="active">Activo</option>
                                <option value="inactive">Inactivo</option>
                            </select>
                            {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                type="button"
                                onClick={() => reset()}
                                className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-4 py-2 bg-blue-600 text-white rounded"
                            >
                                Guardar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
