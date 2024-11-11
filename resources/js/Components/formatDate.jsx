

// Formatea la fecha en formato dd/mm/yyyy

import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePage } from "@inertiajs/react"; // Importa la función usePage de Inertia


export function formatDate(date) {
    return new Date(date).toLocaleDateString("es-ES").replace(/\//g, "-");
}
