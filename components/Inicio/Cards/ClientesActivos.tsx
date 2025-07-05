import type { Clientes } from "../../../src/types/cliente";

interface Props {
  clientes: Clientes[];
}

export function ClientesActivos({ clientes }: Props) {
  const activos = clientes.filter(cliente => cliente.activo);
  console.log("activos", activos);

  return (
    <div className="relative bg-gradient-to-br  from-blue-400 via-blue-500 to-blue-700 lg:w-55 text-white p-6 rounded-2xl shadow-xl w-35 sm:w-60 h-40 flex flex-col justify-center items-center overflow-hidden border-2 border-blue-200 md:w-50 md:text-center">
  <div className="absolute top-0 right-0 m-2 opacity-20 text-7xl pointer-events-none select-none">
    <svg width="64" height="64" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" />
      <path d="M8 16c0-2.21 3.58-2.21 3.58 0M12 12a4 4 0 100-8 4 4 0 000 8z" stroke="white" strokeWidth="2" />
    </svg>
  </div>
  <h3 className="text-xl font-bold tracking-wide drop-shadow mb-2 z-10">Clientes activos</h3>
  <p className="text-5xl font-extrabold drop-shadow-lg z-10">{activos.length}</p>
  <span className="mt-2 text-xs font-medium tracking-widest uppercase z-10 bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
    Actualizado
  </span>
</div>

  );
}
