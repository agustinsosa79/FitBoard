import React, { useState } from "react";
import type { Clientes } from "../../Types/cliente";

interface Props {
    cliente: Clientes;
    onDelete: (id: string) => void;  
    onView: (cliente: Clientes) => void;
}

export const ClienteItem: React.FC<Props> = ({ cliente, onDelete, onView }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [clienteEliminar , setClienteEliminar] = useState<Clientes | null>(null);

    const esInactivo = !cliente.activo;

    const handleDelete = () => {
        setClienteEliminar(cliente);
        setModalOpen(true);
    };

    return (
        <>
            <li
  className={`cliente-item flex items-center justify-between p-4 rounded-2xl shadow-md mb-3 
    ${esInactivo ? "bg-gray-100 border border-black" : "bg-white"}`}
>
  <div className="flex flex-col">
    <span className={`text-lg font-semibold ${esInactivo ? "text-black" : "text-black"}`}>
      {cliente.nombre}
    </span>
    <span className="text-sm text-black bg-gray-200 px-2 py-0.5 rounded mt-1 w-fit">
      {cliente.fechaDeInicio}
    </span>
  </div>

  <div className="flex gap-2">
    <button
      onClick={handleDelete}
      className="px-4 py-1.5 bg-red-600 text-white rounded-xl hover:bg-white hover:text-black border  transition-colors text-sm font-medium"
    >
      Eliminar
    </button>
    <button
      onClick={() => onView(cliente)}
      className="px-4 py-1.5 bg-black text-white rounded-xl hover:bg-white hover:text-black border border-black transition-colors text-sm font-medium"
    >
      Ver detalles
    </button>
  </div>
</li>

{modalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6 overflow-y-auto">
    <div className="bg-white rounded-lg p-6 max-w-sm w-full">
      <h3 className="text-lg font-semibold text-black mb-4">Confirmar eliminación</h3>
      <p className="text-sm text-gray-700 mb-6">¿Estás seguro de que deseas eliminar a {cliente.nombre}?</p>
      <div className="flex justify-end">
        <button
          onClick={() => {
            if (clienteEliminar) {
              onDelete(clienteEliminar.id);
            }
            setModalOpen(false);
          }}
          className="bg-red-600 hover:bg-white text-white hover:text-black font-semibold px-4 py-2 rounded-lg border border-black shadow transition"
        >
          Eliminar
        </button>
        <button
          onClick={() => setModalOpen(false)}
          className="ml-2 bg-white hover:bg-black text-black hover:text-white font-semibold px-4 py-2 rounded-lg border border-black shadow transition"
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
)}

            
        </>
    );
};
