import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { formatDate } from "@/Components/formatDate";

// Función para traducir el estado al español
const translateStatus = (status) => {
    const translations = {
        scheduled: "Programada",
        completed: "Completada",
        canceled: "Cancelada",
    };

    return translations[status] || "Desconocido";
};

export default function MeetingsIndex({ meetings }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm("¿Estás seguro de que deseas eliminar esta reunión?")) {
            destroy(route("meetings.destroy", id), {
                onError: (error) => console.error("Error al eliminar la reunión:", error),
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Reuniones Recientes
                    </h2>
                    <Link
                        href={route("meetings.create")}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                        Crear Nueva Reunión
                    </Link>
                </div>
            }
        >
            <Head title="Reuniones" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="text-lg font-semibold mb-4">
                                Listado de Reuniones
                            </h2>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                                {(meetings.data || []).map((meeting) => (
                                    <div
                                        key={meeting.id}
                                        className="p-4 border rounded-lg shadow-sm"
                                    >
                                        <h3 className="font-bold text-lg">
                                            {meeting.main_topic}
                                        </h3>
                                        <p className="text-gray-600">
                                            {meeting.description || "Sin descripción"}
                                        </p>
                                        <p>
                                            <strong>Fecha:</strong>{" "}
                                            {formatDate(meeting.meeting_date)}
                                        </p>
                                        <p>
                                            <strong>Lugar:</strong>{" "}
                                            {meeting.location || "Sin lugar"}
                                        </p>
                                        <p>
                                            <strong>Convocada por:</strong>{" "}
                                            {meeting.organized_by || "No especificado"}
                                        </p>
                                        <p>
                                            <strong>Estado:</strong>{" "}
                                            {translateStatus(meeting.status)}
                                        </p>
                                        <div className="flex space-x-4 mt-2">
                                            <Link
                                                href={route(
                                                    "meetings.edit",
                                                    meeting.id
                                                )}
                                                className="text-blue-500 hover:underline"
                                            >
                                                Editar
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(meeting.id)}
                                                className="text-red-500 hover:underline"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {meetings.data.length === 0 && (
                                <p className="text-center text-gray-600 mt-6">
                                    No hay reuniones registradas.
                                </p>
                            )}

                            <div className="mt-6">
                                <div className="flex justify-between">
                                    {meetings.prev_page_url && (
                                        <Link
                                            href={meetings.prev_page_url}
                                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
                                        >
                                            Anterior
                                        </Link>
                                    )}
                                    {meetings.next_page_url && (
                                        <Link
                                            href={meetings.next_page_url}
                                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
                                        >
                                            Siguiente
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
