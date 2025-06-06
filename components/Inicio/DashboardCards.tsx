import { useLocalStorageClientes } from "../../hooks/useLocalStorageClientes";
import { ClientesTotales } from "./Cards/ClientesTotales";
import { ProgresoClientes } from "./Cards/ProgresoClientes";


export default function DashboardCards() {

    const [clientes] = useLocalStorageClientes("clientes", []);
    return (
        <div className="p-0 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Bienvenido a FitBoard</h2>
            <p className="text-gray-700">
                Aquí puedes gestionar tus clientes, entrenamientos y más.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <ClientesTotales clientes={clientes} />
                <ProgresoClientes clientes={clientes} />


            </div>
        </div>
    );
}