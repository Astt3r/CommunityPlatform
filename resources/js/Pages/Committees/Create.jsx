import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, router } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

export default function CommitteesCreate({ types }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        description: "",
        code: "",
        status: "active",
        effective_date: "",
        end_date: "",
    });

    const handleChange = (field, value) => {
        setData(field, value);
        // Los errores se manejan automáticamente por Inertia
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("committees.store"), {
            onFinish: () => {
                if (Object.keys(errors).length === 0) reset();
            },
        });
    };

    const handleCancel = () => {
        reset(); // Limpia todo el formulario
        router.visit(route("committees.index")); // Redirige al índice de comités
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Crear Nuevo Comité
                </h2>
            }
        >
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Nombre */}
                            <div>
                                <InputLabel
                                    htmlFor="name"
                                    value="Nombre del Comité"
                                />
                                <TextInput
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        handleChange("name", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            {/* Descripción */}
                            <div>
                                <InputLabel
                                    htmlFor="description"
                                    value="Descripción"
                                />
                                <TextInput
                                    id="description"
                                    type="text"
                                    name="description"
                                    value={data.description}
                                    onChange={(e) =>
                                        handleChange(
                                            "description",
                                            e.target.value
                                        )
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.description}
                                    className="mt-2"
                                />
                            </div>

                            {/* Código */}
                            <div>
                                <InputLabel htmlFor="code" value="Código" />
                                <TextInput
                                    id="code"
                                    type="text"
                                    name="code"
                                    value={data.code}
                                    onChange={(e) =>
                                        handleChange("code", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.code}
                                    className="mt-2"
                                />
                            </div>

                            {/* Estado */}
                            <div>
                                <InputLabel htmlFor="status" value="Estado" />
                                <select
                                    id="status"
                                    name="status"
                                    value={data.status}
                                    onChange={(e) =>
                                        handleChange("status", e.target.value)
                                    }
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                >
                                    <option value="active">Activo</option>
                                    <option value="inactive">Inactivo</option>
                                </select>
                                <InputError
                                    message={errors.status}
                                    className="mt-2"
                                />
                            </div>

                            {/* Fecha de Inicio */}
                            <div>
                                <InputLabel
                                    htmlFor="effective_date"
                                    value="Fecha de Inicio"
                                />
                                <TextInput
                                    id="effective_date"
                                    type="date"
                                    name="effective_date"
                                    value={data.effective_date}
                                    onChange={(e) =>
                                        handleChange(
                                            "effective_date",
                                            e.target.value
                                        )
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.effective_date}
                                    className="mt-2"
                                />
                            </div>

                            {/* Fecha de Fin */}
                            <div>
                                <InputLabel
                                    htmlFor="end_date"
                                    value="Fecha de Fin (Opcional)"
                                />
                                <TextInput
                                    id="end_date"
                                    type="date"
                                    name="end_date"
                                    value={data.end_date}
                                    onChange={(e) =>
                                        handleChange("end_date", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.end_date}
                                    className="mt-2"
                                />
                            </div>

                            {/* Botones */}
                            <div className="flex justify-end space-x-4 mt-4">
                                <button
                                    type="button"
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                                    onClick={handleCancel}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                                    disabled={processing}
                                >
                                    Crear Comité
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
