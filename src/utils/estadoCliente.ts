import type { Clientes, Plan } from "../../types/cliente";

export function estaActivoPorPlan(cliente: Clientes, planes: Plan[]): boolean {
  const planDelCliente = planes.find(p => p.nombre === cliente.plan);
  if (!planDelCliente) return false;

  const duracionMeses = parseInt(planDelCliente.duracion);
  if (isNaN(duracionMeses)) return false;

  const fechaInicio = new Date(cliente.fechaDeInicio);
  const fechaVencimiento = new Date(fechaInicio);
  fechaVencimiento.setMonth(fechaVencimiento.getMonth() + duracionMeses);

  const hoy = new Date();
  return hoy < fechaVencimiento;
}
