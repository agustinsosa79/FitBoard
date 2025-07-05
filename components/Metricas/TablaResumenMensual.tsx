import { utils, writeFile } from "xlsx";

interface MesData {
  mes: string;
  clientes: number;
  nuevos: number;
  renovados: number;
  perdidos: number;
  ingreso: number;
  crecimiento: number | null;
  churn: number | null;
  retencion: number | null;
}

interface Props {
  data: MesData[];
}

export function TablaResumenMensual({ data }: Props) {
  console.log("Datos de la tabla:", data);
  const handleExportarTabla = () => {
    const dataExport = data.map((fila) => ({
      Mes: fila.mes,
      Activos: fila.clientes,
      Nuevos: fila.nuevos,
      Renovados: fila.renovados,
      Perdidos: fila.perdidos,
      Ingreso: `$${fila.ingreso.toLocaleString("es-AR")}`,
      "Var. (%)":
        fila.crecimiento === null
          ? "-"
          : `${fila.crecimiento > 0 ? "+" : ""}${fila.crecimiento.toFixed(1)}%`,
      "Churn (%)": fila.churn === null ? "-" : `${fila.churn.toFixed(1)}%`,
      "Retención (%)": fila.retencion === null ? "-" : `${fila.retencion.toFixed(1)}%`,
    }));
    const hoja = utils.json_to_sheet(dataExport);
    const libro = utils.book_new();
    utils.book_append_sheet(libro, hoja, "Métricas");
    writeFile(libro, `metricas-mensuales.xlsx`);
  };

  return (
    <div className="rounded-xl shadow-xl border border-gray-800 bg-[#15181e] p-2 overflow-x-auto">
      <div className="flex justify-start mb-2">
        <button
          onClick={handleExportarTabla}
          className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-1 px-4 rounded shadow text-xs"
        >
          Exportar Excel
        </button>
      </div>
      <table className="w-full min-w-[500px] text-left text-xs">
        <thead>
          <tr className="bg-[#20232a] text-gray-100 uppercase tracking-widest">
            <th className="px-2 py-2 font-bold border-b border-gray-800">Mes</th>
            <th className="px-2 py-2 font-bold border-b border-gray-800">Act.</th>
            <th className="px-2 py-2 font-bold border-b border-gray-800">Nuev.</th>
            <th className="px-2 py-2 font-bold border-b border-gray-800">Renov.</th>
            <th className="px-2 py-2 font-bold border-b border-gray-800">Perd.</th>
            <th className="px-2 py-2 font-bold border-b border-gray-800">Ingreso</th>
            <th className="px-2 py-2 font-bold border-b border-gray-800">Var.</th>
            <th className="px-2 py-2 font-bold border-b border-gray-800">Churn</th>
            <th className="px-2 py-2 font-bold border-b border-gray-800">Ret.</th>
          </tr>
        </thead>
        <tbody>
          {data.map((fila, i) => (
            <tr
              key={i}
              className={`transition-all duration-300 ${
                i % 2 === 0 ? "bg-[#181b22]" : "bg-[#23262e]"
              } hover:bg-[#232a36]`}
            >
              <td className="px-2 py-1 text-gray-100 font-semibold border-b border-gray-800 truncate">
                {fila.mes}
              </td>
              <td className="px-2 py-1 text-blue-400 font-bold border-b border-gray-800">
                {fila.clientes}
              </td>
              <td className="px-2 py-1 text-cyan-400 font-bold border-b border-gray-800">
                {fila.nuevos}
              </td>
              <td className="px-2 py-1 text-green-400 font-bold border-b border-gray-800">
                {fila.renovados}
              </td>
              <td className="px-2 py-1 text-red-400 font-bold border-b border-gray-800">
                {fila.perdidos}
              </td>
              <td className="px-2 py-1 text-green-400 font-bold border-b border-gray-800">
                ${fila.ingreso.toLocaleString("es-AR")}
              </td>
              <td className="px-2 py-1 border-b border-gray-800">
                {fila.crecimiento === null ? (
                  <span className="text-gray-500 font-semibold">—</span>
                ) : (
                  <span
                    className={
                      fila.crecimiento > 0
                        ? "text-green-400 font-bold"
                        : fila.crecimiento < 0
                        ? "text-red-400 font-bold"
                        : "text-gray-300 font-bold"
                    }
                  >
                    {fila.crecimiento > 0 ? "+" : ""}
                    {fila.crecimiento.toFixed(1)}%
                  </span>
                )}
              </td>
              <td
                className={`px-2 py-1 border-b border-gray-800 font-bold ${
                  fila.churn === null
                    ? "text-gray-500"
                    : fila.churn > 0
                    ? "text-red-400"
                    : "text-green-400"
                }`}
              >
                {fila.churn === null ? "—" : `${fila.churn.toFixed(1)}%`}
              </td>
              <td
                className={`px-2 py-1 border-b border-gray-800 font-bold ${
                  fila.retencion === null
                    ? "text-gray-500"
                    : fila.retencion > 80
                    ? "text-green-400"
                    : "text-yellow-400"
                }`}
              >
                {fila.retencion === null ? "—" : `${fila.retencion.toFixed(1)}%`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
