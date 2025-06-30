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
              className={`cliente-item flex items-center justify-between p-5 rounded-3xl shadow-xl mb-5 border-2 transition-all duration-300
                ${esInactivo ? "bg-gradient-to-r from-red-900 via-red-800 to-red-700 border-red-700" : "bg-gradient-to-r from-gray-950 via-gray-900 to-gray-800 border-gray-800"}
                hover:scale-[1.025] hover:shadow-2xl`}
            >
              <div className="flex flex-col">
                <span
                  className={`text-xl font-bold tracking-wide drop-shadow-sm ${
                    esInactivo ? "text-white" : "text-white"
                  }`}
                >
                  {cliente.nombre}
                </span>
                <span className="text-xs font-medium text-gray-200 bg-gray-900/80 px-3 py-1 rounded-lg mt-2 w-fit shadow">
                  {cliente.fechaDeInicio}
                </span>
                {!cliente.activo && (
                  <span className="mt-2 text-xs font-semibold text-red-200 bg-red-800/80 px-2 py-0.5 rounded shadow">
                    Inactivo
                  </span>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleDelete}
                  className="px-5 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl shadow hover:from-red-700 hover:to-red-800 hover:shadow-lg transition-all text-sm font-semibold border border-red-800"
                >
                  <span className="inline-flex items-center gap-1">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Eliminar
                  </span>
                </button>
                <button
                  onClick={() => onView(cliente)}
                  className="px-5 py-2 bg-gradient-to-r from-gray-900 to-black text-white rounded-xl shadow hover:from-black hover:to-gray-900 hover:shadow-lg border border-gray-800 transition-all text-sm font-semibold"
                >
                  <span className="inline-flex items-center gap-1">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Ver detalles
                  </span>
                </button>
              </div>
            </li>

{modalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6 overflow-y-auto">
    <div className="bg-gray-800 rounded-lg p-6 max-w-sm w-full">
      <h3 className="text-lg font-semibold text-white mb-4">Confirmar eliminación</h3>
      <p className="text-sm text-gray-300 mb-6">¿Estás seguro de que deseas eliminar a {cliente.nombre}?</p>
      <div className="flex justify-end">
        <button
          onClick={() => {
            if (clienteEliminar) {
              onDelete(clienteEliminar.id);
            }
            setModalOpen(false);
          }}
          className="bg-red-600 hover:bg-red-700 text-white hover:text-gray-200 font-semibold px-4 py-2 rounded-lg border-none shadow transition"
        >
          Eliminar
        </button>
        <button
          onClick={() => setModalOpen(false)}
          className="ml-2  bg-black text-white hover:bg-neutral-900  border-none font-semibold px-4 py-2 rounded-lg border border-black shadow transition"
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
