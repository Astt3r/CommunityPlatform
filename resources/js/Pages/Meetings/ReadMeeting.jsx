import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { formatDate } from "@/Components/formatDate";


export default function Meetings({ meetings = [] }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm("¿Estás seguro de que deseas eliminar esta reunión?")) {
            destroy(route("meeting.destroy", id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Reuniones Recientes
                    </h2>
                    <div className="flex justify-end">
                        <Link
                            href={route("meeting.create")}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                            Crear Nueva Reunión
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Reuniones" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="text-xl font-semibold mb-4">
                                Reuniones Realizadas
                            </h2>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                                {meetings.map((meeting) => (
                                    <div
                                        key={meeting.id_reunion}
                                        className="p-4 border rounded-lg"
                                    >
                                        <h3 className="font-bold text-lg">
                                            {meeting.tema_principal}
                                        </h3>
                                        <p className="text-gray-600">
                                            {meeting.descripcion}
                                        </p>
                                        <p>
                                            <strong>Fecha:</strong>{" "}
                                            {formatDate(meeting.fecha_reunion)}
                                        </p>
                                        <p>
                                            <strong>Lugar:</strong>{" "}
                                            {meeting.lugar}
                                        </p>
                                        <p>
                                            <strong>Convocada por:</strong>{" "}
                                            {meeting.convocada_por}
                                        </p>
                                        <p>
                                            <strong>Estado:</strong>{" "}
                                            {meeting.estado}
                                        </p>
                                        <div className="flex space-x-2 mt-2">
                                            <Link
                                                href={route(
                                                    "meeting.edit",
                                                    meeting.id_reunion
                                                )}
                                                className="text-sky-500"
                                            >
                                                Editar
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        meeting.id_reunion
                                                    )
                                                }
                                                className="text-red-500"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <a href="#" className="block mt-6 text-blue-500">
                                Ver Todas las Reuniones
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
