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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-6 overflow-y-auto">
  <div className="relative bg-black border border-white text-white rounded-2xl shadow-2xl w-full max-w-md p-8 animate-fade-in">
    <button
      onClick={() => {
        if (modoEdicion) {
          setModoEdicion(false);
          setErrorModal(null);
        } else {
          handleCancelar();
        }
      }}
      className="absolute top-4 right-4 text-white hover:text-black bg-white hover:bg-black border border-white transition-colors text-xl w-8 h-8 rounded-full flex items-center justify-center"
      aria-label="Cerrar"
    >
      &times;
    </button>

    <h2 className="text-2xl font-bold mb-6 text-center">
      {modoEdicion ? "Editar Cliente" : "Detalles del Cliente"}
    </h2>

    {modoEdicion ? (
      <div className="mb-4">
        {error && <p className="text-red-400 text-sm mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            required
            className="w-full px-4 py-2 bg-black border border-white rounded focus:outline-none focus:ring-2 focus:ring-white placeholder:text-gray-400 text-white"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full px-4 py-2 bg-black border border-white rounded focus:outline-none focus:ring-2 focus:ring-white placeholder:text-gray-400 text-white"
          />
          <input
            type="number"
            name="edad"
            value={form.edad}
            onChange={handleChange}
            placeholder="Edad"
            className="w-full px-4 py-2 bg-black border border-white rounded focus:outline-none focus:ring-2 focus:ring-white placeholder:text-gray-400 text-white"
          />

          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              className="flex-1 px-6 py-2 bg-white text-black rounded border border-white hover:bg-black hover:text-white transition font-semibold"
            >
              Guardar Cambios
            </button>
            <button
              type="button"
              onClick={() => {
                setModoEdicion(false);
                setErrorModal(null);
              }}
              className="flex-1 px-6 py-2 border border-white text-white hover:bg-white hover:text-black transition rounded font-semibold"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    ) : (
      <div className="space-y-4 text-white">
        <p><span className="font-medium">Plan:</span> {cliente.plan}</p>
        <p><span className="font-medium">Nombre Completo:</span> {cliente.nombre}</p>
        <p><span className="font-medium">Edad:</span> {cliente.edad || "N/A"}</p>
        <p><span className="font-medium">Email:</span> {cliente.email}</p>
        <p><span className="font-medium">Teléfono:</span> {cliente.telefono}</p>
        <p><span className="font-medium">Fecha de Inicio:</span> {cliente.fechaDeInicio}</p>
        <p>
          <span className="font-medium">Última Fecha de Pago:</span> {cliente.ultimaFechaPago || "N/A"}
          <button
            onClick={() => {
              onCancel();
              onActualizarPago(cliente);
            }}
            className="ml-2 px-3 py-1 rounded bg-white text-black hover:bg-black hover:text-white border border-white text-sm font-semibold transition"
          >
            Actualizar Pago
          </button>
        </p>
        <p><span className="font-medium">Activo:</span> {cliente.activo ? "Sí" : "No"}</p>
        <button
          onClick={() => setModoEdicion(true)}
          className="mt-6 w-full px-4 py-2 rounded bg-white text-black font-semibold hover:bg-black hover:text-white border border-white transition"
        >
          Editar
        </button>
      </div>
    )}
  </div>
</div>

    );
};
