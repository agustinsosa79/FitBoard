import { Link } from "react-router-dom";
import { useAuth } from "../src/context/authContext";
import { useEffect } from "react";

interface Props {
  abierto: boolean;
  cerrarMenu: () => void;
}

export default function BarraLateral({ abierto, cerrarMenu }: Props) {
  const auth = useAuth();
  const user = auth?.user;

  // Bloquear scroll del body cuando sidebar está abierta en móvil
  useEffect(() => {
    document.body.style.overflow = abierto ? "hidden" : "";
  }, [abierto]);

  return (
    <>
      <aside
        className={`
          fixed top-0 left-0 h-screen w-72 bg-gray-950 text-white flex flex-col
          shadow-lg border-r border-gray-700 z-40
          transform transition-transform duration-300 ease-in-out
          ${abierto ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          pl-2
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-800 flex-shrink-0">
          <img src="/fitcore.png" alt="logo" className="w-40 h-40 rounded-full object-cover" />
        </div>

        {/* Navegación */}
        <nav className="flex-1 px-6 py-6 overflow-y-auto">
          <ul className="space-y-4">
            <li>
              <Link to="/" onClick={cerrarMenu} className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white hover:text-black">
                {/* Icono Inicio */}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m4-8v8m5-8l2 2m-2-2v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-8z" />
                </svg>
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/clientes" onClick={cerrarMenu} className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white hover:text-black">
                {/* Icono Clientes */}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Clientes
              </Link>
            </li>
            <li>
              <Link to="/ajustes" onClick={cerrarMenu} className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white hover:text-black">
                {/* Icono Ajustes */}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-1.104.896-2 2-2s2 .896 2 2-.896 2-2 2-2-.896-2-2zm0 0V7m0 4v4m0 0h4m-4 0H8" />
                </svg>
                Ajusta tu plan
              </Link>
            </li>
            <li>
              <Link to="/metricas" onClick={cerrarMenu} className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white hover:text-black">
                {/* Icono Métricas */}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18M9 17V9m4 8V5" />
                </svg>
                Métricas
              </Link>
            </li>
            {!user && (
              <li>
                <Link to="/acceso" onClick={cerrarMenu} className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white hover:text-black">
                  {/* Icono Acceso */}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 00-3-3.87M12 3a4 4 0 110 8 4 4 0 010-8zm6 8v6m0 0l2-2m-2 2l-2-2" />
                  </svg>
                  Acceso
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* Footer usuario */}
        <div className="px-6 py-4 border-t border-gray-700 flex-shrink-0">
          <div className="font-semibold">{user?.email || "No logueado"}</div>
          <div className="text-xs text-gray-400">ID: {user?.uid?.slice(0, 8) || "-"}</div>
        </div>
      </aside>

      {/* Overlay móvil */}
      {abierto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={cerrarMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
}
