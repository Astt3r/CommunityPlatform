import React from "react";
import { usePage, useForm, Link } from "@inertiajs/react";

export default function NeighborEdit() {
    const { neighbor, associations = [], users = [] } = usePage().props; // Default empty array for associations and users
    const { data, setData, put, processing, errors } = useForm({
        // Neighbor fields
        address: neighbor.address || "",
        identification_number: neighbor.identification_number || "",
        registration_date: neighbor.registration_date || "",
        birth_date: neighbor.birth_date || "",
        status: neighbor.status || "",
        last_participation_date: neighbor.last_participation_date || "",
        neighborhood_association_id: neighbor.neighborhood_association_id || "",

        // User fields
        name: neighbor.user ? neighbor.user.name : "",
        email: neighbor.user ? neighbor.user.email : "",
        role: neighbor.user ? neighbor.user.role : "resident", // Default role is resident
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("neighbors.update", neighbor.id));
    };

    const toggleStatus = () => {
        setData("status", data.status === "active" ? "inactive" : "active");
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Editar Vecino y Usuario</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Nombre del Usuario */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Nombre
                    </label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                        required
                    />
                    {errors.name && (
                        <div className="text-red-500 text-sm">
                            {errors.name}
                        </div>
                    )}
                </div>

                {/* Correo Electrónico del Usuario */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                        required
                    />
                    {errors.email && (
                        <div className="text-red-500 text-sm">
                            {errors.email}
                        </div>
                    )}
                </div>

                {/* Rol del Usuario */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Rol
                    </label>
                    <select
                        value={data.role}
                        onChange={(e) => setData("role", e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                        required
                    >
                        <option value="resident">Residente</option>
                        <option value="board_member">Miembro de la Junta</option>
                        <option value="admin">Administrador</option>
                    </select>
                    {errors.role && (
                        <div className="text-red-500 text-sm">
                            {errors.role}
                        </div>
                    )}
                </div>

                {/* Dirección del Vecino */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Dirección
                    </label>
                    <input
                        type="text"
                        value={data.address}
                        onChange={(e) => setData("address", e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                        required
                    />
                    {errors.address && (
                        <div className="text-red-500 text-sm">
                            {errors.address}
                        </div>
                    )}
                </div>

                {/* Número de Identificación */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Número de Identificación
                    </label>
                    <input
                        type="text"
                        value={data.identification_number}
                        onChange={(e) => setData("identification_number", e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                        required
                    />
                    {errors.identification_number && (
                        <div className="text-red-500 text-sm">
                            {errors.identification_number}
                        </div>
                    )}
                </div>

                {/* Fecha de Registro */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Fecha de Registro
                    </label>
                    <input
                        type="date"
                        value={data.registration_date}
                        onChange={(e) => setData("registration_date", e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                        required
                    />
                    {errors.registration_date && (
                        <div className="text-red-500 text-sm">
                            {errors.registration_date}
                        </div>
                    )}
                </div>

                {/* Fecha de Nacimiento */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Fecha de Nacimiento
                    </label>
                    <input
                        type="date"
                        value={data.birth_date}
                        onChange={(e) => setData("birth_date", e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                        required
                    />
                    {errors.birth_date && (
                        <div className="text-red-500 text-sm">
                            {errors.birth_date}
                        </div>
                    )}
                </div>

                {/* Estado */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Estado
                    </label>
                    <button
                        type="button"
                        onClick={toggleStatus}
                        className={`px-4 py-2 rounded ${data.status === "active" ? "bg-green-500" : "bg-red-500"} text-white hover:opacity-80`}
                    >
                        {data.status === "active" ? "Activo" : "Inactivo"}
                    </button>
                    {errors.status && (
                        <div className="text-red-500 text-sm">
                            {errors.status}
                        </div>
                    )}
                </div>

                {/* Asociación Vecinal */}
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
                        href={route("neighbors.index")}
                        className="text-gray-600 hover:text-gray-800"
                    >
                        Cancelar
                    </Link>
                </div>
            </form>
        </div>
    );
}
