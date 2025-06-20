import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/config";

interface Cliente {
  nombre: string;
  email: string;
  edad: number;
  telefono: string;
  fechaDeInicio: string;
  activo: boolean;
  ultimaFechaPago: string;
  plan: string;
  userId: string;
}

export const guardarCliente = async (cliente: Cliente) => {
  const docRef = await addDoc(collection(db, "clientes"), cliente);
  return docRef.id;
};
