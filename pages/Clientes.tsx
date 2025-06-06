import React, { useEffect, useState } from "react";
import { ClientForm } from "../components/Clientes/ClientForm";
import type { Clientes, Form } from "../Types/cliente";
import { ListaClientes } from "../components/Clientes/ListaClientes";
import { ClienteModal } from "../components/Clientes/ClienteModal";
import { useLocalStorageClientes } from "../hooks/useLocalStorageClientes";
import { PLANES } from "../data/planes";
import { parse, differenceInDays } from "date-fns";
import { ModalPago } from "../components/Clientes/ModalPago";

const normalizar = (texto: string | undefined | null) => {
    if (!texto) return "";
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
};

export default function Clientes() {
    const [clientes, setClientes] = useLocalStorageClientes("clientes", [
        { id: 1, nombre: "Juan Pérez", edad: 16, email: "juan.perez@email.com", telefono: "2216859302", fechaDeInicio: "10/04/25", activo: true, ultimaFechaPago: "10/04/25", plan: PLANES[0].nombre },
        { id: 2, nombre: "María López", edad: 20, email: "maria.lopez@email.com", telefono: "2216859302", fechaDeInicio: "10/04/25", activo: true, ultimaFechaPago: "10/04/25", plan: PLANES[0].nombre },
        { id: 3, nombre: "Carlos Sánchez", edad: 34, email: "carlos.sanchez@email.com", telefono: "2216859302", fechaDeInicio: "10/04/25", activo: true, ultimaFechaPago: "10/04/25", plan: PLANES[0].nombre },
    ]);
    const [form, setForm] = useState<Form>({
        nombre: '',
        email: '',
        edad: 0,
        telefono: '',
        fechaDeInicio: '',
        activo: false,
        ultimaFechaPago: '',
        plan: PLANES[0].nombre
    });
    const [selectClient, setSelectClient] = useState<Clientes | null>(null);
    const [mostrarModalPago, setMostrarModalPago] = useState(false);
    const [errorPrincipal, setErrorPrincipal] = useState<string | null>(null);
    const [errorModal, setErrorModal] = useState<string | null>(null);
    const [agregar, setAgregar] = useState(false);

    const abrirModalPago = (cliente: Clientes) => {
        setSelectClient(cliente);
        setMostrarModalPago(true);
    };

    const actualizarFechaPago = (nuevaFecha: string) => {
        if (!selectClient) return;

        const clienteActualizado = {
            ...selectClient,
            ultimaFechaPago: nuevaFecha,
        };

        handleEdit(clienteActualizado); 
        setSelectClient(clienteActualizado);
        setMostrarModalPago(false);
    };

    useEffect(() => {
        if (selectClient?.ultimaFechaPago) {
            const fechaUltimoPago = parse(selectClient.ultimaFechaPago, 'dd/MM/yy', new Date());
            const fechaActual = new Date();
            const diasDesdeUltimoPago = differenceInDays(fechaActual, fechaUltimoPago);
            if (diasDesdeUltimoPago > 30) {
                setErrorModal("El cliente no ha pagado su cuota en más de 30 días.");
            } else {
                setErrorModal(null);
            }
        } else {
            setErrorModal(null);
        }
    }, [selectClient]);

    const resetForm = () => {
        setForm({ nombre: '', email: '', edad: 0, telefono: '', fechaDeInicio: '', activo: false, ultimaFechaPago: '', plan: PLANES[0].nombre });
        setErrorPrincipal(null);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setForm(prevForm => ({ ...prevForm, [name]: value }));
    };

    const addClient = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const emailExistente = clientes.some(cliente => cliente.email === form.email);
        if (emailExistente) {
            setForm(prevForm => ({ ...prevForm, email: '' }));
            setErrorPrincipal("El email ya está en uso. Por favor, utiliza otro.");
            setTimeout(() => {
                setErrorPrincipal(null);
            }, 3000);
            return;
        }

        const nuevoCliente = {
            id: Date.now(),
            nombre: form.nombre,
            email: form.email,
            edad: Number(form.edad),
            telefono: form.telefono,
            fechaDeInicio: form.fechaDeInicio,
            activo: form.activo,
            ultimaFechaPago: form.fechaDeInicio,
            plan: form.plan
        };
        setErrorPrincipal(null);
        setClientes(clientes => [...clientes, nuevoCliente]);
        setForm({ nombre: '', email: '', edad: 0, telefono: '', fechaDeInicio: '', activo: false, ultimaFechaPago: '', plan: PLANES[0].nombre });
        setAgregar(false);
    };

    const handleDelete = (id: number) => {
        setClientes(clientes => clientes.filter(cliente => cliente.id !== id));
    };

    const handleEdit = (clienteActualizado: Clientes) => {
        setClientes(clientes => clientes.map(c => c.id === clienteActualizado.id ? clienteActualizado : c));
    };

    const verDetalles = (cliente: Clientes) => {
        setSelectClient(cliente);
    };

    const [filtro, setFiltro] = useState("");
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
    );

    return (
        <div className="min-h-screen bg-gray-700 py-10 px-4 flex flex-col items-center">
            <div className="max-w-2xl w-full">
                <h1 className="text-3xl text-amber-50 font-bold mb-2 text-center">Clientes</h1>
                <h2 className="text-center text-white ">Clientes agregados: {clientes.length}</h2>
                <p className="mb-8 text-center text-gray-400">Aquí puedes gestionar los clientes de tu gimnasio.</p>
                <ClientForm
                    form={form}
                    onChange={handleChange}
                    onSubmit={addClient}
                    error={errorPrincipal}
                    agregar={agregar}
                    setAgregar={setAgregar}
                    resetForm={resetForm}
                />

                <input
                    type="text"
                    placeholder="Buscar cliente..."
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                    className="w-full px-4 py-2 mb-6 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-gray-400 text-white"
                />

                <ListaClientes
                    cliente={clientesFiltrados}
                    onDelete={handleDelete}
                    onView={verDetalles}
                />

                {selectClient && (
                    <ClienteModal
                        onActualizarPago={abrirModalPago}
                        cliente={selectClient}
                        clientes={clientes}
                        onCancel={() => setSelectClient(null)}
                        onEdit={handleEdit}
                        error={errorModal}
                        setErrorModal={setErrorModal}
                    />
                )}

                {mostrarModalPago && selectClient && (
                    <ModalPago
                        cliente={selectClient}
                        onCancel={() => {
                            setMostrarModalPago(false);
                        }}
                        onSave={actualizarFechaPago}
                    />
                )}
            </div>
        </div>
    );
}
