import { Clientes } from "../Types/cliente";
import { useState } from "react";

interface Props {
    cliente: Clientes;
    onCancel: () => void;
    onEdit: (cliente: Clientes) => void;
}

export const ClienteModal: React.FC<Props> = ({ cliente, onCancel, onEdit }) => {
    const [modoEdicion, setModoEdicion] = useState(false);
    const [form, setForm] = useState({
        nombre: cliente.nombre,
        email: cliente.email
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prevForm => ({ ...prevForm, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        onEdit({ ...cliente, ...form });
        setModoEdicion(false);
        onCancel(); // O sacalo si querés que el modal siga abierto
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 animate-fade-in">
                <button
                    onClick={onCancel}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl transition"
                    aria-label="Cerrar"
                >
                    &times;
                </button>

                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    {modoEdicion ? "Editar Cliente" : "Detalles del Cliente"}
                </h2>

                {modoEdicion ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="nombre"
                            value={form.nombre}
                            onChange={handleChange}
                            placeholder="Nombre"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-gray-400 text-gray-800"
                        />
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-gray-400 text-gray-800"
                        />

                        <div className="flex gap-4 mt-4">
                            <button
                                type="submit"
                                className="flex-1 px-6 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition-colors font-semibold"
                            >
                                Guardar Cambios
                            </button>
                            <button
                                type="button"
                                onClick={() => setModoEdicion(false)}
                                className="flex-1 px-6 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors font-semibold"
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-4">
                        <p className="font-medium text-gray-600">
                            <span className="text-gray-900">Nombre:</span> {cliente.nombre}
                        </p>
                        <p className="font-medium text-gray-600">
                            <span className="text-gray-900">Email:</span> {cliente.email}
                        </p>
                        <button
                            onClick={() => setModoEdicion(true)}
                            className="mt-6 w-full px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                        >
                            Editar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
