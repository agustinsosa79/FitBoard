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
        <div className="p-2 pr-5 bg-gradient-to-br gap-3 from-gray-900 via-gray-800 to-gray-700 shadow-xl border border-indigo-700/40 h-screen">
          <img 
  src="/fitcore.png" 
  alt="logo-fitcore" 
  className="block lg:hidden w-40 h-40 object-cover mb-0 mx-auto" 
/>
  <h2 className="font-extrabold text-2xl lg:text-3xl text-center lg:font-extrabold lg:mb-2 text-white tracking-tight drop-shadow-lg pb-5">
    <span className="text-gray-300">Resumen general</span>
  </h2>

  <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mb-2">
    <div className="transition-transform hover:scale-105 h-full w-full flex">
      <div className="flex-1 flex flex-col justify-stretch h-full w-0">
        <ClientesTotales clientes={clientes} />
      </div>
    </div>
    <div className="transition-transform hover:scale-105 h-full w-full flex">
      <div className="flex-1 flex flex-col justify-stretch h-full w-0">
        <ClientesNuevos clientes={clientes} />
      </div>
    </div>
    <div className="transition-transform hover:scale-105 h-full w-full flex">
      <div className="flex-1 flex flex-col justify-stretch h-full w-0">
        <ClientesActivos clientes={clientes} />
      </div>
    </div>
    <div className="transition-transform hover:scale-105 h-full w-full flex">
      <div className="flex-1 flex flex-col justify-stretch h-full w-0">
        <ClientesInactivos clientes={clientes} />
      </div>
    </div>
  </div>

    <GraficoClientesMensuales clientes={clientes} />
</div>

    );
}