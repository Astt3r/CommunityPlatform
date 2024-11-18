import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { formatDate } from "@/Components/formatDate";

export default function Projects({ projects }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this project?")) {
            destroy(route("projects.destroy", id), {
                onError: (error) =>
                    console.error("Error deleting the project:", error),
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Recent Projects
                    </h2>
                    <Link
                        href={route("projects.create")}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                        Create New Project
                    </Link>
                </div>
            }
        >
            <Head title="Projects" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="text-lg font-semibold mb-4">
                                Completed Projects
                            </h2>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                                {(projects?.data || []).map((project) => (
                                    <div
                                        key={project.id}
                                        className="p-4 border rounded-lg shadow-md"
                                    >
                                        <h3 className="font-bold text-lg">
                                            {project.name}
                                        </h3>
                                        <p className="text-gray-600">
                                            {project.description}
                                        </p>
                                        <p>
                                            <strong>Start Date:</strong>{" "}
                                            {formatDate(project.start_date)}
                                        </p>
                                        <p>
                                            <strong>End Date:</strong>{" "}
                                            {formatDate(project.end_date)}
                                        </p>
                                        <p>
                                            <strong>Status:</strong>{" "}
                                            <span
                                                className={`px-2 py-1 rounded ${
                                                    project.status === "Active"
                                                        ? "bg-green-200 text-green-800"
                                                        : project.status === "Completed"
                                                        ? "bg-blue-200 text-blue-800"
                                                        : "bg-gray-200 text-gray-800"
                                                }`}
                                            >
                                                {project.status ||
                                                    "Not specified"}
                                            </span>
                                        </p>
                                        <div className="flex space-x-2 mt-2">
                                            <Link
                                                href={route(
                                                    "projects.edit",
                                                    project.id
                                                )}
                                                className="text-sky-500 hover:underline"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDelete(project.id)
                                                }
                                                className="text-red-500 hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {projects.data?.length === 0 && (
                                <p className="text-center text-gray-600 mt-6">
                                    No projects found.
                                </p>
                            )}

                            <div className="mt-6">
                                <div className="flex justify-between">
                                    <Link
                                        href={projects.prev_page_url || "#"}
                                        className={`px-4 py-2 rounded-md ${
                                            projects.prev_page_url
                                                ? "bg-gray-200 text-gray-700"
                                                : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                        }`}
                                    >
                                        Previous
                                    </Link>
                                    <Link
                                        href={projects.next_page_url || "#"}
                                        className={`px-4 py-2 rounded-md ${
                                            projects.next_page_url
                                                ? "bg-gray-200 text-gray-700"
                                                : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                        }`}
                                    >
                                        Next
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
