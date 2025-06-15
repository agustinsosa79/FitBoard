import { type Plan } from "../Types/cliente";

export type PlanContextType = {
    planes: Plan[];
    agregarPlan: (plan: Plan) => void;
    actualizarPlan: (id: string, plan: Plan) => void; 
    eliminarPlan: (id: string) => void;
};

export const PLANES: Plan[] = [];

