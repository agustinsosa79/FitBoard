
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { parse } from "date-fns";
import type { Clientes } from "../../../Types/cliente";

interface Props {
    clientes: Clientes[];
}

export function GraficoClientesMensuales({ clientes }: Props) {
    const esteAnio = new Date().getFullYear();

    const data = Array.from({ length: 12 }, (_, i) => {
        const mes = i;
        const cantidad = clientes.filter(cliente => {
            const fecha = parse(cliente.fechaDeInicio, "yyyy-MM-dd", new Date());
            return fecha.getFullYear() === esteAnio && fecha.getMonth() === mes;
        }).length;

        const nombresMeses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

        return {
            mes: nombresMeses[mes],
            nuevos: cantidad
        };
    });

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mt-6">
            <h3 className="text-lg font-semibold mb-2">Clientes nuevos por mes ({esteAnio})</h3>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="nuevos" fill="#4ade80" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
