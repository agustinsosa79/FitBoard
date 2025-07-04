import type { Clientes } from "../../types/cliente"
import { ClienteItem } from "./ClienteItem";
import { useState } from "react";

interface Props {
    cliente: Clientes[];
    onDelete: (id: string) => void;  
    onView: (cliente: Clientes) => void;
}

export const ListaClientes: React.FC<Props> = ({ cliente, onDelete, onView }) => {
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [filtro, setFiltro] = useState<'todos' | 'activos' | 'inactivos'>('todos');

    
    const clientesFiltrados = cliente.filter((c) => {
        if (filtro === 'activos') return c.activo;
        if (filtro === 'inactivos') return !c.activo ;
        return true;
    });

    const ClientesOrdenados = [...clientesFiltrados].sort((a, b) => {
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
        <>
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <label htmlFor="order" className="block mb-2 text-sm font-medium text-gray-400">
                        Ordenar por fecha
                    </label>
                    <select
                        name="order"
                        id="order"
                        value={order}
                        onChange={(e) => setOrder(e.target.value as 'asc' | 'desc')}
                        className="w-full max-w-xs px-4 py-2 border border-gray-800 rounded-xl shadow-sm focus:outline-none focus:none text-white bg-gray-950"
                    >
                        <option value="asc">Fecha Más Antigua</option>
                        <option value="desc">Fecha Más Reciente</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="filtro" className="block mb-2 text-sm font-medium text-gray-400">
                        Filtrar por estado
                    </label>
                    <select
                        name="filtro"
                        id="filtro"
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value as 'todos' | 'activos' | 'inactivos')}
                        className="w-full max-w-xs px-4 py-2 border border-gray-800 rounded-xl shadow-sm focus:outline-none focus:none text-white bg-gray-950"
                    >
                        <option value="todos">Todos</option>
                        <option value="activos">Activos</option>
                        <option value="inactivos">Inactivos</option>
                    </select>
                </div>
            </div>

            <ul className="list-none p-0">
                {ClientesOrdenados.map((c) => (
                    <ClienteItem
                        key={c.id}
                        cliente={c}
                        onDelete={onDelete}
                        onView={onView}
                    />
                ))}
            </ul>
        </>
    );
}
