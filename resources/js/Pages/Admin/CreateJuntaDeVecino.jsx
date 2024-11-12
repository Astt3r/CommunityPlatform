import { useForm } from "@inertiajs/react";

export default function CreateJuntaDeVecino() {
    const { data, setData, post, errors } = useForm({
        nombre: "",
        direccion: "", // Cambiado a direccion_sede
        telefono: "", // Cambiado a telefono_contacto
        email: "", // Cambiado a email_contacto
        fecha_fundacion: "",
        estado: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("juntas.store"));
    };

    return (
        <div className="p-6 bg-white shadow-sm sm:rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">Crear Junta de Vecinos</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre</label>
                    <input
                        type="text"
                        value={data.nombre}
                        onChange={(e) => setData("nombre", e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                    {errors.nombre && <p className="text-red-500">{errors.nombre}</p>}
                </div>
                <div>
                    <label>Dirección</label>
                    <input
                        type="text"
                        value={data.direccion} // Cambiado a direccion_sede
                        onChange={(e) => setData("direccion", e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                    {errors.direccion_sede && <p className="text-red-500">{errors.direccion}</p>}
                </div>
                <div>
                    <label>Teléfono</label>
                    <input
                        type="text"
                        value={data.telefono} // Cambiado a telefono_contacto
                        onChange={(e) => setData("telefono", e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                    {errors.telefono && <p className="text-red-500">{errors.telefono}</p>}
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={data.email} // Cambiado a email_contacto
                        onChange={(e) => setData("email", e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                    {errors.email && <p className="text-red-500">{errors.email}</p>}
                </div>
                <div>
                    <label>Fecha de Fundación</label>
                    <input
                        type="date"
                        value={data.fecha}
                        onChange={(e) => setData("fecha_fundacion", e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                    {errors.fecha_fundacion && <p className="text-red-500">{errors.fecha_fundacion}</p>}
                </div>
                <div>
                    <label>Estado</label>
                    <input
                        type="text"
                        value={data.estado}
                        onChange={(e) => setData("estado", e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                    {errors.estado && <p className="text-red-500">{errors.estado}</p>}
                </div>
                <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                    Crear Junta de Vecinos
                </button>
            </form>
        </div>
    );
}
