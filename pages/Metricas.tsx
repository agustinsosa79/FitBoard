import { useState, useContext, useEffect } from "react";
import { useAuth } from "../src/context/authContext";
import { PlanesContext } from "../src/context/PlanesContext";
import { TablaResumenMensual } from "../components/Metricas/TablaResumenMensual";
import { calcularMRR, getMetricasMensuales } from "../src/utils/getMetricasMensuales"; // función que calcula métricas
import { type Clientes } from "../Types/cliente";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../src/firebase/config";

export default function Metricas() {
  const [clientes, setClientes] = useState<Clientes[]>([]);
    // Contextos
  const planesContext = useContext(PlanesContext);
  const auth = useAuth();

  const planes = planesContext?.planes || [];
  const user = auth?.user;

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "clientes"), where("userId", "==", user.uid));
    const unsub = onSnapshot(q, (snap) => {
      const datos = snap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Clientes[];
      setClientes(datos);
    });

    return () => unsub();
  }, [user]);

  const soloActivos = true; // o false, según prefieras
const año = new Date().getFullYear();

  const metricas = getMetricasMensuales(clientes, planes, año, soloActivos);

  // Definir el mes actual (1-based: enero = 1, diciembre = 12)
  const mesActual = new Date().getMonth();

  const dataTabla = metricas; // Ya incluye todos los campos

  const mrr = calcularMRR(clientes, planes, año, mesActual);
  return (
    <main className="min-h-screen bg-[#181c23] text-white flex flex-col items-center py-12 px-2">
      <section className="w-full max-w-4xl bg-[#23262e] rounded-3xl shadow-2xl border border-[#23262e]/80 p-0 md:p-10 flex flex-col gap-10">
      {/* Header */}
      <header className="flex flex-col items-center gap-2 border-b border-[#2d313a] pb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#e5e7eb]">Métricas Mensuales</h1>
        <p className="text-[#a1a1aa] text-lg font-medium">Visualiza y exporta el resumen mensual de tus clientes</p>
      </header>

      {/* MRR Card */}
      <div className="flex justify-center">
        <div className="bg-gradient-to-r from-amber-500/80 to-yellow-400/80 p-1 rounded-2xl shadow-lg w-full max-w-md">
        <div className="bg-[#23262e] rounded-xl p-6 flex flex-col items-center">
          <h2 className="text-white text-xl font-bold">Ingresos Mensuales (MRR)</h2>
          <p className="text-5xl text-amber-400 mt-2 font-extrabold drop-shadow">${mrr.toLocaleString("es-AR")}</p>
          <p className="text-sm text-gray-400 text-center mt-2">
  Ingresos estimados este mes si se mantienen tus clientes actuales activos.
</p>
        </div>
        </div>
      </div>


      {/* Tabla de Resumen */}
      <div className="rounded-2xl overflow-x-auto shadow-lg border border-[#23262e] bg-[#181c23] p-6">
        <TablaResumenMensual data={dataTabla} />
      </div>
      </section>
    </main>
  );
}
