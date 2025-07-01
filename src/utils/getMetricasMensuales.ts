import {type Clientes } from "../../Types/cliente";
import { type Plan } from "../../Types/cliente";
import { parse } from "date-fns";

interface MesResumen {
  mes: string;
  clientes: number;
  ingreso: number;
  crecimiento: number | null;
}

export function getMetricasMensuales(
  clientes: Clientes[],
  planes: Plan[],
  año: number,
  soloActivos: boolean
): MesResumen[] {
  const nombresMeses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  const mesActual = new Date().getMonth();
  const anioActual = new Date().getFullYear();

  const data: MesResumen[] = [];

  for (let i = 0; i < 12; i++) {
    const clientesDelMes = clientes.filter((cliente) => {
      if (soloActivos && !cliente.activo) return false;

      const fecha = parse(cliente.fechaDeInicio, "dd/MM/yy", new Date());
      return fecha.getFullYear() === año && fecha.getMonth() === i;
    });

    const ingresoTotal = clientesDelMes.reduce((total, cliente) => {
      const plan = planes.find((p) => p.nombre === cliente.plan);
      return total + (plan?.precio || 0);
    }, 0);

    data.push({
      mes: nombresMeses[i],
      clientes: clientesDelMes.length,
      ingreso: ingresoTotal,
      crecimiento: null, // se completa abajo
    });
  }

  // Cálculo de crecimiento
  for (let i = 1; i < data.length; i++) {
    const actual = data[i];
    const anterior = data[i - 1];

    // No mostrar crecimiento si estamos en un mes futuro
    const esMesFuturo = año === anioActual && i > mesActual;
    if (esMesFuturo) {
      actual.crecimiento = null;
    } else {
      actual.crecimiento =
        anterior.clientes === 0
          ? null
          : ((actual.clientes - anterior.clientes) / anterior.clientes) * 100;
    }
  }

  return data;
}
