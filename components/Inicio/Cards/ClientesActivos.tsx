import type { Clientes } from "../../../Types/cliente";

interface Props {
  clientes: Clientes[];
}

export function ClientesActivos({ clientes }: Props) {
  const activos = clientes.filter(cliente => cliente.activo);
  console.log("activos", activos);

  return (
    <div className="bg-blue-100 text-blue-900 p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold">Clientes activos</h3>
      <p className="text-2xl">{activos.length}</p>
    </div>
  );
}
