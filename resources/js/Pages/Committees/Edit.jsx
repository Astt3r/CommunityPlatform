import React from "react";
import { usePage, useForm, Link } from "@inertiajs/react";

export default function CommitteesEdit() {
    const { committee, types = [] } = usePage().props; // Default empty array for types
    const { data, setData, put, processing, errors } = useForm({
        name: committee.name || "",
        description: committee.description || "",
        code: committee.code || "",
        type: committee.type || "",
        status: committee.status || "",
        effective_date: committee.effective_date || "",
        end_date: committee.end_date || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("committees.update", committee.id));
    };

    const toggleStatus = () => {
        setData("status", data.status === "active" ? "inactive" : "active");
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
                        <div className="text-red-500 text-sm">{errors.name}</div>
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

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Código
                    </label>
                    <input
                        type="text"
                        value={data.code}
                        onChange={(e) => setData("code", e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                    />
                    {errors.code && (
                        <div className="text-red-500 text-sm">{errors.code}</div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Tipo
                    </label>
                    <select
                        value={data.type}
                        onChange={(e) => setData("type", e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                    >
                        <option value="">Seleccione un tipo</option>
                        {types.map((type) => (
                            <option key={type} value={type}>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </option>
                        ))}
                    </select>
                    {errors.type && (
                        <div className="text-red-500 text-sm">{errors.type}</div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Estado
                    </label>
                    <button
                        type="button"
                        onClick={toggleStatus}
                        className={`px-4 py-2 rounded ${
                            data.status === "active" ? "bg-green-500" : "bg-red-500"
                        } text-white hover:opacity-80`}
                    >
                        {data.status === "active" ? "Activo" : "Inactivo"}
                    </button>
                    {errors.status && (
                        <div className="text-red-500 text-sm">{errors.status}</div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Fecha de Inicio
                    </label>
                    <input
                        type="date"
                        value={data.effective_date}
                        onChange={(e) => setData("effective_date", e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                    />
                    {errors.effective_date && (
                        <div className="text-red-500 text-sm">
                            {errors.effective_date}
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Fecha de Fin (Opcional)
                    </label>
                    <input
                        type="date"
                        value={data.end_date}
                        onChange={(e) => setData("end_date", e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                    />
                    {errors.end_date && (
                        <div className="text-red-500 text-sm">{errors.end_date}</div>
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
