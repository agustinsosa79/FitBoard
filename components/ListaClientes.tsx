
import { Clientes } from "../Types/cliente"
import { ClienteItem } from "./ClienteItem";

interface Props {
    cliente: Clientes[];
    onDelete: (id: number) => void;  
    onEdit: (cliente: Clientes) => void;
    onView: (cliente: Clientes) => void;
}

export const ListaClientes: React.FC<Props> = ({cliente, onDelete, onEdit, onView }) => {
        if (cliente.length === 0) {
            return <p className="text-center text-gray-500 py-4">No hay clientes cargados</p>
        }

    return (
    <ul className="list-none p-0">
        {cliente.map((c) => (
            <ClienteItem
            cliente={c}
            onDelete={onDelete}
            onEdit={onEdit}
            onView={onView}
            />
        ))}
    </ul>
    )   
    
}