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
        <div className="p-2 m-0 bg-gradient-to-br gap-3 from-gray-900 via-gray-800 to-gray-700 shadow-xl h-250">
          <img 
  src="/fitcore.png" 
  alt="logo-fitcore" 
  className="block lg:hidden w-40 h-40 object-cover mb-0 mx-auto md:hidden" 
/>
  <h2 className="font-extrabold text-2xl lg:mt-5 lg:text-3xl text-center lg:font-extrabold lg:mb-2 text-white tracking-tight drop-shadow-lg pb-5  md:text-2xl md:mt-3 md:pr-0 md:pl-0">
    <span className="text-gray-300">Resumen general</span>
  </h2>

  <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 pl-4 mb-2">
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