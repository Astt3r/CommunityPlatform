import React from "react";
import { usePage, useForm, Link } from "@inertiajs/react";

export default function CommitteesEdit() {
    const { committee } = usePage().props;
    const { data, setData, put, processing, errors } = useForm({
        name: committee.name || "",
        description: committee.description || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("committees.update", committee.id));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Editar Comité</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Nombre del Comité
                    </label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                    />
                    {errors.name && (
                        <div className="text-red-500 text-sm">
                            {errors.name}
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Descripción
                    </label>
                    <input
                        type="text"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                    />
                    {errors.description && (
                        <div className="text-red-500 text-sm">
                            {errors.description}
                        </div>
                    )}
                </div>

                <div className="flex items-center space-x-4">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                        disabled={processing}
                    >
                        Guardar Cambios
                    </button>
                    <Link
                        href={route("committees.index")}
                        className="text-gray-600 hover:text-gray-800"
                    >
                        Cancelar
                    </Link>
                </div>
            </form>
        </div>
    );
}
