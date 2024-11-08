import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Meetings() {
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
                                {/* Ejemplo de reunión */}
                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-bold text-lg">Tema Principal</h3>
                                    <p className="text-gray-600">
                                        Descripción breve de la reunión realizada.
                                    </p>
                                    <p>
                                        <strong>Fecha:</strong> 2024-11-01
                                    </p>
                                    <p>
                                        <strong>Lugar:</strong> Sala de Conferencias A
                                    </p>
                                    <p>
                                        <strong>Convocada por:</strong> Administrador
                                    </p>
                                    <p>
                                        <strong>Estado:</strong> Finalizada
                                    </p>
                                    <a href="#" className="text-blue-500 mt-2 block">
                                        Ver Detalles
                                    </a>
                                </div>
                                {/* Repetir el componente de reunión para cada reunión en la lista */}
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
