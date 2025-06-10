    export default function BarraLateral() {
    return (
        <aside className="w-72 bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen flex flex-col shadow-lg">
            <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-700">
                <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                <span className="text-2xl font-bold tracking-wide">FitBoard</span>
            </div>
            <nav className="flex-1 px-4 py-6">
                <ul className="space-y-2">
                    <li>
                        <a href="/" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors">
                            <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m4-8v8m5-8l2 2m-2-2v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-8z" />
                            </svg>
                            Inicio
                        </a>
                    </li>
                    <li>
                        <a href="/clientes" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors">
                            <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            Clientes
                        </a>
                    </li>
                    <li>
                        <a href="/acceso" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors">
                            <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-1.104.896-2 2-2s2 .896 2 2-.896 2-2 2-2-.896-2-2zm0 0V7m0 4v4m0 0h4m-4 0H8" />
                            </svg>
                            Acceso
                        </a>
                    </li>
                </ul>
            </nav>
            <div className="px-6 py-4 border-t border-gray-700 mt-auto">
                <div className="flex items-center gap-3">
                    <img src="/avatar.png" alt="Usuario" className="w-10 h-10 rounded-full border-2 border-indigo-400" />
                    <div>
                        <div className="font-semibold">Usuario</div>
                        <div className="text-xs text-gray-400">Administrador</div>
                    </div>
                </div>
            </div>
        </aside>
    )
    }
