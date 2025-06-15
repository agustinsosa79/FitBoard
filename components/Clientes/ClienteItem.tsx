import type { Clientes } from "../../Types/cliente";

interface Props {
    cliente: Clientes;
    onDelete: (id: number) => void;  
    onView: (cliente: Clientes) => void;
}

export const ClienteItem: React.FC<Props> = ({ cliente, onDelete, onView }) => {
const esInactivo = !cliente.activo;

    return (
        <li
    className={`cliente-item flex items-center justify-between p-4 rounded-2xl shadow-md mb-3 
        ${esInactivo ? "bg-red-100 border border-red-400" : "bg-white"}`}
>
            <div className="flex flex-col">
                <span className={`text-lg font-semibold ${esInactivo ? "text-red-700" : "text-gray-800"}`}>
                    {cliente.nombre}
                </span>
                <span className="text-sm text-blue-600 bg-blue-100 px-2 py-0.5 rounded mt-1 w-fit">
                    {cliente.fechaDeInicio}
                </span>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={() => onDelete(cliente.id)}
                    className="px-4 py-1.5 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors text-sm font-medium"
                >
                    Eliminar
                </button>
                <button
                    onClick={() => onView(cliente)}
                    className="px-4 py-1.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                    Ver detalles
                </button>
            </div>
        </li>
    );
}
