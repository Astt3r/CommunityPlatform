import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SmallLink from "@/Components/SmallLink";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head>
                <title>Iniciar Sesión</title>
            </Head>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form
                onSubmit={submit}
                className="grid grid-cols-1 gap-4 max-w-md mx-auto p-4"
            >
                <div className="grid gap-2">
                    <InputLabel
                        value="Correo"
                        size="lg"
                        color="gob-black"
                        weight="medium"
                        className="mb-2"
                    />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData("email", e.target.value)}
                        error={!!errors.email}
                        disabled={processing}
                        isProcessing={processing}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="grid gap-2">
                    <InputLabel
                        value="Contraseña"
                        size="lg"
                        color="gob-black"
                        weight="medium"
                        className="mb-2"
                    />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData("password", e.target.value)}
                        disabled={processing}
                        isProcessing={processing}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center">
                    <Checkbox
                        name="remember"
                        label="Recordarme"
                        checked={data.remember}
                        onChange={(e) => setData("remember", e.target.checked)}
                        state={data.remember ? "on" : "off"}
                    />
                </div>

                <div className="grid grid-cols-2 items-center justify-end gap-4">
                    {canResetPassword && (
                        <SmallLink
                            href={route("password.request")}
                            visited={false}
                            className="text-right"
                        >
                            Olvidaste tu contraseña?
                        </SmallLink>
                    )}
                    <PrimaryButton
                        className="justify-self-end"
                        disabled={processing}
                    >
                        Iniciar Sesión
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
