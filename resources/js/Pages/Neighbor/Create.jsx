import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

export default function CreateNeighbor({ associations, users = [] }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        address: "",
        identification_number: "",
        registration_date: "",
        birth_date: "",
        status: "inactive", // Default to inactive
        last_participation_date: "",
        user_id: "", // Keep user_id optional
        neighborhood_association_id: "", // Remains a foreign key
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("neighbors.store"), {
            onError: (error) => {
                console.error("Error al guardar el vecino:", error);
            },
            onFinish: () => {
                if (Object.keys(errors).length === 0) reset();
            },
        });
    };

    const toggleStatus = () => {
        setData("status", data.status === "active" ? "inactive" : "active");
    };
    const validateRut = (rut) => {
        // Remueve puntos y guión
        rut = rut.replace(/[.-]/g, "");
        
        if (rut.length < 8 || rut.length > 9) {
            return false;
        }
    
        // Cálculo del dígito verificador
        let total = 0;
        let multiplier = 2;
    
        for (let i = rut.length - 2; i >= 0; i--) {
            total += parseInt(rut[i]) * multiplier;
            multiplier = multiplier === 7 ? 2 : multiplier + 1;
        }
    
        const remainder = 11 - (total % 11);
        const dv = remainder === 11 ? "0" : remainder === 10 ? "K" : remainder.toString();
    
        return dv === rut[rut.length - 1].toUpperCase();
    };
    
    // Dentro del `TextInput`, puedes agregar el evento `onBlur`:
    <TextInput
        id="identification_number"
        type="text"
        name="identification_number"
        value={data.identification_number}
        onChange={(e) => setData("identification_number", e.target.value)}
        onBlur={() => {
            if (!validateRut(data.identification_number)) {
                alert("El RUT ingresado no es válido.");
            }
        }}
        placeholder="Ej: 12.345.678-9"
        className="mt-1 block w-full"
    />
    
    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Crear Vecino
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
                                    onChange={(e) => setData("identification_number", e.target.value)}
                                    onBlur={() => {
                                        // Lógica para validar el formato RUT, si deseas implementarla aquí
                                    }}
                                    placeholder="Ej: 12.345.678-9"
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
                                <button
                                    type="button"
                                    onClick={toggleStatus}
                                    className={`px-4 py-2 rounded ${data.status === "active" ? "bg-green-500" : "bg-red-500"} text-white hover:opacity-80`}
                                >
                                    {data.status === "active" ? "Activo" : "Inactivo"}
                                </button>
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
                                    value="Asociación Vecinal"
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
                                    value="Usuario Asignado (Opcional si el usuario aún no ha sido creado)"
                                />
                                <select
                                    id="user_id"
                                    name="user_id"
                                    value={data.user_id}
                                    onChange={(e) => setData("user_id", e.target.value)}
                                    className="mt-1 block w-full"
                                >
                                    <option value="">Seleccione un Usuario (Opcional)</option> {/* Opción para valor null */}
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.name} - {user.email}
                                        </option>
                                    ))}
                                </select>


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
                                    Agregar Vecino
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
