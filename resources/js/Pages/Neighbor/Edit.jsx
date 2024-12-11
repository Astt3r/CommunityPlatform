import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, router } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { formatRUT } from "@/Components/format";
import React, { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";

export default function EditNeighborWithUser({
    neighbor,
    associations,
    committees, // Directivas disponibles
    userAssociationId,
    userAssociationName,
}) {
    const today = new Date().toISOString().split("T")[0];

    const [isBoardMember, setIsBoardMember] = useState(false); // Estado para el checkbox
    const [selectedCommittee, setSelectedCommittee] = useState(""); // Directiva seleccionada
    const { data, setData, put, processing, errors, reset } = useForm({
        address: neighbor.address ?? "",
        identification_number: neighbor.identification_number ?? "",
        registration_date: neighbor.registration_date ?? today,
        birth_date: neighbor.birth_date ?? "",
        phone: neighbor.phone ?? "",
        status: neighbor.status ?? "inactive",
        last_participation_date: neighbor.last_participation_date ?? "",
        notes: neighbor.notes ?? "",
        neighborhood_association_id:
            neighbor.neighborhood_association_id ?? userAssociationId ?? "",
        name: neighbor.user?.name ?? "",
        email: neighbor.user?.email ?? "",
        password: "",
        password_confirmation: "",
        role: neighbor.user?.role ?? "resident",
        committee_id: neighbor.committee_id ?? "",
        committee_role: neighbor.committee_role ?? "",
        joined_date: neighbor.joined_date ?? "",
        left_date: neighbor.left_date ?? "",
    });

    console.log("neighbordates:", neighbor.joined_date, neighbor.left_date);

    const userRole = usePage().props.auth.user.role;
    const neighborhoodAssociationId =
        usePage().props.neighbor.neighborhood_association_id;

    const isBoardMemberDeprecated = !!userAssociationId;

    const submit = (e) => {
        e.preventDefault();
        put(route("neighbors.update", neighbor.id));
    };

    const handleCancel = () => {
        reset();
        router.visit(route("neighbors.index"));
    };

    useEffect(() => {}, [isBoardMemberDeprecated]); // No usar esta variable

    useEffect(() => {
        if (neighbor.committee_id) {
            setIsBoardMember(true);
            setSelectedCommittee(neighbor.committee_id);

            // Only parse and set non-null dates
            if (neighbor.joined_date) {
                const joinedDate = new Date(neighbor.joined_date);
                const formattedJoinedDate = joinedDate
                    .toISOString()
                    .split("T")[0];
                setData("joined_date", formattedJoinedDate);
            }

            if (neighbor.left_date) {
                const leftDate = new Date(neighbor.left_date);
                const formattedLeftDate = leftDate.toISOString().split("T")[0];
                setData("left_date", formattedLeftDate);
            }
        }
    }, []);

    return (
        <AuthenticatedLayout>
            <div className="py-12">
                <div className="max-w-full mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="mb-4">
                            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                                Editar Vecino
                            </h2>
                            <p className="text-sm text-gray-600">
                                Los campos marcados con{" "}
                                <span className="text-red-500">*</span> son
                                obligatorios.
                            </p>
                        </div>
                        <form onSubmit={submit} className="space-y-4">
                            {/* Nombre */}
                            <div>
                                <InputLabel htmlFor="name" value="Nombre *" />
                                <TextInput
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>
                            {/* Correo Electrónico */}
                            <div>
                                <InputLabel
                                    htmlFor="email"
                                    value="Correo Electrónico *"
                                />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            {/* Dirección */}
                            <div>
                                <InputLabel
                                    htmlFor="address"
                                    value="Dirección *"
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
                                    required
                                />
                                <InputError
                                    message={errors.address}
                                    className="mt-2"
                                />
                            </div>
                            {/* Número de Identificación */}
                            <div>
                                <InputLabel
                                    htmlFor="identification_number"
                                    value="Número de Identificación (RUT) *"
                                />
                                <TextInput
                                    id="identification_number"
                                    type="text"
                                    name="identification_number"
                                    value={data.identification_number}
                                    onChange={(e) =>
                                        setData(
                                            "identification_number",
                                            formatRUT(e.target.value)
                                        )
                                    }
                                    placeholder="Ej: 12.345.678-9"
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError
                                    message={errors.identification_number}
                                    className="mt-2"
                                />
                            </div>
                            {/* Fecha de Registro */}
                            <div>
                                <InputLabel
                                    htmlFor="registration_date"
                                    value="Fecha de Registro *"
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
                                    max={today}
                                    required
                                />
                                <InputError
                                    message={errors.registration_date}
                                    className="mt-2"
                                />
                            </div>
                            {/* Fecha de Nacimiento */}
                            <div>
                                <InputLabel
                                    htmlFor="birth_date"
                                    value="Fecha de Nacimiento *"
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
                                    max={today}
                                    required
                                />
                                <InputError
                                    message={errors.birth_date}
                                    className="mt-2"
                                />
                            </div>
                            {/* Asociación Vecinal */}
                            {!neighborhoodAssociationId && (
                                <div>
                                    <InputLabel
                                        htmlFor="neighborhood_association_id"
                                        value="Junta de Vecinos"
                                    />
                                    {isBoardMemberDeprecated ? (
                                        <div className="mt-1">
                                            <TextInput
                                                id="neighborhood_association_id"
                                                name="neighborhood_association_id"
                                                value={userAssociationName}
                                                readOnly
                                                className="bg-gray-100 cursor-not-allowed w-full"
                                            />
                                            <p className="text-sm text-gray-500">
                                                Solo puedes asignar vecinos a la
                                                asociación a la que perteneces.
                                            </p>
                                        </div>
                                    ) : (
                                        <select
                                            id="neighborhood_association_id"
                                            name="neighborhood_association_id"
                                            value={
                                                data.neighborhood_association_id
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "neighborhood_association_id",
                                                    e.target.value
                                                )
                                            }
                                            className="mt-1 block w-full"
                                            required
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
                                    )}
                                    <InputError
                                        message={
                                            errors.neighborhood_association_id
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            )}

                            {/* Checkbox para directiva */}
                            <div>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={isBoardMember}
                                        onChange={(e) => {
                                            const checked = e.target.checked;
                                            setIsBoardMember(checked);

                                            if (checked) {
                                                setSelectedCommittee("");
                                                setData("committee_id", "");
                                            } else {
                                                // Reset the dates when the checkbox is unchecked
                                                setData("joined_date", "");
                                                setData("left_date", "");
                                            }
                                        }}
                                    />
                                    <span>¿Es parte de la directiva?</span>
                                </label>
                            </div>

                            {isBoardMember && (
                                <div>
                                    <InputLabel value="Seleccionar Directiva" />
                                    <select
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                                        value={data.committee_id}
                                        onChange={(e) =>
                                            setData(
                                                "committee_id",
                                                e.target.value
                                            )
                                        }
                                        required={isBoardMember} // Solo obligatorio si el vecino es parte de una directiva
                                    >
                                        <option value="">
                                            Seleccione una Directiva
                                        </option>{" "}
                                        {/* Valor vacío */}
                                        {committees.map((committee) => (
                                            <option
                                                key={committee.id}
                                                value={committee.id}
                                            >
                                                {committee.name}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError
                                        message={errors.committee_id}
                                        className="mt-2"
                                    />

                                    {/* Fecha de ingreso */}
                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="joined_date"
                                            value="Fecha de Ingreso *"
                                        />
                                        <TextInput
                                            id="joined_date"
                                            type="date"
                                            name="joined_date"
                                            value={data.joined_date}
                                            onChange={(e) =>
                                                setData(
                                                    "joined_date",
                                                    e.target.value
                                                )
                                            }
                                            className="mt-1 block w-full"
                                            max={today}
                                            required
                                        />
                                        <InputError
                                            message={errors.joined_date}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* Fecha de salida */}
                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="left_date"
                                            value="Fecha de Salida (opcional)"
                                        />
                                        <TextInput
                                            id="left_date"
                                            type="date"
                                            name="left_date"
                                            value={data.left_date}
                                            onChange={(e) =>
                                                setData(
                                                    "left_date",
                                                    e.target.value
                                                )
                                            }
                                            className="mt-1 block w-full"
                                            min={data.joined_date || ""}
                                        />
                                        <InputError
                                            message={errors.left_date}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Botones */}
                            <div className="flex flex-col md:flex-row justify-end space-y-4 md:space-y-0 md:space-x-4 mt-4">
                                <button
                                    type="button"
                                    className="w-full md:w-auto bg-gray-500 text-white px-4 py-2 rounded-md"
                                    onClick={handleCancel}
                                >
                                    Cancelar
                                </button>
                                <PrimaryButton
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                                    disabled={processing}
                                >
                                    Guardar Cambios
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
