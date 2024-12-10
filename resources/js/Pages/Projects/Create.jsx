import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, usePage } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { useState } from "react";

export default function ProjectCreate() {
    const { neighbors } = usePage().props; // Vecinos pasados desde el backend

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        description: "",
        issue: "",
        start_date: "",
        end_date: "",
        status: "planeado",
        budget: "",
        is_for_all_neighbors: true,
        neighbor_ids: [], // IDs de los vecinos seleccionados
        file: null, // Archivo opcional
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            if (key === "neighbor_ids") {
                formData.append(key, JSON.stringify(data[key]));
            } else {
                formData.append(key, data[key]);
            }
        });

        post(route("projects.store"), {
            data: formData,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Crear Proyecto
                    </h2>
                    <p className="text-sm text-gray-600">
                        Los campos marcados con{" "}
                        <span className="text-red-500">*</span> son
                        obligatorios.
                    </p>
                </div>
            }
        >
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Nombre del proyecto */}
                            <div>
                                <InputLabel htmlFor="name" value="Nombre *" />
                                <TextInput
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.name} />
                            </div>

                            {/* Descripción */}
                            <div>
                                <InputLabel
                                    htmlFor="description"
                                    value="Descripción *"
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
                                <InputError message={errors.description} />
                            </div>

                            {/* Problema */}
                            <div>
                                <InputLabel
                                    htmlFor="issue"
                                    value="Problema que aborda *"
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
                                <InputError message={errors.issue} />
                            </div>

                            {/* Fecha de inicio */}
                            <div>
                                <InputLabel
                                    htmlFor="start_date"
                                    value="Fecha de Inicio *"
                                />
                                <TextInput
                                    id="start_date"
                                    type="date"
                                    value={data.start_date}
                                    onChange={(e) =>
                                        setData("start_date", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.start_date} />
                            </div>

                            {/* Fecha de finalización */}
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
                                <InputError message={errors.end_date} />
                            </div>

                            {/* Estado */}
                            <div>
                                <InputLabel
                                    htmlFor="status"
                                    value="Estado del Proyecto *"
                                />
                                <select
                                    id="status"
                                    value={data.status}
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300"
                                >
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
                                <InputError message={errors.status} />
                            </div>

                            {/* Presupuesto */}
                            <div>
                                <InputLabel
                                    htmlFor="budget"
                                    value="Presupuesto *"
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
                                <InputError message={errors.budget} />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="is_for_all_neighbors"
                                    value="¿Proyecto para todos los vecinos?"
                                />
                                <input
                                    type="checkbox"
                                    id="is_for_all_neighbors"
                                    checked={data.is_for_all_neighbors}
                                    onChange={(e) =>
                                        setData(
                                            "is_for_all_neighbors",
                                            e.target.checked
                                        )
                                    }
                                    className="mt-1 block"
                                />
                            </div>

                            {/* Selección de vecinos si no es para todos
                            {!data.is_for_all_neighbors && (
                                <div>
                                    <InputLabel value="Seleccionar vecinos" />
                                    {neighbors.length > 0 ? (
                                        neighbors.map((neighbor) => (
                                            <div
                                                key={neighbor.id}
                                                className="flex items-center"
                                            >
                                                <input
                                                    type="checkbox"
                                                    value={neighbor.id}
                                                    checked={data.neighbor_ids.includes(
                                                        neighbor.id
                                                    )}
                                                    onChange={(e) => {
                                                        const id = parseInt(
                                                            e.target.value,
                                                            10
                                                        );
                                                        setData(
                                                            "neighbor_ids",
                                                            (prev) => {
                                                                const updatedIds =
                                                                    Array.isArray(
                                                                        prev
                                                                    )
                                                                        ? [
                                                                              ...prev,
                                                                          ]
                                                                        : [];
                                                                if (
                                                                    e.target
                                                                        .checked
                                                                ) {
                                                                    if (
                                                                        !updatedIds.includes(
                                                                            id
                                                                        )
                                                                    ) {
                                                                        updatedIds.push(
                                                                            id
                                                                        );
                                                                    }
                                                                } else {
                                                                    const index =
                                                                        updatedIds.indexOf(
                                                                            id
                                                                        );
                                                                    if (
                                                                        index >
                                                                        -1
                                                                    ) {
                                                                        updatedIds.splice(
                                                                            index,
                                                                            1
                                                                        );
                                                                    }
                                                                }
                                                                return updatedIds;
                                                            }
                                                        );
                                                    }}
                                                    className="mr-2"
                                                />
                                                <label>{neighbor.name}</label>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No hay vecinos disponibles</p>
                                    )}
                                    <InputError
                                        message={errors.neighbor_ids}
                                        className="mt-2"
                                    />
                                </div>
                            )} */}

                            {/* Archivo del Proyecto */}
                            <div>
                                <InputLabel
                                    htmlFor="file"
                                    value="Archivo del Proyecto"
                                />
                                <input
                                    id="file"
                                    type="file"
                                    onChange={(e) =>
                                        setData("file", e.target.files[0])
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.file} />
                            </div>

                            {/* Botones */}
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                                    onClick={() => reset()}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                                    disabled={processing}
                                >
                                    Guardar Proyecto
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
