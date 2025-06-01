import { Clientes } from "../Types/cliente";

interface Props {
    cliente: Clientes;
    onCancel: () => void;
}

export const ClienteModal: React.FC<Props> = ({ cliente, onCancel }) => {
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
                <h2 className="text-3xl font-semibold mb-6 text-center text-blue-700">Detalles del Cliente</h2>
                <div className="space-y-4">
                    <div>
                        <span className="font-medium text-gray-600">Nombre:</span>
                        <span className="ml-2 text-gray-900">{cliente.nombre}</span>
                    </div>
                    <div>
                        <span className="font-medium text-gray-600">Email:</span>
                        <span className="ml-2 text-gray-900">{cliente.email}</span>
                    </div>
                </div>
                <button
                    onClick={onCancel}
                    className="mt-8 w-full py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
};