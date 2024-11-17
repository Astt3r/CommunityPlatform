import { Head, Link } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

const Header = () => (
    <nav className="bg-white shadow-md w-full py-4 px-8 flex items-center justify-between">
        <div className="flex items-center">
            <span className="text-lg font-bold text-black hidden md:block">
                Junta Transparente
            </span>
        </div>
        <div className="desktop-menu md:flex space-x-4">
            <PrimaryButton>
                <Link href="/login">Iniciar Sesión</Link>
            </PrimaryButton>
        </div>
    </nav>
);

const Hero = () => (
    <section className="flex flex-col items-center text-center space-y-6 py-12 bg-gob-grey-5">
        <img src="logo.png" alt="Logo de la empresa" className="h-32 w-32" />
        <h1 className="text-3xl font-slab font-bold text-black">
            Bienvenido a nuestro sistema
        </h1>
        <button className="px-6 py-3 bg-gob-accent-base text-white text-lg font-bold rounded-lg shadow-lg hover:bg-gob-accent-darken-1">
            Contacta tu oficina de JDV
        </button>
        <p className="text-lg text-black px-4">
            Descubre todas las funcionalidades que tenemos para ti
        </p>
    </section>
);

const InfoSection = () => (
    <section className="text-black text-center space-y-6 py-12 bg-white">
        <h2 className="text-2xl font-slab font-bold">
            ¿Qué es Junta Transparente?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <InfoCard
                bgColor="bg-gob-primary-base"
                icon="https://img.icons8.com/ios-glyphs/40/ffffff/data-in-both-directions.png"
                title="¿Cómo Funciona?"
                text="Descubre cómo Junta Transparente centraliza y organiza la información para una gestión comunitaria clara y accesible."
            />
            <InfoCard
                bgColor="bg-gob-accent-darken-2"
                icon="https://img.icons8.com/ios-glyphs/40/ffffff/user-shield.png"
                title="Beneficios de la Transparencia"
                text="La transparencia fomenta la confianza y fortalece la participación de todos los miembros de la comunidad."
            />
            <InfoCard
                bgColor="bg-gob-primary-darken-2"
                icon="https://img.icons8.com/ios-glyphs/40/ffffff/video-conference.png"
                title="Unirse a las Reuniones"
                text="Accede a reuniones comunitarias y participa activamente en las decisiones de tu comunidad."
            />
        </div>
    </section>
);

const InfoCard = ({ bgColor, icon, title, text }) => (
    <div className={`${bgColor} p-6 rounded-md text-white`}>
        <img src={icon} alt={title} className="mx-auto" />
        <h3 className="text-lg font-bold mt-4">{title}</h3>
        <p className="mt-2 text-base">{text}</p>
    </div>
);

const StatsSection = ({ juntasDeVecinos, usuarios, proyectos }) => (
    <section className="text-center py-12 bg-gob-grey-5">
        <h2 className="text-2xl font-slab font-bold text-black mb-8">
            Datos de Junta Transparente
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <StatCard
                bgColor="bg-gob-accent-base"
                icon="https://img.icons8.com/ios-glyphs/40/ffffff/groups.png"
                value={juntasDeVecinos}
                label="Juntas de Vecinos"
            />
            <StatCard
                bgColor="bg-gob-primary-darken-1"
                icon="https://img.icons8.com/ios-glyphs/40/ffffff/conference-call.png"
                value={usuarios}
                label="Usuarios"
            />
            <StatCard
                bgColor="bg-gob-accent-darken-3"
                icon="https://img.icons8.com/ios-glyphs/40/ffffff/task.png"
                value={proyectos}
                label="Proyectos"
            />
        </div>
    </section>
);

const StatCard = ({ bgColor, icon, value, label }) => (
    <div className={`${bgColor} p-6 rounded-md text-white`}>
        <img src={icon} alt={label} className="mx-auto" />
        <h3 className="text-3xl font-bold mt-4">{value}</h3>
        <p className="mt-2">{label}</p>
    </div>
);

const Footer = () => (
    <footer className="w-full py-4 text-center bg-gob-primary-darken-4 text-white">
        <div className="text-sm">
            Contacto:{" "}
            <a
                href="mailto:info@ejemplo.com"
                className="text-gob-accent-lighten-3 hover:underline"
            >
                info@ejemplo.com
            </a>{" "}
            | Teléfono: (123) 456-7890
        </div>
        <div className="text-xs mt-1">
            © Junta Transparente. Todos los derechos reservados.
        </div>
    </footer>
);

export default function Welcome({ juntasDeVecinos, usuarios, proyectos }) {
    return (
        <>
            <Head title="Junta Transparente" />
            <div className="bg-white text-light min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow">
                    <Hero />
                    <InfoSection />
                    <StatsSection
                        juntasDeVecinos={juntasDeVecinos}
                        usuarios={usuarios}
                        proyectos={proyectos}
                    />
                </main>
                <Footer />
            </div>
        </>
    );
}
