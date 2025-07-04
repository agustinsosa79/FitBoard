import { type Clientes } from "../../types/cliente";
import { parse } from "date-fns";
import type { Plan } from "../../types/cliente";

interface MesResumen {
  mes: string;
  clientes: number;
  nuevos: number;
  renovados: number;
  perdidos: number;
  ingreso: number;
  crecimiento: number | null;
  churn: number | null;
  retencion: number | null;
  clientesIds?: string[]; // Para guardar snapshot mensual (opcional)
}

function clienteActivoEnMes(cliente: Clientes, año: number, mes: number): boolean {
  const fmt = "dd/MM/yy";
  const inicio = parse(cliente.fechaDeInicio, fmt, new Date());
  const venc = parse(cliente.fechaVencimiento ?? "", fmt, new Date());
  const primerDiaMes = new Date(año, mes, 1);
  const ultimoDiaMes = new Date(año, mes + 1, 0);
  return inicio <= ultimoDiaMes && venc >= primerDiaMes;
}

export function getMetricasMensuales(
  clientes: Clientes[],
  planes: Plan[],
  año: number,
  soloActivos: boolean
): MesResumen[] {
  const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  const hoy = new Date();
  const añoActual = hoy.getFullYear();
  const mesActual = hoy.getMonth();

  const activosPorMes: Set<string>[] = [];
  const nuevosPorMes: Set<string>[] = [];
  const renovadosPorMes: Set<string>[] = [];
  const perdidosPorMes: Set<string>[] = [];

  for (let i = 0; i < 12; i++) {
    if (año > añoActual || (año === añoActual && i > mesActual)) {
      activosPorMes.push(new Set());
      nuevosPorMes.push(new Set());
      continue;
    }

    const activos = clientes
      .filter(c => (!soloActivos || c.activo) && clienteActivoEnMes(c, año, i))
      .map(c => c.id!);
    activosPorMes.push(new Set(activos));

    const nuevos = clientes
      .filter(c => {
        const dt = parse(c.fechaDeInicio, "dd/MM/yy", new Date());
        return (!soloActivos || c.activo) && dt.getFullYear() === año && dt.getMonth() === i;
      })
      .map(c => c.id!);
    nuevosPorMes.push(new Set(nuevos));
  }

  for (let i = 0; i < 12; i++) {
    if (i === 0) {
      renovadosPorMes.push(new Set());
      perdidosPorMes.push(new Set());
    } else {
      if (año > añoActual || (año === añoActual && i > mesActual)) {
        renovadosPorMes.push(new Set());
        perdidosPorMes.push(new Set());
      } else {
        const prev = activosPorMes[i - 1];
        const cur = activosPorMes[i];
        renovadosPorMes.push(new Set([...prev].filter(id => cur.has(id))));
        perdidosPorMes.push(new Set([...prev].filter(id => !cur.has(id))));
      }
    }
  }

  const data: MesResumen[] = [];

  for (let i = 0; i < 12; i++) {
    const esFuturo = año > añoActual || (año === añoActual && i > mesActual);
    const mesName = meses[i];

    const activos = activosPorMes[i].size;
    const nuevos = nuevosPorMes[i].size;
    const renovados = renovadosPorMes[i].size;
    const perdidos = perdidosPorMes[i].size;

    let ingreso = 0;
    if (!esFuturo) {
      ingreso = clientes.reduce((sum, cliente) => {
        if (!cliente.ultimaFechaPago) return sum;
        const pagoDate = parse(cliente.ultimaFechaPago, "dd/MM/yy", new Date());
        if (pagoDate.getFullYear() === año && pagoDate.getMonth() === i) {
          const plan = planes.find(p => p.nombre === cliente.plan);
          return sum + (plan?.precio || 0);
        }
        return sum;
      }, 0);
    }

    let churn: number | null = null;
    let retencion: number | null = null;
    if (!esFuturo && i > 0 && activosPorMes[i - 1].size > 0) {
      const base = activosPorMes[i - 1].size;
      churn = parseFloat(((perdidosPorMes[i].size / base) * 100).toFixed(1));
      retencion = parseFloat(((renovadosPorMes[i].size / base) * 100).toFixed(1));
    }

    data.push({
      mes: mesName,
      clientes: activos,
      nuevos,
      renovados,
      perdidos,
      ingreso,
      crecimiento: null,
      churn,
      retencion,
      clientesIds: [...activosPorMes[i]],
    });
  }

  for (let i = 1; i <= mesActual; i++) {
    const prev = data[i - 1];
    const cur = data[i];
    if (prev.ingreso === 0) {
      cur.crecimiento = null;
    } else {
      cur.crecimiento = ((cur.ingreso - prev.ingreso) / prev.ingreso) * 100;
    }
  }

  return data;
}

export function calcularMRR(
  clientes: Clientes[],
  planes: Plan[],
  año: number,
  mes: number
): number {
  return clientes
    .filter(c => clienteActivoEnMes(c, año, mes))
    .reduce((sum, c) => {
      const plan = planes.find(p => p.nombre === c.plan);
      return sum + (plan?.precio || 0);
    }, 0);
}
