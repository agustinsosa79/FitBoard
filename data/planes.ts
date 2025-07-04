import { type NuevoPlan, type Plan } from "../src/types/cliente";

export type PlanContextType = {
    planes: Plan[];
    agregarPlan: (plan: NuevoPlan) => Promise<void>;
    eliminarPlan: (id: string) => Promise<void>;
    userId?: string | undefined;
};

export const PLANES: Plan[] = [];

