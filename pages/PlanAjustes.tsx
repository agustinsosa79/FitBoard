import { useContext, useState } from "react";
import { PlanesContext } from "../src/context/PlanesContext";

export default function PlanAjustes() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [eliminarPlanId, setEliminarPlanId] = useState<string | null>(null);
  const planesContext = useContext(PlanesContext);
  const [nuevoPlan, setNuevoPlan] = useState<{ nombre: string; precio: number; duracion: string }>({
    nombre: "",
    precio: 0,
    duracion: "",
  });

  const userId = planesContext?.userId;
  if (!planesContext || !userId) {
    return <div className="text-white text-center mt-10">Cargando usuario...</div>;
  }

  const { agregarPlan, eliminarPlan, planes } = planesContext;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNuevoPlan((prev) => ({
      ...prev,
      [name]: name === "precio" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await agregarPlan({ ...nuevoPlan, userId });
    setNuevoPlan({ nombre: "", precio: 0, duracion: "" });
  };

  const handleEliminar = (id: string) => {
    setEliminarPlanId(id);
    setMostrarModal(true);
  };

  return (
    <div className="flex flex-col lg:items-center pt-15  bg-gray-950 ">
      <div className="w-full max-w-lg">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-amber-400 mb-6 text-center tracking-tight drop-shadow">
          Ajustes del Plan
        </h1>

        {/* Formulario */}
        <div className="bg-gray-900 rounded-2xl shadow-lg lg:p-10 p-10 m-1 sm:p-8 border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-4">Gestiona tus planes</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs sm:text-sm text-gray-300 mb-1">Nombre del Plan</label>
              <input
                required
                name="nombre"
                value={nuevoPlan.nombre}
                onChange={handleChange}
                className="w-full bg-gray-950 text-white border border-gray-800 rounded-lg px-3 py-2 sm:py-3 focus:ring-2 focus:ring-amber-400"
                placeholder="Nombre del Plan"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm text-gray-300 mb-1">Precio del Plan</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                <input
                  required
                  name="precio"
                  value={nuevoPlan.precio === 0 ? "" : nuevoPlan.precio.toString()}
                  onChange={handleChange}
                  className="w-full bg-gray-950 text-white border border-gray-800 rounded-lg px-8 py-2 sm:py-3 focus:ring-2 focus:ring-amber-400"
                  placeholder="Precio"
                  inputMode="numeric"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs sm:text-sm text-gray-300 mb-1">Duración (meses)</label>
              <input
                required
                type="number"
                min={1}
                name="duracion"
                value={nuevoPlan.duracion}
                onChange={handleChange}
                className="w-full bg-gray-950 text-white border border-gray-800 rounded-lg px-3 py-2 sm:py-3 focus:ring-2 focus:ring-amber-400"
                placeholder="Duración"
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-gray-950 py-2 sm:py-3 rounded-lg font-bold transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Agregar Plan
            </button>
          </form>
        </div>

        {/* Lista de planes */}
        {planes.length > 0 && (
          <div className="mt-12 lg:w-full m-2">
            <h3 className="text-lg sm:text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h2a4 4 0 014 4v2M7 7a4 4 0 118 0 4 4 0 01-8 0z" />
              </svg>
              Planes creados
            </h3>
            <ul className="space-y-4">
              {planes.map((plan) => (
                <li
                  key={plan.id}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-900 p-5 rounded-xl shadow border border-gray-800 transition hover:bg-gray-800"
                >
                  <div className="mb-4 sm:mb-0">
                    <p className="font-bold text-base sm:text-lg text-white tracking-wide">{plan.nombre}</p>
                    <p className="text-amber-300 font-mono mt-1">${plan.precio.toLocaleString("es-AR")}</p>
                    <span className="text-gray-400 text-xs sm:text-sm">
                      Duración: {plan.duracion} {plan.duracion === "1" ? "mes" : "meses"}
                    </span>
                  </div>
                  <button
                    onClick={() => handleEliminar(plan.id)}
                    className="flex items-center gap-1 bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg shadow transition"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Modal de confirmación */}
        {mostrarModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-100 m-1">
            <div className="bg-gray-900 p-6 rounded-xl max-w-xs w-full">
              <h3 className="text-lg font-semibold text-white mb-4">Confirmar eliminación</h3>
              <p className="text-gray-300 mb-6">¿Estás seguro de que deseas eliminar este plan?</p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    if (eliminarPlanId) eliminarPlan(eliminarPlanId);
                    setMostrarModal(false);
                  }}
                  className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg shadow"
                >
                  Eliminar
                </button>
                <button
                  onClick={() => setMostrarModal(false)}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
