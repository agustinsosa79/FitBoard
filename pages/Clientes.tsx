import React, { useState } from "react";

type Clientes = {
    id: number,
    nombre : string,
    email: string
}

type Form = {
    nombre: string,
    email: string
}

export default function Clientes() {
    const [clientes, setClientes] = useState<Clientes[]>([
        { id: 1, nombre: "Juan Pérez", email: "juan.perez@email.com" },
        { id: 2, nombre: "María López", email: "maria.lopez@email.com" },
        { id: 3, nombre: "Carlos Sánchez", email: "carlos.sanchez@email.com" }
    ]);

    const [ form, setForm] = useState<Form>({
        nombre: '',
        email: ''
    });

    const [edit, setEdit] = useState<Clientes | null>(null)

    
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.value
        setForm(prevForm => ({...prevForm, [name]: value}) )
    }
    
    
    
    const addClient = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (edit) {
            const clientesActualizados = clientes.map(c => c.id === edit.id ? {...c, nombre: form.nombre, email: form.email}: c)
            setClientes(clientesActualizados)
            setEdit(null)
        } else {
            const nuevoCliente = {
                id: clientes.length +1,
                nombre: form.nombre,
                email: form.email
            };
            setClientes(clientes => [...clientes, nuevoCliente] )
        }
        setForm({nombre: '', email: ''})
    }

    const handleDelete = (id:number) => {
        setClientes(clientes => clientes.filter(cliente => cliente.id !== id))
    }

    const handleEdit = (cliente: Clientes) => {
        setEdit(cliente)
            setForm({
                nombre: cliente.nombre,
                email: cliente.email
            });
    }
    
    
    return (
        <div className="min-h-screen bg-gray-700 py-10 px-4 flex flex-col items-center">
            <div className="max-w-2xl w-full">
                <h1 className="text-3xl text-amber-50 font-bold mb-2 text-center">Clientes</h1>
                <h2 className="text-center text-white ">Clientes agregados: {clientes.length}</h2>
                <p className="mb-8 text-center text-gray-400">Aquí puedes gestionar los clientes de tu gimnasio.</p>
                <form
                onSubmit={addClient}
                className="bg-gray-600 rounded-xl shadow-md p-6 space-y-4 mb-10"
                >
                <div className="flex flex-col md:flex-row gap-4">
                    <input
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder="Nombre"
                    required
                    className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-gray-400 text-white"
                    />
                    <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-gray-400 text-white"
                    />
                </div>

                {/* Botones abajo */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                    type="submit"
                    disabled={!form.email || !form.nombre}
                    className={`px-6 py-2 rounded text-white font-semibold transition-colors
                        ${!form.email || !form.nombre
                        ? 'bg-amber-400 cursor-not-allowed'
                        : 'bg-amber-500 hover:bg-amber-600'}`}
                    >
                    {edit ? 'Editar cliente' : 'Agregar cliente'}
                    </button>

                    {edit && (
                    <button
                        type="button"
                        className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition-colors font-semibold"
                        onClick={() => {
                        setEdit(null)
                        setForm({ nombre: '', email: '' })
                        }}
                    >
                        Cancelar edición
                    </button>
                    )}
                </div>
                </form>

                <ul className="grid gap-6">
                    {clientes.map((cliente) => (
                        <li
                            className="p-6 bg-amber-100 rounded-lg shadow flex flex-col md:flex-row md:items-center justify-between"
                            key={cliente.id}
                        >
                            <div>
                                <h4 className="text-lg font-semibold">{cliente.nombre}</h4>
                                <p className="text-gray-700">{cliente.email}</p>
                            </div>
                            <button onClick={() => handleEdit(cliente)}>
                                Editar
                            </button>
                            <button
                                className="mt-4 md:mt-0 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                                onClick={() => handleDelete(cliente.id)}
                            >
                                Eliminar Cliente
                            </button>
                        </li>
                    ))}
                </ul>
                {clientes.length === 0 && (
                    <p className="text-center text-gray-400">No hay ningun cliente cargado</p>
                )}
            </div>
        </div>
    );
    }