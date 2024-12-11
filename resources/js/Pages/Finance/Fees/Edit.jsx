import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Link } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

export default function EditFee({ fee, neighbors }) {
    const { data, setData, put, processing, errors } = useForm({
        amount: fee.amount || "",
        due_date: fee.due_date || "",
        status: fee.status || "pending",
        paid_date: fee.paid_date || "",
        neighbor_id: fee.neighbor_id || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("fees.update", fee.id), {
            onSuccess: () => console.log("Cuota actualizada correctamente."),
            // Optional error handling
            // onError: (error) => console.error("Error al actualizar cuota:", error),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Editar Cuota
                    </h2>
                </div>
            }
        >
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="mb-4">
                            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                                Editando Cuota de {fee.neighbor.user.name}
                            </h2>
                            <p className="text-sm text-gray-600">
                                Los campos marcados con{" "}
                                <span className="text-red-500">*</span> son
                                obligatorios.
                            </p>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Amount */}
                            <div>
                                <InputLabel htmlFor="amount" value="Monto *" />
                                <TextInput
                                    id="amount"
                                    type="text"
                                    value={data.amount}
                                    onChange={(e) => {
                                        const numericValue =
                                            e.target.value.replace(
                                                /[^0-9]/g,
                                                ""
                                            ); // Allow only numbers
                                        setData("amount", numericValue);
                                    }}
                                    className="mt-1 block w-full"
                                    autoFocus
                                />
                                <InputError
                                    message={errors.amount}
                                    className="mt-2"
                                />
                            </div>
                            {/* Due Date */}
                            <div>
                                <InputLabel
                                    htmlFor="due_date"
                                    value="Fecha de Vencimiento *"
                                />
                                <TextInput
                                    id="due_date"
                                    type="date"
                                    value={data.due_date}
                                    onChange={(e) =>
                                        setData("due_date", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.due_date}
                                    className="mt-2"
                                />
                            </div>
                            {/* Status */}
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
                                    <option value="pending">Pendiente</option>
                                    <option value="paid">Pagado</option>
                                    <option value="overdue">Atrasado</option>
                                </select>
                                <InputError
                                    message={errors.status}
                                    className="mt-2"
                                />
                            </div>
                            {/* Conditionally render 'Fecha de Pago' */}
                            {data.status === "paid" && (
                                <div>
                                    <InputLabel
                                        htmlFor="paid_date"
                                        value="Fecha de Pago"
                                    />
                                    <TextInput
                                        id="paid_date"
                                        type="date"
                                        value={data.paid_date}
                                        onChange={(e) =>
                                            setData("paid_date", e.target.value)
                                        }
                                        className="mt-1 block w-full"
                                    />
                                    <InputError
                                        message={errors.paid_date}
                                        className="mt-2"
                                    />
                                </div>
                            )}
                            {/* Botones */}
                            <div className="flex justify-end space-x-4">
                                <Link
                                    href={route("fees.index")}
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                >
                                    Cancelar
                                </Link>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded"
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
