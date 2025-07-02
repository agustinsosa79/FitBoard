import { type Clientes } from "../../Types/cliente";
import { type Plan } from "../../Types/cliente";
import { parse } from "date-fns";

interface MesResumen {
  mes: string;
  clientes: number; // Total activos
  nuevos: number;   // Nuevos este mes
  renovados: number; // Renovados este mes
  perdidos: number; // Perdidos este mes
  ingreso: number;
  crecimiento: number | null;
  churn: number | null;
  retencion: number | null;
}

// Función para saber si un cliente estuvo activo en un mes específico
function clienteActivoEnMes(cliente: Clientes, año: number, mes: number): boolean {
  const formato = "dd/MM/yy";
  const fechaInicio = parse(cliente.fechaDeInicio, formato, new Date());
  const fechaVenc = parse(cliente.fechaVencimiento ?? "", formato, new Date());

  const primerDiaMes = new Date(año, mes, 1);
  const ultimoDiaMes = new Date(año, mes + 1, 0);

  return fechaInicio <= ultimoDiaMes && fechaVenc >= primerDiaMes;
}

// Función para calcular métricas mensuales
export function getMetricasMensuales(
  clientes: Clientes[],
  planes: Plan[],
  año: number,
  soloActivos: boolean
): MesResumen[] {
  const nombresMeses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

  const clientesPorMes: Set<string>[] = [];
  const nuevosPorMes: Set<string>[] = [];
  const renovadosPorMes: Set<string>[] = [];
  const perdidosPorMes: Set<string>[] = [];
  const data: MesResumen[] = [];

  for (let i = 0; i < 12; i++) {
    const activos = clientes.filter(cliente => {
      if (soloActivos && !cliente.activo) return false;
      return clienteActivoEnMes(cliente, año, i);
    });
    const activosSet = new Set(activos.map(c => c.id || c.nombre));
    clientesPorMes.push(activosSet);

    const nuevos = clientes.filter(cliente => {
      if (soloActivos && !cliente.activo) return false;
      const formato = "dd/MM/yy";
      const fechaInicio = parse(cliente.fechaDeInicio, formato, new Date());
      return fechaInicio.getFullYear() === año && fechaInicio.getMonth() === i;
    });
    nuevosPorMes.push(new Set(nuevos.map(c => c.id || c.nombre)));
  }

  for (let i = 0; i < 12; i++) {
    if (i === 0) {
      renovadosPorMes.push(new Set());
      perdidosPorMes.push(new Set());
      continue;
    }
    const anteriores = clientesPorMes[i - 1];
    const actuales = clientesPorMes[i];

    const renovados = new Set([...anteriores].filter(id => actuales.has(id)));
    renovadosPorMes.push(renovados);

    const perdidos = new Set([...anteriores].filter(id => !actuales.has(id)));
    perdidosPorMes.push(perdidos);
  }

  for (let i = 0; i < 12; i++) {
    const clientesActivos = clientesPorMes[i];
    const nuevos = nuevosPorMes[i];
    const renovados = renovadosPorMes[i];
    const perdidos = perdidosPorMes[i];

    const ingresoTotal = clientes
      .filter(cliente => clientesActivos.has(cliente.id || cliente.nombre))
      .reduce((total, cliente) => {
        const plan = planes.find(p => p.nombre === cliente.plan);
        return total + (plan?.precio || 0);
      }, 0);

    console.log(`Mes: ${nombresMeses[i]}, ingresoTotal:`, ingresoTotal);

    let churn: number | null = null;
    let retencion: number | null = null;
    if (i > 0 && clientesPorMes[i - 1].size > 0) {
      const base = clientesPorMes[i - 1].size;
      churn = parseFloat(((perdidos.size / base) * 100).toFixed(1));
      retencion = parseFloat(((renovados.size / base) * 100).toFixed(1));
    }

    data.push({
      mes: nombresMeses[i],
      clientes: clientesActivos.size,
      nuevos: nuevos.size,
      renovados: renovados.size,
      perdidos: perdidos.size,
      ingreso: ingresoTotal,
      crecimiento: null,
      churn,
      retencion,
    });
  }

  // Arreglado: calcular crecimiento si hay datos, no según el mes actual
  for (let i = 1; i < data.length; i++) {
    const actual = data[i];
    const anterior = data[i - 1];

    if (anterior.ingreso === 0) {
      actual.crecimiento = null;
    } else {
      actual.crecimiento = ((actual.ingreso - anterior.ingreso) / anterior.ingreso) * 100;
    }
  }

  return data;
}

// Calcular MRR sumando planes de clientes activos (usando fechas reales)
export function calcularMRR(clientes: Clientes[], planes: Plan[], año: number, mes: number): number {
  const clientesActivos = clientes.filter(c => clienteActivoEnMes(c, año, mes));

  return clientesActivos.reduce((total, cliente) => {
    const plan = planes.find(p => p.nombre === cliente.plan);
    return total + (plan?.precio || 0);
  }, 0);
}
