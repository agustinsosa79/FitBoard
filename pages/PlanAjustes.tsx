import { useContext, useState } from 'react';
import { PlanesContext } from '../context/PlanesContext';



export default function PlanAjustes() {
    const planesContext = useContext(PlanesContext);

    const [nuevoPlan, setNuevoPlan] = useState<{ id: string; nombre: string; precio: number; duracion: string }>({
        id: crypto.randomUUID(),
        nombre: '',
        precio: 0,
        duracion: ''
    });

    if (!planesContext) return <div>Cargando planes...</div>;
    const { agregarPlan } = planesContext;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNuevoPlan((prev) => ({
            ...prev,
            [name]: name === 'precio' ? parseFloat(value) : value
        }));
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        agregarPlan(nuevoPlan);
        setNuevoPlan({ id: crypto.randomUUID(), nombre: '', precio: 0, duracion: '' });
        console.log('Nuevo plan agregado:', nuevoPlan);
        
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Ajustes del Plan</h1>
            <div>
                <h1>Formulario de ajustes para tus planes</h1>
                <p>En esta sección podrás ajustar los detalles de tus planes de entrenamiento.</p>
                <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-800">Agregar Nuevo Plan</h2>
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Nombre del Plan</label>
                    <input
                        type="text"
                        name="nombre"
                        value={nuevoPlan.nombre}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Nombre del Plan"
                    />
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Precio del Plan</label>
                    <input
                        type="number"
                        name="precio"
                        value={nuevoPlan.precio}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Precio del Plan"
                    />
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Duración del Plan</label>
                    <input
                        type="text"
                        name="duracion"
                        value={nuevoPlan.duracion}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Duración del Plan"
                    />
                </div>
                <div className="mt-4">
                    <button
                        type="submit"
                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Agregar Plan
                    </button>
                </div>
                </form>
            </div>
        </div>
    );
}