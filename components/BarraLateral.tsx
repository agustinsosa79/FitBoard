import { Link } from "react-router-dom";
import { useAuth } from "../src/context/authContext";

export default function BarraLateral() {
    const auth = useAuth();
    const user = auth?.user;

    return (
        <aside className="fixed left-0 top-0 w-72 h-screen bg-gray-950 text-white flex flex-col shadow-lg z-50 border-r border-gray-700 
">
            <div className="flex items-center gap-2 px-4 py-4">
                <img src="../public/dumbbell-svgrepo-com.svg" alt="logo-fitboard" className="w-20 h-20" />
                <span className="text-2xl font-bold font-monserrat tracking-wide">FitBoard</span>
            </div>
            <nav className="flex-1 px-4 py-6">
                <ul className="space-y-2">
                    <li>
                        <Link
                            to="/"
                            className="group flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white hover:text-black transition-colors"
                        >
                            <svg
                                className="w-5 h-5 text-white group-hover:text-black transition-colors shrink-0"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m4-8v8m5-8l2 2m-2-2v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-8z"
                                />
                            </svg>
                            Inicio
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/clientes"
                            className="group flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white hover:text-black transition-colors"
                        >
                            <svg
                                className="w-5 h-5 text-white group-hover:text-black transition-colors shrink-0"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4a4 4 0 11-8 0 4 4 0 018 0z"
                                />
                            </svg>
                            Clientes
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/ajustes"
                            className="group flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white hover:text-black transition-colors"
                        >
                            <svg
                                className="w-5 h-5 text-white group-hover:text-black transition-colors shrink-0"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 11c0-1.104.896-2 2-2s2 .896 2 2-.896 2-2 2-2-.896-2-2zm0 0V7m0 4v4m0 0h4m-4 0H8"
                                />
                            </svg>
                            Ajusta tu plan
                        </Link>
                    </li>
                    {!user && (
                        <li>
                            <Link
                                to="/acceso"
                                className="group flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white hover:text-black transition-colors"
                            >
                                <svg
                                    className="w-5 h-5 text-white group-hover:text-black transition-colors shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16 21v-2a4 4 0 00-3-3.87M12 3a4 4 0 110 8 4 4 0 010-8zm6 8v6m0 0l2-2m-2 2l-2-2"
                                    />
                                </svg>
                                Acceso
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
            <div className="px-6 py-4 border-t border-gray-700 mt-auto">
                <div className="flex items-center gap-3">
                    <div>
                        <div className="font-semibold">{user?.email || "No logueado"}</div>
                        <div className="text-xs text-gray-400">
                            ID: {user?.uid?.slice(0, 8) || "-"}
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
