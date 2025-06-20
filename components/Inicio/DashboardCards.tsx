import { ClientesTotales } from "./Cards/ClientesTotales";
import { ClientesNuevos }  from "./Cards/ClientesNuevos";
import { ClientesInactivos } from "./Cards/ClientesInactivos";
import { ClientesActivos } from "./Cards/ClientesActivos";
import {GraficoClientesMensuales} from "./Cards/GraficoClientesMensuales"
import type { Clientes } from "../../Types/cliente";

interface Props {
  clientes: Clientes[];
}


export default function DashboardCards({clientes}: Props) {

    return (
        <div className="p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 shadow-xl border border-indigo-700/40">
  <h2 className="text-3xl font-extrabold mb-2 text-indigo-300 tracking-tight drop-shadow-lg">
    Bienvenido a <span className="text-indigo-500">FitBoard</span>
  </h2>
  <p className="text-indigo-200 mb-8 text-lg">
    Gestiona tus clientes desde un solo lugar.
  </p>

  <div className="grid grid-cols-1  lg:grid-cols-4 gap-6 mb-8">
    <div className="transition-transform hover:scale-105">
      <ClientesTotales clientes={clientes} />
    </div>
    <div className="transition-transform hover:scale-105">
      <ClientesNuevos clientes={clientes} />
    </div>
    <div className="transition-transform hover:scale-105">
      <ClientesActivos clientes={clientes} />
    </div>
    <div className="transition-transform hover:scale-105">
      <ClientesInactivos clientes={clientes} />
    </div>
  </div>

  <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-indigo-700/30">
    <h3 className="text-xl font-semibold mb-4 text-indigo-300">Clientes mensuales</h3>
    <GraficoClientesMensuales clientes={clientes} />
  </div>
</div>

    );
}