import { useState, useContext, useEffect } from "react";
import { useAuth } from "../src/context/authContext";
import { PlanesContext } from "../src/context/PlanesContext";
import { FiltrosMetricas } from "../components/Metricas/FiltrosMetricas";
import { TablaResumenMensual } from "../components/Metricas/TablaResumenMensual";
import { getMetricasMensuales } from "../src/utils/getMetricasMensuales"; // función que calcula métricas
import { type Clientes } from "../Types/cliente";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../src/firebase/config";
import { exportarClientesMensuales } from '../src/utils/ExportarClientesExcel'; // función para exportar Excel


export default function Metricas() {
    const [año, setAño] = useState(new Date().getFullYear());
  const [soloActivos, setSoloActivos] = useState(false);
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

  const metricas = getMetricasMensuales(clientes, planes, año, soloActivos);

  const handleExportar = () => {
     exportarClientesMensuales(clientes, planes, año, soloActivos);
  };

  return (
    <main className="min-h-screen bg-[#181c23] text-white flex flex-col items-center py-12 px-2">
      <section className="w-full max-w-3xl bg-[#23262e] rounded-2xl shadow-2xl border border-[#23262e]/80 p-0 md:p-10 flex flex-col gap-8">
        <header className="flex flex-col items-center gap-2 border-b border-[#2d313a] pb-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-[#e5e7eb]">Métricas Mensuales</h1>
          <p className="text-[#a1a1aa] text-base font-medium">Visualiza y exporta el resumen mensual de tus clientes</p>
        </header>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <FiltrosMetricas
            año={año}
            setAño={setAño}
            soloActivos={soloActivos}
            setSoloActivos={setSoloActivos}
            onExportar={handleExportar}
          />
        </div>

        <div className="rounded-xl overflow-x-auto shadow-lg border border-[#23262e] bg-[#181c23] p-4">
          <TablaResumenMensual data={metricas} />
        </div>
      </section>
    </main>
  );
}
