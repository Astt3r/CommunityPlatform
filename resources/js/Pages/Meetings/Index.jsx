import React, { useState, useEffect } from "react";
import { usePage, Link, useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function MeetingIndex() {
    const { meetings, filters, flash } = usePage().props;
    const { data, setData, get } = useForm({
        main_topic: filters.main_topic || "",
        status: filters.status || "",
    });
    const [showAlert, setShowAlert] = useState(!!flash.success);

    const handleDelete = (id) => {
        if (confirm("¿Estás seguro de que deseas eliminar esta reunión?")) {
            router.delete(route("meetings.destroy", id), {
                onSuccess: () => {
                    setShowAlert(true);
                },
            });
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        get(route("meetings.index"));
    };

    useEffect(() => {
        if (flash.success) {
            setShowAlert(true);
        }
    }, [flash.success]);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Reuniones
                </h2>
            }
        >
            <Head title="Reuniones" />

            {/* Alerta de éxito */}
            {showAlert && (
                <div className="alert alert-success flex items-center justify-between p-4 mb-4 text-green-700 bg-green-100 rounded-lg">
                    <span>{flash.success}</span>
                    <button
                        type="button"
                        className="text-green-700 hover:text-green-900"
                        onClick={() => setShowAlert(false)}
                    >
                        ✖
                    </button>
                </div>
            )}

            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <Link
                    href="/meetings/create"
                    className="text-blue-500 hover:text-blue-700 mb-4 md:mb-0"
                >
                    Crear Nueva Reunión
                </Link>

                <form
                    onSubmit={handleSearch}
                    className="flex flex-col md:flex-row"
                >
                    <input
                        type="text"
                        placeholder="Buscar por tema principal"
                        value={data.main_topic}
                        onChange={(e) => setData("main_topic", e.target.value)}
                        className="border rounded px-2 py-1 mb-2 md:mb-0 md:mr-2 w-full md:w-auto"
                    />
                    <select
                        value={data.status}
                        onChange={(e) => setData("status", e.target.value)}
                        className="border rounded px-2 py-1 mb-2 md:mb-0 md:mr-2 w-full md:w-auto"
                    >
                        <option value="">Todos</option>
                        <option value="scheduled">Programada</option>
                        <option value="completed">Completada</option>
                        <option value="canceled">Cancelada</option>
                    </select>
                    <button
                        type="submit"
                        className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 w-full md:w-auto"
                    >
                        Buscar
                    </button>
                </form>
            </div>

            <div className="overflow-x-auto">
                <table className="table-auto w-full mt-4 text-sm md:text-base">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Fecha</th>
                            <th className="px-4 py-2">Tema Principal</th>
                            <th className="px-4 py-2">Organizador</th>
                            <th className="px-4 py-2">Estado</th>
                            <th className="px-4 py-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {meetings.data.map((meeting) => (
                            <tr key={meeting.id} className="border-t">
                                <td className="px-4 py-2">
                                    {new Date(meeting.meeting_date).toLocaleString()}
                                </td>
                                <td className="px-4 py-2">{meeting.main_topic}</td>
                                <td className="px-4 py-2">{meeting.organized_by || "N/A"}</td>
                                <td
                                    className={`px-4 py-2 ${
                                        meeting.status === "scheduled"
                                            ? "text-blue-500"
                                            : meeting.status === "completed"
                                            ? "text-green-500"
                                            : "text-red-500"
                                    }`}
                                >
                                    {meeting.status}
                                </td>
                                <td className="px-4 py-2 flex flex-col md:flex-row gap-2">
                                <Link
                                    href={route("meetings.show", meeting.id)} // Usa la ruta generada por Laravel
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    Ver
                                </Link>

                                    <Link
                                        href={`/meetings/${meeting.id}/edit`}
                                        className="text-yellow-500 hover:text-yellow-700"
                                    >
                                        Editar
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(meeting.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                {meetings.links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.url || ""}
                        className={`px-4 py-2 border rounded ${
                            link.active ? "font-bold" : ""
                        } ${
                            link.url
                                ? "text-blue-500 hover:text-blue-700"
                                : "text-gray-400"
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    ></Link>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
