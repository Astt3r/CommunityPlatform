import React, { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";

export default function ErrorAlert() {
    const { error } = usePage().props;
    const [visible, setVisible] = useState(!!error);

    useEffect(() => {
        if (error) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false); // Oculta el mensaje después de 5 segundos
            }, 5000);

            return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
        }
    }, [error]);

    return <>{visible && <div className="alert alert-danger">{error}</div>}</>;
}
