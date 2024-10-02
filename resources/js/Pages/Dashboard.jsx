import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

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
                                    {/* Main content from HTML */}
                                    <header>
                                        <h1 className="text-3xl font-bold">Gestión de Juntas de Vecinos</h1>
                                    </header>
                                    

                                    <div id="content-wrapper">
                                        <div className="section">
                                            <h2 className="text-xl font-semibold">Bienvenido a la Plataforma de Gestión de Juntas de Vecinos</h2>
                                            <p>Aquí puedes gestionar proyectos comunitarios, eventos, finanzas y mucho más.</p>
                                            
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

                                        <div className="section my-6">
                                            <h2 className="text-xl font-semibold">Últimos Ingresos y Gastos</h2>
                                            <div className="finance grid grid-cols-2 gap-4">
                                                <div className="p-4 border">
                                                    <h3 className="font-bold">Ingreso 1</h3>
                                                    <p>Descripción del ingreso.</p>
                                                    <p><strong>Monto:</strong> $500</p>
                                                </div>
                                                <div className="p-4 border">
                                                    <h3 className="font-bold">Gasto 1</h3>
                                                    <p>Descripción del gasto.</p>
                                                    <p><strong>Monto:</strong> $200</p>
                                                </div>
                                            </div>
                                            <a href="#" className="block mt-4">Ver Todos los Reportes</a>
                                        </div>

                                        <div className="section my-6">
                                            <h2 className="text-xl font-semibold">Noticias y Comunicaciones</h2>
                                            <ul>
                                                <li>Reunión del 20 de septiembre: Resultados y acuerdos.</li>
                                                <li>Nueva normativa para la participación de vecinos en proyectos.</li>
                                            </ul>
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
