import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { parse } from "date-fns";
import type { Clientes } from "../../../src/types/cliente";

interface Props {
  clientes: Clientes[];
}

export function GraficoClientesMensuales({ clientes }: Props) {
  const esteAnio = new Date().getFullYear();

  const nombresMeses = [
    "Ene", "Feb", "Mar", "Abr", "May", "Jun",
    "Jul", "Ago", "Sep", "Oct", "Nov", "Dic",
  ];

  const data = Array.from({ length: 12 }, (_, i) => {
    const mes = i;
    const cantidad = clientes.filter((cliente) => {
      const fecha = parse(cliente.fechaDeInicio, "dd/MM/yy", new Date());
      return fecha.getFullYear() === esteAnio && fecha.getMonth() === mes;
    }).length;

    return {
      mes: nombresMeses[mes],
      nuevos: cantidad,
    };
  });

  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-950 p-4 h-80 sm:p-6 rounded-lg shadow-md mt-6">
      <h3 className="text-lg font-semibold mb-4 text-white text-center sm:text-left">
        Clientes nuevos por mes ({esteAnio})
      </h3>

      {/* Responsive scroll solo en móviles */}
      <div className="overflow-x-auto sm:overflow-visible">
        {/* En móvil: min-w-[700px], en sm+: w-full */}
        <div className="min-w-[700px] sm:min-w-0 sm:w-full h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3" stroke="#222" vertical={false} />
              <XAxis
                dataKey="mes"
                interval={0}
                angle={-45}
                textAnchor="end"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#fff",
                  fontSize: 11,
                }}
                height={60}
              />
              <YAxis
                allowDecimals={false}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#fff", fontSize: 12 }}
              />
              <Tooltip />
              <Bar dataKey="nuevos" fill="#4ade80" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
