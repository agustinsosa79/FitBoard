import DashboardCards from "../components/Inicio/DashboardCards";
import { useEffect, useState } from "react";
import { useAuth } from "../src/context/authContext";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../src/firebase/config";
import type { Clientes } from "../src/types/cliente";

export default function Inicio() {
  const [clientes, setClientes] = useState<Clientes[]>([]);
  const auth = useAuth();
  const user = auth?.user;

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "clientes"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const datos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Clientes[];
      setClientes(datos);
    });
    return () => unsubscribe();
  }, [user]);

  if (!user) {
    return <div className="text-white text-center mt-10 text-lg px-4">Cargando usuario...</div>;
  }

  return (
    // Elimina la etiqueta <main> aquí y usa un div para los estilos de padding/max-width
    <div className="
      w-full
      px-0      /* Agrega padding por defecto, puedes ajustarlo */
      py-0
      m-0  
      sm:px-6      /* padding en tablet, ajusta según necesites */
      lg:px-0    /* padding en desktop, ajusta según necesites */
      sm:py-0
      lg:py-0
      max-h-screen
      max-w-screen
    ">
      <DashboardCards clientes={clientes} />
    </div>
  );
}