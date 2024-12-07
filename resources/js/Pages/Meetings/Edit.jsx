import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Link } from "@inertiajs/react"; // Importar Link
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

export default function EditMeeting({ meeting, associations, userRole }) {
    const { data, setData, put, processing, errors } = useForm({
        meeting_date: meeting.meeting_date || "",
        main_topic: meeting.main_topic || "",
        description: meeting.description || "",
        location: meeting.location || "",
        organized_by: meeting.organized_by || "",
        result: meeting.result || "",
        status: meeting.status || "scheduled",
        neighborhood_association_id: meeting.neighborhood_association_id || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Obtener la fecha actual en formato UTC
        const currentDate = new Date().toISOString();

        // Validar si la fecha de la reunión es posterior a la actual
        if (data.meeting_date <= currentDate) {
            alert("La fecha de la reunión debe ser en el futuro.");
            return;
        }

        put(route("meetings.update", meeting.id), {
            onSuccess: () => alert("Reunión actualizada exitosamente."),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Editar Reunión
                </h2>
            }
        >
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <InputLabel htmlFor="meeting_date" value="Fecha de la Reunión" />
                                <TextInput
                                    id="meeting_date"
                                    type="datetime-local"
                                    name="meeting_date"
                                    value={data.meeting_date}
                                    onChange={(e) =>
                                        setData("meeting_date", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />

                                <InputError message={errors.meeting_date} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="main_topic" value="Tema Principal" />
                                <TextInput
                                    id="main_topic"
                                    type="text"
                                    name="main_topic"
                                    value={data.main_topic}
                                    onChange={(e) => setData("main_topic", e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.main_topic} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="description" value="Descripción" />
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

                            <div>
                                <InputLabel htmlFor="location" value="Lugar" />
                                <TextInput
                                    id="location"
                                    type="text"
                                    name="location"
                                    value={data.location}
                                    onChange={(e) => setData("location", e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.location} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="organized_by" value="Convocada Por" />
                                <TextInput
                                    id="organized_by"
                                    type="text"
                                    name="organized_by"
                                    value={data.organized_by}
                                    onChange={(e) => setData("organized_by", e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.organized_by} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="result" value="Resultado" />
                                <TextInput
                                    id="result"
                                    type="text"
                                    name="result"
                                    value={data.result}
                                    onChange={(e) => setData("result", e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.result} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="status" value="Estado" />
                                <select
                                    id="status"
                                    name="status"
                                    value={data.status}
                                    onChange={(e) => setData("status", e.target.value)}
                                    className="mt-1 block w-full"
                                >
                                    <option value="scheduled">Programada</option>
                                    <option value="completed">Completada</option>
                                    <option value="canceled">Cancelada</option>
                                </select>
                                <InputError message={errors.status} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="neighborhood_association_id"
                                    value="Junta Vecinal"
                                />
                                <select
                                    id="neighborhood_association_id"
                                    name="neighborhood_association_id"
                                    value={data.neighborhood_association_id}
                                    onChange={(e) => setData("neighborhood_association_id", e.target.value)}
                                    className={`mt-1 block w-full ${
                                        userRole === "board_member" ? "bg-gray-100 cursor-not-allowed" : ""
                                    }`}
                                    disabled={userRole === "board_member"}
                                >
                                    {associations.map((association) => (
                                        <option key={association.id} value={association.id}>
                                            {association.name}
                                        </option>
                                    ))}
                                </select>



                                <InputError
                                    message={errors.neighborhood_association_id}
                                    className="mt-2"
                                />
                            </div>


                            <div className="flex justify-end space-x-4 mt-4">
                                <Link
                                    href={route("meetings.index")}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                                >
                                    Cancelar
                                </Link>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                                    disabled={processing}
                                >
                                    Guardar Cambios
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
