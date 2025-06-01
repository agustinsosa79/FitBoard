import React, { useEffect, useState } from "react";
import { ClientForm } from "../components/ClientForm";
import { Clientes, Form} from "../Types/cliente";
import { ListaClientes } from "../components/ListaClientes";
import { ClienteModal } from "../components/ClienteModal";
import { useLocalStorageClientes } from "../hooks/useLocalStorageClientes";




const normalizar = (texto: string) =>
    texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

export default function Clientes() {
    const [clientes, setClientes] = useLocalStorageClientes("clientes",[
        { id: 1, nombre: "Juan Pérez", email: "juan.perez@email.com" },
        { id: 2, nombre: "María López", email: "maria.lopez@email.com" },
        { id: 3, nombre: "Carlos Sánchez", email: "carlos.sanchez@email.com" }
    ]);

    const [ form, setForm] = useState<Form>({
        nombre: '',
        email: ''
    });

    const [edit, setEdit] = useState<Clientes | null>(null)

    const [selectClient, setSelectClient] = useState<Clientes | null>(null)

    
    
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
                id: Date.now(),
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

    const verDetalles = (cliente: Clientes) =>{
        setSelectClient(cliente)
    }

    const [filtro, setFiltro] = useState("")
    const [filtroDebounceado, setFiltroDebounceado] = useState("");


    useEffect(() => {
    const timeout = setTimeout(() => {
    setFiltroDebounceado(filtro);
    }, 500); 

  return () => clearTimeout(timeout); // limpia el timeout anterior
}, [filtro]);

const clientesFiltrados = clientes.filter((c) => 
    normalizar(c.nombre).includes(normalizar(filtroDebounceado)) ||
    normalizar(c.email).includes(normalizar(filtroDebounceado))
    )
    
    return (
        <div className="min-h-screen bg-gray-700 py-10 px-4 flex flex-col items-center">
            <div className="max-w-2xl w-full">
                <h1 className="text-3xl text-amber-50 font-bold mb-2 text-center">Clientes</h1>
                <h2 className="text-center text-white ">Clientes agregados: {clientes.length}</h2>
                <p className="mb-8 text-center text-gray-400">Aquí puedes gestionar los clientes de tu gimnasio.</p>
                <ClientForm
                form = {form}
                onChange={handleChange}
                onSubmit={addClient}
                onCancel={() => {
                    setEdit(null)
                    setForm({nombre: '', email: ''})
                }}
                edit={edit}
                />

                <input
                    type="text"
                    placeholder="Buscar cliente..."
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                    className="w-full px-4 py-2 mb-6 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />

                <ListaClientes
                    cliente={clientesFiltrados}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    onView={verDetalles}
                />

                {selectClient && (
                    <ClienteModal
                    cliente={selectClient}
                    onCancel={() => setSelectClient(null)}
                    />
                )}
            </div>
        </div>
    );
    }