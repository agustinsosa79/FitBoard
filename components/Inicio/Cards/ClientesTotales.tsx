import type { Clientes } from "../../../Types/cliente";

export function ClientesTotales({ clientes }: { clientes: Clientes[] }) {
    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Total de Clientes</h3>
            <p className="text-2xl font-bold">{clientes.length}</p>
        </div>
    );
}
