import React, { useContext } from "react";
import type { ClienteFormProps } from "../../src/types/ClienteFormProps";
import { PlanesContext } from "../../src/context/PlanesContext";

export function ClientForm({
  form,
  onChange,
  error,
  onSubmit,
  agregar,
  setAgregar,
  resetForm,
}: ClienteFormProps) {
  const planesContext = useContext(PlanesContext);

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

  return (
    <>
    <div className="w-full max-w-md bg-gray-950 rounded-2xl shadow-xl border border-gray-800 p-7 lg:p-10 mt-12 h-auto transition-all duration-300">
      <div className="flex items-center gap-4 mb-6 w-full border-b border-gray-700 pb-5">
        <div className="flex items-center justify-center lg:w-12 lg:h-12 rounded-full bg-gray-900 border border-gray-800 shadow-inner">
          <svg className="w-8 h-8 text-green-500 lg:w-7 lg:h-7" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <h2 className="lg:text-2xl text-2xl font-extrabold tracking-wide text-white drop-shadow-sm">Gestión de Clientes</h2>
        <button
          onClick={handleToggleAgregar}
          type="button"
          className={`ml-auto lg:px-6 px-3 py-2.5 rounded-lg font-semibold shadow-md border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/60
            ${agregar
              ? "bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700 hover:text-white"
              : "bg-green-600 text-white border-green-700 hover:bg-green-700"
            }`}
        >
          {agregar ? "Cancelar" : "Agregar"}
        </button>
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <span className="text-gray-400 text-sm">Administra tus clientes fácilmente desde aquí.</span>
        <span className="text-gray-500 text-xs">Haz clic en "Agregar" para crear un nuevo cliente.</span>
      </div>
    </div>

{agregar && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6 overflow-y-auto">
    <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-3xl mx-auto">
      <h3 className="text-white text-2xl font-bold mb-6">Agregar Cliente</h3>

      {error && (
        <div className="bg-white/10 border border-white text-white px-4 py-2 rounded-lg text-center font-semibold shadow mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <label className="flex flex-col text-white font-semibold">
          Nombre del Cliente
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={onChange}
            placeholder="Nombre Completo"
            required
            className="mt-2 px-4 py-2 rounded-lg bg-gray-950 border border-gray-800 focus:none placeholder:text-gray-400"
          />
        </label>

        <label className="flex flex-col text-white font-semibold">
          Email del Cliente
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="Email"
            required
            className="mt-2 px-4 py-2 rounded-lg bg-gray-950 border border-gray-800 focus:none placeholder:text-gray-400 "
          />
        </label>

        <label className="flex flex-col text-white font-semibold">
          Teléfono
          <input
            type="text"
            name="telefono"
            value={form.telefono}
            onChange={onChange}
            placeholder="Teléfono"
            required
            className="mt-2 px-4 py-2 rounded-lg bg-gray-950 border border-gray-800 focus:none placeholder:text-gray-400 "
          />
        </label>

        <label className="flex flex-col text-white font-semibold">
          Edad
          <input
            type="text"
            name="edad"
            value={form.edad}
            onChange={e => {
              let value = e.target.value.replace(/\D/g, "");
              if (value.length > 1) {
                value = value.replace(/^0+/, "");
              }
              onChange({
                ...e,
                target: {
                  ...e.target,
                  name: "edad",
                  value: value,
                },
              });
            }}
            placeholder="Edad"
            required
            inputMode="numeric"
            pattern="[1-9][0-9]*"
            min={1}
            className="mt-2 px-4 py-2 rounded-lg bg-gray-950 border border-gray-800 focus:none placeholder:text-gray-400 "
            autoComplete="off"
            style={{
              MozAppearance: "textfield",
              appearance: "textfield",
            }}
            onWheel={e => (e.target as HTMLInputElement).blur()}
          />
        </label>

        <label className="flex flex-col text-white font-semibold">
          Fecha de Inicio
          <input
            type="date"
            name="fechaDeInicio"
            value={form.fechaDeInicio}
            onChange={onChange}
            required
            className="mt-2 px-4 py-2 rounded-lg bg-gray-950 border border-gray-800 focus:none text-white shadow-inner transition"
          />
        </label>

        <label className="flex flex-col text-white font-semibold">
          Plan
          <select
            name="plan"
            value={form.plan || (planes.length > 0 ? planes[0].nombre : "")}
            onChange={onChange}
            className="mt-2 px-4 py-2 rounded-lg bg-gray-950 border border-gray-800 focus:none"
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
            className="flex-1 py-3 rounded-lg bg-green-600 border border-gray-800 focus:none text-white hover:bg-green-700 font-bold text-lg shadow-lg transition-all duration-200"
          >
            Agregar
          </button>
            <button
            type="button"
            onClick={handleToggleAgregar}
            className="flex-1 py-3 rounded-lg bg-gray-800 text-white hover:bg-gray-700 border border-none font-bold text-lg shadow-lg transition-all duration-200"
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
