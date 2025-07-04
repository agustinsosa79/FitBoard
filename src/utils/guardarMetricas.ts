// src/utils/guardarMetricasDelMes.ts
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config"
import { getMetricasMensuales } from "./getMetricasMensuales"; // asegurate que esté bien la ruta
import type { Clientes, Plan } from "../types/cliente";

export async function guardarMetricasDelMes(
  clientes: Clientes[],
  planes: Plan[],
  userId: string
) {
  const now = new Date();
  const mes = now.getMonth(); // 0-11
  const año = now.getFullYear();

  const resumenes = getMetricasMensuales(clientes, planes, año, false);
  const resumenDelMes = resumenes[mes];

  const docId = `${userId}_${año}-${(mes + 1).toString().padStart(2, "0")}`; // Ej: userId_2025-07

  await setDoc(doc(db, "metricasMensuales", docId), {
    userId,
    año,
    timestamp: new Date().toISOString(),
    idsClientes: resumenDelMes.clientesIds, // ➕ agregás esto
    ...resumenDelMes,
  });
}
