import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

// Colores para el gráfico de torta
const COLORS = ["#4ade80", "#38bdf8", "#facc15", "#f87171"];

// Datos de ejemplo para el gráfico de torta
const neighborData = [
    { name: "Vecinos", value: 80 },
    { name: "Miembros Directiva", value: 20 },
];

// Datos para reuniones
const meetingsData = [
    { name: "Enero", meetings: 4 },
    { name: "Febrero", meetings: 7 },
    { name: "Marzo", meetings: 5 },
    { name: "Abril", meetings: 6 },
];

// Datos para proyectos
const projectsData = [
    { name: "Enero", completed: 2, inProgress: 3 },
    { name: "Febrero", completed: 5, inProgress: 2 },
    { name: "Marzo", completed: 3, inProgress: 4 },
    { name: "Abril", completed: 6, inProgress: 1 },
];

export default function Dashboard({ projects, meetings, neighbors, boardMembers, associations }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Resumen en tarjetas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white shadow rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900">Proyectos Actuales</h3>
                            <p className="mt-2 text-4xl font-bold text-blue-600">{projects.length}</p>
                        </div>
                        <div className="bg-white shadow rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900">Próximas Reuniones</h3>
                            <p className="mt-2 text-4xl font-bold text-green-600">{meetings.length}</p>
                        </div>
                        <div className="bg-white shadow rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900">Total de Vecinos</h3>
                            <p className="mt-2 text-4xl font-bold text-yellow-600">{neighbors}</p>
                        </div>
                        <div className="bg-white shadow rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900">Miembros de Directiva</h3>
                            <p className="mt-2 text-4xl font-bold text-red-600">{boardMembers}</p>
                        </div>
                        <div className="bg-white shadow rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900">Asociaciones de Vecinos</h3>
                            <p className="mt-2 text-4xl font-bold text-purple-600">{associations}</p>
                        </div>
                    </div>

                    {/* Gráfico de barras: Meetings */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Participación en Reuniones</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={meetingsData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="meetings" fill="#38bdf8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Gráfico de líneas: Proyectos */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Estado de Proyectos</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={projectsData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="completed" stroke="#4ade80" />
                                <Line type="monotone" dataKey="inProgress" stroke="#facc15" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Gráfico de torta: Vecinos y Directiva */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Composición de Vecinos</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={neighborData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    fill="#8884d8"
                                    label
                                >
                                    {neighborData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Legend />
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
