import type { Clientes } from "../../Types/cliente";
import { useState } from "react";

interface Props {
    cliente: Clientes;
    clientes: Clientes[];
    onCancel: () => void;
    onEdit: (cliente: Clientes) => void;
    error?: string | null;
    setErrorModal: (error: string | null) => void;
    onActualizarPago: (cliente: Clientes) => void;
}

export const ClienteModal: React.FC<Props> = ({
    cliente,
    clientes,
    onCancel,
    onEdit,
    error,
    setErrorModal,
    onActualizarPago,
}) => {
    const [modoEdicion, setModoEdicion] = useState(false);

    const [form, setForm] = useState({
        nombre: cliente.nombre,
        email: cliente.email,
        edad: cliente.edad || 0,
        telefono: cliente.telefono || "",
        ultimaFechaPago: cliente.ultimaFechaPago || "",
    });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailYaExiste = clientes.some(
        (c: Clientes) => c.email === form.email && c.id !== cliente.id
    );

    if (emailYaExiste) {
        setForm((prevForm) => ({ ...prevForm, email: "" }));
        setErrorModal("Ese email ya está en uso por otro cliente.");
        setTimeout(() => {
            setErrorModal(null);
        }, 3000);
        return;
    }

    setErrorModal(null);
    onEdit({ ...cliente, ...form, id: cliente.id || "" });
    setModoEdicion(false);
};

    const handleCancelar = () => {
        setErrorModal(null);
        onCancel();
    };
    

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black/80 via-gray-900/90 to-gray-800/90 backdrop-blur-md px-4 py-8 overflow-y-auto">
          <div className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 border border-gray-700 shadow-2xl rounded-3xl w-full max-w-lg p-8 animate-fade-in flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
            <button
              onClick={handleCancelar}
              className="absolute top-4 right-4 z-50 text-white w-12 h-12 flex items-center justify-center text-4xl leading-none bg-transparent hover:bg-transparent focus:outline-none"
              aria-label="Cerrar"
              type="button"
              style={{ border: "none", boxShadow: "none", padding: 0, margin: 0 }}
            >
              &times;
            </button>

            <h2 className="text-2xl font-extrabold mb-1 text-center bg-clip-text text-white  drop-shadow-lg tracking-wide">
              {modoEdicion ? "Editar Cliente" : "Detalles del Cliente"}
            </h2>

            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-green-500 via-blue-500 to-purple-500 flex items-center justify-center shadow-xl mb-1">
              <span className="text-3xl font-bold text-white drop-shadow-lg">
          {cliente.nombre?.charAt(0).toUpperCase() || "?"}
              </span>
            </div>

            {modoEdicion ? (
              <div>
          {error && (
            <p className="text-red-400 text-sm mb-2 text-center bg-red-900/40 rounded p-2 shadow">
              {error}
            </p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Nombre"
              required
              className="w-full px-4 py-2 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 placeholder:text-gray-400 text-white shadow-inner transition"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full px-4 py-2 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400 text-white shadow-inner transition"
            />
            <input
              type="number"
              name="edad"
              value={form.edad}
              onChange={handleChange}
              placeholder="Edad"
              className="w-full px-4 py-2 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder:text-gray-400 text-white shadow-inner transition [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none appearance-none"
            />

            <div className="flex gap-3 mt-4">
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 font-bold shadow-lg text-white"
              >
                Guardar Cambios
              </button>
              <button
                type="button"
                onClick={() => {
            setModoEdicion(false);
            setErrorModal(null);
                }}
                className="flex-1 px-4 py-2 bg-gray-800/80 hover:bg-gray-900/90 transition rounded-lg font-bold text-gray-200 shadow"
              >
                Cancelar
              </button>
            </div>
          </form>
              </div>
            ) : (
              <div className="space-y-3 text-white text-base">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold text-gray-400">Plan</span>
              <span className="font-bold text-green-400">{cliente.plan}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold text-gray-400">Nombre Completo</span>
              <span className="font-bold">{cliente.nombre}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold text-gray-400">Edad</span>
              <span>{cliente.edad || "N/A"}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold text-gray-400">Email</span>
              <span className="truncate">{cliente.email}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold text-gray-400">Teléfono</span>
              <span>{cliente.telefono}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold text-gray-400">Fecha de Inicio</span>
              <span>{cliente.fechaDeInicio}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold text-gray-400">Fecha de Vencimiento</span>
              <span>{cliente.fechaVencimiento || "N/A"}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-400">Última Fecha de Pago:</span>
            <span>{cliente.ultimaFechaPago || "N/A"}</span>
            <button
              onClick={() => {
                onCancel();
                onActualizarPago(cliente);
              }}
              className="ml-2 px-3 py-1 rounded bg-gradient-to-r bg-green-500 hover:bg-green-600 text-xs font-bold shadow transition"
            >
              Actualizar Pago
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-400">Activo:</span>
            <span
              className={`font-bold ${
                cliente.activo ? "text-green-400" : "text-red-400"
              }`}
            >
              {cliente.activo ? "Sí" : "No"}
            </span>
          </div>
          <button
            onClick={() => setModoEdicion(true)}
            className="mt-4 w-full px-4 py-2 rounded-lg bg-gradient-to-r bg-gray-800 text-white font-bold hover:bg-gray-950 border-none shadow-lg transition text-base"
          >
            Editar
          </button>
              </div>
            )}
          </div>
        </div>

    );
};
