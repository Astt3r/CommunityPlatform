import { Link } from "@inertiajs/react";

export default function AdminLayout({ header, children }) {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar o barra lateral específica para el panel de administración */}
            <nav className="bg-gray-800 p-4 text-white">
                <div className="container mx-auto flex justify-between">
                    <Link
                        href={route("admin.dashboard")}
                        className="text-lg font-semibold"
                    >
                        Dashboard Administrativo
                    </Link>
                    {/* Agrega enlaces o secciones específicas del administrador aquí */}
                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="text-sm"
                    >
                        Log Out
                    </Link>
                    {/* <Link
                        href={route("admin.associations.create")}
                        className="text-sm"
                    >
                        Crear Asociación
                    </Link>
                    <Link href={route("residents.create")} className="text-sm">
                        Registrar Vecino
                    </Link> */}
                </div>
            </nav>

            <header className="bg-white shadow">
                <div className="container mx-auto px-4 py-6">{header}</div>
            </header>

            <main className="container mx-auto px-4 py-6">{children}</main>
        </div>
    );
}
