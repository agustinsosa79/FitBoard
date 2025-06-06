
import type { Clientes } from "../../Types/cliente"
import { ClienteItem } from "./ClienteItem";
import { useState } from "react";

interface Props {
    cliente: Clientes[];
    onDelete: (id: number) => void;  
    onView: (cliente: Clientes) => void;
}

export const ListaClientes: React.FC<Props> = ({cliente, onDelete, onView }) => {
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const ClientesOrdenados = [...cliente].sort((a, b) => {
        const fechaA =  new Date(a.fechaDeInicio);
        const fechaB = new Date(b.fechaDeInicio);

        return order === 'asc' ? fechaA.getTime() - fechaB.getTime() : fechaB.getTime() - fechaA.getTime();
    });


        if (cliente.length === 0) {
            return <p className="text-center text-gray-500 py-4">No hay clientes cargados</p>
        }

    return (
    <ul className="list-none p-0">
        <select
            name="order"
            id="order"
            value={order}
            onChange={(e) => setOrder(e.target.value as 'asc' | 'desc')}
            className="mb-4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 bg-white"
        >
            <option value="asc">Fecha Más Antigua</option>
            <option value="desc">Fecha Más Reciente</option>
        </select>
        {ClientesOrdenados.map((c) => (
            <ClienteItem
            cliente={c}
            onDelete={onDelete}
            onView={onView}
            />
        ))}
    </ul>
    )   
}