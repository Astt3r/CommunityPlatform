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

    console.log(navLinks.map((link) => link.route));

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="border-b border-gray-200 bg-white shadow-lg">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between items-center">
                        {/* Logo */}
                        <div className="flex shrink-0 items-center">
                            <Link href="/">
                                <ApplicationLogo className="w-12 h-auto" />
                            </Link>
                        </div>
                        {/* Navigation Links */}
                        <div className="hidden sm:flex sm:space-x-8 ml-8">
                            {navLinks.map((link, index) => (
                                <NavLink
                                    key={index}
                                    href={route(link.route)}
                                    active={
                                        route().current(link.route) ||
                                        route().current(`${link.route}.*`)
                                    }
                                    className="text-gray-700 hover:text-blue-500"
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                        </div>

                        {/* User Info and Dropdown */}
                        <div className="ml-auto hidden sm:flex items-center">
                            <div className="relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-500 focus:outline-none"
                                            >
                                                {auth.neighborhood_association
                                                    ?.name && (
                                                    <>
                                                        Junta:{" "}
                                                        {
                                                            auth
                                                                .neighborhood_association
                                                                .name
                                                        }{" "}
                                                        |{" "}
                                                    </>
                                                )}
                                                {auth.user.name}
                                                <svg
                                                    className="ml-2 h-4 w-4"
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
                                            className="hover:bg-gray-100"
                                        >
                                            Perfil
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                            className="hover:bg-red-100"
                                        >
                                            Cerrar Sesión
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        {/* Responsive Navigation */}
                        <div className="-mr-2 flex sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Responsive Dropdown */}
                <div
                    className={`${
                        showingNavigationDropdown ? "block" : "hidden"
                    } sm:hidden`}
                >
                    <div className="space-y-1 pt-2 pb-3">
                        {navLinks.map((link, index) => (
                            <ResponsiveNavLink
                                key={index}
                                href={route(link.route)}
                                active={route().current(link.route)}
                            >
                                {link.name}
                            </ResponsiveNavLink>
                        ))}
                    </div>
                    <div className="border-t border-gray-200 pt-4 pb-1">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800">
                                Junta de Vecinos
                            </div>
                            <div className="text-sm font-medium text-gray-500">
                                {auth.neighborhood_association?.name}
                            </div>
                        </div>
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800">
                                {auth.user.name}
                            </div>
                            <div className="text-sm font-medium text-gray-500">
                                {auth.user.email}
                            </div>
                        </div>
                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route("profile.edit")}>
                                Perfil
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Cerrar Sesión
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Page Header */}
            {header && (
                <header className="bg-gray-50 shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
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
