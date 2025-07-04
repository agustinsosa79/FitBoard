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
            const fecha = parse(cliente.fechaDeInicio, "dd/MM/yy", new Date());
            return fecha.getFullYear() === esteAnio && fecha.getMonth() === mes;
        }).length;

        const nombresMeses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

        return {
            mes: nombresMeses[mes],
            nuevos: cantidad
        };
    });

    return (
        <div className="w-full max-w-4xl mx-auto bg-gray-950 p-4 sm:p-6 rounded-lg shadow-md mt-6">
            <h3 className="text-lg font-semibold mb-4 text-white text-center sm:text-left">
                Clientes nuevos por mes ({esteAnio})
            </h3>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3" stroke="#222" vertical={false} />
                    <XAxis dataKey="mes" axisLine={false} tickLine={false} />
                    <YAxis allowDecimals={false} axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Bar dataKey="nuevos" fill="#4ade80" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
