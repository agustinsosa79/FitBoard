import { useState, useEffect } from "react";
import { PlanesContext } from "./PlanesContext";
import type { Plan, NuevoPlan } from "../../types/cliente";
import type { ReactNode } from "react";
import { useAuth } from "./authContext";
import {
  agregarPlanDB,
  eliminarPlanDB,
  obtenerPlanesPorUsuario,
} from "../services/PlanService";

export const PlanesProvider = ({ children }: { children: ReactNode }) => {
  const [planes, setPlanes] = useState<Plan[]>([]);
  const auth = useAuth();
  const userId = auth?.user?.uid;

  useEffect(() => {
    if (!userId) return;
    obtenerPlanesPorUsuario(userId).then(setPlanes);
  }, [userId]);

  const agregarPlan = async (plan: NuevoPlan) => {
    if (!userId) throw new Error("No hay usuario autenticado");
    await agregarPlanDB({ ...plan, userId });
    const planesUsuario = await obtenerPlanesPorUsuario(userId);
    setPlanes(planesUsuario);
  };

  const eliminarPlan = async (id: string) => {
    if (!userId) throw new Error("No hay usuario autenticado");
    await eliminarPlanDB(id);
    const planesUsuario = await obtenerPlanesPorUsuario(userId);
    setPlanes(planesUsuario);
  };

  const value = {
    planes,
    agregarPlan,
    eliminarPlan,
    userId,
  };

  return (
    <PlanesContext.Provider value={value}>
      {children}
    </PlanesContext.Provider>
  );
};