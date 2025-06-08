  import React from "react";
  import type { ClienteFormProps } from "../../Types/ClienteFormProps";
  import { PLANES } from "../../data/planes";

  export function ClientForm({
    form,
    onChange,
    onSubmit,
    error,
    agregar,
    setAgregar,
    resetForm,
  }: ClienteFormProps) {

    const handleAgregar = () => {
      if (agregar) {

        resetForm?.();
        setAgregar(false);
        return;
      }
      setAgregar(true);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit(e)
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e);
    };

    return (
      <form
        onSubmit={handleSubmit}
        className="bg-gray-600 rounded-xl shadow-md p-6 space-y-4 mb-10"
      >
        <button
          onClick={handleAgregar}
          type="button"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-semibold"
        >
          {agregar ? "Cancelar" : "Agregar Cliente"}
        </button>

        {(agregar || error) && (
          <div className="space-y-4">
            {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

            <label className="block text-white">
              Nombre del Cliente
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={onChange}
                placeholder="Nombre del Cliente"
                required
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-gray-400 text-white"
              />
            </label>

            <label className="block text-white">
              Email del Cliente
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                placeholder="Email del Cliente"
                required
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-gray-400 text-white"
              />
            </label>

            <label className="block text-white">
              Teléfono
              <input
                type="text"
                name="telefono"
                value={form.telefono}
                onChange={onChange}
                placeholder="Teléfono"
                required
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-gray-400 text-white"
              />
            </label>

            <label className="block text-white">
              Edad
              <input
                type="number"
                name="edad"
                value={form.edad}
                onChange={onChange}
                placeholder="Edad"
                required
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-gray-400 text-white"
              />
            </label>

            <label className="block text-white">
              Fecha de Inicio
              <input
                type="date"
                name="fechaDeInicio"
                value={form.fechaDeInicio}
                onChange={onChange}
                required
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400 text-white bg-gray-800"
              />
            </label>

            <label className="block text-white">
              Plan
              <select
                name="plan"
                value={form.plan}
                onChange={onChange}
                required
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400 text-white bg-gray-800"
              >
                <option value="">Selecciona un plan</option>
                {PLANES.map((plan) => (
                  <option key={plan.nombre} value={plan.nombre}>
                    {plan.nombre}
                    {" - "}
                    {plan.precio.toLocaleString("es-AR", { style: "currency", currency: "ARS" })}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex items-center space-x-2 text-white">
              <input
                type="checkbox"
                name="activo"
                checked={form.activo}
                onChange={handleCheckboxChange}
                className="w-5 h-5"
              />
              <span>Activo</span>
            </label>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition-colors font-semibold"
            >
              Agregar Cliente
            </button>
          </div>
        )}
      </form>
    );
  }
