interface Props {
  año: number;
  setAño: (valor: number) => void;
  soloActivos: boolean;
  setSoloActivos: (valor: boolean) => void;
  onExportar: () => void;
}




export function FiltrosMetricas({ año, setAño, soloActivos, setSoloActivos, onExportar }: Props) {
  return (
    <section className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 p-6 bg-gray-900 rounded-xl shadow-lg">
      <div className="flex flex-col gap-2">
        <label htmlFor="año-select" className="text-sm font-medium text-gray-300">
          Año
        </label>
        <select
          id="año-select"
          className=" border border-gray-700 rounded-md px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          value={año}
          onChange={(e) => setAño(Number(e.target.value))}
        >
          {[2024, 2025].map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-3">
        <input
          id="solo-activos"
          type="checkbox"
          checked={soloActivos}
          onChange={(e) => setSoloActivos(e.target.checked)}
          className="w-5 h-5 accent-emerald-500 border-gray-700 rounded focus:ring-emerald-500"
        />
        <label htmlFor="solo-activos" className="text-sm font-medium text-gray-300 select-none">
          Solo activos
        </label>
      </div>

      <button
        onClick={onExportar}
        className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold px-6 py-2 rounded-md shadow-md transition focus:outline-none focus:ring-2 focus:ring-emerald-400"
      >
        Exportar Excel
      </button>
    </section>
  );
}
