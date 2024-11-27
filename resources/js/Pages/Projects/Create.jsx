import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, router } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, router } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

export default function ProjectEdit({ project }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: project.name || "",
        description: project.description || "",
        issue: project.issue || "",
        start_date: project.start_date || "",
        end_date: project.end_date || "",
        status: project.status || "",
        responsible: project.responsible || "",
        budget: project.budget || "",
        file: null, // Para cargar un archivo nuevo
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar coherencia de fechas
        if (
            data.start_date &&
            data.end_date &&
            data.end_date < data.start_date
        ) {
            alert(
                "La fecha de finalización debe ser igual o posterior a la fecha de inicio."
            );
            return;
        }

        // Validar tamaño del archivo (máximo 20 MB)
        if (data.file && data.file.size > 20 * 1024 * 1024) {
            alert("El archivo no debe superar los 20 MB.");
            return;
        }

        const formData = new FormData();
        for (const key in data) {
            if (data[key] !== null) {
                formData.append(key, data[key]);
            }
        }

        put(route("projects.update", project.id), {
            data: formData,
            forceFormData: true,
            onError: () => {
                // Opcional: Manejo de errores
            },
            onFinish: () => {
                if (Object.keys(errors).length === 0) reset();
            },
        });
    };

    const handleCancel = () => {
        reset();
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
                            {/* Nombre */}
                            <div>
                                <InputLabel
                                    htmlFor="name"
                                    value="Nombre del Proyecto"
                                />
                                <TextInput
                                    id="name"
                                    type="text"
                                    name="name"
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
                                    name="description"
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

                            {/* Problema */}
                            <div>
                                <InputLabel
                                    htmlFor="issue"
                                    value="Problema que aborda"
                                />
                                <TextInput
                                    id="issue"
                                    type="text"
                                    name="issue"
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

                            {/* Fecha de Inicio */}
                            <div>
                                <InputLabel
                                    htmlFor="start_date"
                                    value="Fecha de Inicio"
                                />
                                <TextInput
                                    id="start_date"
                                    type="date"
                                    name="start_date"
                                    value={data.start_date}
                                    onChange={(e) =>
                                        setData("start_date", e.target.value)
                                    }
                                    className="mt-1 block w-full"
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
                                    name="end_date"
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

                            {/* Estado */}
                            <div>
                                <InputLabel
                                    htmlFor="status"
                                    value="Estado del Proyecto"
                                />
                                <TextInput
                                    id="status"
                                    type="text"
                                    name="status"
                                    value={data.status}
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.status}
                                    className="mt-2"
                                />
                            </div>

                            {/* Responsable */}
                            <div>
                                <InputLabel
                                    htmlFor="responsible"
                                    value="Responsable"
                                />
                                <TextInput
                                    id="responsible"
                                    type="text"
                                    name="responsible"
                                    value={data.responsible}
                                    onChange={(e) =>
                                        setData("responsible", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.responsible}
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
                                    name="budget"
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

                            {/* Archivo */}
                            <div>
                                <InputLabel
                                    htmlFor="file"
                                    value="Archivo del Proyecto (Opcional)"
                                />
                                {project.file && (
                                    <div className="mt-2">
                                        <a
                                            href={project.file_url} // Asegúrate de que el backend proporcione `file_url`
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
                                    name="file"
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
