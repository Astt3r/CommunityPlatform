import React from "react";
import { useForm } from "@inertiajs/react";
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
        if (data.effective_date && data.end_date && data.end_date < data.effective_date) {
            alert("La fecha de fin debe ser igual o posterior a la fecha de inicio.");
            return false;
        }
        return true;
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Enviar los datos al backend
        post(route("committees.store"), {
            onError: () => {
                // No hacer nada aquí, el objeto `errors` ya maneja los errores
            },
            onFinish: () => {
                if (Object.keys(errors).length === 0) reset(); // Limpiar el formulario si no hay errores
            },
        });
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
                            <div>
                                <InputLabel htmlFor="name" value="Nombre del Comité" />
                                <TextInput
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

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

                            <div>
                                <InputLabel htmlFor="type" value="Tipo" />
                                <select
                                    id="type"
                                    value={data.type}
                                    onChange={(e) => setData("type", e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                >
                                    <option value="">Seleccione un tipo</option>
                                    {types.map((type) => (
                                        <option key={type} value={type}>
                                            {type.charAt(0).toUpperCase() + type.slice(1)}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.type} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="status" value="Estado" />
                                <select
                                    id="status"
                                    value={data.status}
                                    onChange={(e) => setData("status", e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                >
                                    <option value="active">Activo</option>
                                    <option value="inactive">Inactivo</option>
                                </select>
                                <InputError message={errors.status} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="effective_date" value="Fecha de Inicio" />
                                <TextInput
                                    id="effective_date"
                                    type="date"
                                    value={data.effective_date}
                                    onChange={(e) => setData("effective_date", e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.effective_date} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="end_date" value="Fecha de Fin (Opcional)" />
                                <TextInput
                                    id="end_date"
                                    type="date"
                                    value={data.end_date}
                                    onChange={(e) => setData("end_date", e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.end_date} className="mt-2" />
                            </div>

                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                                    onClick={() => reset()}
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
