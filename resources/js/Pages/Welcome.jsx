import { useState, useEffect } from "react";
import { Head, Link } from "@inertiajs/react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isInfoVisible, setIsInfoVisible] = useState(false);
    const [juntasDeVecinos, setJuntasDeVecinos] = useState(0);
    const [usuarios, setUsuarios] = useState(0);
    const [proyectos, setProyectos] = useState(0);

    useEffect(() => {
        const randomInRange = (min, max) =>
            Math.floor(Math.random() * (max - min + 1)) + min;
        setJuntasDeVecinos(randomInRange(30, 50));
        setUsuarios(randomInRange(500, 600));
        setProyectos(randomInRange(200, 350));
    }, []);

    const toggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const showInfo = () => {
        setIsInfoVisible(true);
    };

    const hideInfo = () => {
        setIsInfoVisible(false);
    };

    return (
        <>
            <Head title="Junta Transparente" />
            <link
                href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
                rel="stylesheet"
            />
            <style>{`
                .bg-primary { background-color: #006FB3; }
                .text-primary { color: #006FB3; }
                .bg-secondary { background-color: #FE6565; }
                .text-secondary { color: #FE6565; }
                .bg-tertiary { background-color: #0A132D; }
                .text-tertiary { color: #0A132D; }
                .bg-neutral { background-color: #EEEEEE; }
                .text-neutral { color: #EEEEEE; }
                .bg-gradient-custom {
                    background: linear-gradient(to bottom, #2A3B5F, #19203a, #0A132D);
                }
                .primary-btn {
                    background-color: #006FB3;
                    color: #FFFFFF;
                    padding: 16px 32px;
                    font-size: 1.25rem;
                    font-weight: bold;
                    border-radius: 8px;
                    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
                    transition: background-color 0.3s ease;
                }
                .primary-btn:hover {
                    background-color: #004a7f;
                }
                .secondary-btn {
                    background-color: #FE6565;
                    color: #FFFFFF;
                    padding: 10px 20px;
                    font-size: 1rem;
                    border-radius: 8px;
                    opacity: 0.8;
                    transition: opacity 0.3s ease;
                }
                .secondary-btn:hover {
                    opacity: 1;
                }
                @media (max-width: 768px) {
                    .desktop-menu { display: none; }
                    .hamburger-menu { display: flex; cursor: pointer; color: #000; }
                    .mobile-flex-column {
                        flex-direction: column;
                        align-items: center;
                        text-align: center;
                    }
                    .mobile-logo {
                        margin-bottom: 16px;
                    }
                }
                .mobile-menu {
                    display: none;
                    position: absolute;
                    top: 60px;
                    right: 16px;
                    background-color: #FFFFFF;
                    border-radius: 8px;
                    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
                    padding: 12px;
                    z-index: 50;
                }
                .mobile-menu.open { display: block; }
                .section-spacing { margin-top: 20px; padding-top: 20px; }
            `}</style>
            <div className="bg-gradient-custom text-light min-h-screen flex flex-col justify-between">
                <nav className="bg-neutral w-full py-4 px-8 flex items-center justify-between">
                    <div className="flex items-center">
                        <span className="text-lg font-semibold text-gray-a hidden md:block">
                            Junta Transparente
                        </span>
                    </div>
                    <div className="desktop-menu md:flex space-x-4">
                        <Link
                            href="/login"
                            className="px-4 py-2 text-sm font-semibold text-white bg-primary rounded-md hover:bg-secondary"
                        >
                            Iniciar Sesión
                        </Link>
                    </div>
                    <div
                        className="hamburger-menu md:hidden flex items-center"
                        onClick={toggleMenu}
                    >
                        <span className="text-black text-2xl font-semibold">
                            ≡
                        </span>
                    </div>
                    {isMobileMenuOpen && (
                        <div className="mobile-menu open">
                            <Link
                                href="/login"
                                className="block px-4 py-2 text-sm font-semibold text-black rounded-md hover:bg-gray-200"
                            >
                                Log in
                            </Link>
                            <Link
                                href="/register"
                                className="block px-4 py-2 text-sm font-semibold text-black rounded-md hover:bg-gray-200"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </nav>

                <main className="flex-grow flex flex-col items-center justify-center space-y-4 section-spacing">
                    <div
                        id="mainContent"
                        className="flex items-center text-white flex-wrap mobile-flex-column"
                    >
                        <img
                            src="logo.png"
                            alt="Logo de la empresa"
                            className="h-32 w-32 mr-4 md:mr-0 mobile-logo"
                        />
                        <div className="text-4xl font-bold text-center">
                            Bienvenido a nuestro sistema
                        </div>
                    </div>
                    <button id="contactButton" className="primary-btn mt-6">
                        Contacta tu oficina de JDV
                    </button>
                    <div
                        id="subContent"
                        className="text-xl text-center text-white px-4 section-spacing"
                    >
                        Descubre todas las funcionalidades que tenemos para ti
                    </div>
                    <button onClick={showInfo} className="secondary-btn mt-4">
                        ¿Qué es Junta Transparente?
                    </button>

                    {isInfoVisible && (
                        <section
                            id="infoSection"
                            className="text-white mt-8 text-center space-y-4 px-4 section-spacing"
                        >
                            <hr className="my-4 border-gray-500" />
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                                <div className="bg-gray-800 p-6 rounded-md">
                                    <img
                                        src="https://img.icons8.com/ios-glyphs/40/ffffff/data-in-both-directions.png"
                                        alt="Cómo funciona"
                                    />
                                    <h3 className="text-xl font-bold mt-4">
                                        ¿Cómo Funciona?
                                    </h3>
                                    <p className="mt-2">
                                        Descubre cómo Junta Transparente
                                        centraliza y organiza la información
                                        para una gestión comunitaria clara y
                                        accesible.
                                    </p>
                                </div>
                                <div className="bg-gray-800 p-6 rounded-md">
                                    <img
                                        src="https://img.icons8.com/ios-glyphs/40/ffffff/user-shield.png"
                                        alt="Beneficios de la Transparencia"
                                    />
                                    <h3 className="text-xl font-bold mt-4">
                                        Beneficios de la Transparencia
                                    </h3>
                                    <p className="mt-2">
                                        La transparencia fomenta la confianza y
                                        fortalece la participación de todos los
                                        miembros de la comunidad.
                                    </p>
                                </div>
                                <div className="bg-gray-800 p-6 rounded-md">
                                    <img
                                        src="https://img.icons8.com/ios-glyphs/40/ffffff/video-conference.png"
                                        alt="Unirse a las Reuniones"
                                    />
                                    <h3 className="text-xl font-bold mt-4">
                                        Unirse a las Reuniones
                                    </h3>
                                    <p className="mt-2">
                                        Accede a reuniones comunitarias y
                                        participa activamente en las decisiones
                                        de tu comunidad.
                                    </p>
                                </div>
                            </div>
                            <hr className="my-4 border-gray-500" />
                            <button
                                onClick={hideInfo}
                                className="secondary-btn mt-4"
                            >
                                Cerrar
                            </button>
                        </section>
                    )}

                    <section
                        id="fakeDataSection"
                        className="text-center mt-12 section-spacing"
                    >
                        <h2 className="text-2xl font-bold text-white mb-8">
                            Datos de Junta Transparente
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                            <div className="bg-gray-800 p-6 rounded-md">
                                <img
                                    src="https://img.icons8.com/ios-glyphs/40/ffffff/groups.png"
                                    alt="Juntas de vecinos"
                                    className="mx-auto"
                                />
                                <h3 className="text-3xl font-bold mt-4 text-primary">
                                    {juntasDeVecinos}
                                </h3>
                                <p className="mt-2 text-white">
                                    Juntas de Vecinos
                                </p>
                            </div>
                            <div className="bg-gray-800 p-6 rounded-md">
                                <img
                                    src="https://img.icons8.com/ios-glyphs/40/ffffff/conference-call.png"
                                    alt="Usuarios"
                                    className="mx-auto"
                                />
                                <h3 className="text-3xl font-bold mt-4 text-primary">
                                    {usuarios}
                                </h3>
                                <p className="mt-2 text-white">Usuarios</p>
                            </div>
                            <div className="bg-gray-800 p-6 rounded-md">
                                <img
                                    src="https://img.icons8.com/ios-glyphs/40/ffffff/task.png"
                                    alt="Proyectos"
                                    className="mx-auto"
                                />
                                <h3 className="text-3xl font-bold mt-4 text-primary">
                                    {proyectos}
                                </h3>
                                <p className="mt-2 text-white">Proyectos</p>
                            </div>
                        </div>
                    </section>
                </main>

                <footer className="w-full py-4 text-center bg-neutral text-gray-a">
                    <div className="text-sm">
                        Contacto:{" "}
                        <a
                            href="mailto:info@ejemplo.com"
                            className="text-primary hover:underline"
                        >
                            info@ejemplo.com
                        </a>{" "}
                        | Teléfono: (123) 456-7890
                    </div>
                    <div className="text-xs mt-1">
                        © Junta Transparente. Todos los derechos reservados.
                    </div>
                </footer>
            </div>
        </>
    );
}
