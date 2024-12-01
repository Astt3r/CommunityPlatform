import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, router } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

export default function NeighborhoodAssociationCreate() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        address: "",
        phone: "",
        email: "",
        website_url: "",
        date_of_funding: "",
        is_active: false,
    });

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     post(route("neighborhood-associations.store"), {
    //         onFinish: () => {
    //             if (Object.keys(errors).length === 0) reset();
    //         },
    //     });
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("neighborhood-associations.store"), {
            onSuccess: () => reset(),
        });
    };

    const handleCancel = () => {
        reset(); // Limpia el formulario
        router.visit(route("neighborhood-associations.index")); // Redirige al índice
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Crear Junta de Vecinos
                </h2>
            }
        >
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Nombre */}
                            <div>
                                <InputLabel htmlFor="name" value="Nombre" />
                                <TextInput
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    onInput={(e) => {
                                        const cleanedValue =
                                            e.target.value.replace(
                                                /[^a-zA-Z\s\-]/g,
                                                ""
                                            ); // Permite letras, espacios y guiones
                                        setData(
                                            "name",
                                            cleanedValue.slice(0, 255)
                                        ); // Limita a 255 caracteres
                                    }}
                                    maxLength={255} // Máximo de 255 caracteres
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
                                    value="Dirección"
                                />
                                <TextInput
                                    id="address"
                                    type="text"
                                    name="address"
                                    value={data.address}
                                    onInput={(e) => {
                                        const cleanedValue =
                                            e.target.value.replace(
                                                /[^a-zA-Z0-9\s\-,\.]/g,
                                                ""
                                            ); // Permite letras, números, espacios, comas y puntos
                                        setData(
                                            "address",
                                            cleanedValue.slice(0, 255)
                                        ); // Limita a 255 caracteres
                                    }}
                                    maxLength={255} // Máximo de 255 caracteres
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.address}
                                    className="mt-2"
                                />
                            </div>

                            {/* Teléfono */}
                            <div>
                                <InputLabel htmlFor="phone" value="Teléfono" />
                                <TextInput
                                    id="phone"
                                    type="text"
                                    name="phone"
                                    value={data.phone}
                                    onInput={(e) => {
                                        e.target.value = e.target.value.replace(
                                            /[^0-9]/g,
                                            ""
                                        ); // Elimina caracteres no numéricos
                                        setData("phone", e.target.value);
                                    }}
                                    maxLength={9} // Máximo de 15 caracteres
                                    className="mt-1 block w-full"
                                />

                                <InputError
                                    message={errors.phone}
                                    className="mt-2"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <InputLabel htmlFor="email" value="Email" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
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
                                    value="URL del Sitio Web"
                                />
                                <TextInput
                                    id="website_url"
                                    type="url"
                                    name="website_url"
                                    value={data.website_url}
                                    onChange={(e) =>
                                        setData("website_url", e.target.value)
                                    }
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
                                    value="Fecha de Fundación"
                                />
                                <TextInput
                                    id="date_of_funding"
                                    type="date"
                                    name="date_of_funding"
                                    value={data.date_of_funding}
                                    onChange={(e) =>
                                        setData(
                                            "date_of_funding",
                                            e.target.value
                                        )
                                    }
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
                                    value="¿Está activa?"
                                />
                                <input
                                    id="is_active"
                                    type="checkbox"
                                    name="is_active"
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
                                    Crear Asociación
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
