  import React, { useEffect, useState } from "react";
  import { ClientForm } from "../components/Clientes/ClientForm";
  import type { Clientes, Form } from "../src/types/cliente";
  import { ListaClientes } from "../components/Clientes/ListaClientes";
  import { ClienteModal } from "../components/Clientes/ClienteModal";
  import { PLANES } from "../data/planes";
  import { parse, format, parseISO } from "date-fns";
  import { ModalPago } from "../components/Clientes/ModalPago";
  import { useContext } from "react";
  import { PlanesContext } from "../src/context/PlanesContext";
  import { guardarCliente } from "../src/services/ClienteService";
  import { useAuth } from "../src/context/authContext";
  import { collection, query, where, onSnapshot } from "firebase/firestore";
  import { db } from "../src/firebase/config";
  import { doc, deleteDoc, updateDoc } from "firebase/firestore";
  import {arrayUnion} from "firebase/firestore";


  const normalizar = (texto: string | undefined | null) => {
      if (!texto) return "";
      return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  };


  
  export default function Clientes() {
    const FormInicial: Form = {
      nombre: '',
          email: '',
          edad: 0,
          telefono: '',
          fechaDeInicio: '',
          activo: true,
          ultimaFechaPago: '',
          plan: PLANES.length > 0 ? PLANES[0].nombre : ''
    }
    const [clientes, setClientes] = useState<Clientes[]>([]);
      const [form, setForm] = useState<Form>(FormInicial);
      const [selectClient, setSelectClient] = useState<Clientes | null>(null);
      const [mostrarModalPago, setMostrarModalPago] = useState(false);
      const [errorPrincipal, setErrorPrincipal] = useState<string | null>(null);
      const [errorModal, setErrorModal] = useState<string | null>(null);
      const [agregar, setAgregar] = useState(false);

      const planesContext = useContext(PlanesContext);
      const planes = planesContext?.planes || PLANES;

      const auth = useAuth(); // obtenés el usuario logueado
      const user = auth?.user;
      
      
  useEffect(() => {
    if (!user) {
      return;
    }

    const q = query(collection(db, "clientes"), where("userId", "==", user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const datos = snapshot.docs.map((doc) => ({
        id: doc.id, 
        ...doc.data(),
      })) as Clientes[];
      console.log("Datos de clientes obtenidos:", datos);
      setClientes(datos);
    });

    return () => unsubscribe();
  }, [user]);

      useEffect(() => {
      if (!form.plan && planes.length > 0) {
          setForm(prev => ({ ...prev, plan: planes[0].nombre }));
      }
  }, [planes]) //eslint-disable-line react-hooks/exhaustive-deps

      const abrirModalPago = (cliente: Clientes) => {
          setSelectClient(cliente);
          setMostrarModalPago(true);
      };

  const actualizarFechaPago = async (data: { nuevaFecha: string; }) => {
  if (!selectClient) return;

  // Fecha nueva de pago que ingresa el usuario (ej: 03/07/25)
  const fechaPago = parseISO(data.nuevaFecha);

  const planDelCliente = planes.find(p => p.nombre === selectClient.plan);
  const duracionMeses = planDelCliente ? parseInt(planDelCliente.duracion) : 1;

  // Fecha base para vencimiento: última fecha de pago o fecha de inicio
  const fechaBase = selectClient.ultimaFechaPago 
    ? parse(selectClient.ultimaFechaPago, "dd/MM/yy", new Date()) 
    : parse(selectClient.fechaDeInicio, "dd/MM/yy", new Date());

  // Calculamos nueva fecha de vencimiento sumando duración
  const nuevaFechaVencimiento = new Date(fechaBase);
  nuevaFechaVencimiento.setMonth(nuevaFechaVencimiento.getMonth() + duracionMeses);

  // Calculamos si está activo
  const hoy = new Date();
  const estaActivo = hoy <= nuevaFechaVencimiento;

  const clienteActualizado = {
    ...selectClient,
    ultimaFechaPago: format(fechaPago, "dd/MM/yy"),
    fechaVencimiento: format(nuevaFechaVencimiento, "dd/MM/yy"),
    activo: estaActivo,
  };

  await handleEdit(clienteActualizado);
  setSelectClient(clienteActualizado);

  const ref = doc(db, "clientes", selectClient.id);
  await updateDoc(ref, {
    pagos: arrayUnion({
      fecha: format(fechaPago, "dd/MM/yy"),
      monto: planDelCliente?.precio || 0,
    }),
    activo: estaActivo,
    fechaVencimiento: format(nuevaFechaVencimiento, "dd/MM/yy"),
  });

  setMostrarModalPago(false);
};



    useEffect(() => {
    const hoy = new Date();

    clientes.forEach(async (cliente) => {
      if (!cliente.ultimaFechaPago) return;

      const vencimiento = parse(cliente.fechaVencimiento!, 'dd/MM/yy', new Date());
const estaActivo = hoy <= vencimiento;

      if (cliente.activo !== estaActivo) {
        try {
          const ref = doc(db, "clientes", cliente.id);
          await updateDoc(ref, { activo: estaActivo });
        } catch (error) {
          console.error("Error actualizando estado activo:", error);
        }
      }
    });
  }, [clientes]);

      const resetForm = () => {
      setForm(FormInicial);
      setErrorPrincipal(null);
  };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

      const addClient = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  // Forzar fecha de inicio a hoy (dd/MM/yy)
  const hoy = new Date();
  const fechaHoyStr = format(hoy, "dd/MM/yy");

  // Validaciones básicas
  if (!form.nombre.trim() || form.nombre.trim().length > 20) {
    setErrorPrincipal("El nombre es obligatorio y debe tener máximo 20 caracteres.");
    return;
  }

  if (!form.telefono.trim() || form.telefono.trim().length > 20) {
    setErrorPrincipal("El teléfono es obligatorio y debe tener máximo 20 caracteres.");
    return;
  }

  if (!Number.isInteger(Number(form.edad)) || Number(form.edad) < 1 || Number(form.edad) > 120) {
    setErrorPrincipal("La edad debe ser un número válido entre 1 y 120.");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.email.trim())) {
    setErrorPrincipal("El email no es válido.");
    return;
  }

  // Email duplicado
  const emailYaExiste = clientes.some(
    (c) => c.email.trim().toLowerCase() === form.email.trim().toLowerCase()
  );
  if (emailYaExiste) {
    setForm(prev => ({ ...prev, email: '' })); 
    setErrorPrincipal("Ese email ya está en uso por otro cliente.");
    setTimeout(() => {
      setErrorPrincipal(null);
    }, 3000);
    return;
  }

  if (!user) {
    setErrorPrincipal("No estás autenticado.");
    return;
  }

  // Plan y fechas
  const planSeleccionado = planes.find(p => p.nombre === form.plan);
  const duracionMeses = planSeleccionado ? parseInt(planSeleccionado.duracion) : 1;
  const fechaInicio = hoy; // Forzado a hoy

  const fechaVencimiento = new Date(fechaInicio);
  fechaVencimiento.setMonth(fechaInicio.getMonth() + duracionMeses);

  try {
    const nuevoCliente = {
      nombre: form.nombre.trim(),
      email: form.email.trim(),
      edad: Number(form.edad),
      telefono: form.telefono.trim(),
      fechaDeInicio: fechaHoyStr,
      fechaVencimiento: fechaVencimiento ? format(fechaVencimiento, "dd/MM/yy") : "",
      activo: true,
      ultimaFechaPago: fechaHoyStr,
      plan: form.plan?.trim() || (planes.length > 0 ? planes[0].nombre : ""),
      userId: user.uid,
    };

    await guardarCliente(nuevoCliente);

    resetForm();
    setAgregar(false);
    setErrorPrincipal(null);
  } catch (err) {
    console.error(err);
    setErrorPrincipal("Error al guardar el cliente.");
  }
};


      const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "clientes", id));
    } catch (error) {
      console.error("Error al eliminar cliente:", error);
    }
  };

      const handleEdit = async (clienteActualizado: Clientes) => {
    try {
      const ref = doc(db, "clientes", clienteActualizado.id);
      const { id, ...resto } = clienteActualizado; // eslint-disable-line @typescript-eslint/no-unused-vars
      await updateDoc(ref, resto);
      setSelectClient(clienteActualizado);
    } catch (error) {
      console.error("Error al actualizar cliente:", error);
    }
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

      if (!user) {
        return <div className="text-white text-center mt-10">Cargando usuario...</div>;
      }
      return (
          <div className="min-h-screen bg-gray-900 py-10 px-4 flex flex-col items-center pt-15">
  <div className="max-w-2xl w-full">
    <div className="mb-8 flex flex-col items-start max-w-2xl">
      <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight drop-shadow-md">
        Clientes
      </h1>
      <p className="text-lg text-white font-semibold pl-4 border-l-4 border-white bg-gray-950 rounded-r-lg py-2 px-10 shadow-md max-w-full">
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
      className="w-full mt-10 px-4 py-2 mb-6 rounded-md bg-gray-950 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:none"
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
