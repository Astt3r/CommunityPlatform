import React from "react";
import { useForm, Link } from "@inertiajs/react";

export default function NeighborhoodAssociationCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        address: "",
        phone: "",
        email: "",
        website_url: "",
        number_of_members: "",
        date_of_funding: "",
        is_active: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("neighborhood-associations.store"));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Crear Asociación</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Nombre
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
                        Dirección
                    </label>
                    <input
                        type="text"
                        value={data.address}
                        onChange={(e) => setData("address", e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                    />
                    {errors.address && (
                        <div className="text-red-500 text-sm">{errors.address}</div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Teléfono
                    </label>
                    <input
                        type="text"
                        value={data.phone}
                        onChange={(e) => setData("phone", e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                    />
                    {errors.phone && (
                        <div className="text-red-500 text-sm">{errors.phone}</div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                    />
                    {errors.email && (
                        <div className="text-red-500 text-sm">{errors.email}</div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        URL del sitio web
                    </label>
                    <input
                        type="url"
                        value={data.website_url}
                        onChange={(e) => setData("website_url", e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                    />
                    {errors.website_url && (
                        <div className="text-red-500 text-sm">{errors.website_url}</div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Número de miembros
                    </label>
                    <input
                        type="number"
                        value={data.number_of_members}
                        onChange={(e) => setData("number_of_members", e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                    />
                    {errors.number_of_members && (
                        <div className="text-red-500 text-sm">{errors.number_of_members}</div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Fecha de Fundación
                    </label>
                    <input
                        type="date"
                        value={data.date_of_funding}
                        onChange={(e) => setData("date_of_funding", e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                    />
                    {errors.date_of_funding && (
                        <div className="text-red-500 text-sm">{errors.date_of_funding}</div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        ¿Está activa?
                    </label>
                    <input
                        type="checkbox"
                        checked={data.is_active}
                        onChange={(e) => setData("is_active", e.target.checked)}
                        className="mr-2"
                    />
                    {errors.is_active && (
                        <div className="text-red-500 text-sm">{errors.is_active}</div>
                    )}
                </div>

                <div className="flex items-center space-x-4">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                        disabled={processing}
                    >
                        Crear Asociación
                    </button>
                    <Link
                        href={route("neighborhood-associations.index")}
                        className="text-gray-600 hover:text-gray-800"
                    >
                        Cancelar
                    </Link>
                </div>
            </form>
        </div>
    );
}
