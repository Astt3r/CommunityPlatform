import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react'; // Importar useState para manejar el estado de la sidebar

export default function Dashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
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
                <div className="flex-1 p-6 ml-64"> {/* Ajuste de margen para que el contenido no esté cubierto por la sidebar */}
                    <button onClick={toggleSidebar} className="p-4 bg-gray-800 text-white">☰ Menú</button>

                    <div className="py-12">
                        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                                <div className="p-6 text-gray-900">
                                    You're logged in!
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
