import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

export default function ProjectsCrear() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        descripcion: "",
        problema: "",
        fecha_de_inicio: "",
        fecha_de_termino: "",
        estado: "",
        responsable: "",
        presupuesto: "",
        // id_junta_de_vecino: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("projects_store"), {
            onFinish: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Crear Proyecto
                </h2>
            }
        >
            <form onSubmit={submit} className="max-w-sm mx-auto">
                <div>
                    <InputLabel htmlFor="name" value="Nombre del Proyecto" />
                    <TextInput
                        id="name"
                        type="text"
                        name="name"
                        value={data.name}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData("name", e.target.value)}
                    />
                    <InputError message={errors.name} className="mt-2" />
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
                    <InputLabel htmlFor="problema" value="Problema" />
                    <TextInput
                        id="problema"
                        type="text"
                        name="problema"
                        value={data.problema}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        onChange={(e) => setData("problema", e.target.value)}
                    />
                    <InputError message={errors.problema} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="fecha_de_inicio" value="Fecha de Inicio" />
                    <TextInput
                        id="fecha_de_inicio"
                        type="date"
                        name="fecha_de_inicio"
                        value={data.fecha_de_inicio}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("fecha_de_inicio", e.target.value)}
                    />
                    <InputError message={errors.fecha_de_inicio} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="fecha_de_termino" value="Fecha de Término" />
                    <TextInput
                        id="fecha_de_termino"
                        type="date"
                        name="fecha_de_termino"
                        value={data.fecha_de_termino}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("fecha_de_termino", e.target.value)}
                    />
                    <InputError message={errors.fecha_de_termino} className="mt-2" />
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

                <div>
                    <InputLabel htmlFor="responsable" value="Responsable" />
                    <TextInput
                        id="responsable"
                        type="text"
                        name="responsable"
                        value={data.responsable}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        onChange={(e) => setData("responsable", e.target.value)}
                    />
                    <InputError message={errors.responsable} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="presupuesto" value="Presupuesto" />
                    <TextInput
                        id="presupuesto"
                        type="number"
                        name="presupuesto"
                        value={data.presupuesto}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        onChange={(e) => setData("presupuesto", e.target.value)}
                    />
                    <InputError message={errors.presupuesto} className="mt-2" />
                </div>

                {/* <div>
                    <InputLabel htmlFor="id_junta_de_vecino" value="Junta de Vecinos" />
                    <TextInput
                        id="id_junta_de_vecino"
                        type="number"
                        name="id_junta_de_vecino"
                        value={data.id_junta_de_vecino}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("id_junta_de_vecino", e.target.value)}
                    />
                    <InputError message={errors.id_junta_de_vecino} className="mt-2" />
                </div> */}

                <div className="flex justify-end space-x-2 mt-4">
                    <button
                        type="button"
                        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
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
