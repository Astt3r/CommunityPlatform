import React, { useEffect } from "react";
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

const COLORS = ["#4ade80", "#38bdf8", "#facc15", "#f87171"];

export default function Dashboard({
    role,
    projects,
    meetings,
    neighbors,
    boardMembers,
    associations,
    total,
}) {
    useEffect(() => {
        console.log("Dashboard Role:", role);
    }, [role]);

    function renderAdminDashboard() {
        return (
            <>
                <div className="bg-white shadow-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900">
                        Numero de Juntas de Vecinos
                    </h3>
                    <p className="mt-2 text-4xl font-bold text-purple-600">
                        {total}
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
                <div className="bg-white shadow-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900">
                        Miembros de la Directiva
                    </h3>
                    <p className="mt-2 text-4xl font-bold text-red-600">
                        {boardMembers}
                    </p>
                </div>
            </>
        );
    }

    function renderResidentDashboard() {
        return (
            <>
                <div className="bg-white shadow-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900">
                        Vecinos Registrados
                    </h3>
                    <p className="mt-2 text-4xl font-bold text-yellow-600">
                        {neighbors}
                    </p>
                </div>
                <div className="bg-white shadow-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900">
                        Miembros de la Directiva
                    </h3>
                    <p className="mt-2 text-4xl font-bold text-red-600">
                        {boardMembers}
                    </p>
                </div>
            </>
        );
    }

    function renderBoardMemberDashboard() {
        return (
            <>
                <div className="bg-white shadow-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900">
                        Vecinos Registrados
                    </h3>
                    <p className="mt-2 text-4xl font-bold text-yellow-600">
                        {neighbors}
                    </p>
                </div>
                <div className="bg-white shadow-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900">
                        Miembros de la Directiva
                    </h3>
                    <p className="mt-2 text-4xl font-bold text-red-600">
                        {boardMembers}
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
