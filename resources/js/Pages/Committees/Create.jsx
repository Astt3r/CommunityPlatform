import React from "react";
import { useForm, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

export default function CommitteesCreate({ types }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        description: "",
        code: "",
        type: "",
        status: "active",
        effective_date: "",
        end_date: "",
    });

    const validateDates = () => {
        if (
            data.effective_date &&
            data.end_date &&
            data.end_date < data.effective_date
        ) {
            alert(
                "La fecha de fin debe ser igual o posterior a la fecha de inicio."
            );
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar fechas antes de enviar
        if (!validateDates()) return;

        post(route("committees.store"), {
            onError: () => {
                // Maneja errores automáticamente
            },
            onFinish: () => {
                if (Object.keys(errors).length === 0) reset();
            },
        });
    };

    const handleCancel = () => {
        reset();
        router.visit(route("committees.index"));
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
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Nombre */}
                            <div>
                                <InputLabel
                                    htmlFor="name"
                                    value="Nombre del Comité"
                                />
                                <TextInput
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onInput={(e) => {
                                        const cleanedValue =
                                            e.target.value.replace(
                                                /[^a-zA-Z0-9\s]/g,
                                                ""
                                            );
                                        setData(
                                            "name",
                                            cleanedValue.slice(0, 50)
                                        );
                                    }}
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
                                    value={data.description}
                                    onInput={(e) => {
                                        const cleanedValue =
                                            e.target.value.replace(
                                                /[^a-zA-Z0-9\s.,-]/g,
                                                ""
                                            );
                                        setData(
                                            "description",
                                            cleanedValue.slice(0, 255)
                                        );
                                    }}
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
                                    value={data.code}
                                    onInput={(e) => {
                                        const cleanedValue =
                                            e.target.value.replace(
                                                /[^a-zA-Z0-9]/g,
                                                ""
                                            );
                                        setData(
                                            "code",
                                            cleanedValue.slice(0, 20)
                                        );
                                    }}
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.code}
                                    className="mt-2"
                                />
                            </div>

                            {/* Tipo */}
                            <div>
                                <InputLabel htmlFor="type" value="Tipo" />
                                <select
                                    id="type"
                                    value={data.type}
                                    onChange={(e) =>
                                        setData("type", e.target.value)
                                    }
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                >
                                    <option value="">Seleccione un tipo</option>
                                    {types.map((type) => (
                                        <option key={type} value={type}>
                                            {type.charAt(0).toUpperCase() +
                                                type.slice(1)}
                                        </option>
                                    ))}
                                </select>
                                <InputError
                                    message={errors.type}
                                    className="mt-2"
                                />
                            </div>

                            {/* Estado */}
                            <div>
                                <InputLabel htmlFor="status" value="Estado" />
                                <select
                                    id="status"
                                    value={data.status}
                                    onChange={(e) =>
                                        setData("status", e.target.value)
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

                            {/* Fechas */}
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
                                        setData(
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

                            <div>
                                <InputLabel
                                    htmlFor="end_date"
                                    value="Fecha de Fin (Opcional)"
                                />
                                <TextInput
                                    id="end_date"
                                    type="date"
                                    value={data.end_date}
                                    onChange={(e) =>
                                        setData("end_date", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.end_date}
                                    className="mt-2"
                                />
                            </div>

                            <div className="flex justify-end space-x-4">
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
