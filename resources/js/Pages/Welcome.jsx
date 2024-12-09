import { Head, Link, usePage } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import ApplicationLogo from "@/Components/ApplicationLogo";

const Header = ({ auth }) => (
    <nav className="bg-white shadow-md w-full py-4 px-8 flex items-center justify-between">
        <div className="flex items-center">
            <ApplicationLogo className="w-16 h-auto" />
        </div>
        <div className="desktop-menu md:flex space-x-4">
            {auth.user ? (
                <PrimaryButton>
                    <Link href={route("dashboard")}>Dashboard</Link>
                </PrimaryButton>
            ) : (
                <>
                    <PrimaryButton>
                        <Link href={route("login")}>Iniciar Sesión</Link>
                    </PrimaryButton>
                </>
            )}
        </div>
    </nav>
);

const Hero = () => (
    <section className="flex flex-col items-center text-center space-y-6 py-12 bg-gob-grey-5">
        <h1 className="text-4xl font-slab font-bold text-black">
            Bienvenido a Junta Transparente
        </h1>
        <p className="text-lg text-black px-4 max-w-3xl">
            Nuestro sistema facilita la gestión y transparencia de las juntas de
            vecinos. Para registrar tu junta, por favor contacta a tu
            municipalidad local.
        </p>
        <a
            href="https://www.achm.cl/municipios-asociados/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gob-accent-base text-white text-lg font-bold shadow-lg hover:bg-gob-accent-darken-1 transition duration-150 ease-in-out"
        >
            Ver Contactos de Municipalidades
        </a>
        <p className="text-md text-gob-grey-70 px-4 max-w-2xl">
            Si tu junta de vecinos aún no está registrada en nuestro sistema,
            comunícate con tu municipalidad para iniciar el proceso de registro.
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
                text="Nuestro sistema facilita la gestión y transparencia de las juntas de vecinos.Para que los vecinos tengan mas confianza en la gestión de la junta."
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
                title="Calendario de Reuniones"
                text="Accede a una calendario de reuniones comunitarias y participa activamente en las decisiones de tu comunidad."
            />
        </div>
    </section>
);

const InfoCard = ({ bgColor, icon, title, text }) => (
    <div className={`${bgColor} p-6 text-white`}>
        <img src={icon} alt={title} className="mx-auto" />
        <h3 className="text-lg font-bold mt-4">{title}</h3>
        <p className="mt-2 text-base">{text}</p>
    </div>
);
const TestimonialSection = () => (
    <section className="text-center py-12 bg-gob-grey-5">
        <h2 className="text-2xl font-slab font-bold text-black mb-8">
            Historias de éxito con Junta Transparente
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <TestimonialCard
                image="https://randomuser.me/api/portraits/women/44.jpg"
                name="María Pérez"
                location="Santiago, Chile"
                text="Gracias a Junta Transparente, nuestra junta de vecinos ahora tiene claridad en cómo se administran los recursos. Ha sido un cambio increíble para nuestra comunidad."
            />
            <TestimonialCard
                image="https://randomuser.me/api/portraits/men/35.jpg"
                name="Juan Rodríguez"
                location="Valparaíso, Chile"
                text="La transparencia es clave para la confianza. Con Junta Transparente, logramos involucrar a más vecinos en nuestras reuniones."
            />
            <TestimonialCard
                image="https://randomuser.me/api/portraits/men/54.jpg"
                name="Pedro Sánchez"
                location="Concepción, Chile"
                text="Es una herramienta que realmente mejora la comunicación entre los vecinos y la gestión de nuestra junta. ¡Muy recomendada!"
            />
        </div>
    </section>
);

const TestimonialCard = ({ image, name, location, text }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg">
        <img
            src={image}
            alt={name}
            className="w-24 h-24 mx-auto rounded-full mb-4"
        />
        <h3 className="text-lg font-bold text-gob-primary-base">{name}</h3>
        <p className="text-sm text-gob-grey-70">{location}</p>
        <p className="text-md text-black mt-4">{text}</p>
    </div>
);

const StatCard = ({ bgColor, icon, value, label }) => (
    <div className={`${bgColor} p-6 text-white`}>
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
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Junta Transparente" />
            <div className="bg-white text-light min-h-screen flex flex-col">
                <Header auth={auth} />
                <main className="flex-grow">
                    <Hero />
                    <InfoSection />
                    <TestimonialSection />
                </main>
                <Footer />
            </div>
        </>
    );
}
