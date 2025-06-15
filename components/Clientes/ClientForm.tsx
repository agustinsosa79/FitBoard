import React from "react";
import type { ClienteFormProps } from "../../Types/ClienteFormProps";
import { useContext } from "react";
import { PlanesContext } from "../../context/PlanesContext";



export function ClientForm({
  form,
  onChange,
  onSubmit,
  error,
  agregar,
  setAgregar,
  resetForm,
}: ClienteFormProps) {
  // Contexto para acceder a los planes
  const planesContext = useContext(PlanesContext);
  console.log("Contexto de Planes:", planesContext);
  
  if (!planesContext || !planesContext.planes) {
    return <div>Cargando planes...</div>;
  }
  const { planes } = planesContext;
  
  const handleToggleAgregar = () => {
  if (agregar) {
    resetForm?.();
    setAgregar(false);
  } else {
    setAgregar(true);
  }
};

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e);
  };



  console.log("Formulario de Cliente:", form.plan);

  return (
    <>
      {/* Encabezado y botón Agregar */}
      <div className="w-full max-w-md bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl shadow-xl border border-indigo-700/40 p-8 mt-10 h-auto">
        <div className="flex items-center gap-3 mb-4 border-b border-gray-700 pb-4">
          <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <h2 className="text-2xl font-bold tracking-wide text-white">Gestión de Clientes</h2>
          <button
            onClick={handleToggleAgregar}
            type="button"
            className={`ml-auto px-5 py-2 rounded-lg font-semibold shadow transition-all duration-200 ${
              agregar
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            {agregar ? "Cancelar" : "Agregar"}
          </button>
        </div>
      </div>

      {/* Modal para agregar cliente */}
      {agregar && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6 overflow-y-auto">
    <div className="bg-gray-900 border border-indigo-700/40 rounded-2xl shadow-2xl p-8 w-full max-w-3xl mx-auto">
      <h3 className="text-white text-2xl font-bold mb-6">Agregar Cliente</h3>

      {error && (
        <div className="bg-red-500/20 border border-red-400 text-red-300 px-4 py-2 rounded-lg text-center font-semibold shadow mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <label className="flex flex-col text-indigo-200 font-semibold col-span-full md:col-span-1">
          Nombre del Cliente
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={onChange}
            placeholder="Nombre del Cliente"
            required
            className="mt-2 px-4 py-2 rounded-lg bg-gray-900 border border-indigo-700/40 focus:ring-2 focus:ring-indigo-400 text-white placeholder:text-gray-400 shadow-inner transition"
          />
        </label>

        <label className="flex flex-col text-indigo-200 font-semibold col-span-full md:col-span-1">
          Email del Cliente
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="Email del Cliente"
            required
            className="mt-2 px-4 py-2 rounded-lg bg-gray-900 border border-indigo-700/40 focus:ring-2 focus:ring-indigo-400 text-white placeholder:text-gray-400 shadow-inner transition"
          />
        </label>

        <label className="flex flex-col text-indigo-200 font-semibold">
          Teléfono
          <input
            type="text"
            name="telefono"
            value={form.telefono}
            onChange={onChange}
            placeholder="Teléfono"
            required
            className="mt-2 px-4 py-2 rounded-lg bg-gray-900 border border-indigo-700/40 focus:ring-2 focus:ring-indigo-400 text-white placeholder:text-gray-400 shadow-inner transition"
          />
        </label>

        <label className="flex flex-col text-indigo-200 font-semibold">
          Edad
          <input
            type="number"
            name="edad"
            value={form.edad}
            onChange={onChange}
            placeholder="Edad"
            required
            className="mt-2 px-4 py-2 rounded-lg bg-gray-900 border border-indigo-700/40 focus:ring-2 focus:ring-indigo-400 text-white placeholder:text-gray-400 shadow-inner transition"
          />
        </label>

        <label className="flex flex-col text-indigo-200 font-semibold">
          Fecha de Inicio
          <input
            type="date"
            name="fechaDeInicio"
            value={form.fechaDeInicio}
            onChange={onChange}
            required
            className="mt-2 px-4 py-2 rounded-lg bg-gray-900 border border-indigo-700/40 focus:ring-2 focus:ring-indigo-400 text-white shadow-inner transition"
          />
        </label>

        <label className="flex flex-col text-indigo-200 font-semibold">
          Plan
          <select
            name="plan"
            value={form.plan}
            onChange={onChange}
            required
            className="mt-2 px-4 py-2 rounded-lg bg-gray-900 border border-indigo-700/40 focus:ring-2 focus:ring-indigo-400 text-white shadow-inner transition"
          >
            {planes.length === 0 ? (
              <option value="">No hay planes disponibles</option>
            ) : (
              planes.map((plan: { id: string; nombre: string; precio: number }) => (
                <option key={plan.id} value={plan.nombre}>
                  {plan.nombre} -{" "}
                  {plan.precio.toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                  })}
                </option>
              ))
            )}
          </select>
        </label>

        <div className="flex gap-4 md:col-span-2 pt-4">
          <button
            type="submit"
            className="flex-1 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg shadow-lg transition-all duration-200"
          >
            Agregar
          </button>
          <button
            type="button"
            onClick={handleToggleAgregar}
            className="flex-1 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-lg shadow-lg transition-all duration-200"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </>
  );
}
