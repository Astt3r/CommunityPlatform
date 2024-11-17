import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

export default function CreateProject() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        description: "",
        issue: "",
        start_date: "",
        end_date: "",
        status: "",
        responsible: "",
        budget: "",
        file: null, // Field for the file
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("projects.store"), {
            onFinish: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create Project
                </h2>
            }
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={submit} className="space-y-4" encType="multipart/form-data">
                            {/* Project Name */}
                            <div>
                                <InputLabel htmlFor="name" value="Project Name" />
                                <TextInput
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            {/* Description */}
                            <div>
                                <InputLabel htmlFor="description" value="Description" />
                                <TextInput
                                    id="description"
                                    type="text"
                                    name="description"
                                    value={data.description}
                                    onChange={(e) => setData("description", e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.description} className="mt-2" />
                            </div>

                            {/* Issue */}
                            <div>
                                <InputLabel htmlFor="issue" value="Issue" />
                                <TextInput
                                    id="issue"
                                    type="text"
                                    name="issue"
                                    value={data.issue}
                                    onChange={(e) => setData("issue", e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.issue} className="mt-2" />
                            </div>

                            {/* Start Date */}
                            <div>
                                <InputLabel htmlFor="start_date" value="Start Date" />
                                <TextInput
                                    id="start_date"
                                    type="date"
                                    name="start_date"
                                    value={data.start_date}
                                    onChange={(e) => setData("start_date", e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.start_date} className="mt-2" />
                            </div>

                            {/* End Date */}
                            <div>
                                <InputLabel htmlFor="end_date" value="End Date" />
                                <TextInput
                                    id="end_date"
                                    type="date"
                                    name="end_date"
                                    value={data.end_date}
                                    onChange={(e) => setData("end_date", e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.end_date} className="mt-2" />
                            </div>

                            {/* Status */}
                            <div>
                                <InputLabel htmlFor="status" value="Status" />
                                <TextInput
                                    id="status"
                                    type="text"
                                    name="status"
                                    value={data.status}
                                    onChange={(e) => setData("status", e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.status} className="mt-2" />
                            </div>

                            {/* Responsible */}
                            <div>
                                <InputLabel htmlFor="responsible" value="Responsible" />
                                <TextInput
                                    id="responsible"
                                    type="text"
                                    name="responsible"
                                    value={data.responsible}
                                    onChange={(e) => setData("responsible", e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.responsible} className="mt-2" />
                            </div>

                            {/* Budget */}
                            <div>
                                <InputLabel htmlFor="budget" value="Budget" />
                                <TextInput
                                    id="budget"
                                    type="number"
                                    name="budget"
                                    value={data.budget}
                                    onChange={(e) => setData("budget", e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.budget} className="mt-2" />
                            </div>

                            {/* File Upload */}
                            <div>
                                <InputLabel htmlFor="file" value="Project File" />
                                <input
                                    id="file"
                                    type="file"
                                    name="file"
                                    onChange={(e) => setData("file", e.target.files[0])}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.file} className="mt-2" />
                            </div>

                            {/* Submit and Cancel Buttons */}
                            <div className="flex justify-end space-x-4 mt-4">
                                <button
                                    type="button"
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                                    onClick={() => reset()}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                                    disabled={processing}
                                >
                                    Add Project
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
