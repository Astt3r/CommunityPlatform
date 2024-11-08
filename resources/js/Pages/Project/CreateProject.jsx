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
            <form onSubmit={submit} className="max-w-md mx-auto p-4 space-y-4 bg-gray-100 rounded">
                <div>
                    <InputLabel htmlFor="name" value="Nombre del Proyecto" />
                    <TextInput
                        id="name"
                        type="text"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
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
                        className="mt-1 block w-full"
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
                        className="mt-1 block w-full"
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
                        className="mt-1 block w-full"
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
                        className="mt-1 block w-full"
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
                        className="mt-1 block w-full"
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
                        className="px-4 py-2 bg-gray-300 text-black rounded"
                        onClick={() => reset()}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                        disabled={processing}
                    >
                        Agregar
                    </button>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
