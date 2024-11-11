import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePage } from "@inertiajs/react"; // Importa la función usePage de Inertia

export default function ErrorAlert() {
    const { error } = usePage().props;

    React.useEffect(() => {
        if (error) {
            toast.error(error); // Muestra el mensaje de error
        }
    }, [error]);

    return <ToastContainer />;
}
