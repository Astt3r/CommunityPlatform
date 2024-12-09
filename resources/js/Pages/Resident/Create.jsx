import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

export default function CreateResident({ associations }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        address: "",
        identification_number: "",
        registration_date: "",
        birth_date: "",
        status: "",
        last_participation_date: "",
        user_id: "", // Mantener user_id opcional
        neighborhood_association_id: "", // Se mantiene como clave foránea
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("resident.store"), {
            onError: (error) => {
                console.error("Error al guardar el residente:", error);
            },
            onFinish: () => {
                if (Object.keys(errors).length === 0) reset();
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Crear Residente
                </h2>
            }
        >
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <InputLabel
                                    htmlFor="address"
                                    value="Dirección"
                                />
                                <TextInput
                                    id="address"
                                    type="text"
                                    name="address"
                                    value={data.address}
                                    onChange={(e) =>
                                        setData("address", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.address}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="identification_number"
                                    value="Número de Identificación"
                                />
                                <TextInput
                                    id="identification_number"
                                    type="text"
                                    name="identification_number"
                                    value={data.identification_number}
                                    onChange={(e) =>
                                        setData(
                                            "identification_number",
                                            e.target.value
                                        )
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.identification_number}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="registration_date"
                                    value="Fecha de Registro"
                                />
                                <TextInput
                                    id="registration_date"
                                    type="date"
                                    name="registration_date"
                                    value={data.registration_date}
                                    onChange={(e) =>
                                        setData(
                                            "registration_date",
                                            e.target.value
                                        )
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.registration_date}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="birth_date"
                                    value="Fecha de Nacimiento"
                                />
                                <TextInput
                                    id="birth_date"
                                    type="date"
                                    name="birth_date"
                                    value={data.birth_date}
                                    onChange={(e) =>
                                        setData("birth_date", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.birth_date}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="status" value="Estado" />
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

                            <div>
                                <InputLabel
                                    htmlFor="last_participation_date"
                                    value="Fecha de Última Participación"
                                />
                                <TextInput
                                    id="last_participation_date"
                                    type="date"
                                    name="last_participation_date"
                                    value={data.last_participation_date}
                                    onChange={(e) =>
                                        setData(
                                            "last_participation_date",
                                            e.target.value
                                        )
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.last_participation_date}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="neighborhood_association_id"
                                    value="Junta de Vecinos"
                                />
                                <select
                                    id="neighborhood_association_id"
                                    name="neighborhood_association_id"
                                    value={data.neighborhood_association_id}
                                    onChange={(e) =>
                                        setData(
                                            "neighborhood_association_id",
                                            e.target.value
                                        )
                                    }
                                    className="mt-1 block w-full"
                                >
                                    <option value="">
                                        Seleccione una Asociación
                                    </option>
                                    {associations.map((association) => (
                                        <option
                                            key={association.id}
                                            value={association.id}
                                        >
                                            {association.name}
                                        </option>
                                    ))}
                                </select>
                                <InputError
                                    message={errors.neighborhood_association_id}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="user_id"
                                    value="ID de Usuario (Opcional)"
                                />
                                <TextInput
                                    id="user_id"
                                    type="number"
                                    name="user_id"
                                    value={data.user_id}
                                    onChange={(e) =>
                                        setData("user_id", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.user_id}
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
                                    Agregar Residente
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
