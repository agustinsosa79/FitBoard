import { useState } from "react";
import type { Clientes } from "../../Types/cliente";

interface Props {
    cliente: Clientes;
    onCancel: () => void;
    onSave: (data: { nuevaFecha: string; }) => void;
}

export const ModalPago: React.FC<Props> = ({ cliente, onCancel, onSave }) => {
    const [fecha, setFecha] = useState(cliente.ultimaFechaPago || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ nuevaFecha: fecha }); 
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

                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Actualizar Fecha de Pago</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="date"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400 text-gray-800"
                    />

                    <div className="flex gap-4 mt-4">
                        <button
                            type="submit"
                            className="flex-1 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors font-semibold"
                        >
                            Guardar
                        </button>
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 px-6 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors font-semibold"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
