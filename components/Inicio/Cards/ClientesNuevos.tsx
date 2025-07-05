import type { Clientes } from "../../../src/types/cliente";
import { parse } from "date-fns";

interface Props {
    clientes: Clientes[];
}

export function ClientesNuevos({ clientes }: Props) {
    const esteMes = new Date().getMonth();
    const esteAnio = new Date().getFullYear();

    const nuevos = clientes.filter(cliente => {
        const fecha = parse(cliente.fechaDeInicio, "dd/MM/yy", new Date()); 
        console.log(cliente.fechaDeInicio);
        
        return fecha.getMonth() === esteMes && fecha.getFullYear() === esteAnio;
    });
    
    return (
        <div className="relative bg-gradient-to-br from-green-400 via-green-500 lg:w-55 lg:h-40 to-green-700 text-white p-5 rounded-2xl shadow-xl w-35 h-40 flex flex-col justify-center items-center overflow-hidden border-2 border-green-200 md:w-50">
            <div className="absolute top-0 right-0 m-2 opacity-20 text-7xl pointer-events-none select-none">
            <svg width="64" height="64" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" />
                <path d="M16 14c0-2.21-3.58-2.21-3.58 0M12 12a4 4 0 100-8 4 4 0 000 8z" stroke="white" strokeWidth="2" />
            </svg>
            </div>
            <h3 className="text-xl font-bold tracking-wide drop-shadow mb-2 z-10">Clientes nuevos</h3>
            <p className="text-5xl font-extrabold drop-shadow-lg z-10">{nuevos.length}</p>
            <span className="mt-2 text-xs font-medium tracking-widest uppercase z-10 bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">Actualizado</span>
        </div>
    );
}
