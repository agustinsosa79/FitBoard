import { useContext, useState } from 'react';
import { PlanesContext } from '../context/PlanesContext';

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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 px-4 py-10">
            <div className="max-w-xl w-full">
                <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight drop-shadow-md text-center">
                    Ajustes del Plan
                </h1>

                <div className="bg-gray-800 rounded-xl shadow-md p-6">
                    <h2 className="text-2xl font-bold text-white mb-2">Formulario de ajustes para tus planes</h2>
                    <p className="text-indigo-200 mb-6">
                        En esta sección podrás ajustar el precio de tus planes
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Nombre del Plan</label>
                            <input
                                required
                                type="text"
                                name="nombre"
                                value={nuevoPlan.nombre}
                                onChange={handleChange}
                                className="w-full bg-gray-700 text-white border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                                placeholder="Nombre del Plan"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Precio del Plan</label>
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
                                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-md px-8 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 appearance-none"
                                    placeholder="Precio del Plan"
                                    autoComplete="off"
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold py-2 px-4 rounded-lg shadow-md transition"
                            >
                                Agregar Plan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {planes && planes.length > 0 && (
                <div className="mt-10 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 rounded-2xl p-10 shadow-lg border border-gray-700">
                    <h3 className="text-2xl font-extrabold text-amber-400 mb-8 flex items-center gap-2">
                        <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h2a4 4 0 014 4v2M7 7a4 4 0 118 0 4 4 0 01-8 0z" />
                        </svg>
                        Planes creados
                    </h3>
                    <ul className="space-y-6">
                        {planes.map((plan) => (
                            <li
                                key={plan.id}
                                className="flex justify-between items-center bg-gray-700/80 hover:bg-gray-600/80 transition p-6 rounded-xl shadow-md border border-gray-600"
                            >
                                <div>
                                    <p className="font-bold text-lg text-white tracking-wide">{plan.nombre}</p>
                                    <p className="text-sm text-amber-300 font-mono mt-1">
                                        ${plan.precio.toLocaleString('es-AR')}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleEliminar(plan.id)}
                                    className="flex items-center ml-10 gap-1 bg-red-600 hover:bg-red-500 text-white font-semibold px-4 py-2 rounded-lg shadow transition"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
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
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6 overflow-y-auto">
                    <div className="bg-gray-800 rounded-lg p-6 max-w-sm w-full">
                        <h3 className="text-lg font-semibold text-white mb-4">Confirmar eliminación</h3>
                        <p className="text-sm text-gray-300 mb-6">¿Estás seguro de que deseas eliminar este plan?</p>
                        <div className="flex justify-end">
                            <button
                                onClick={() => {
                                    if (eliminarPlanId) {
                                        eliminarPlan(eliminarPlanId);
                                    }
                                    setMostrarModal(false);
                                }}
                                className="bg-red-600 hover:bg-red-500 text-white font-semibold px-4 py-2 rounded-lg shadow transition"
                            >
                                Eliminar
                            </button>
                            <button
                                onClick={() => setMostrarModal(false)}
                                className="ml-2 bg-gray-600 hover:bg-gray-500 text-white font-semibold px-4 py-2 rounded-lg shadow transition"
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
