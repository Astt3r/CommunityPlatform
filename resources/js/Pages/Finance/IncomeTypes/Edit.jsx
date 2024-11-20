import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Link } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

export default function EditIncomeType({ incomeType }) {
    const { data, setData, put, processing, errors } = useForm({
        name: incomeType.name || "",
        description: incomeType.description || "",
        code: incomeType.code || "",
        status: incomeType.status || "active",
        effective_date: incomeType.effective_date || "",
        end_date: incomeType.end_date || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("income-types.update", incomeType.id), {
            onSuccess: () => console.log("Tipo de ingreso actualizado."),
            onError: (error) => console.error("Error al actualizar:", error),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Editar Tipo de Ingreso
                    </h2>
                    <Link
                        href={route("income-types.index")}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        Volver
                    </Link>
                </div>
            }
        >
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Nombre */}
                            <div>
                                <InputLabel htmlFor="name" value="Nombre" />
                                <TextInput
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                    className="mt-1 block w-full"
                                    autoFocus
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            {/* Descripción */}
                            <div>
                                <InputLabel htmlFor="description" value="Descripción" />
                                <TextInput
                                    id="description"
                                    type="text"
                                    value={data.description}
                                    onChange={(e) => setData("description", e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.description} className="mt-2" />
                            </div>

                            {/* Código */}
                            <div>
                                <InputLabel htmlFor="code" value="Código" />
                                <TextInput
                                    id="code"
                                    type="text"
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
                                    value={data.status}
                                    onChange={(e) => setData("status", e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
                                >
                                    <option value="active">Activo</option>
                                    <option value="inactive">Inactivo</option>
                                </select>
                                <InputError message={errors.status} className="mt-2" />
                            </div>

                            {/* Fecha de inicio */}
                            <div>
                                <InputLabel
                                    htmlFor="effective_date"
                                    value="Fecha de Inicio"
                                />
                                <TextInput
                                    id="effective_date"
                                    type="date"
                                    value={data.effective_date}
                                    onChange={(e) =>
                                        setData("effective_date", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.effective_date}
                                    className="mt-2"
                                />
                            </div>

                            {/* Fecha de fin */}
                            <div>
                                <InputLabel htmlFor="end_date" value="Fecha de Fin" />
                                <TextInput
                                    id="end_date"
                                    type="date"
                                    value={data.end_date}
                                    onChange={(e) => setData("end_date", e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.end_date} className="mt-2" />
                            </div>

                            {/* Botones */}
                            <div className="flex justify-end space-x-4">
                                <Link
                                    href={route("income-types.index")}
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                >
                                    Cancelar
                                </Link>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded"
                                    disabled={processing}
                                >
                                    Guardar Cambios
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
