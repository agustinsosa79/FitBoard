import { useContext, useState } from 'react';
import { PlanesContext } from '../src/context/PlanesContext';

export default function PlanAjustes() {
    const [mostrarModal, setMostrarModal] = useState(false);
    const [eliminarPlanId, setEliminarPlanId] = useState<string | null>(null);
const planesContext = useContext(PlanesContext);
const [nuevoPlan, setNuevoPlan] = useState<{ nombre: string; precio: number; duracion: string }>({
    nombre: '',
    precio: 0,
    duracion: ''
});
const userId = planesContext?.userId; // Asegúrate de que el userId esté disponible en el contexto

if (!planesContext || !userId) {
    return <div className="text-white text-center mt-10">Cargando usuario...</div>;
}

const { agregarPlan, eliminarPlan, planes } = planesContext;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNuevoPlan((prev) => ({
            ...prev,
            [name]: name === 'precio' ? parseFloat(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  await agregarPlan({
  ...nuevoPlan,
    userId,
});
setNuevoPlan({ nombre: '', precio: 0, duracion: '' });
};
    const handleEliminar = (id: string) => {
        setEliminarPlanId(id);
        setMostrarModal(true);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 px-4 py-10">
            <div className="max-w-lg w-full">
            <h1 className="text-4xl font-extrabold text-amber-400 mb-6 tracking-tight text-center drop-shadow">
                Ajustes del Plan
            </h1>
            <div className="bg-gray-900 rounded-2xl shadow-lg p-8 border border-gray-800">
                <h2 className="text-xl font-bold text-white mb-1">Gestiona tus planes</h2>
                <p className="text-gray-400 mb-6 text-sm">
                Ajusta el precio, nombre y duración de tus planes fácilmente.
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Nombre del Plan
                    </label>
                    <input
                    required
                    type="text"
                    name="nombre"
                    value={nuevoPlan.nombre}
                    onChange={handleChange}
                    className="w-full bg-gray-950 text-white border border-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
                    placeholder="Nombre del Plan"
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Precio del Plan
                    </label>
                    <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                    <input
                        required
                        type="text"
                        inputMode="numeric"
                        name="precio"
                        value={nuevoPlan.precio === 0 ? '' : nuevoPlan.precio.toLocaleString('es-AR')}
                        onChange={(e) => {
                        const raw = e.target.value.replace(/\./g, '').replace(/[^0-9]/g, '');
                        const parsed = parseInt(raw, 10);
                        setNuevoPlan((prev) => ({
                            ...prev,
                            precio: isNaN(parsed) ? 0 : parsed
                        }));
                        }}
                        className="w-full bg-gray-950 text-white border border-gray-800 rounded-lg px-8 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 transition appearance-none"
                        placeholder="Precio del Plan"
                        autoComplete="off"
                    />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Duración (meses)
                    </label>
                    <input
                    required
                    type="number"
                    min={1}
                    name="duracion"
                    value={nuevoPlan.duracion}
                    onChange={handleChange}
                    className="w-full bg-gray-950 text-white border border-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 transition [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    style={{ MozAppearance: 'textfield' }}
                    />
                </div>
                <div className="pt-2">
                    <button
                    type="submit"
                    className="w-full bg-amber-400 hover:bg-amber-300 text-gray-950 font-bold py-2 px-4 rounded-lg shadow transition"
                    >
                    Agregar Plan
                    </button>
                </div>
                </form>
            </div>
            </div>
            {planes && planes.length > 0 && (
            <div className="mt-12 w-full max-w-lg">
                <h3 className="text-lg font-bold text-amber-400 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h2a4 4 0 014 4v2M7 7a4 4 0 118 0 4 4 0 01-8 0z" />
                </svg>
                Planes creados
                </h3>
                <ul className="space-y-4">
                {planes.map((plan) => (
                    <li
                    key={plan.id}
                    className="flex justify-between items-center bg-gray-900 hover:bg-gray-800 transition p-5 rounded-xl shadow border border-gray-800"
                    >
                    <div>
                        <p className="font-bold text-base text-white tracking-wide">{plan.nombre}</p>
                        <p className="text-sm text-amber-300 font-mono mt-1">
                        ${plan.precio.toLocaleString('es-AR')}
                        </p>
                        <span className="text-xs text-gray-400">Duración: {plan.duracion} meses</span>
                    </div>
                    <button
                        onClick={() => handleEliminar(plan.id)}
                        className="flex items-center gap-1 bg-red-500 hover:bg-red-400 text-white font-semibold px-4 py-2 rounded-lg shadow transition"
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
            {mostrarModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6">
                <div className="bg-gray-900 rounded-xl p-7 max-w-xs w-full border border-gray-800 shadow-lg">
                <h3 className="text-lg font-semibold text-white mb-3">¿Eliminar plan?</h3>
                <p className="text-sm text-gray-300 mb-6">¿Estás seguro de que deseas eliminar este plan?</p>
                <div className="flex justify-end gap-2">
                    <button
                    onClick={() => {
                        if (eliminarPlanId) {
                        eliminarPlan(eliminarPlanId);
                        }
                        setMostrarModal(false);
                    }}
                    className="bg-red-500 hover:bg-red-400 text-white font-semibold px-4 py-2 rounded-lg shadow transition"
                    >
                    Eliminar
                    </button>
                    <button
                    onClick={() => setMostrarModal(false)}
                    className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded-lg shadow transition"
                    >
                    Cancelar
                    </button>
                </div>
                </div>
            </div>
            )}
        </div>
    );
}
