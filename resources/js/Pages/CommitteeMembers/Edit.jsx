import React from "react";
import { usePage, useForm, Link } from "@inertiajs/react";

export default function CommitteeMembersEdit() {
    const { committeeMember, committees = [], users = [] } = usePage().props; // Default empty arrays for committees and users
    const { data, setData, put, processing, errors } = useForm({
        committee_id: committeeMember.committee_id || "",
        user_id: committeeMember.user_id || "",
        status: committeeMember.status || "",
        joined_date: committeeMember.joined_date || "",
        left_date: committeeMember.left_date || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("committee-members.update", committeeMember.id));
    };

    const toggleStatus = () => {
        setData("status", data.status === "active" ? "inactive" : "active");
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Editar Miembro del Comité</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Comité
                    </label>
                    <select
                        value={data.committee_id}
                        onChange={(e) => setData("committee_id", e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                    >
                        <option value="">Seleccione un comité</option>
                        {committees.map((committee) => (
                            <option key={committee.id} value={committee.id}>
                                {committee.name} ({committee.type})
                            </option>
                        ))}
                    </select>
                    {errors.committee_id && (
                        <div className="text-red-500 text-sm">{errors.committee_id}</div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Usuario
                    </label>
                    <select
                        value={data.user_id}
                        onChange={(e) => setData("user_id", e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                    >
                        <option value="">Seleccione un usuario</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name} - {user.email}
                            </option>
                        ))}
                    </select>
                    {errors.user_id && (
                        <div className="text-red-500 text-sm">{errors.user_id}</div>
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
                        Fecha de Ingreso
                    </label>
                    <input
                        type="date"
                        value={data.joined_date}
                        onChange={(e) => setData("joined_date", e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                    />
                    {errors.joined_date && (
                        <div className="text-red-500 text-sm">{errors.joined_date}</div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Fecha de Salida (Opcional)
                    </label>
                    <input
                        type="date"
                        value={data.left_date}
                        onChange={(e) => setData("left_date", e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                    />
                    {errors.left_date && (
                        <div className="text-red-500 text-sm">{errors.left_date}</div>
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
                        href={route("committee-members.index")}
                        className="text-gray-600 hover:text-gray-800"
                    >
                        Cancelar
                    </Link>
                </div>
            </form>
        </div>
    );
}
