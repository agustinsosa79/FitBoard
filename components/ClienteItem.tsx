import { Clientes } from "../Types/cliente";


interface Props {
    cliente: Clientes;
    onDelete: (id: number) => void;  
    onView: (cliente: Clientes) => void;
}

export const ClienteItem: React.FC<Props> = ({cliente, onDelete, onView}) => {
    return (
        <li className="cliente-item flex items-center justify-between p-4 bg-white rounded-lg shadow mb-2">
            <span className="text-lg font-medium text-gray-800">{cliente.nombre}</span>
            <div className="flex gap-2">
            <button
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                onClick={() => onDelete(cliente.id)}
            >
                Eliminar
            </button>
            <button
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                onClick={() => onView(cliente)}
            >
                Ver detalles
            </button>
            </div>
        </li>
    );


}