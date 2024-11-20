import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function ShowMeeting({ meeting }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Detalles de la Reunión
                </h2>
            }
        >
            <Head title={`Reunión - ${meeting.main_topic}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow sm:rounded-lg p-6 space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold">Tema Principal:</h3>
                            <p>{meeting.main_topic}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Fecha:</h3>
                            <p>{new Date(meeting.meeting_date).toLocaleString()}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Descripción:</h3>
                            <p>{meeting.description || "Sin descripción"}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Lugar:</h3>
                            <p>{meeting.location || "No especificado"}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Organizada Por:</h3>
                            <p>{meeting.organized_by || "No especificado"}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Estado:</h3>
                            <p
                                className={`${
                                    meeting.status === "scheduled"
                                        ? "text-blue-500"
                                        : meeting.status === "completed"
                                        ? "text-green-500"
                                        : "text-red-500"
                                }`}
                            >
                                {meeting.status}
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Resultado:</h3>
                            <p>{meeting.result || "No especificado"}</p>
                        </div>
                        <div className="mt-4">
                            <a
                                href="/meetings"
                                className="text-blue-500 hover:text-blue-700"
                            >
                                Volver a la lista de reuniones
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
