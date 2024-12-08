import React, { useState, useEffect } from "react";
import { usePage, Link, useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { formatDate } from "@/Components/formatDate"; // Importa la función formatDate

export default function NeighborIndex() {
    const { neighbors, filters, flash, juntasDeVecinos = [] } = usePage().props;
    const { data, setData, get } = useForm({
        name: filters.name || "",
        junta_de_vecino_id: filters.junta_de_vecino_id || "",
        is_board_member: filters.is_board_member || false,
    });
    const [showAlert, setShowAlert] = useState(!!flash.success);

    const userRole = usePage().props.auth.user.role;

    const handleDelete = (id) => {
        if (
            confirm(
                "¿Estás seguro de que deseas eliminar este vecino y su usuario asociado?"
            )
        ) {
            router.delete(route("neighbors.destroy", id), {
                onSuccess: () => {
                    setShowAlert(true);
                },
            });
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        get(route("neighbors.index"));
    };

    useEffect(() => {
        if (flash.success) {
            setShowAlert(true);
        }
    }, [flash.success]);

    const filteredNeighbors = neighbors.data.filter((neighbor) => {
        const matchesJunta =
            !data.junta_de_vecino_id ||
            neighbor.neighborhood_association?.id == data.junta_de_vecino_id;
        const matchesBoardMember =
            !data.is_board_member || neighbor.user?.role === "board_member";
        return matchesJunta && matchesBoardMember;
    });

    console.log("Current userRole:", userRole); // Debugging line

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold text-gray-800">Vecinos</h2>
            }
        >
            <Head title="Vecinos" />

            {showAlert && (
                <div
                    className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg flex justify-between"
                    role="alert"
                >
                    <span>{flash.success}</span>
                    <button
                        type="button"
                        onClick={() => setShowAlert(false)}
                        className="text-green-700 hover:text-green-900"
                    >
                        ✖
                    </button>
                </div>
            )}

            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                {userRole !== "resident" && (
                    <Link
                        href={route("neighbors.create")}
                        className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 text-center"
                    >
                        Crear Nuevo Vecino
                    </Link>
                )}

                <form
                    onSubmit={handleSearch}
                    className="w-full md:w-auto flex flex-col md:flex-row items-center gap-4"
                >
                    <input
                        type="text"
                        placeholder="Buscar por nombre"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="w-full md:w-auto px-4 py-2 border rounded focus:ring focus:ring-blue-200"
                    />
                    {userRole !== "resident" && userRole !== "board_member" && (
                        <select
                            value={data.junta_de_vecino_id}
                            onChange={(e) =>
                                setData("junta_de_vecino_id", e.target.value)
                            }
                            className="w-full md:w-auto px-4 py-2 border rounded focus:ring focus:ring-blue-200"
                        >
                            <option value="">
                                Todas las Juntas de Vecinos
                            </option>
                            {juntasDeVecinos.map((junta) => (
                                <option key={junta.id} value={junta.id}>
                                    {junta.name}
                                </option>
                            ))}
                        </select>
                    )}
                    <button
                        type="submit"
                        className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                        Buscar
                    </button>
                    <label className="flex items-center gap-2 w-full md:w-auto">
                        <input
                            type="checkbox"
                            checked={data.is_board_member}
                            onChange={(e) =>
                                setData("is_board_member", e.target.checked)
                            }
                            className="form-checkbox"
                        />
                        Miembros de Directiva
                    </label>
                </form>
            </div>

            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="table-auto w-full text-left text-gray-600">
                    <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
                        <tr>
                            <th className="px-6 py-3">Rut</th>
                            <th className="px-6 py-3">Usuario Asignado</th>
                            {!userRole.includes("resident") && (
                                <th className="px-6 py-3">Junta de Vecinos</th>
                            )}
                            {!userRole.includes("resident") && (
                                <th className="px-6 py-3">Estado</th>
                            )}
                            <th className="px-6 py-3">Dirección</th>
                            <th className="px-6 py-3">Fecha de Registro</th>
                            <th className="px-6 py-3">Fecha de Nacimiento</th>
                            <th className="px-6 py-3">Miembro de Directiva</th>
                            <th className="px-6 py-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredNeighbors.map((neighbor, index) => (
                            <tr
                                key={neighbor.id}
                                className={`border-t ${
                                    index % 2 === 0 ? "bg-gray-50" : ""
                                }`}
                            >
                                <td className="px-6 py-3">
                                    {neighbor.identification_number}
                                </td>
                                <td className="px-6 py-3">
                                    {neighbor.user
                                        ? neighbor.user.name
                                        : "--USUARIO POR ASIGNAR--"}
                                </td>
                                {!userRole.includes("resident") && (
                                    <td className="px-6 py-3">
                                        {neighbor.neighborhood_association
                                            ? neighbor.neighborhood_association
                                                  .name
                                            : "--NO ASIGNADO--"}
                                    </td>
                                )}
                                {!userRole.includes("resident") && (
                                    <td
                                        className={`px-6 py-3 ${
                                            neighbor.status === "active"
                                                ? "text-green-500"
                                                : "text-red-500"
                                        }`}
                                    >
                                        {neighbor.status === "active"
                                            ? "Activo"
                                            : "Inactivo"}
                                    </td>
                                )}
                                <td className="px-6 py-3">
                                    {neighbor.address}
                                </td>
                                <td className="px-6 py-3">
                                    {formatDate(neighbor.registration_date)}
                                </td>
                                <td className="px-6 py-3">
                                    {formatDate(neighbor.birth_date)}
                                </td>
                                <td className="px-6 py-3">
                                    {neighbor.user?.role === "board_member"
                                        ? "Sí"
                                        : "No"}
                                </td>
                                <td className="px-6 py-3 flex flex-col md:flex-row gap-2">
                                    <Link
                                        href={`/neighbors/${neighbor.id}`}
                                        className="w-full md:w-auto px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 text-center"
                                    >
                                        Ver
                                    </Link>
                                    {userRole !== "resident" && (
                                        <>
                                            <Link
                                                href={`/neighbors/${neighbor.id}/edit`}
                                                className="w-full md:w-auto px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-700 text-center"
                                            >
                                                Editar
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDelete(neighbor.id)
                                                }
                                                className="w-full md:w-auto px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700 text-center"
                                            >
                                                Eliminar
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-6 flex justify-center gap-2">
                {neighbors.links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.url || ""}
                        className={`px-4 py-2 border rounded ${
                            link.active
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    ></Link>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
