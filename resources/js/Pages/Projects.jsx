import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Proyectos
                </h2>
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
                                            <h2 className="text-xl font-semibold">Bienvenido a la Plataforma de Gestión de Juntas de Vecinos</h2>
                                            <p>Panel de Proyectos.</p>
                                            <div className="quick-access grid grid-cols-2 gap-4">
                                                <div className="bg-blue-500 p-4 text-white"><a href="#">Crear Proyecto</a></div>
                                                <div className="bg-blue-500 p-4 text-white"><a href="#">Ver Proyectos</a></div>
                                                
                                            </div>
                                        </div>

                                        <div className="section my-6">
                                            <h2 className="text-xl font-semibold">Proyectos Actuales</h2>
                                            <div className="projects grid grid-cols-2 gap-4">
                                                <div className="p-4 border">
                                                    <h3 className="font-bold">Proyecto A</h3>
                                                    <p>Descripción breve del proyecto.</p>
                                                    <p><strong>Estado:</strong> En curso</p>
                                                </div>
                                                <div className="p-4 border">
                                                    <h3 className="font-bold">Proyecto B</h3>
                                                    <p>Descripción breve del proyecto.</p>
                                                    <p><strong>Estado:</strong> Finalizado</p>
                                                </div>
                                            </div>
                                            <a href="#" className="block mt-4">Ver Todos los Proyectos</a>
                                        </div>

                                        
                                    </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
