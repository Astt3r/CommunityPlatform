import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ reunions = [], projects = [] }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    console.log("Reunions:", reunions); // Verificar los datos de reuniones
    console.log("Projects:", projects);  // Verificar los datos de proyectos

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Gestión de Juntas de Vecinos
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="flex">
                {/* Sidebar */}
                <div className={`transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} w-64 bg-gray-800 text-white fixed inset-y-0 left-0 z-30`}>
                    <button onClick={toggleSidebar} className="p-4 text-white">✖ Cerrar</button>
                    <h3 className="p-4 text-lg font-semibold">Panel de Control</h3>
                    <nav className="p-4">
                        <a href="#" className="block py-2">Dashboard</a>
                        <a href="#" className="block py-2">Gestión de Usuarios</a>
                        <a href="#" className="block py-2">Gestión de Juntas</a>
                        <a href="#" className="block py-2">Gestión de Proyectos</a>
                        <a href="#" className="block py-2">Gestión de Ingresos y Gastos</a>
                        <a href="#" className="block py-2">Reportes</a>
                        <a href="#" className="block py-2">Ajustes</a>
                    </nav>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-6 ml-64">
                    <button onClick={toggleSidebar} className="p-4 bg-gray-800 text-white">☰ Menú</button>

                    <div className="py-12">
                        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                                <div className="p-6 text-gray-900">
                                    <header>
                                        <h1 className="text-3xl font-bold">Gestión de Juntas de Vecinos</h1>
                                    </header>

                                    <div id="content-wrapper">
                                        <div className="section my-6">
                                            <h2 className="text-xl font-semibold">Reuniones Recientes</h2>
                                            <div className="meetings grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {reunions.slice(0, 3).map((meeting, index) => (
                                                    <div key={index} className="p-4 border">
                                                        <h3 className="font-bold">{meeting.tema_principal}</h3>
                                                        <p>{meeting.descripcion}</p>
                                                        <p><strong>Fecha:</strong> {meeting.fecha_reunion}</p>
                                                    </div>
                                                ))}
                                            </div>
                                            <a href="#" className="block mt-4">Ver Todas las Reuniones</a>
                                        </div>

                                        <div className="section my-6">
    <h2 className="text-xl font-semibold">Proyectos Recientes</h2>
    <div className="projects grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.slice(0, 3).map((project, index) => (
            <div key={index} className="p-4 border">
                <h3 className="font-bold">{project.nombre}</h3>
                <p>{project.descripcion}</p>
                <p><strong>Estado:</strong> {project.estado}</p>
            </div>
        ))}
    </div>
    <a href="#" className="block mt-4">Ver Todos los Proyectos</a>
</div>
                                    </div>

                                    <footer className="mt-6">
                                        <a href="#" className="text-blue-500">Política de Privacidad</a> |
                                        <a href="#" className="text-blue-500">Términos de Uso</a> |
                                        <a href="#" className="text-blue-500">Contacto</a>
                                    </footer>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
