import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

export default function CreateExpense({ expenseTypes, associations }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        concept: "",
        responsible: "",
        date: "",
        amount: "",
        status: "pending", // Valor predeterminado
        type_id: "", // Tipo de gasto
        association_id: "", // Asociación
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("expenses.store"), {
            onError: (error) =>
                console.error("Error al crear el gasto:", error),
            onFinish: () => {
                if (Object.keys(errors).length === 0) reset();
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Crear Gasto
                </h2>
            }
        >
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Concepto */}
                            <div>
                                <InputLabel
                                    htmlFor="concept"
                                    value="Concepto del Gasto"
                                />
                                <TextInput
                                    id="concept"
                                    type="text"
                                    name="concept"
                                    value={data.concept}
                                    onChange={(e) =>
                                        setData("concept", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.concept}
                                    className="mt-2"
                                />
                            </div>

                            {/* Responsable */}
                            <div>
                                <InputLabel
                                    htmlFor="responsible"
                                    value="Responsable"
                                />
                                <TextInput
                                    id="responsible"
                                    type="text"
                                    name="responsible"
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
                                <InputLabel htmlFor="date" value="Fecha" />
                                <TextInput
                                    id="date"
                                    type="date"
                                    name="date"
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
                                <InputLabel htmlFor="amount" value="Monto" />
                                <TextInput
                                    id="amount"
                                    type="number"
                                    step="0.01"
                                    name="amount"
                                    value={data.amount}
                                    onChange={(e) =>
                                        setData("amount", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.amount}
                                    className="mt-2"
                                />
                            </div>

                            {/* Estado */}
                            <div>
                                <InputLabel htmlFor="status" value="Estado" />
                                <select
                                    id="status"
                                    name="status"
                                    value={data.status}
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                >
                                    <option value="pending">Pendiente</option>
                                    <option value="approved">Aprobado</option>
                                    <option value="rejected">Rechazado</option>
                                </select>
                                <InputError
                                    message={errors.status}
                                    className="mt-2"
                                />
                            </div>

                            {/* Tipo de Gasto */}
                            <div>
                                <InputLabel
                                    htmlFor="type_id"
                                    value="Tipo de Gasto"
                                />
                                <select
                                    id="type_id"
                                    name="type_id"
                                    value={data.type_id}
                                    onChange={(e) =>
                                        setData("type_id", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                >
                                    <option value="">Seleccione un tipo</option>
                                    {expenseTypes.map((type) => (
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

                            {/* Asociación */}
                            <div>
                                <InputLabel
                                    htmlFor="association_id"
                                    value="Asociación"
                                />
                                <select
                                    id="association_id"
                                    name="association_id"
                                    value={data.association_id}
                                    onChange={(e) =>
                                        setData("association_id", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                >
                                    <option value="">Seleccione una asociación</option>
                                    {associations.map((assoc) => (
                                        <option key={assoc.id} value={assoc.id}>
                                            {assoc.name}
                                        </option>
                                    ))}
                                </select>
                                <InputError
                                    message={errors.association_id}
                                    className="mt-2"
                                />
                            </div>

                            {/* Botones */}
                            <div className="flex justify-end space-x-4 mt-4">
                                <button
                                    type="button"
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                                    onClick={() => reset()}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                                    disabled={processing}
                                >
                                    Crear Gasto
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
