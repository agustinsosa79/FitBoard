interface MesData {
  mes: string;
  clientes: number;
  ingreso: number;
  crecimiento: number | null;
}

interface Props {
  data: MesData[];
}

export function TablaResumenMensual({ data }: Props) {
  return (
    <div className="overflow-x-auto rounded-2xl shadow-2xl border border-gray-800 bg-[#15181e] p-6">
      <table className="w-full table-auto text-left">
        <thead>
          <tr className="bg-[#20232a] text-gray-100 text-sm uppercase tracking-widest">
            <th className="px-8 py-5 font-extrabold border-b-2 border-gray-800">Mes</th>
            <th className="px-8 py-5 font-extrabold border-b-2 border-gray-800">Clientes Nuevos</th>
            <th className="px-8 py-5 font-extrabold border-b-2 border-gray-800">Ingreso Total</th>
            <th className="px-8 py-5 font-extrabold border-b-2 border-gray-800">% Crecimiento</th>
          </tr>
        </thead>
        <tbody>
          {data.map((fila, i) => (
            <tr
              key={i}
              className={`transition-all duration-300 ${
                i % 2 === 0 ? "bg-[#181b22]" : "bg-[#23262e]"
              } hover:bg-[#232a36] hover:scale-[1.01]`}
            >
              <td className="px-8 py-4 text-gray-100 font-semibold border-b border-gray-800 tracking-wide">
                {fila.mes}
              </td>
              <td className="px-8 py-4 text-blue-400 font-bold border-b border-gray-800 text-lg">
                {fila.clientes}
              </td>
              <td className="px-8 py-4 text-green-400 font-bold border-b border-gray-800 text-lg">
                ${fila.ingreso.toLocaleString("es-AR")}
              </td>
              <td className="px-8 py-4 border-b border-gray-800">
                {fila.crecimiento === null ? (
                  <span className="text-gray-500 font-semibold text-base">—</span>
                ) : (
                  <span
                    className={
                      fila.crecimiento > 0
                        ? "text-green-400 font-extrabold text-base"
                        : fila.crecimiento < 0
                        ? "text-red-400 font-extrabold text-base"
                        : "text-gray-300 font-extrabold text-base"
                    }
                  >
                    {fila.crecimiento > 0 ? "+" : ""}
                    {fila.crecimiento.toFixed(1)}%
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
