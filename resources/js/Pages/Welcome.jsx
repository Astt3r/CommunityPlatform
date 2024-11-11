import { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [juntasDeVecinos, setJuntasDeVecinos] = useState(0);
    const [usuarios, setUsuarios] = useState(0);
    const [proyectos, setProyectos] = useState(0);

    useEffect(() => {
        const randomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        setJuntasDeVecinos(randomInRange(30, 50));
        setUsuarios(randomInRange(500, 600));
        setProyectos(randomInRange(200, 350));
    }, []);

    const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <>
            <Head title="Welcome" />
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
            <div className="bg-gradient-to-br from-blue-600 via-indigo-800 to-gray-900 text-white min-h-screen flex flex-col justify-between relative">
                
                {/* Navbar */}
                <nav className="bg-white bg-opacity-80 text-gray-800 py-4 px-8 flex justify-between items-center shadow-md backdrop-filter backdrop-blur-md">
                    <div className="text-lg font-semibold hidden md:block">Junta Transparente</div>
                    <div className="hidden md:flex space-x-4">
                        <Link href="/login" className="btn-primary">Log in</Link>
                        <Link href="/register" className="btn-secondary">Register</Link>
                    </div>
                    <button onClick={toggleMenu} className="text-2xl md:hidden">≡</button>
                    {isMobileMenuOpen && (
                        <div className="absolute top-16 right-8 bg-white bg-opacity-90 rounded-lg shadow-md py-2 px-4 space-y-2 md:hidden">
                            <Link href="/login" className="block text-gray-800 hover:bg-gray-200 p-2 rounded">Log in</Link>
                            <Link href="/register" className="block text-gray-800 hover:bg-gray-200 p-2 rounded">Register</Link>
                        </div>
                    )}
                </nav>
                
                {/* Main Content */}
                <main className="flex-grow flex flex-col items-center text-center space-y-8 py-20 px-4">
                    <div className="flex flex-col items-center space-y-4">
                        <img src="logo.png" alt="Logo de la empresa" className="h-32 w-32" />
                        <h1 className="text-4xl font-bold">Bienvenido a nuestro sistema</h1>
                        <p className="text-xl max-w-lg">Descubre todas las funcionalidades que tenemos para ti</p>
                    </div>

                    <button className="btn-primary mt-4">Contacta tu oficina de JDV</button>

                    {/* Information Section */}
                    <section className="max-w-4xl w-full mt-12">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: "https://img.icons8.com/ios-glyphs/40/ffffff/data-in-both-directions.png",
                                    title: "¿Cómo Funciona?",
                                    text: "Descubre cómo Junta Transparente centraliza y organiza la información para una gestión comunitaria clara y accesible.",
                                },
                                {
                                    icon: "https://img.icons8.com/ios-glyphs/40/ffffff/user-shield.png",
                                    title: "Beneficios de la Transparencia",
                                    text: "La transparencia fomenta la confianza y fortalece la participación de todos los miembros de la comunidad.",
                                },
                                {
                                    icon: "https://img.icons8.com/ios-glyphs/40/ffffff/video-conference.png",
                                    title: "Unirse a las Reuniones",
                                    text: "Accede a reuniones comunitarias y participa activamente en las decisiones de tu comunidad.",
                                },
                            ].map((item, index) => (
                                <div key={index} className="bg-gray-800 bg-opacity-90 p-6 rounded-md text-center shadow-lg transform hover:scale-105 transition-transform duration-300">
                                    <img src={item.icon} alt={item.title} className="mx-auto mb-4" />
                                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                    <p>{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Statistics Section */}
                    <section className="w-full max-w-4xl mt-16">
                        <h2 className="text-2xl font-bold mb-8">Datos de Junta Transparente</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                {
                                    icon: "https://img.icons8.com/ios-glyphs/40/ffffff/groups.png",
                                    value: juntasDeVecinos,
                                    label: "Juntas de Vecinos",
                                },
                                {
                                    icon: "https://img.icons8.com/ios-glyphs/40/ffffff/conference-call.png",
                                    value: usuarios,
                                    label: "Usuarios",
                                },
                                {
                                    icon: "https://img.icons8.com/ios-glyphs/40/ffffff/task.png",
                                    value: proyectos,
                                    label: "Proyectos",
                                },
                            ].map((item, index) => (
                                <div key={index} className="bg-gray-800 bg-opacity-90 p-6 rounded-md text-center shadow-lg transform hover:scale-105 transition-transform duration-300">
                                    <img src={item.icon} alt={item.label} className="mx-auto mb-4" />
                                    <h3 className="text-3xl font-bold text-primary mb-2">{item.value}</h3>
                                    <p>{item.label}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>
                
                {/* Footer */}
                <footer className="bg-gray-100 text-gray-800 py-6 text-center backdrop-filter backdrop-blur-md">
                    <div>Contacto: <a href="mailto:info@ejemplo.com" className="text-primary hover:underline">info@ejemplo.com</a> | Teléfono: (123) 456-7890</div>
                    <div className="text-sm mt-1">© Junta Transparente. Todos los derechos reservados.</div>
                </footer>
            </div>

            <style jsx>{`
                .btn-primary {
                    background-color: #006FB3;
                    color: white;
                    padding: 0.75rem 1.5rem;
                    font-weight: bold;
                    border-radius: 8px;
                    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
                    transition: background-color 0.3s;
                }
                .btn-primary:hover { background-color: #004a7f; }
                
                .btn-secondary {
                    background-color: #FE6565;
                    color: white;
                    padding: 0.75rem 1.5rem;
                    font-weight: bold;
                    border-radius: 8px;
                    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
                    transition: background-color 0.3s;
                }
                .btn-secondary:hover { background-color: #cc5252; }
                
                .text-primary { color: #006FB3; }
            `}</style>
        </>
    );
}
