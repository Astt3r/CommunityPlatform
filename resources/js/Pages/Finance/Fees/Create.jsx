import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, router, Link } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

export default function CreateFee({ neighbors }) {
    const getCurrentDate = () => {
        const today = new Date();
        today.setDate(today.getDate());
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };
    const { data, setData, post, processing, errors, reset } = useForm({
        amount: "",
        due_date: getCurrentDate(),
        status: "pending", // Default to "pending" or any other default state
        paid_date: getCurrentDate(),
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("fees.store"), {
            onSuccess: () => reset(),
        });
    };

    const handleCancel = () => {
        reset();
        router.visit(route("fees.index"));
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Crear Cuota
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
                            {/* 'amount',
                            'due_date',
                            'paid_date',
                            'status',
                            'neighbor_id', */}
                            <div>
                                <InputLabel
                                    htmlFor="neighbor_id"
                                    value="Seleccione un Vecino *"
                                />
                                <select
                                    id="neighbor_id"
                                    value={data.neighbor_id || ""}
                                    onChange={(e) =>
                                        setData("neighbor_id", e.target.value)
                                    }
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
                                >
                                    <option value="" disabled>
                                        Seleccione un vecino
                                    </option>
                                    {neighbors.map((neighbor) => (
                                        <option
                                            key={neighbor.id}
                                            value={neighbor.id}
                                        >
                                            {neighbor.user.name}{" "}
                                            {/* Assuming user.name contains the name */}
                                        </option>
                                    ))}
                                </select>
                                <InputError
                                    message={errors.neighbor_id}
                                    className="mt-2"
                                />
                            </div>
                            {/* Monto */}
                            <div>
                                <InputLabel htmlFor="amount" value="Monto *" />
                                <TextInput
                                    id="amount"
                                    type="text" // Change to text to manage input manually
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

                            {/* Fecha de Vencimiento */}
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
                                        name="paid_date"
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
                                    Crear Cuota
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
