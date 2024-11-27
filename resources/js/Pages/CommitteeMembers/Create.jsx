import React from "react";
import { useForm, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

export default function CommitteeMemberCreate({ committees, users }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        committee_id: "",
        user_id: "",
        status: "active",
        joined_date: "",
        left_date: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("committee-members.store"), {
            onFinish: () => {
                if (Object.keys(errors).length === 0) reset();
            },
        });
    };

    const handleCancel = () => {
        reset(); // Limpia el formulario
        router.visit(route("committee-members.index")); // Redirige al índice de miembros del comité
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Agregar Miembro al Comité
                </h2>
            }
        >
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <InputLabel htmlFor="committee_id" value="Comité" />
                                <select
                                    id="committee_id"
                                    value={data.committee_id}
                                    onChange={(e) => setData("committee_id", e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                >
                                    <option value="">Seleccione un comité</option>
                                    {committees.map((committee) => (
                                        <option key={committee.id} value={committee.id}>
                                            {committee.name}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.committee_id} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="user_id" value="Usuario" />
                                <select
                                    id="user_id"
                                    value={data.user_id}
                                    onChange={(e) => setData("user_id", e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                >
                                    <option value="">Seleccione un usuario</option>
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.name}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.user_id} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="status" value="Estado" />
                                <select
                                    id="status"
                                    value={data.status}
                                    onChange={(e) => setData("status", e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                >
                                    <option value="active">Activo</option>
                                    <option value="inactive">Inactivo</option>
                                </select>
                                <InputError message={errors.status} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="joined_date" value="Fecha de Ingreso" />
                                <TextInput
                                    id="joined_date"
                                    type="date"
                                    value={data.joined_date}
                                    onChange={(e) => setData("joined_date", e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.joined_date} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="left_date" value="Fecha de Salida (Opcional)" />
                                <TextInput
                                    id="left_date"
                                    type="date"
                                    value={data.left_date}
                                    onChange={(e) => setData("left_date", e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.left_date} className="mt-2" />
                            </div>

                            <div className="flex justify-end space-x-4">
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
                                    Agregar Miembro
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
