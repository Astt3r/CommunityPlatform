import React from 'react';
import { Link } from "@inertiajs/react";

export default function Dashboard({ juntas }) {
    return (
        <div className="p-6 bg-white shadow-sm sm:rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">Juntas de Vecinos</h2>
            <Link href={route("juntas.create")} className="text-blue-500 hover:underline">
                Crear Nueva Junta de Vecinos
            </Link>

            <div className="mt-6">
                <h3 className="text-xl font-semibold">Listado de Juntas</h3>
                <ul>
                    {juntas.map((junta) => (
                        <li key={junta.id_junta_de_vecino} className="mt-2 border-b pb-2"> {/* Usa una clave única aquí */}
                            <h4 className="font-bold">{junta.nombre}</h4>
                            <p>Dirección: {junta.direccion_sede}</p>
                            <p>Teléfono: {junta.telefono_contacto}</p>
                            <p>Email: {junta.email_contacto}</p>
                            <p>Fecha de Fundación: {junta.fecha_fundacion}</p>
                            <p>Estado: {junta.estado}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
