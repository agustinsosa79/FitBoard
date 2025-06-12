export type Clientes = {
id: number
nombre: string
edad: number
plan: string
email: string
telefono: string
fechaDeInicio: string
activo: boolean
ultimaFechaPago: string
}

export type Form = {
nombre: string
edad: number | string
email: string
plan: string
telefono: string
fechaDeInicio: string
activo: boolean
ultimaFechaPago: string
}

export type Plan = {
    id: string
    nombre: string
    precio: number
    duracion: string
}