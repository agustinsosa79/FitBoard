import { useState } from "react";
import { Outlet } from "react-router-dom";
import BarraLateral from "../components/BarraLateral";

export default function LayoutPanel() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => setMenuAbierto(!menuAbierto);
  const cerrarMenu = () => setMenuAbierto(false);

  return (
    // Usa flexbox para que el contenedor principal ocupe toda la altura
    // y la main se extienda para llenar el espacio restante.
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">

      {/* Botón hamburguesa móvil */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-gray-900 text-white p-2 rounded-md shadow"
        onClick={toggleMenu}
        aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
      >
        ☰
      </button>

      {/* Sidebar fijo */}
      {/* La BarraLateral ya es fixed, por lo que no ocupa espacio en el flujo normal */}
      <BarraLateral abierto={menuAbierto} cerrarMenu={cerrarMenu} />

      {/* Contenido principal: ml-72 para desktop empuja el contenido al lado de la barra lateral */}
      {/* flex-1 asegura que main ocupe el espacio restante y overflow-y-auto manejará su propio scroll si es necesario */}
      <main className="flex-1 ml-0 md:ml-72 overflow-y-auto overflow-x-hidden p-0 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}