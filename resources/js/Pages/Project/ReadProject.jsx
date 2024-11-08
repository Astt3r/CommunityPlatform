import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <div className="">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Proyectos
                    </h2>
                    <div className="flex justify-end">
                        <Link
                            href={route("projects.create")}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                            Crear Nuevo Proyecto
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Vista Proyectos
                            <div id="content-wrapper">
                                <div className="section">
                                    <h2 className="text-xl font-semibold">
                                        Bienvenido a la Plataforma de Gestión de
                                        Juntas de Vecinos
                                    </h2>
                                    <p>Panel de Proyectos.</p>
                                </div>

                                <div className="section my-6">
                                    <h2 className="text-xl font-semibold">
                                        Proyectos Actuales
                                    </h2>
                                    <div className="projects grid grid-cols-2 gap-4">
                                        <div className="p-4 border">
                                            <h3 className="font-bold">
                                                Proyecto A
                                            </h3>
                                            <p>
                                                Descripción breve del proyecto.
                                            </p>
                                            <p>
                                                <strong>Estado:</strong> En
                                                curso
                                            </p>
                                        </div>
                                        <div className="p-4 border">
                                            <h3 className="font-bold">
                                                Proyecto B
                                            </h3>
                                            <p>
                                                Descripción breve del proyecto.
                                            </p>
                                            <p>
                                                <strong>Estado:</strong>{" "}
                                                Finalizado
                                            </p>
                                        </div>
                                    </div>
                                    <a href="#" className="block mt-4">
                                        Ver Todos los Proyectos
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
