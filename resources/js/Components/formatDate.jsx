// Formatea la fecha en formato dd/mm/yyyy

import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePage } from "@inertiajs/react"; // Importa la función usePage de Inertia

export function formatDate(date) {
    if (!date) return "Fecha no disponible";

    // Dividir la fecha en partes para evitar el ajuste automático de zona horaria
    const [year, month, day] = date.split("-");
    const parsedDate = new Date(year, month - 1, day); // Crear la fecha en zona local

    if (isNaN(parsedDate)) return "Fecha inválida";
    return parsedDate
        .toLocaleDateString("es-ES", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        })
        .replace(/\//g, "-");
}
