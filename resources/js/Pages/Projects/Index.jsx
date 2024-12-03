import React, { useState } from "react";
import { usePage, Link } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import axios from "axios";

export default function ProjectsIndex() {
    const { projects = { data: [], links: [] }, auth } = usePage().props; // Incluye auth para verificar el rol
    const [modalOpen, setModalOpen] = useState(false);
    const [contributions, setContributions] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [amount, setAmount] = useState("");

    const isResident = auth.user.role === "resident"; // Verificar si el usuario es vecino

    const fetchContributions = async (projectId) => {
        try {
            const response = await axios.get(
                `/projects/${projectId}/contributions`
            );
            setContributions(response.data);
            setSelectedProject(projectId);
            setModalOpen(true); // Abre el modal después de cargar las contribuciones
        } catch (error) {
            console.error("Error al cargar las contribuciones:", error);
        }
    };

    const handleContribute = async (projectId) => {
        try {
            const response = await axios.post("/contributions", {
                project_id: projectId,
                amount, // Asegúrate de que este valor no esté vacío
            });
            alert("Contribución realizada con éxito");
            setAmount(""); // Limpia el campo de monto
            setContributions([...contributions, response.data.contribution]); // Actualiza la lista
        } catch (error) {
            console.error("Error al realizar la contribución:", error);
            alert("Error al realizar la contribución");
        }
    };

    const handleDelete = (id) => {
        if (confirm("¿Estás seguro de que deseas eliminar este proyecto?")) {
            router.delete(route("projects.destroy", id));
        }
    };

    const closeModal = () => {
        setModalOpen(false);
        setContributions([]);
        setSelectedProject(null);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold text-gray-800">Proyectos</h2>
            }
        >
            <Head title="Proyectos" />

            {/* Botón para Crear Proyecto */}
            <div className="flex justify-between items-center mb-6">
                {!isResident && (
                    <Link
                        href={route("projects.create")}
                        className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 text-center"
                    >
                        Crear Nuevo Proyecto
                    </Link>
                )}
            </div>

            {/* Tabla de Proyectos */}
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="table-auto w-full text-left text-gray-600">
                    <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
                        <tr>
                            <th className="px-6 py-3">Nombre</th>
                            <th className="px-6 py-3 hidden md:table-cell">
                                Descripción
                            </th>
                            <th className="px-6 py-3 hidden lg:table-cell">
                                Estado
                            </th>
                            <th className="px-6 py-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.data.map((project, index) => (
                            <tr
                                key={project.id}
                                className={`border-t ${
                                    index % 2 === 0 ? "bg-gray-50" : ""
                                }`}
                            >
                                <td className="px-6 py-3">{project.name}</td>
                                <td className="px-6 py-3 hidden md:table-cell">
                                    {project.description}
                                </td>
                                <td className="px-6 py-3 hidden lg:table-cell">
                                    {project.status}
                                </td>
                                <td className="px-6 py-3 flex flex-col sm:flex-row gap-2">
                                    <Link
                                        href={route(
                                            "projects.show",
                                            project.id
                                        )}
                                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 text-center"
                                    >
                                        Ver
                                    </Link>
                                    <button
                                        onClick={() =>
                                            fetchContributions(project.id)
                                        }
                                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-700 text-center"
                                    >
                                        Contribuciones
                                    </button>
                                    {!isResident && (
                                        <>
                                            <Link
                                                href={route(
                                                    "projects.edit",
                                                    project.id
                                                )}
                                                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-700 text-center"
                                            >
                                                Editar
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDelete(project.id)
                                                }
                                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700 text-center"
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

            {/* Modal de Contribuciones */}
            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl">
                        <div className="flex justify-between items-center border-b p-4">
                            <h2 className="text-lg font-bold text-gray-800">
                                Contribuciones del Proyecto {selectedProject}
                            </h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="p-4">
                            {contributions.length > 0 ? (
                                <table className="table-auto w-full text-left text-gray-600">
                                    <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
                                        <tr>
                                            <th className="px-6 py-3">
                                                Vecino
                                            </th>
                                            <th className="px-6 py-3">Monto</th>
                                            <th className="px-6 py-3">Fecha</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {contributions.map(
                                            (contribution, index) => (
                                                <tr
                                                    key={contribution.id}
                                                    className={`border-t ${
                                                        index % 2 === 0
                                                            ? "bg-gray-50"
                                                            : ""
                                                    }`}
                                                >
                                                    <td className="px-6 py-3">
                                                        {contribution.neighbor_name ||
                                                            "Anónimo"}
                                                    </td>
                                                    <td className="px-6 py-3">
                                                        ${contribution.amount}
                                                    </td>
                                                    <td className="px-6 py-3">
                                                        {new Date(
                                                            contribution.created_at
                                                        ).toLocaleDateString()}
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="text-gray-700">
                                    No hay contribuciones registradas.
                                </p>
                            )}
                        </div>
                        {isResident && (
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleContribute(selectedProject);
                                }}
                                className="mt-4 p-4 border-t"
                            >
                                <label
                                    htmlFor="amount"
                                    className="block text-sm text-gray-700"
                                >
                                    Realizar una Contribución:
                                </label>
                                <input
                                    type="number"
                                    id="amount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full px-4 py-2 border rounded mt-2"
                                    placeholder="Ingresa el monto"
                                    required
                                    min="1"
                                />
                                <button
                                    type="submit"
                                    className="w-full mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                                >
                                    Enviar Contribución
                                </button>
                            </form>
                        )}
                        <div className="border-t p-4 flex justify-end">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
