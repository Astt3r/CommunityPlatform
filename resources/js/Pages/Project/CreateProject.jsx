import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

export default function CreateProject() {
    const { data, setData, post, processing, errors, reset } = useForm({
        nombre: "",
        descripcion: "",
        problema: "",
        fecha_inicio: "",
        fecha_fin: "",
        estado: "",
        responsable: "",
        presupuesto: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("project.store"), {
            onFinish: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Crear Proyecto
                </h2>
            }
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <InputLabel
                                    htmlFor="nombre"
                                    value="Nombre del Proyecto"
                                />
                                <TextInput
                                    id="nombre"
                                    type="text"
                                    name="nombre"
                                    value={data.nombre}
                                    onChange={(e) =>
                                        setData("nombre", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.nombre}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="descripcion"
                                    value="Descripción"
                                />
                                <TextInput
                                    id="descripcion"
                                    type="text"
                                    name="descripcion"
                                    value={data.descripcion}
                                    onChange={(e) =>
                                        setData("descripcion", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.descripcion}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="problema"
                                    value="Problema"
                                />
                                <TextInput
                                    id="problema"
                                    type="text"
                                    name="problema"
                                    value={data.problema}
                                    onChange={(e) =>
                                        setData("problema", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.problema}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="fecha_inicio"
                                    value="Fecha Inicio"
                                />
                                <TextInput
                                    id="fecha_inicio"
                                    type="date"
                                    name="fecha_inicio"
                                    value={data.fecha_inicio}
                                    onChange={(e) =>
                                        setData("fecha_inicio", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.fecha_inicio}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="fecha_fin"
                                    value="fecha_fin"
                                />
                                <TextInput
                                    id="fecha_fin"
                                    type="date"
                                    name="fecha_fin"
                                    value={data.fecha_fin}
                                    onChange={(e) =>
                                        setData("fecha_fin", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.fecha_fin}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="estado" value="Estado" />
                                <TextInput
                                    id="estado"
                                    type="text"
                                    name="estado"
                                    value={data.estado}
                                    onChange={(e) =>
                                        setData("estado", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.estado}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="responsable"
                                    value="Responsable"
                                />
                                <TextInput
                                    id="responsable"
                                    type="text"
                                    name="responsable"
                                    value={data.responsable}
                                    onChange={(e) =>
                                        setData("responsable", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.responsable}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="presupuesto"
                                    value="Presupuesto"
                                />
                                <TextInput
                                    id="presupuesto"
                                    type="number"
                                    name="presupuesto"
                                    value={data.presupuesto}
                                    onChange={(e) =>
                                        setData("presupuesto", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.presupuesto}
                                    className="mt-2"
                                />
                            </div>

                            <div className="flex justify-end space-x-4 mt-4">
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
                                    Agregar Proyecto
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
