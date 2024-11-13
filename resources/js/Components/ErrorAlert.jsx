import { usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function ErrorAlert() {
    const { flash } = usePage().props;
    const [showError, setShowError] = useState(!!flash.error);

    useEffect(() => {
        if (flash.error) {
            setShowError(true);
        }
    }, [flash.error]);

    return (
        showError && (
            <div
                className="alert alert-error flex items-center justify-between p-4 mb-4 text-red-700 bg-red-100 rounded-lg"
                role="alert"
            >
                <span>{flash.error}</span>
                <button
                    type="button"
                    className="text-red-700 hover:text-red-900"
                    onClick={() => setShowError(false)}
                >
                    <span className="sr-only">Cerrar</span>✖
                </button>
            </div>
        )
    );
}
