import { createContext } from "react";
import type { PlanContextType } from "../data/planes"; // Verificá que este path sea correcto

export const PlanesContext = createContext<PlanContextType | undefined>(undefined);
