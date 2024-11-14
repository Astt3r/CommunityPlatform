import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

export default function CreateMeeting() {
    const { data, setData, post, processing, errors, reset } = useForm({
        fecha_reunion: "",
        tema_principal: "",
        descripcion: "",
        lugar: "",
        convocada_por: "",
        resultado: "",
        estado: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("meeting.store"), {
            onFinish: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Crear Reunión
                </h2>
            }
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <InputLabel
                                    htmlFor="fecha_reunion"
                                    value="Fecha de Reunión"
                                />
                                <TextInput
                                    id="fecha_reunion"
                                    type="date"
                                    name="fecha_reunion"
                                    value={data.fecha_reunion}
                                    onChange={(e) =>
                                        setData("fecha_reunion", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.fecha_reunion}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="tema_principal"
                                    value="Tema Principal"
                                />
                                <TextInput
                                    id="tema_principal"
                                    type="text"
                                    name="tema_principal"
                                    value={data.tema_principal}
                                    onChange={(e) =>
                                        setData(
                                            "tema_principal",
                                            e.target.value
                                        )
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.tema_principal}
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
                                <InputLabel htmlFor="lugar" value="Lugar" />
                                <TextInput
                                    id="lugar"
                                    type="text"
                                    name="lugar"
                                    value={data.lugar}
                                    onChange={(e) =>
                                        setData("lugar", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.lugar}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="convocada_por"
                                    value="Convocada Por"
                                />
                                <TextInput
                                    id="convocada_por"
                                    type="text"
                                    name="convocada_por"
                                    value={data.convocada_por}
                                    onChange={(e) =>
                                        setData("convocada_por", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.convocada_por}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="resultado"
                                    value="Resultado"
                                />
                                <TextInput
                                    id="resultado"
                                    type="text"
                                    name="resultado"
                                    value={data.resultado}
                                    onChange={(e) =>
                                        setData("resultado", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.resultado}
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
                                    Agregar Reunión
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
