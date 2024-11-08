import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

export default function CreateMeeting() {
    const { data, setData, post, processing, errors, reset } = useForm({
        fecha_reunion: "",
        tema_principal: "",
        descripcion: "",
        lugar: "",
        convocada_por: "",
        resultado: "",
        estado: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("meeting_store"), {
            onFinish: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Crear Reunión
                </h2>
            }
        >
            <form onSubmit={submit} className="max-w-sm mx-auto">
                <div>
                    <InputLabel htmlFor="fecha_reunion" value="Fecha de Reunión" />
                    <TextInput
                        id="fecha_reunion"
                        type="date"
                        name="fecha_reunion"
                        value={data.fecha_reunion}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        onChange={(e) => setData("fecha_reunion", e.target.value)}
                    />
                    <InputError message={errors.fecha_reunion} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="tema_principal" value="Tema Principal" />
                    <TextInput
                        id="tema_principal"
                        type="text"
                        name="tema_principal"
                        value={data.tema_principal}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        onChange={(e) => setData("tema_principal", e.target.value)}
                    />
                    <InputError message={errors.tema_principal} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="descripcion" value="Descripción" />
                    <TextInput
                        id="descripcion"
                        type="text"
                        name="descripcion"
                        value={data.descripcion}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        onChange={(e) => setData("descripcion", e.target.value)}
                    />
                    <InputError message={errors.descripcion} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="lugar" value="Lugar" />
                    <TextInput
                        id="lugar"
                        type="text"
                        name="lugar"
                        value={data.lugar}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        onChange={(e) => setData("lugar", e.target.value)}
                    />
                    <InputError message={errors.lugar} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="convocada_por" value="Convocada Por" />
                    <TextInput
                        id="convocada_por"
                        type="text"
                        name="convocada_por"
                        value={data.convocada_por}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        onChange={(e) => setData("convocada_por", e.target.value)}
                    />
                    <InputError message={errors.convocada_por} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="resultado" value="Resultado" />
                    <TextInput
                        id="resultado"
                        type="text"
                        name="resultado"
                        value={data.resultado}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        onChange={(e) => setData("resultado", e.target.value)}
                    />
                    <InputError message={errors.resultado} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="estado" value="Estado" />
                    <TextInput
                        id="estado"
                        type="text"
                        name="estado"
                        value={data.estado}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        onChange={(e) => setData("estado", e.target.value)}
                    />
                    <InputError message={errors.estado} className="mt-2" />
                </div>

                <div className="flex justify-end space-x-2 mt-4">
                    <button
                        type="button"
                        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                        onClick={() => reset()}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        disabled={processing}
                    >
                        Agregar
                    </button>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
