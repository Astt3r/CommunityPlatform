import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import ErrorAlert from "@/Components/ErrorAlert";

export default function Authenticated({ header, children }) {
    const { auth, navLinks } = usePage().props;
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-gob-grey-5">
            <nav className="border-b border-gob-grey-20 bg-white shadow-lg">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo */}
                        <div className="flex shrink-0 items-center">
                            <Link href="/">
                                <ApplicationLogo className="font-slab text-gob-black text-heading-mobile-s font-weight-bold line-height-normal" />
                            </Link>
                        </div>

                        {/* Navigation Links */}
                        <div className="hidden space-x-8 sm:ml-10 sm:flex">
                            {navLinks.map((link, index) => (
                                <NavLink
                                    key={index}
                                    href={route(link.route)}
                                    active={route().current(link.route)}
                                    className="text-gob-grey-70 hover:text-gob-primary-base"
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                        </div>

                        {/* Bienvenida y Dropdown */}
                        <div className="ml-auto flex items-center space-x-6">
                            {/* Mensaje de Bienvenida */}
                            <div className="text-right">
                                <h2 className="text-lg font-bold text-gob-grey-70">
                                    Bienvenido, {auth?.user?.name || "Usuario"}
                                </h2>
                                {auth?.neighborhood_association && (
                                    <p className="text-sm text-gob-grey-70">
                                        Perteneces a la junta de vecinos:{" "}
                                        <strong>
                                            {auth.neighborhood_association.name}
                                        </strong>
                                    </p>
                                )}
                            </div>

                            {/* Dropdown */}
                            <div className="relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gob-grey-70 transition duration-150 ease-in-out hover:text-gob-primary-base focus:outline-none"
                                            >
                                                {auth.user.name}
                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                            className="hover:bg-gob-grey-10"
                                        >
                                            Perfil
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                            className="hover:bg-gob-accent-lighten-5"
                                        >
                                            Cerrar Sesión
                                        </Dropdown.Link>
                                        {auth?.neighborhood_association && (
                                            <div className="px-4 py-2 text-sm text-gob-grey-70 border-t border-gob-grey-20">
                                                Junta de vecinos:{" "}
                                                <strong>
                                                    {
                                                        auth
                                                            .neighborhood_association
                                                            .name
                                                    }
                                                </strong>
                                            </div>
                                        )}
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Page Header */}
            {header && (
                <header className="bg-gob-grey-5 shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 text-gob-primary-darken-4">
                        {header}
                    </div>
                </header>
            )}

            {/* Page Content */}
            <main>
                <ErrorAlert />
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
