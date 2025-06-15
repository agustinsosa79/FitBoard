import { useState } from "react";
import { PlanesContext } from "../context/PlanesContext";
import type { PlanContextType } from "../data/planes";
import { type Plan } from "../Types/cliente";
import type { ReactNode } from "react";
import { PLANES } from "../data/planes";

export const PlanesProvider = ({ children }: { children: ReactNode }) => {
  const [planes, setPlanes] = useState<Plan[]>([...PLANES]);

  const agregarPlan = (plan: Plan) => {
    setPlanes((prevPlanes) => [...prevPlanes, plan]);
  };

    const actualizarPlan = (id: string, updatedPlan: Plan) => {
  setPlanes(prevPlanes =>
    prevPlanes.map(plan => (plan.id === id ? updatedPlan : plan))
  );
};


  const value: PlanContextType = {
    planes,
    agregarPlan,
    actualizarPlan,
  };

  return <PlanesContext.Provider value={value}>{children}</PlanesContext.Provider>;
};
