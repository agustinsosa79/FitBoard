import type { Clientes } from "../../../Types/cliente";
import { parse } from "date-fns";

interface Props {
    clientes: Clientes[];
}

export function ClientesNuevos({ clientes }: Props) {
    const esteMes = new Date().getMonth();
    const esteAnio = new Date().getFullYear();

    const nuevos = clientes.filter(cliente => {
        const fecha = parse(cliente.fechaDeInicio, "yyyy-MM-dd", new Date()); 
        console.log(cliente.fechaDeInicio);
        
        return fecha.getMonth() === esteMes && fecha.getFullYear() === esteAnio;
    });
    

    console.log(nuevos);
    
    return (
        <div className="bg-green-100 text-green-900 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold">Clientes nuevos este mes</h3>
            <p className="text-2xl">{nuevos.length}</p>
        </div>
    );
}
