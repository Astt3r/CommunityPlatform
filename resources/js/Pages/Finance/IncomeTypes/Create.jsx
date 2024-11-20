import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Crear Tipo de Ingreso</h2>}
        >
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Nombre */}
                            <div>
                                <InputLabel htmlFor="name" value="Nombre" />
                                <TextInput
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            {/* Descripción */}
                            <div>
                                <InputLabel htmlFor="description" value="Descripción" />
                                <textarea
                                    id="description"
                                    name="description"
                                    value={data.description}
                                    onChange={(e) => setData("description", e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                                ></textarea>
                                <InputError message={errors.description} className="mt-2" />
                            </div>

                            {/* Código */}
                            <div>
                                <InputLabel htmlFor="code" value="Código" />
                                <TextInput
                                    id="code"
                                    type="text"
                                    name="code"
                                    value={data.code}
                                    onChange={(e) => setData("code", e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.code} className="mt-2" />
                            </div>

                            {/* Estado */}
                            <div>
                                <InputLabel htmlFor="status" value="Estado" />
                                <select
                                    id="status"
                                    name="status"
                                    value={data.status}
                                    onChange={(e) => setData("status", e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                >
                                    <option value="active">Activo</option>
                                    <option value="inactive">Inactivo</option>
                                </select>
                                <InputError message={errors.status} className="mt-2" />
                            </div>

                            {/* Botones */}
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => reset()}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                                >
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
