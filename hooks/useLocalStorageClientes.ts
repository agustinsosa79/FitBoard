import { useEffect, useState } from "react";
import type { Clientes } from "../Types/cliente";


export function useLocalStorageClientes(key: string, valorInicial:Clientes[]) {
    const [ clientes, setClientes] = useState<Clientes[]>(() => {
        const almacenados = localStorage.getItem(key)
        return almacenados ? JSON.parse(almacenados) : valorInicial
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(clientes))
    }, [key, clientes])

    return [clientes, setClientes] as const
}