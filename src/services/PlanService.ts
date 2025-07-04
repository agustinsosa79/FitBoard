import { collection, query, where, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";
import type { Plan, NuevoPlan } from "../types/cliente";

export const obtenerPlanesPorUsuario = async (userId: string): Promise<Plan[]> => {
  const q = query(collection(db, "planes"), where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(docSnap => ({
    id: docSnap.id, // <-- ESTE es el id real de Firestore
    ...docSnap.data(),
  })) as Plan[];
};

export const agregarPlanDB = async (plan: NuevoPlan) => {
  return await addDoc(collection(db, "planes"), plan);
};

export const eliminarPlanDB = async (id: string) => {
  await deleteDoc(doc(db, "planes", id));
};