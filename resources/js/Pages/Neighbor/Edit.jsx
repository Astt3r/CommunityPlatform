import React from "react";
import { usePage, useForm, Link } from "@inertiajs/react";

export default function ResidentEdit() {
    const { resident, associations = [] } = usePage().props; // Default empty array for associations
    const { data, setData, put, processing, errors } = useForm({
        address: resident.address || "",
        identification_number: resident.identification_number || "",
        registration_date: resident.registration_date || "",
        birth_date: resident.birth_date || "",
        status: resident.status || "",
        last_participation_date: resident.last_participation_date || "",
        neighborhood_association_id: resident.neighborhood_association_id || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("residents.update", resident.id));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Editar Residente</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Dirección
                    </label>
                    <input
                        type="text"
                        value={data.address}
                        onChange={(e) => setData("address", e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                    />
                    {errors.address && (
                        <div className="text-red-500 text-sm">
                            {errors.address}
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Número de Identificación
                    </label>
                    <input
                        type="text"
                        value={data.identification_number}
                        onChange={(e) => setData("identification_number", e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                    />
                    {errors.identification_number && (
                        <div className="text-red-500 text-sm">
                            {errors.identification_number}
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Fecha de Registro
                    </label>
                    <input
                        type="date"
                        value={data.registration_date}
                        onChange={(e) => setData("registration_date", e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                    />
                    {errors.registration_date && (
                        <div className="text-red-500 text-sm">
                            {errors.registration_date}
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Fecha de Nacimiento
                    </label>
                    <input
                        type="date"
                        value={data.birth_date}
                        onChange={(e) => setData("birth_date", e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                    />
                    {errors.birth_date && (
                        <div className="text-red-500 text-sm">
                            {errors.birth_date}
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Estado
                    </label>
                    <input
                        type="text"
                        value={data.status}
                        onChange={(e) => setData("status", e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                    />
                    {errors.status && (
                        <div className="text-red-500 text-sm">
                            {errors.status}
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Última Participación
                    </label>
                    <input
                        type="date"
                        value={data.last_participation_date}
                        onChange={(e) => setData("last_participation_date", e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                    />
                    {errors.last_participation_date && (
                        <div className="text-red-500 text-sm">
                            {errors.last_participation_date}
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Asociación Vecinal
                    </label>
                    <select
                        value={data.neighborhood_association_id}
                        onChange={(e) => setData("neighborhood_association_id", e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                    >
                        <option value="">Seleccione una asociación</option>
                        {associations.map((association) => (
                            <option key={association.id} value={association.id}>
                                {association.name}
                            </option>
                        ))}
                    </select>

                    {errors.neighborhood_association_id && (
                        <div className="text-red-500 text-sm">
                            {errors.neighborhood_association_id}
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
                        href={route("residents.index")}
                        className="text-gray-600 hover:text-gray-800"
                    >
                        Cancelar
                    </Link>
                </div>
            </form>
        </div>
    );
}
