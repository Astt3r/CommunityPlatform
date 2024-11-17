import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout>
            <Head title="Perfil" />

            <div className="py-6 bg-gob-grey-5">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    {/* Profile Information Section */}
                    <section className="bg-white p-6 shadow-lg squared">
                        <div className="border-b border-gob-grey-10 pb-4">
                            <h2 className="text-xl font-medium text-gob-primary-base">
                                Información del Perfil
                            </h2>
                        </div>
                        <div className="pt-6">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                        </div>
                    </section>

                    {/* Update Password Section */}
                    <section className="bg-white p-6 shadow-lg squared">
                        <div className="border-b border-gob-grey-10 pb-4">
                            <h2 className="text-xl font-medium text-gob-primary-base">
                                Cambiar Contraseña
                            </h2>
                        </div>
                        <div className="pt-6">
                            <UpdatePasswordForm className="max-w-xl" />
                        </div>
                    </section>

                    {/* Delete User Section */}
                    <section className="bg-white p-6 shadow-lg squared">
                        <div className="border-b border-gob-grey-10 pb-4">
                            <h2 className="text-xl font-medium text-gob-accent-darken-1">
                                Eliminar Cuenta
                            </h2>
                        </div>
                        <div className="pt-6">
                            <DeleteUserForm className="max-w-xl" />
                        </div>
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
