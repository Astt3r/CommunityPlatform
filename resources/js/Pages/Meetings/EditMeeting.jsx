import React from "react";
import { useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function EditMeeting({ meeting }) {
    const { data, setData, put, errors } = useForm({
        tema_principal: meeting.tema_principal || "",
        descripcion: meeting.descripcion || "",
        fecha_reunion: meeting.fecha_reunion || "",
        lugar: meeting.lugar || "",
        convocada_por: meeting.convocada_por || "",
        estado: meeting.estado || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("meeting.update", meeting.id_reunion)); // Cambiado a `meeting.id_reunion`
    };

    return (
        <AuthenticatedLayout header={<h2>Editar Reunión</h2>}>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Tema Principal</label>
                    <input
                        type="text"
                        value={data.tema_principal}
                        onChange={(e) =>
                            setData("tema_principal", e.target.value)
                        }
                    />
                    {errors.tema_principal && (
                        <div>{errors.tema_principal}</div>
                    )}
                </div>
                <div>
                    <label>Descripción</label>
                    <textarea
                        value={data.descripcion}
                        onChange={(e) => setData("descripcion", e.target.value)}
                    />
                    {errors.descripcion && <div>{errors.descripcion}</div>}
                </div>
                <div>
                    <label>Fecha de Reunión</label>
                    <input
                        type="date"
                        value={data.fecha_reunion}
                        onChange={(e) =>
                            setData("fecha_reunion", e.target.value)
                        }
                    />
                    {errors.fecha_reunion && <div>{errors.fecha_reunion}</div>}
                </div>
                <div>
                    <label>Lugar</label>
                    <input
                        type="text"
                        value={data.lugar}
                        onChange={(e) => setData("lugar", e.target.value)}
                    />
                    {errors.lugar && <div>{errors.lugar}</div>}
                </div>
                <div>
                    <label>Convocada por</label>
                    <input
                        type="text"
                        value={data.convocada_por}
                        onChange={(e) =>
                            setData("convocada_por", e.target.value)
                        }
                    />
                    {errors.convocada_por && <div>{errors.convocada_por}</div>}
                </div>
                <div>
                    <label>Estado</label>
                    <input
                        type="text"
                        value={data.estado}
                        onChange={(e) => setData("estado", e.target.value)}
                    />
                    {errors.estado && <div>{errors.estado}</div>}
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                >
                    Guardar Cambios
                </button>
            </form>
        </AuthenticatedLayout>
    );
}
