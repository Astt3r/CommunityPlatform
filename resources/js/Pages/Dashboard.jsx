import React, { useEffect } from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
    BarChart,
    XAxis,
    YAxis,
    Bar,
} from "recharts";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";

const COLORS = ["#4ade80", "#38bdf8", "#facc15", "#f87171"];

export default function Dashboard({
    role,
    projects,
    meetings,
    neighbors,
    boardMembers,
    associations,
    totalIncome,
    totalExpense,
    balanceStatus,
    upcomingMeetings,
    meetingDistribution,
    projectStates,
}) {
    useEffect(() => {
        // usepage to get the role

        console.log("Dashboard Role:", role);
        console.log("Neighbors:", neighbors);
        console.log("Board Members:", boardMembers);
        console.log("Upcoming Meetings:", upcomingMeetings);
        console.log("Meeting Distribution:", meetingDistribution);
    }, [role, neighbors, boardMembers, upcomingMeetings, meetingDistribution]);

    function renderBalanceCard() {
        return (
            <div className="bg-white shadow-lg p-6">
                <h3 className="text-lg font-medium text-gray-900">
                    Balance de Ingresos vs Gastos
                </h3>
                <p className="mt-2 text-xl">
                    <span className="font-bold text-green-600">
                        Ingresos: ${totalIncome}
                    </span>
                </p>
                <p className="mt-2 text-xl">
                    <span className="font-bold text-red-600">
                        Gastos: ${totalExpense}
                    </span>
                </p>
                <p className="mt-2 text-xl">
                    <span
                        className={`font-bold ${
                            balanceStatus === "Superávit"
                                ? "text-blue-600"
                                : "text-orange-600"
                        }`}
                    >
                        Estado: {balanceStatus}
                    </span>
                </p>
            </div>
        );
    }
    function renderUpcomingMeetings() {
        if (!upcomingMeetings.length) {
            return (
                <div className="bg-white shadow-lg p-6">
                    <p>No hay reuniones próximas.</p>
                </div>
            );
        }

        const statusMap = {
            scheduled: "Programada",
            completed: "Completada",
            cancelled: "Cancelada",
            canceled: "Cancelada", // Incluye ambas variantes si aplica
        };

        return (
            <div className="bg-white shadow-lg p-6">
                <h3 className="text-lg font-medium text-gray-900">
                    Reuniones Próximas
                </h3>
                <table className="w-full table-auto border-collapse border border-gray-200 mt-4">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-200 px-4 py-2">
                                Fecha
                            </th>
                            <th className="border border-gray-200 px-4 py-2">
                                Ubicación
                            </th>
                            <th className="border border-gray-200 px-4 py-2">
                                Estado
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {upcomingMeetings.map((meeting) => (
                            <tr key={meeting.id} className="text-center">
                                <td className="border border-gray-200 px-4 py-2">
                                    {meeting.date
                                        ? new Date(
                                              meeting.date
                                          ).toLocaleDateString("es-ES", {
                                              year: "numeric",
                                              month: "long",
                                              day: "numeric",
                                          })
                                        : "Fecha no disponible"}
                                </td>
                                <td className="border border-gray-200 px-4 py-2">
                                    {meeting.location}
                                </td>
                                <td
                                    className={`border border-gray-200 px-4 py-2 font-semibold ${
                                        meeting.status === "scheduled"
                                            ? "text-blue-600"
                                            : meeting.status === "completed"
                                            ? "text-green-600"
                                            : meeting.status === "cancelled"
                                            ? "text-orange-600"
                                            : "text-red-600"
                                    }`}
                                >
                                    {statusMap[meeting.status] ||
                                        "Estado desconocido"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    function renderMeetingDistribution() {
        if (!meetingDistribution.length) {
            return <p>No hay datos de reuniones.</p>;
        }

        const statusMap = {
            scheduled: "Programada",
            completed: "Completada",
            canceled: "Cancelada",
        };

        const COLORS_BY_STATUS = {
            scheduled: "#38bdf8", // Verde
            completed: "#4ade80", // Azul
            canceled: "#f87171", // Rojo
        };

        return (
            <div className="bg-white shadow-lg p-6">
                <h3 className="text-lg font-medium text-gray-900">
                    Distribución de Reuniones por Estado
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={meetingDistribution}
                            dataKey="count"
                            nameKey="status"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            label={({ status }) =>
                                statusMap[status] || "Desconocido"
                            }
                        >
                            {meetingDistribution.map((entry) => (
                                <Cell
                                    key={`cell-${entry.status}`}
                                    fill={
                                        COLORS_BY_STATUS[entry.status] ||
                                        "#d1d5db"
                                    } // Default gray if no color
                                />
                            ))}
                        </Pie>
                        <Legend
                            formatter={(value) =>
                                statusMap[value] || "Desconocido"
                            }
                        />
                        <Tooltip
                            formatter={(value, name) => [
                                value,
                                statusMap[name] || "Desconocido",
                            ]}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        );
    }

    function renderProjectStatesChart(projectStates) {
        if (!projectStates.length) {
            return <p>No hay datos de proyectos.</p>;
        }

        const COLORS_BY_STATUS = {
            planeado: "#4ade80", // Verde
            aprobado: "#38bdf8", // Azul
            "en proceso": "#facc15", // Amarillo
            completado: "#34d399", // Verde más claro
            cancelado: "#f87171", // Rojo
        };

        return (
            <div className="bg-white shadow-lg p-6">
                <h3 className="text-lg font-medium text-gray-900">
                    Estado de Proyectos
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={projectStates}>
                        <XAxis
                            dataKey="status"
                            tickFormatter={(status) => status.toUpperCase()}
                        />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count">
                            {projectStates.map((entry) => (
                                <Cell
                                    key={`cell-${entry.status}`}
                                    fill={
                                        COLORS_BY_STATUS[entry.status] ||
                                        "#d1d5db"
                                    }
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    }
    function renderActiveProjects(activeProjects) {
        if (!activeProjects.length) {
            return (
                <div className="bg-white shadow-lg p-6">
                    <p className="text-gray-700">No hay proyectos activos.</p>
                </div>
            );
        }

        return (
            <div className="bg-white shadow-lg p-6">
                <h3 className="text-lg font-medium text-gray-900">
                    Proyectos Activos
                </h3>
                <table className="w-full table-auto border-collapse border border-gray-200 mt-4">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-200 px-4 py-2">
                                Nombre
                            </th>
                            <th className="border border-gray-200 px-4 py-2">
                                Fecha de Inicio
                            </th>
                            <th className="border border-gray-200 px-4 py-2">
                                Fecha Estimada de Finalización
                            </th>
                            <th className="border border-gray-200 px-4 py-2">
                                Presupuesto
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {activeProjects.map((project) => (
                            <tr key={project.name} className="text-center">
                                <td className="border border-gray-200 px-4 py-2">
                                    {project.name}
                                </td>
                                <td className="border border-gray-200 px-4 py-2">
                                    {project.start_date
                                        ? new Date(
                                              project.start_date
                                          ).toLocaleDateString("es-ES")
                                        : "No disponible"}
                                </td>
                                <td className="border border-gray-200 px-4 py-2">
                                    {project.end_date
                                        ? new Date(
                                              project.end_date
                                          ).toLocaleDateString("es-ES")
                                        : "No disponible"}
                                </td>
                                <td className="border border-gray-200 px-4 py-2">
                                    ${project.budget.toLocaleString("es-ES")}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    function renderAdminDashboard() {
        return (
            <>
                {renderBalanceCard()}
                {renderUpcomingMeetings()}
                {renderMeetingDistribution()}
                {renderProjectStatesChart(projectStates)}

                <div className="bg-white shadow-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900">
                        Número de Juntas de Vecinos
                    </h3>
                    <p className="mt-2 text-4xl font-bold text-purple-600">
                        {associations}
                    </p>
                </div>
                <div className="bg-white shadow-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900">
                        Vecinos Registrados
                    </h3>
                    <p className="mt-2 text-4xl font-bold text-yellow-600">
                        {neighbors}
                    </p>
                </div>
            </>
        );
    }

    function renderResidentDashboard() {
        return (
            <>
                {renderBalanceCard()}
                {renderUpcomingMeetings()}
                {renderMeetingDistribution()}
                <div className="bg-white shadow-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900">
                        Vecinos Registrados
                    </h3>
                    <p className="mt-2 text-4xl font-bold text-yellow-600">
                        {neighbors}
                    </p>
                </div>
            </>
        );
    }

    function renderBoardMemberDashboard() {
        return (
            <>
                {renderBalanceCard()}
                {renderUpcomingMeetings()}

                {renderMeetingDistribution()}
                <div className="bg-white shadow-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900">
                        Vecinos Registrados
                    </h3>
                    <p className="mt-2 text-4xl font-bold text-yellow-600">
                        {neighbors}
                    </p>
                </div>
            </>
        );
    }

    function renderContent() {
        switch (role) {
            case "admin":
                return renderAdminDashboard();
            case "board_member":
                return renderBoardMemberDashboard();
            case "resident":
                return renderResidentDashboard();
            default:
                return (
                    <div>
                        <h3>General Dashboard</h3>
                        {/* Default content here */}
                    </div>
                );
        }
    }

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {renderContent()}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
