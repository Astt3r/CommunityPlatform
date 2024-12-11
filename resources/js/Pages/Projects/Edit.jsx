import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import axios from "axios";
import { router } from "@inertiajs/react";

export default function ProjectEdit({
    project,
    associations,
    neighbors,
    assignedNeighborIds,
}) {
    const { data, setData, put, processing, errors } = useForm({
        name: project.name || "",
        description: project.description || "",
        issue: project.issue || "",
        start_date: project.start_date || "",
        end_date: project.end_date || "",
        status: project.status || "",
        budget: project.budget || "",
        association_id: project.association_id || "",
        file: null, // Para el archivo
        is_for_all_neighbors: project.is_for_all_neighbors || false, // Indica si es para todos
        neighbor_ids: assignedNeighborIds || [], // Usar los IDs asignados proporcionados por el backend
    });

    const isFinalState = ["rechazado", "completado", "cancelado"].includes(
        project.status
    );

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { file, observation, ...rest } = data;

        try {
            // Actualizar datos del proyecto
            const response = await axios.put(
                route("projects.update", project.id),
                data 
            );

            if (response.status === 200) {
                console.info(
                    response.data.message ||
                        "Proyecto actualizado correctamente."
                );
            }

            // Subir archivo (si existe)
            if (file) {
                const formData = new FormData();
                formData.append("file", file);

                const fileResponse = await axios.post(
                    route("projects.uploadFile", project.id),
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                if (fileResponse.status === 200) {
                    console.info(
                        fileResponse.data.message ||
                            "Archivo subido correctamente."
                    );
                }
            }

            // Redirigir al índice después de guardar
            router.visit(route("projects.index"));
        } catch (error) {
            // Manejo de errores
            if (error.response) {
                console.error("Error del servidor:", error.response.data);
                alert(error.response.data.message || "Ocurrió un error.");
            } else {
                console.error("Error desconocido:", error);
                alert("Error al conectar con el servidor.");
            }
        }
    };

    const handleNeighborChange = (neighborId, isChecked) => {
        setData((prevData) => {
            // Safely handle neighbor_ids update
            const updatedIds = Array.isArray(prevData.neighbor_ids)
                ? [...prevData.neighbor_ids]
                : [];

            if (isChecked) {
                if (!updatedIds.includes(neighborId)) {
                    updatedIds.push(neighborId);
                }
            } else {
                const index = updatedIds.indexOf(neighborId);
                if (index > -1) {
                    updatedIds.splice(index, 1);
                }
            }

            console.log("Updated neighbor_ids:", updatedIds);

            // Return the entire updated state
            return {
                ...prevData,
                neighbor_ids: updatedIds,
            };
        });
    };

    const handleCancel = () => {
        router.visit(route("projects.index"));
    };

    useEffect(() => {
        console.log("Current data state:", data);
    }, [data]);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Editar Proyecto
                </h2>
            }
        >
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Nombre del proyecto */}
                            <div>
                                <InputLabel
                                    htmlFor="name"
                                    value="Nombre del Proyecto"
                                />
                                <TextInput
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    disabled={isFinalState}
                                    className={`mt-1 block w-full ${
                                        isFinalState
                                            ? "bg-gray-100 text-gray-500"
                                            : ""
                                    }`}
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>
                            {/* Descripción */}
                            <div>
                                <InputLabel
                                    htmlFor="description"
                                    value="Descripción"
                                />
                                <TextInput
                                    id="description"
                                    type="text"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    disabled={isFinalState}
                                    className={`mt-1 block w-full ${
                                        isFinalState
                                            ? "bg-gray-100 text-gray-500"
                                            : ""
                                    }`}
                                />
                                <InputError
                                    message={errors.description}
                                    className="mt-2"
                                />
                            </div>
                            {/* Problema que aborda */}
                            <div>
                                <InputLabel
                                    htmlFor="issue"
                                    value="Problema que aborda"
                                />
                                <TextInput
                                    id="issue"
                                    type="text"
                                    value={data.issue}
                                    onChange={(e) =>
                                        setData("issue", e.target.value)
                                    }
                                    disabled={isFinalState}
                                    className={`mt-1 block w-full ${
                                        isFinalState
                                            ? "bg-gray-100 text-gray-500"
                                            : ""
                                    }`}
                                />
                                <InputError
                                    message={errors.issue}
                                    className="mt-2"
                                />
                            </div>
                            {/* Proyecto para todos los vecinos */}
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="is_for_all_neighbors"
                                    name="is_for_all_neighbors"
                                    checked={data.is_for_all_neighbors}
                                    onChange={(e) =>
                                        setData(
                                            "is_for_all_neighbors",
                                            e.target.checked
                                        )
                                    }
                                    disabled={isFinalState} // Bloquear si el proyecto está en un estado final
                                    className={`mr-2 ${
                                        isFinalState
                                            ? "bg-gray-100 cursor-not-allowed"
                                            : ""
                                    }`} // Agregar estilos visuales si está deshabilitado
                                />
                                <InputLabel
                                    htmlFor="is_for_all_neighbors"
                                    value="¿Proyecto para todos los vecinos?"
                                    className={
                                        isFinalState ? "text-gray-500" : ""
                                    }
                                />
                            </div>
                            {/* Selección de vecinos */}
                            {!data.is_for_all_neighbors && (
                                <div>
                                    <h3 className="font-semibold text-lg">
                                        Asignar Vecinos
                                    </h3>
                                    <div className="space-y-2">
                                        {neighbors.map((neighbor) => (
                                            <div
                                                key={neighbor.id}
                                                className="flex items-center"
                                            >
                                                <input
                                                    type="checkbox"
                                                    id={`neighbor_${neighbor.id}`}
                                                    checked={data.neighbor_ids.includes(
                                                        neighbor.id
                                                    )}
                                                    onChange={(e) =>
                                                        handleNeighborChange(
                                                            neighbor.id,
                                                            e.target.checked
                                                        )
                                                    }
                                                    disabled={isFinalState} // Bloquear si el proyecto está en un estado final
                                                    className={`mr-2 ${
                                                        isFinalState
                                                            ? "bg-gray-100 cursor-not-allowed"
                                                            : ""
                                                    }`} // Estilo visual si está deshabilitado
                                                />
                                                <label
                                                    htmlFor={`neighbor_${neighbor.id}`}
                                                    className={`text-gray-800 ${
                                                        isFinalState
                                                            ? "text-gray-500"
                                                            : ""
                                                    }`} // Estilo visual para etiqueta deshabilitada
                                                >
                                                    {neighbor.user.name}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {/* Fechas */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Fecha de Inicio */}
                                <div>
                                    <InputLabel
                                        htmlFor="start_date"
                                        value="Fecha de Inicio"
                                    />
                                    <TextInput
                                        id="start_date"
                                        type="date"
                                        value={data.start_date}
                                        onChange={(e) =>
                                            setData(
                                                "start_date",
                                                e.target.value
                                            )
                                        }
                                        disabled={isFinalState} // Bloquear si está en estado final
                                        className={`mt-1 block w-full ${
                                            isFinalState
                                                ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                                                : ""
                                        }`} // Estilo visual si está deshabilitado
                                    />
                                    <InputError
                                        message={errors.start_date}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Fecha de Finalización */}
                                <div>
                                    <InputLabel
                                        htmlFor="end_date"
                                        value="Fecha de Finalización"
                                    />
                                    <TextInput
                                        id="end_date"
                                        type="date"
                                        value={data.end_date}
                                        onChange={(e) =>
                                            setData("end_date", e.target.value)
                                        }
                                        disabled={isFinalState} // Bloquear si está en estado final
                                        className={`mt-1 block w-full ${
                                            isFinalState
                                                ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                                                : ""
                                        }`} // Estilo visual si está deshabilitado
                                    />
                                    <InputError
                                        message={errors.end_date}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            {/* Estado */}
                            <div>
                                <InputLabel
                                    htmlFor="status"
                                    value="Estado del Proyecto"
                                />
                                <select
                                    id="status"
                                    value={data.status}
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                    disabled={isFinalState}
                                    className={`mt-1 block w-full border-gray-300 rounded-md ${
                                        isFinalState
                                            ? "bg-gray-100 text-gray-500"
                                            : ""
                                    }`}
                                >
                                    {project.status === "planeado" && (
                                        <>
                                            <option value="planeado">
                                                Planeado
                                            </option>
                                            <option value="aprobado">
                                                Aprobado
                                            </option>
                                            <option value="rechazado">
                                                Rechazado
                                            </option>
                                        </>
                                    )}
                                    {project.status === "aprobado" && (
                                        <>
                                            <option value="aprobado">
                                                Aprobado
                                            </option>
                                            <option value="en proceso">
                                                En Proceso
                                            </option>
                                        </>
                                    )}
                                    {project.status === "en proceso" && (
                                        <>
                                            <option value="en proceso">
                                                En Proceso
                                            </option>
                                            <option value="completado">
                                                Completado
                                            </option>
                                            <option value="cancelado">
                                                Cancelado
                                            </option>
                                        </>
                                    )}
                                    {isFinalState && (
                                        <option value={project.status}>
                                            {project.status
                                                .charAt(0)
                                                .toUpperCase() +
                                                project.status.slice(1)}
                                        </option>
                                    )}
                                </select>

                                <InputError message={errors.status} />
                            </div>
                            {/* // Campo de observación cuando cambia el estado */}
                            <div>
                                <InputLabel
                                    htmlFor="observation"
                                    value="Observación del Cambio"
                                />
                                <textarea
                                    id="observation"
                                    value={data.observation || ""}
                                    onChange={(e) =>
                                        setData("observation", e.target.value)
                                    }
                                    className="mt-1 block w-full border-gray-300 rounded-md"
                                    placeholder="Agregue una observación al cambiar el estado"
                                />
                                <InputError
                                    message={errors.observation}
                                    className="mt-2"
                                />
                            </div>

                            {/* Presupuesto */}
                            <div>
                                <InputLabel
                                    htmlFor="budget"
                                    value="Presupuesto"
                                />
                                <TextInput
                                    id="budget"
                                    type="number"
                                    value={data.budget}
                                    onChange={(e) =>
                                        setData("budget", e.target.value)
                                    }
                                    disabled={isFinalState}
                                    className={`mt-1 block w-full ${
                                        isFinalState
                                            ? "bg-gray-100 text-gray-500"
                                            : ""
                                    }`}
                                />
                                <InputError
                                    message={errors.budget}
                                    className="mt-2"
                                />
                            </div>
                            {/* Archivo */}
                            <div>
                                <InputLabel
                                    htmlFor="file"
                                    value="Archivo del Proyecto (Opcional)"
                                />
                                {project.files.length > 0 && (
                                    <div className="mt-2">
                                        <a
                                            href={`/storage/${project.files[0].file_path}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 underline"
                                        >
                                            Ver archivo actual
                                        </a>
                                    </div>
                                )}
                                <input
                                    id="file"
                                    type="file"
                                    onChange={(e) =>
                                        setData("file", e.target.files[0])
                                    }
                                    disabled={isFinalState}
                                    className={`mt-1 block w-full ${
                                        isFinalState
                                            ? "bg-gray-100 text-gray-500"
                                            : ""
                                    }`}
                                />
                                <InputError
                                    message={errors.file}
                                    className="mt-2"
                                />
                            </div>
                            {/* Botones */}
                            <div className="flex justify-end space-x-4 mt-4">
                                <button
                                    type="button"
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                                    onClick={handleCancel}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                                    disabled={processing}
                                >
                                    Guardar Cambios
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
