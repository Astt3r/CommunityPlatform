import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import TertiaryButton from "@/Components/TertiaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useRef, useState } from "react";

export default function DeleteUserForm({ className = "" }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: "",
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <p className="mt-1 text-sm text-gob-grey-70">
                    Una vez que elimines tu cuenta, todos los recursos y los
                    datos serán eliminados permanentemente. Antes de proceder,
                    asegúrate de descargar cualquier dato o información que
                    quieras conservar.
                </p>
            </header>

            <DangerButton
                className="bg-gob-accent-base hover:bg-gob-accent-darken-2 text-white"
                onClick={confirmUserDeletion}
            >
                Eliminar Cuenta
            </DangerButton>
            <Modal
                show={confirmingUserDeletion}
                onClose={closeModal}
                title="¿Estás seguro de que deseas eliminar tu cuenta?"
            >
                <form onSubmit={deleteUser} className="p-6">
                    <p className="mt-1 text-sm text-gob-grey-70">
                        Una vez que elimines tu cuenta, todos los recursos y los
                        datos serán eliminados permanentemente. Por favor,
                        introduce tu contraseña para confirmar.
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="password" value="Contraseña" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="mt-1 block w-3/4 border-gob-grey-30 focus:border-gob-accent-base focus:ring-gob-accent-base"
                            placeholder="Contraseña"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2 text-gob-accent-darken-2"
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <TertiaryButton onClick={closeModal}>
                            Cancelar
                        </TertiaryButton>

                        <DangerButton
                            className="ms-3 bg-gob-accent-base hover:bg-gob-accent-darken-2 text-white"
                            disabled={processing}
                        >
                            Eliminar Cuenta
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
