import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import axios from "axios";
import { router } from "@inertiajs/react";

export default function ProjectEdit({ project, associations }) {
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
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { file, ...rest } = data;

        try {
            // Actualizar datos del proyecto
            const response = await axios.put(
                route("projects.update", project.id),
                rest
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

    const handleCancel = () => {
        router.visit(route("projects.index"));
    };

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
                                    className="mt-1 block w-full"
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
                                    className="mt-1 block w-full"
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
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.issue}
                                    className="mt-2"
                                />
                            </div>

                            {/* Fechas */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                                        className="mt-1 block w-full"
                                    />
                                    <InputError
                                        message={errors.start_date}
                                        className="mt-2"
                                    />
                                </div>

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
                                        className="mt-1 block w-full"
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
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                >
                                    <option value="">
                                        Selecciona un estado
                                    </option>
                                    <option value="planeado">Planeado</option>
                                    <option value="aprovado">Aprobado</option>
                                    <option value="en_proceso">
                                        En Proceso
                                    </option>
                                    <option value="completado">
                                        Completado
                                    </option>
                                    <option value="cancelado">Cancelado</option>
                                </select>
                                <InputError
                                    message={errors.status}
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
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.budget}
                                    className="mt-2"
                                />
                            </div>

                            {/* Asociación */}
                            <div>
                                <InputLabel
                                    htmlFor="association_id"
                                    value="Asociación"
                                />
                                <select
                                    id="association_id"
                                    value={data.association_id}
                                    onChange={(e) =>
                                        setData(
                                            "association_id",
                                            e.target.value
                                        )
                                    }
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                >
                                    <option value="">
                                        Selecciona una Asociación
                                    </option>
                                    {associations.map((assoc) => (
                                        <option key={assoc.id} value={assoc.id}>
                                            {assoc.name}
                                        </option>
                                    ))}
                                </select>
                                <InputError
                                    message={errors.association_id}
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
                                    className="mt-1 block w-full"
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
