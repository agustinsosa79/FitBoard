import React, { useEffect, useState } from "react";
import { ClientForm } from "../components/Clientes/ClientForm";
import type { Clientes, Form } from "../Types/cliente";
import { ListaClientes } from "../components/Clientes/ListaClientes";
import { ClienteModal } from "../components/Clientes/ClienteModal";
import { useLocalStorageClientes } from "../hooks/useLocalStorageClientes";
import { PLANES } from "../data/planes";
import { parse, differenceInDays, format } from "date-fns";
import { ModalPago } from "../components/Clientes/ModalPago";
import { useContext } from "react";
import { PlanesContext } from "../context/PlanesContext";

const normalizar = (texto: string | undefined | null) => {
    if (!texto) return "";
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
};

export default function Clientes() {
    const [clientes, setClientes] = useLocalStorageClientes("clientes", []);
    const [form, setForm] = useState<Form>({
        nombre: '',
        email: '',
        edad: 0,
        telefono: '',
        fechaDeInicio: '',
        activo: true,
        ultimaFechaPago: '',
        plan: PLANES.length > 0 ? PLANES[0].nombre : ''
    });
    const [selectClient, setSelectClient] = useState<Clientes | null>(null);
    const [mostrarModalPago, setMostrarModalPago] = useState(false);
    const [errorPrincipal, setErrorPrincipal] = useState<string | null>(null);
    const [errorModal, setErrorModal] = useState<string | null>(null);
    const [agregar, setAgregar] = useState(false);

    const planesContext = useContext(PlanesContext);
    const planes = planesContext?.planes || PLANES;

    useEffect(() => {
    if (!form.plan && planes.length > 0) {
        setForm(prev => ({ ...prev, plan: planes[0].nombre }));
    }
}, [planes])

    const abrirModalPago = (cliente: Clientes) => {
        setSelectClient(cliente);
        setMostrarModalPago(true);
    };

    const actualizarFechaPago = (data: { nuevaFecha: string; activo: boolean }) => {
        if (!selectClient) return;

        const clienteActualizado = {
            ...selectClient,
            ultimaFechaPago: data.nuevaFecha,
            activo: data.activo,
        };

        handleEdit(clienteActualizado); 
        setSelectClient(clienteActualizado);
        setMostrarModalPago(false);
    };

    useEffect(() => {
  const hoy = new Date();

  const clientesActualizados = clientes.map(cliente => {
    if (!cliente.ultimaFechaPago) return { ...cliente, activo: true };

    const fechaPago = parse(cliente.ultimaFechaPago, 'dd/MM/yy', new Date());
    const diasSinPago = differenceInDays(hoy, fechaPago);

    const estaActivo = diasSinPago <= 30; 

    if (cliente.activo !== estaActivo) {
      return { ...cliente, activo: estaActivo };
    }

    return cliente;
  });

  const clientesDistintos = clientesActualizados.some((c, i) => c.activo !== clientes[i].activo);
  if (clientesDistintos) {
    setClientes(clientesActualizados);
  }
}, [clientes, setClientes]);

    const resetForm = () => {
    setForm({
        nombre: '',
        email: '',
        edad: 0,
        telefono: '',
        fechaDeInicio: '',
        activo: true,
        ultimaFechaPago: '',
        plan: PLANES.length > 0 ? PLANES[0].nombre : ''
    });
    setErrorPrincipal(null);
};

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setForm(prevForm => ({ ...prevForm, [name]: value }));
    };

    console.log('form.plan al agregar:', form.plan)

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
            activo: true,
            ultimaFechaPago:  form.fechaDeInicio
                ? format(new Date(form.fechaDeInicio), 'dd/MM/yy')
                : format(new Date(), 'dd/MM/yy'),
            plan: form.plan.trim() || (PLANES.length > 0 ? PLANES[0].nombre : ''),
        };
        
        setErrorPrincipal(null);
        setClientes(clientes => [...clientes, nuevoCliente]);
        setForm({ nombre: '', email: '', edad: 0, telefono: '', fechaDeInicio: '', activo: true, ultimaFechaPago: '', plan: PLANES.length > 0 ? PLANES[0].nombre : '' });
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
        <div className="min-h-screen bg-gray-900 py-10 px-4 flex flex-col items-center">
  <div className="max-w-2xl w-full">
    <div className="mb-8 flex flex-col items-start max-w-2xl">
  <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight drop-shadow-md">
    Clientes
  </h1>
  <p className="text-lg text-indigo-200 font-semibold pl-4 border-l-4 border-indigo-500 bg-gray-900/80 rounded-r-lg py-2 px-4 shadow-md max-w-full">
    Aquí podés gestionar los clientes de tu gimnasio.
  </p>
</div>


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
      className="w-full mt-10 px-4 py-2 mb-6 rounded-md bg-gray-800 border border-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
    />

    <ListaClientes
      cliente={clientesFiltrados}
      onDelete={handleDelete}
      onView={verDetalles}
    />

    {selectClient && (
      <>
        {console.log("Cliente seleccionado en modal:", selectClient)}
      <ClienteModal
        onActualizarPago={abrirModalPago}
        cliente={selectClient}
        clientes={clientes}
        onCancel={() => setSelectClient(null)}
        onEdit={handleEdit}
        error={errorModal}
        setErrorModal={setErrorModal}
        />
        </>
    )}

    {mostrarModalPago && selectClient && (
      <ModalPago
        cliente={selectClient}
        onCancel={() => setMostrarModalPago(false)}
        onSave={actualizarFechaPago}
      />
    )}
  </div>
</div>

    );
}
