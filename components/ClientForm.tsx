import { ClienteFormProps  } from "../Types/ClienteFormProps";

export function ClientForm({form, onChange, onSubmit, onCancel, edit }: ClienteFormProps) {
    return(
<form onSubmit={onSubmit} className="bg-gray-600 rounded-xl shadow-md p-6 space-y-4 mb-10">
      <div className="flex flex-col md:flex-row gap-4">
        <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={onChange}
            placeholder="Nombre"
            required
            className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-gray-400 text-white"
        />
        <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="Email"
            required
          className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-gray-400 text-white"
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          type="submit"
          disabled={!form.email || !form.nombre}
          className={`px-6 py-2 rounded text-white font-semibold transition-colors ${
            !form.email || !form.nombre ? "bg-amber-400 cursor-not-allowed" : "bg-amber-500 hover:bg-amber-600"
          }`}
        >
          {edit ? "Editar cliente" : "Agregar cliente"}
        </button>
        {edit && (
          <button
            type="button"
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition-colors font-semibold"
            onClick={onCancel}
          >
            Cancelar edición
          </button>
        )}
      </div>
    </form>
                )
}