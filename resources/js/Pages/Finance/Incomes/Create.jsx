import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, router, Link } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

export default function CreateIncome({ incomeTypes }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        source: "",
        date: "",
        responsible: "",
        amount: "",
        type_id: "",
        status: "active",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("incomes.store"), {
            onSuccess: () => reset(),
        });
    };

    const handleCancel = () => {
        reset();
        router.visit(route("incomes.index"));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="mb-4">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Crear Ingreso
                    </h2>
                    <p className="text-sm text-gray-600">
                        Los campos marcados con{" "}
                        <span className="text-red-500">*</span> son
                        obligatorios.
                    </p>
                </div>
            }
        >
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Fuente */}
                            <div>
                                <InputLabel htmlFor="source" value="Fuente *" />
                                <TextInput
                                    id="source"
                                    type="text"
                                    value={data.source}
                                    onChange={(e) =>
                                        setData("source", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                    autoFocus
                                />
                                <InputError
                                    message={errors.source}
                                    className="mt-2"
                                />
                            </div>

                            {/* Responsable */}
                            <div>
                                <InputLabel
                                    htmlFor="responsible"
                                    value="Responsable *"
                                />
                                <TextInput
                                    id="responsible"
                                    type="text"
                                    value={data.responsible}
                                    onChange={(e) =>
                                        setData("responsible", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.responsible}
                                    className="mt-2"
                                />
                            </div>

                            {/* Fecha */}
                            <div>
                                <InputLabel htmlFor="date" value="Fecha *" />
                                <TextInput
                                    id="date"
                                    type="date"
                                    value={data.date}
                                    onChange={(e) =>
                                        setData("date", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.date}
                                    className="mt-2"
                                />
                            </div>

                            {/* Monto */}
                            <div>
                                <InputLabel htmlFor="amount" value="Monto *" />
                                <TextInput
                                    id="amount"
                                    type="text"
                                    value={data.amount}
                                    onChange={(e) => {
                                        const numericValue =
                                            e.target.value.replace(
                                                /[^0-9.]/g,
                                                ""
                                            );
                                        setData("amount", numericValue);
                                    }}
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.amount}
                                    className="mt-2"
                                />
                            </div>

                            {/* Tipo de Ingreso */}
                            <div>
                                <InputLabel
                                    htmlFor="type_id"
                                    value="Tipo de Ingreso *"
                                />
                                <select
                                    id="type_id"
                                    value={data.type_id}
                                    onChange={(e) =>
                                        setData("type_id", e.target.value)
                                    }
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
                                >
                                    <option value="">Seleccione un tipo</option>
                                    {incomeTypes.map((type) => (
                                        <option key={type.id} value={type.id}>
                                            {type.name}
                                        </option>
                                    ))}
                                </select>
                                <InputError
                                    message={errors.type_id}
                                    className="mt-2"
                                />
                            </div>

                            {/* Estado */}
                            <div>
                                <InputLabel htmlFor="status" value="Estado *" />
                                <select
                                    id="status"
                                    value={data.status}
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
                                >
                                    <option value="active">Activo</option>
                                    <option value="inactive">Inactivo</option>
                                </select>
                                <InputError
                                    message={errors.status}
                                    className="mt-2"
                                />
                            </div>

                            {/* Botones */}
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                    onClick={handleCancel}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded"
                                    disabled={processing}
                                >
                                    Crear Ingreso
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
