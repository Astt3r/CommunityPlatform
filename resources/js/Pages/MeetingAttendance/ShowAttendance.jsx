import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Head, usePage } from "@inertiajs/react";

export default function ShowAttendance({ meetingId, mainTopic, meetingStatus }) {
    const { neighbors, attendanceRecords = [] } = usePage().props;

    const { data, setData, post, processing } = useForm({
        attendance: {}, // Estado inicial del formulario
        absenceReasons: {}, // Agregar razones de ausencia
    });

    const [lockedAttendance, setLockedAttendance] = useState({});
    const [isPerfectAttendance, setIsPerfectAttendance] = useState(false);

    useEffect(() => {
        // Inicializar las asistencias con valores predeterminados
        const initialAttendance = {};
        const initialAbsenceReasons = {};
        const locked = {};
        let perfectAttendance = true;

        neighbors.forEach((neighbor) => {
            const existingRecord = attendanceRecords?.find(record => record.neighbor_id === neighbor.id);
            const attended = existingRecord ? existingRecord.attended : false;
            initialAttendance[neighbor.id] = attended;
            initialAbsenceReasons[neighbor.id] = existingRecord && !attended ? existingRecord.absence_reason : "";

            if (!attended) {
                perfectAttendance = false;
            }

            if (existingRecord && existingRecord.attended) {
                locked[neighbor.id] = true; // Bloquear registros que ya estaban presentes
            }
        });

        setData((prevData) => ({
            ...prevData,
            attendance: initialAttendance,
            absenceReasons: initialAbsenceReasons,
        }));

        setLockedAttendance(locked);
        setIsPerfectAttendance(perfectAttendance);
    }, [neighbors, attendanceRecords]);

    const handleCheckboxChange = (neighborId) => {
        if (lockedAttendance[neighborId]) {
            // No permitir cambios en registros bloqueados
            return;
        }
        const updatedAttendance = {
            ...data.attendance,
            [neighborId]: !data.attendance[neighborId],
        };
        setData((prevData) => ({
            ...prevData,
            attendance: updatedAttendance,
        }));
        // Limpiar el motivo de ausencia si se marca como presente
        if (updatedAttendance[neighborId]) {
            setData((prevData) => ({
                ...prevData,
                absenceReasons: {
                    ...prevData.absenceReasons,
                    [neighborId]: "",
                },
            }));
        }
    };

    const handleAbsenceReasonChange = (neighborId, reason) => {
        setData((prevData) => ({
            ...prevData,
            absenceReasons: {
                ...prevData.absenceReasons,
                [neighborId]: reason,
            },
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Formatear los datos antes de enviarlos
        const formattedData = {
            attendance: Object.keys(data.attendance).reduce((acc, key) => {
                acc[key] = data.attendance[key] ? true : false;
                return acc;
            }, {}),
            absenceReasons: data.absenceReasons,
        };

        post(`/meetings/${meetingId}/attendance`, {
            data: formattedData,
            onSuccess: () => {
                alert("Asistencias actualizadas correctamente.");
                window.location.href = `/meetings/${meetingId}`; // Redirige a los detalles de la reunión
            },
            onError: (errors) => {
                console.error("Errores al guardar:", errors);
                alert("Hubo un error al intentar guardar las asistencias.");
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Registro de Asistencias
                </h2>
            }
        >
            <Head title="Registro de Asistencias" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow sm:rounded-lg p-6 space-y-4">
                        <h3 className="text-lg font-semibold">Reunión: {mainTopic}</h3>
                        {meetingStatus === "canceled" && (
                            <p className="text-red-500">
                                Esta reunión ha sido cancelada. No es posible registrar asistencia.
                            </p>
                        )}
                        {isPerfectAttendance && (
                            <>
                                <p className="text-green-500">
                                    Reunión con asistencia perfecta.
                                </p>
                                <div className="mt-4 space-x-2">
                                    <a
                                        href={`/meetings/${meetingId}/attendance-summary`}
                                        className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                    >
                                        Ver Resumen de Asistencias
                                    </a>
                                    <a
                                        href={`/meetings/${meetingId}`}
                                        className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        Volver a Detalles de la Reunión
                                    </a>
                                </div>
                            </>
                        )}
                        {meetingStatus === "completed" && !isPerfectAttendance && (
                            <p className="text-green-500">
                                Esta reunión está completada. Puedes seguir registrando asistencia si es necesario.
                            </p>
                        )}
                        {meetingStatus !== "canceled" && !isPerfectAttendance && (
                            <form onSubmit={handleSubmit}>
                                <table className="min-w-full border-collapse rounded-lg shadow">
                                    <thead>
                                        <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal rounded-lg">
                                            <th className="px-6 py-3 text-left">Vecino</th>
                                            <th className="px-6 py-3 text-left">Asistencia</th>
                                            <th className="px-6 py-3 text-left">Motivo de Ausencia</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-600 text-sm font-light">
                                        {neighbors.map((neighbor) => (
                                            <tr key={neighbor.id}>
                                                <td className="border border-gray-300 px-4 py-2">
                                                    {neighbor.user?.name || "Vecino Eliminado"}
                                                </td>
                                                <td className={`border border-gray-300 px-4 py-2 text-center ${lockedAttendance[neighbor.id] ? "bg-blue-100" : ""}`}>
                                                    <input
                                                        type="checkbox"
                                                        checked={data.attendance[neighbor.id] || false}
                                                        onChange={() => handleCheckboxChange(neighbor.id)}
                                                        disabled={lockedAttendance[neighbor.id]} // Bloquear si ya estaba presente
                                                    />
                                                </td>
                                                <td className="border border-gray-300 px-4 py-2">
                                                    <input
                                                        type="text"
                                                        value={data.absenceReasons[neighbor.id] || ""}
                                                        onChange={(e) =>
                                                            handleAbsenceReasonChange(
                                                                neighbor.id,
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Motivo de ausencia"
                                                        className={`w-full border rounded p-2 ${
                                                            data.attendance[neighbor.id] || lockedAttendance[neighbor.id]
                                                                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                                                : "bg-white"
                                                        }`}
                                                        disabled={data.attendance[neighbor.id] || lockedAttendance[neighbor.id]} // Deshabilitar si está marcado o bloqueado
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        disabled={processing || meetingStatus === "canceled"} // Deshabilitar si está procesando o cancelada
                                    >
                                        {processing ? "Guardando..." : "Guardar Asistencias"}
                                    </button>
                                </div>
                                <div className="mt-4 space-x-2">
                                    <a
                                        href={`/meetings/${meetingId}`}
                                        className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        Volver a Detalles de la Reunión
                                    </a>

                                    <a
                                        href={`/meetings/${meetingId}/attendance-summary`}
                                        className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                    >
                                        Ver Resumen de Asistencias
                                    </a>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
