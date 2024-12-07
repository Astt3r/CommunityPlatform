import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage, useForm, Link } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

export default function NeighborhoodAssociationEdit() {
    const { association } = usePage().props;
    const { data, setData, put, processing, errors } = useForm({
        name: association.name || "",
        address: association.address || "",
        phone: association.phone || "",
        email: association.email || "",
        website_url: association.website_url || "",
        date_of_funding: association.date_of_funding || "",
        is_active: association.is_active || false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("neighborhood-associations.update", association.id));
    };

    return (
        <AuthenticatedLayout>
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="mb-4">
                            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                                Editar Asociación
                            </h2>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Nombre */}
                            <div>
                                <InputLabel htmlFor="name" value="Nombre *" />
                                <TextInput
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    maxLength={255}
                                    placeholder="Nombre de la Junta de Vecinos"
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.name}
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
                                    value={data.address}
                                    onChange={(e) =>
                                        setData("address", e.target.value)
                                    }
                                    maxLength={255}
                                    placeholder="Dirección de la Junta de Vecinos"
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.address}
                                    className="mt-2"
                                />
                            </div>

                            {/* Teléfono */}
                            <div>
                                <InputLabel
                                    htmlFor="phone"
                                    value="Teléfono *"
                                />
                                <TextInput
                                    id="phone"
                                    type="text"
                                    value={data.phone}
                                    onChange={(e) =>
                                        setData("phone", e.target.value)
                                    }
                                    maxLength={9}
                                    placeholder="Número de teléfono"
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.phone}
                                    className="mt-2"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <InputLabel htmlFor="email" value="Email *" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    placeholder="Correo electrónico"
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            {/* URL */}
                            <div>
                                <InputLabel
                                    htmlFor="website_url"
                                    value="URL del Sitio Web (Incluir http:// o https://)"
                                />
                                <TextInput
                                    id="website_url"
                                    type="url"
                                    value={data.website_url}
                                    onChange={(e) =>
                                        setData("website_url", e.target.value)
                                    }
                                    placeholder="URL del sitio web"
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.website_url}
                                    className="mt-2"
                                />
                            </div>

                            {/* Fecha de Fundación */}
                            <div>
                                <InputLabel
                                    htmlFor="date_of_funding"
                                    value="Fecha de Fundación *"
                                />
                                <TextInput
                                    id="date_of_funding"
                                    type="date"
                                    value={data.date_of_funding}
                                    onChange={(e) =>
                                        setData(
                                            "date_of_funding",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Fecha de fundación"
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.date_of_funding}
                                    className="mt-2"
                                />
                            </div>

                            {/* ¿Está Activa? */}
                            <div>
                                <InputLabel
                                    htmlFor="is_active"
                                    value="¿Está activa? *"
                                />
                                <input
                                    id="is_active"
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={(e) =>
                                        setData("is_active", e.target.checked)
                                    }
                                    className="mt-1 block"
                                />
                                <InputError
                                    message={errors.is_active}
                                    className="mt-2"
                                />
                            </div>

                            <div className="flex justify-end space-x-4 mt-4">
                                <Link
                                    href={route(
                                        "neighborhood-associations.index"
                                    )}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                                >
                                    Cancelar
                                </Link>
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
