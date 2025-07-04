import { ClientesTotales } from "./Cards/ClientesTotales";
import { ClientesNuevos }  from "./Cards/ClientesNuevos";
import { ClientesInactivos } from "./Cards/ClientesInactivos";
import { ClientesActivos } from "./Cards/ClientesActivos";
import {GraficoClientesMensuales} from "./Cards/GraficoClientesMensuales"
import type { Clientes } from "../../src/types/cliente";

interface Props {
  clientes: Clientes[];
}


export default function DashboardCards({clientes}: Props) {

    return (
        <div className="p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 shadow-xl border border-indigo-700/40 h-screen">
  <h2 className="text-3xl font-extrabold mb-2 text-white tracking-tight drop-shadow-lg pb-5">
    <span className="text-gray-300">Resumen general de clientes</span>
  </h2>

  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
    <div className="transition-transform hover:scale-105 h-full w-full flex">
      <div className="flex-1 flex flex-col justify-stretch h-full w-full">
        <ClientesTotales clientes={clientes} />
      </div>
    </div>
    <div className="transition-transform hover:scale-105 h-full w-full flex">
      <div className="flex-1 flex flex-col justify-stretch h-full w-full">
        <ClientesNuevos clientes={clientes} />
      </div>
    </div>
    <div className="transition-transform hover:scale-105 h-full w-full flex">
      <div className="flex-1 flex flex-col justify-stretch h-full w-full">
        <ClientesActivos clientes={clientes} />
      </div>
    </div>
    <div className="transition-transform hover:scale-105 h-full w-full flex">
      <div className="flex-1 flex flex-col justify-stretch h-full w-full">
        <ClientesInactivos clientes={clientes} />
      </div>
    </div>
  </div>

    <GraficoClientesMensuales clientes={clientes} />
</div>

    );
}