import React, { useState, useEffect } from "react";
import { usePage, Link, useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { parseISO } from "date-fns";

export default function MeetingIndex({ allAssociations, userRole }) {
    const { meetings, filters, flash } = usePage().props;
    const { data, setData, get } = useForm({
        main_topic: filters.main_topic || "",
        status: filters.status || "",
        neighborhood_association_id: filters.neighborhood_association_id || "",
    });
    const [showAlert, setShowAlert] = useState(!!flash.success);
    const [selectedMeeting, setSelectedMeeting] = useState(null);
    const [showPanel, setShowPanel] = useState(false);
    const [showCreateButton, setShowCreateButton] = useState(false);
    const [events, setEvents] = useState([]); // Estado para eventos del calendario

    useEffect(() => {
        // Actualizar eventos del calendario cada vez que las reuniones cambien
        setEvents(
            meetings.data.map((meeting) => ({
                id: meeting.id,
                title: meeting.main_topic,
                start: parseISO(meeting.meeting_date).toISOString(),
                allDay: true,
                backgroundColor:
                    meeting.status === "completed"
                        ? "green"
                        : meeting.status === "cancelled"
                        ? "red"
                        : "blue",
            }))
        );
    }, [meetings.data]);

    const handleDelete = (id) => {
        if (confirm("¿Estás seguro de que deseas eliminar esta reunión?")) {
            router.delete(route("meetings.destroy", id), {
                onSuccess: () => {
                    setShowAlert(true);
                    setShowPanel(false);
                },
            });
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        get(route("meetings.index", { ...data }), {
            onSuccess: (page) => {
                setEvents(
                    page.props.meetings.data.map((meeting) => ({
                        id: meeting.id,
                        title: meeting.main_topic,
                        start: parseISO(meeting.meeting_date).toISOString(),
                        allDay: true,
                        backgroundColor:
                            meeting.status === "completed"
                                ? "green"
                                : meeting.status === "cancelled"
                                ? "red"
                                : "blue",
                    }))
                );
            },
        });
    };

    const handleAssociationChange = (e) => {
        setData("neighborhood_association_id", e.target.value);
    };

    const handleDateClick = (info) => {
        setShowCreateButton(true);
        setSelectedMeeting(null);
        setShowPanel(true);
    };

    const handleEventClick = (info) => {
        const meeting = meetings.data.find((m) => m.id === parseInt(info.event.id));
        if (meeting) {
            setSelectedMeeting(meeting);
            setShowCreateButton(false);
            setShowPanel(true);
        }
    };

    const handleClosePanel = () => {
        setShowPanel(false);
    };

    useEffect(() => {
        if (flash.success) {
            setShowAlert(true);
        }
    }, [flash.success]);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Reuniones
                    </h2>
                    {userRole !== "board_member" && (
                        <div className="flex items-center gap-4">
                            <label htmlFor="neighborhood_filter" className="text-sm font-medium text-gray-700">
                                Filtrar por Junta:
                            </label>
                            <select
                                id="neighborhood_filter"
                                value={data.neighborhood_association_id}
                                onChange={handleAssociationChange}
                                className="px-4 py-2 border rounded"
                            >
                                <option value="">Todas las Juntas</option>
                                {allAssociations.map((association) => (
                                    <option key={association.id} value={association.id}>
                                        {association.name}
                                    </option>
                                ))}
                            </select>
                            <button
                                onClick={handleSearch}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Filtrar
                            </button>
                        </div>
                    )}
                </div>
            }
        >
            <Head title="Reuniones" />

            {showAlert && (
                <div className="alert alert-success flex items-center justify-between p-4 mb-4 text-green-700 bg-green-100 rounded-lg">
                    <span>{flash.success}</span>
                    <button
                        type="button"
                        className="text-green-700 hover:text-green-900"
                        onClick={() => setShowAlert(false)}
                    >
                        ✖
                    </button>
                </div>
            )}

            <div className="mb-4 flex justify-between">
                <Link
                    href={route("meetings.create")}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Crear Reunión
                </Link>
            </div>

            <div className="mb-8 relative">
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    events={events} // Usar el estado `events` para los datos del calendario
                    dateClick={handleDateClick}
                    eventClick={handleEventClick}
                    locale="es"
                />
            </div>

            {showPanel && (
                <div id="calendarPanel" className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white shadow-lg z-50 p-6 rounded-lg mt-4">
                    <button
                        onClick={handleClosePanel}
                        className="text-red-500 hover:text-red-700 mb-4"
                    >
                        Cerrar
                    </button>
                    {showCreateButton ? (
                        <>
                            <p className="mb-2">Crear reunión para el día seleccionado:</p>
                            <Link
                                href={route("meetings.create")}
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                            >
                                Crear Reunión
                            </Link>
                        </>
                    ) : selectedMeeting ? (
                        <>
                            <p className="font-bold mb-4">{selectedMeeting.main_topic}</p>
                            <div className="space-y-2">
                                <Link
                                    href={route("meetings.show", selectedMeeting.id)}
                                    className="block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Ver
                                </Link>
                                <Link
                                    href={`/meetings/${selectedMeeting.id}/edit`}
                                    className="block px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                >
                                    Editar
                                </Link>
                                <button
                                    onClick={() => handleDelete(selectedMeeting.id)}
                                    className="block px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </>
                    ) : null}
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="table-auto w-full mt-4 text-sm md:text-base">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Fecha</th>
                            <th className="px-4 py-2">Tema Principal</th>
                            <th className="px-4 py-2">Organizador</th>
                            <th className="px-4 py-2">Estado</th>
                            <th className="px-4 py-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {meetings.data.map((meeting) => (
                            <tr key={meeting.id} className="border-t">
                                <td className="px-4 py-2">
                                    {new Date(meeting.meeting_date).toLocaleDateString("es-ES", {
                                        timeZone: "UTC",
                                    })}
                                </td>
                                <td className="px-4 py-2">{meeting.main_topic}</td>
                                <td className="px-4 py-2">{meeting.organized_by || "N/A"}</td>
                                <td
                                    className={`px-4 py-2 ${
                                        meeting.status === "scheduled"
                                            ? "text-blue-500"
                                            : meeting.status === "completed"
                                            ? "text-green-500"
                                            : "text-red-500"
                                    }`}
                                >
                                    {meeting.status}
                                </td>
                                <td className="px-4 py-2 flex flex-col md:flex-row gap-2">
                                    <Link
                                        href={route("meetings.show", meeting.id)}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        Ver
                                    </Link>
                                    <Link
                                        href={`/meetings/${meeting.id}/edit`}
                                        className="text-yellow-500 hover:text-yellow-700"
                                    >
                                        Editar
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(meeting.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                {meetings.links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.url || ""}
                        className={`px-4 py-2 border rounded ${
                            link.active ? "font-bold" : ""
                        } ${
                            link.url
                                ? "text-blue-500 hover:text-blue-700"
                                : "text-gray-400"
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    ></Link>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
