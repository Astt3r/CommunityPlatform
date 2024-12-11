import React, { useState, useEffect } from "react";
import { usePage, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { router } from "@inertiajs/react";

import axios from "axios";

export default function ProjectsIndex() {
    const { projects = { data: [], links: [] }, auth } = usePage().props;
    const [modalOpen, setModalOpen] = useState(false);
    const [contributions, setContributions] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [neighbors, setNeighbors] = useState([]);
    const [selectedNeighbor, setSelectedNeighbor] = useState("");
    const [individualContribution, setIndividualContribution] = useState(0);
    const [remainingAmount, setRemainingAmount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const isResident = auth.user.role === "resident";
    const isBoardMember = auth.user.role === "board_member";

    const openModal = async (project) => {
        if (["completado", "rechazado", "cancelado"].includes(project.status)) {
            alert(
                "No puedes gestionar contribuciones para un proyecto en estado final."
            );
            return;
        }
        setModalOpen(true);
        setSelectedProject(project);

        try {
            setIsLoading(true);

            const [contributionsRes, neighborsRes, contributionRes] =
                await Promise.all([
                    axios.get(`/projects/${project.id}/contributions`),
                    axios.get(`/projects/${project.id}/neighbors`),
                    axios.get(
                        `/projects/${project.id}/individual-contribution`
                    ),
                ]);

            setContributions(contributionsRes.data);
            setNeighbors(neighborsRes.data);

            const totalContributed = contributionsRes.data.reduce(
                (total, contribution) =>
                    total + parseInt(contribution.amount, 10),
                0
            );

            const remaining = Math.max(0, project.budget - totalContributed);
            setRemainingAmount(remaining);

            if (contributionRes.data.individual_contribution === 0) {
                alert("Este proyecto no tiene vecinos asociados.");
                setModalOpen(false); // Cierra el modal automáticamente
            } else {
                setIndividualContribution(
                    Math.ceil(contributionRes.data.individual_contribution)
                );
            }
        } catch (error) {
            console.error("Error al cargar datos del modal:", error);
            alert("Error al cargar los datos del proyecto.");
        } finally {
            setIsLoading(false);
        }
    };

    const closeModal = () => {
        setModalOpen(false);
        setContributions([]);
        setSelectedProject(null);
        setIndividualContribution(0);
        setNeighbors([]);
        setSelectedNeighbor("");
        setRemainingAmount(0);
    };

    const handleContribute = async (projectId) => {
        if (!selectedNeighbor) {
            alert("Debes seleccionar un vecino.");
            return;
        }

        try {
            const response = await axios.post("/contributions", {
                project_id: projectId,
                neighbor_id: selectedNeighbor,
                amount: individualContribution,
            });

            alert("Contribución registrada con éxito.");
            setContributions([...contributions, response.data.contribution]);
            setSelectedNeighbor("");

            // Recalcular el monto restante
            const newRemaining = Math.max(
                0,
                remainingAmount - individualContribution
            );
            setRemainingAmount(newRemaining);
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                "Error al registrar la contribución.";
            alert(errorMessage);
            console.error("Error al registrar la contribución:", error);
        }
    };

    const handleDelete = (id) => {
        if (confirm("¿Estás seguro de que deseas eliminar este proyecto?")) {
            router.delete(route("projects.destroy", id));
        }
    };

    const handleDeleteContribution = async (contributionId) => {
        if (
            !confirm("¿Estás seguro de que deseas eliminar esta contribución?")
        ) {
            return;
        }

        try {
            await axios.delete(`/contributions/${contributionId}`);
            alert("Contribución eliminada con éxito.");

            setContributions(
                contributions.filter((c) => c.id !== contributionId)
            );

            const totalContributed = contributions
                .filter((c) => c.id !== contributionId)
                .reduce((total, c) => total + parseInt(c.amount, 10), 0);

            const remaining = Math.max(
                0,
                selectedProject.budget - totalContributed
            );
            setRemainingAmount(remaining);
        } catch (error) {
            console.error("Error al eliminar la contribución:", error);
            alert("Error al eliminar la contribución.");
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold text-gray-800">Proyectos</h2>
            }
        >
            <Head title="Proyectos" />

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
                                        onClick={() => openModal(project)}
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

            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl">
                        <div className="flex justify-between items-center border-b p-4">
                            <h2 className="text-lg font-bold">
                                Contribuciones del Proyecto{" "}
                                {selectedProject?.name}
                            </h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="p-4">
                            {isLoading ? (
                                <p>Cargando...</p>
                            ) : (
                                <>
                                    <table className="table-auto w-full text-left text-gray-600">
                                        <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
                                            <tr>
                                                <th className="px-6 py-3">
                                                    Vecino
                                                </th>
                                                <th className="px-6 py-3">
                                                    Monto
                                                </th>
                                                <th className="px-6 py-3">
                                                    Fecha
                                                </th>
                                                {isBoardMember && (
                                                    <th className="px-6 py-3">
                                                        Acciones
                                                    </th>
                                                )}
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
                                                            {
                                                                contribution.neighbor_name
                                                            }
                                                        </td>
                                                        <td className="px-6 py-3">
                                                            $
                                                            {
                                                                contribution.amount
                                                            }
                                                        </td>
                                                        <td className="px-6 py-3">
                                                            {new Date(
                                                                contribution.created_at
                                                            ).toLocaleDateString()}
                                                        </td>
                                                        {isBoardMember && (
                                                            <td className="px-6 py-3">
                                                                <button
                                                                    onClick={() =>
                                                                        handleDeleteContribution(
                                                                            contribution.id
                                                                        )
                                                                    }
                                                                    className="text-red-500 hover:text-red-700"
                                                                >
                                                                    &times;
                                                                </button>
                                                            </td>
                                                        )}
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                    {isBoardMember && (
                                        <form
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                handleContribute(
                                                    selectedProject.id
                                                );
                                            }}
                                            className="mt-4"
                                        >
                                            <p className="text-gray-700 mb-2">
                                                Monto Individual Calculado: $
                                                {individualContribution}
                                            </p>
                                            <p className="text-gray-700 mb-2">
                                                Monto Restante: $
                                                {remainingAmount}
                                            </p>
                                            <label
                                                htmlFor="neighbor"
                                                className="block text-sm text-gray-700"
                                            >
                                                Seleccionar Vecino:
                                            </label>
                                            <select
                                                id="neighbor"
                                                value={selectedNeighbor}
                                                onChange={(e) =>
                                                    setSelectedNeighbor(
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-4 py-2 border rounded mt-2"
                                                required
                                            >
                                                <option value="">
                                                    Seleccionar
                                                </option>
                                                {neighbors.map((neighbor) => (
                                                    <option
                                                        key={neighbor.id}
                                                        value={neighbor.id}
                                                    >
                                                        {neighbor.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <button
                                                type="submit"
                                                className="w-full mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                                            >
                                                Registrar Contribución
                                            </button>
                                        </form>
                                    )}
                                </>
                            )}
                        </div>
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
