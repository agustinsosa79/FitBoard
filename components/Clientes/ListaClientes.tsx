import type { Clientes } from "../../Types/cliente"
import { ClienteItem } from "./ClienteItem";
import { useState } from "react";

interface Props {
    cliente: Clientes[];
    onDelete: (id: number) => void;  
    onView: (cliente: Clientes) => void;
}

export const ListaClientes: React.FC<Props> = ({ cliente, onDelete, onView }) => {
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const ClientesOrdenados = [...cliente].sort((a, b) => {
        const fechaA = new Date(a.fechaDeInicio);
        const fechaB = new Date(b.fechaDeInicio);

        return order === 'asc'
            ? fechaA.getTime() - fechaB.getTime()
            : fechaB.getTime() - fechaA.getTime();
    });

    if (cliente.length === 0) {
        return (
            <p className="text-center text-gray-500 py-4">
                No hay clientes cargados
            </p>
        );
    }

    return (
        <ul className="list-none p-0">
            <div className="mb-6">
                <label
                    htmlFor="order"
                    className="block mb-2 text-sm font-medium text-gray-700"
                >
                    Ordenar por fecha
                </label>
                <select
                    name="order"
                    id="order"
                    value={order}
                    onChange={(e) => setOrder(e.target.value as 'asc' | 'desc')}
                    className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 text-gray-800 bg-white"
                >
                    <option value="asc">Fecha Más Antigua</option>
                    <option value="desc">Fecha Más Reciente</option>
                </select>
            </div>

            {ClientesOrdenados.map((c) => (
                <ClienteItem
                    key={c.id}
                    cliente={c}
                    onDelete={onDelete}
                    onView={onView}
                />
            ))}
        </ul>
    );
}