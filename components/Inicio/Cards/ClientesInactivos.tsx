import type { Clientes } from "../../../Types/cliente";

interface Props {
    clientes: Clientes[];
}

export function ClientesInactivos({ clientes }: Props) {
    const hoy = new Date();
    const fechaLimite = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() - 30);

    const inactivos = clientes.filter(cliente => {
    const ultimaActividad = new Date(cliente.ultimaFechaPago || cliente.fechaDeInicio );
    console.log(ultimaActividad);
    
    return !cliente.activo && ultimaActividad < fechaLimite;
});

    return (
    <div className="bg-red-100 text-red-900 p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold">Clientes que no pagaron / Inactivos</h3>
        <p className="text-2xl">{inactivos.length}</p>
    </div>
    );
}
