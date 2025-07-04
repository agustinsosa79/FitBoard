export type Pago = {
  id: string
  fecha: string
  monto: number
}

export type Clientes = {
  id: string
  nombre: string
  edad: number
  plan: string
  email: string
  telefono: string
  fechaDeInicio: string
  activo: boolean
  ultimaFechaPago: string
  fechaVencimiento?: string
  pagos?: Pago[]
  userId: string 
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

export type NuevoPlan = Omit<Plan, "id"> & { userId: string }
