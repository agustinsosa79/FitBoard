import { ClienteFormProps  } from "../Types/ClienteFormProps";

export function ClientForm({form, onChange, onSubmit, error, agregar, setAgregar, resetForm }: ClienteFormProps) {
  const handleAgregar = () => {
    if (agregar) {
      resetForm?.();
      setAgregar(false);
      return;
    }
    setAgregar(!agregar);
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e);
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
      {(agregar || error) && (
  <div className="space-y-4">
    {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
    <input
      type="text"
      name="nombre"
      value={form.nombre}
      onChange={onChange}
      placeholder="Nombre del Cliente"
      required
      className="text-white w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-gray-400"
    />
    <input
      type="email"
      name="email"
      value={form.email}
      onChange={onChange}
      placeholder="Email del Cliente"
      required
      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-gray-400 text-white"
    />
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