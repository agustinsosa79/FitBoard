import { writeFile, utils } from "xlsx";
import { parse } from "date-fns";
import type { Clientes } from "../../Types/cliente";
import type { Plan } from "../../Types/cliente";

export function exportarClientesMensuales(
  clientes: Clientes[],
  planes: Plan[],
  año: number,
  soloActivos: boolean
) {
  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const mesActual = new Date().getMonth(); // 0-indexado

  const resumen = Array.from({ length: 12 }, (_, i) => {
    const clientesMes = clientes.filter((cliente) => {
      const fecha = parse(cliente.fechaDeInicio, "dd/MM/yy", new Date());
      const coincideAño = fecha.getFullYear() === año;
      const coincideMes = fecha.getMonth() === i;
      const coincideActivo = soloActivos ? cliente.activo : true;
      return coincideAño && coincideMes && coincideActivo;
    });

    const ingresoTotal = clientesMes.reduce((total, cliente) => {
      const plan = planes.find((p) => p.nombre === cliente.plan);
      return total + (plan?.precio || 0);
    }, 0);

    return {
      mesIndex: i,
      mes: meses[i],
      clientes: clientesMes.length,
      ingreso: ingresoTotal,
    };
  });

  const dataConCrecimiento = resumen.map((fila, index, array) => {
    const mesAnterior = index > 0 ? array[index - 1] : null;

    // Solo calcular crecimiento si el mes ya pasó o es el actual
    if (index > mesActual) {
      return {
        Mes: fila.mes,
        "Clientes Nuevos": fila.clientes,
        "Ingreso Total": `$ ${fila.ingreso.toLocaleString("es-AR")}`,
        "% Crecimiento": "-", // No calcular meses futuros
      };
    }

    const crecimiento =
      mesAnterior && mesAnterior.ingreso > 0
        ? ((fila.ingreso - mesAnterior.ingreso) / mesAnterior.ingreso) * 100
        : null;

    return {
      Mes: fila.mes,
      "Clientes Nuevos": fila.clientes,
      "Ingreso Total": `$ ${fila.ingreso.toLocaleString("es-AR")}`,
      "% Crecimiento":
        crecimiento === null ? "-" : `${crecimiento > 0 ? "+" : ""}${crecimiento.toFixed(1)}%`,
    };
  });

  const hoja = utils.json_to_sheet(dataConCrecimiento);
  const libro = utils.book_new();
  utils.book_append_sheet(libro, hoja, "Métricas");

  writeFile(libro, `metricas-${año}.xlsx`);
}
