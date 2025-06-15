import { useState, useEffect } from "react";
import { PlanesContext } from "../context/PlanesContext";
import type { PlanContextType } from "../data/planes";
import { type Plan } from "../Types/cliente";
import type { ReactNode } from "react";
import { PLANES } from "../data/planes";

export const PlanesProvider = ({ children }: { children: ReactNode }) => {
  const [planes, setPlanes] = useState<Plan[]>(() => {
    const planesGuardados = localStorage.getItem("planes");
    return planesGuardados ? JSON.parse(planesGuardados) : [...PLANES];
  });

  const agregarPlan = (plan: Plan) => {
    setPlanes((prevPlanes) => [...prevPlanes, plan]);
  };

  const actualizarPlan = (id: string, updatedPlan: Plan) => {
    setPlanes((prevPlanes) =>
      prevPlanes.map((plan) => (plan.id === id ? updatedPlan : plan))
    );
  };

  useEffect(() => {
    localStorage.setItem("planes", JSON.stringify(planes));
  }, [planes]);

  const eliminarPlan = (id: string) => {
    setPlanes((prevPlanes) => prevPlanes.filter((plan) => plan.id !== id));
  };

  const value: PlanContextType = {
    planes,
    agregarPlan,
    actualizarPlan,
    eliminarPlan
  };

  return <PlanesContext.Provider value={value}>{children}</PlanesContext.Provider>;
};
