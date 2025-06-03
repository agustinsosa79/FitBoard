import { ClienteFormProps  } from "../Types/ClienteFormProps";
import { useState } from "react";

export function ClientForm({form, onChange, onSubmit, onSuccess }: ClienteFormProps) {
  const [agregar, setAgregar] = useState(false);
  const handleAgregar = () => {
    setAgregar(!agregar);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e);
    onSuccess?.();
    setAgregar(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-600 rounded-xl shadow-md p-6 space-y-4 mb-10">
      <button
        onClick={handleAgregar}
        type="button"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-semibold"
      >
        {agregar ? "Cancelar" : "Agregar Cliente"}
      </button>
      {agregar && (
        <>
          <input
        type="text"
        name="nombre"
        value={form.nombre}
        onChange={onChange}
        placeholder="Nombre"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-gray-400 text-white"
          />
          <input
        type="email"
        name="email"
        value={form.email}
        onChange={onChange}
        placeholder="Email"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-gray-400 text-white"
          />
          <button
        type="submit"
        className="w-full px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition-colors font-semibold"
          >
        Agregar Cliente
          </button>
        </>
      )}
    </form>
  );
}