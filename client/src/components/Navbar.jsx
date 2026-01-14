import { Link } from 'react-router-dom';

export function Navbar({ onLogout }) {
    return (
        <nav className="bg-white shadow-lg border-b-3 border-green-500 w-full fixed top-0 z-50">
            <div className="flex justify-between items-center px-6 h-18">
                {/* Logo y título con identidad colombiana */}
                <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-4">
                        {/* Ícono con colores representativos */}
                        <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-xl shadow-lg">
                            <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h4a1 1 0 011 1v5m-6 0V9a1 1 0 011-1h4a1 1 0 011 1v11" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Prototipo de Gestión</h1>
                            <div className="flex items-center space-x-3">
                                {/* Colores de la bandera colombiana */}
                                <div className="flex space-x-1">
                                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                </div>
                                <p className="text-green-600 text-sm font-semibold">Censo Indígena Resguardo Puracé</p>
                            </div>
                        </div>
                    </div>

                    {/* Separador visual */}
                    <div className="hidden lg:block w-px h-10 bg-gray-300"></div>

                    {/* Información contextual */}
                    <div className="hidden lg:flex items-center space-x-3 bg-green-50 rounded-full px-4 py-2 border border-green-200">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-gray-700 text-sm">En línea:</span>
                            <span className="text-green-700 text-sm font-semibold">Departamento del Cauca</span>
                        </div>
                    </div>
                </div>

                {/* Área de acciones y estadísticas */}
                <div className="flex items-center space-x-4">
                    {/* Estadísticas rápidas */}
                    <div className="hidden xl:flex items-center space-x-4 bg-gray-50 rounded-xl px-4 py-2 border border-gray-200">
                        <div className="text-center">
                            <div className="text-green-600 font-bold text-lg"></div>
                            <div className="text-gray-500 text-xs">Comuneros</div>
                        </div>
                        <div className="w-px h-8 bg-gray-300"></div>
                        <div className="text-center">
                            <div className="text-blue-600 font-bold text-lg">8</div>
                            <div className="text-gray-500 text-xs">Hoy</div>
                        </div>
                    </div>

                    {/* Notificaciones */}
                    <button className="relative p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19H7a2 2 0 01-2-2V9a2 2 0 012-2h4m4 2v-6a2 2 0 00-2-2h-4a2 2 0 00-2 2v6" />
                        </svg>
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
                    </button>

                    {/* Divisor */}
                    <div className="w-px h-8 bg-gray-300"></div>

                    {/* Botones principales */}
                    <div className="flex items-center space-x-3">
                        <Link 
                            to="/dashboard" 
                            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg"
                        >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            <span>Inicio</span>
                        </Link>
                        
                        <button 
                            onClick={onLogout} 
                            className="bg-gray-200 hover:bg-red-100 text-gray-700 hover:text-red-600 px-5 py-2 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 hover:shadow-md"
                        >
                            <span>Salir</span>
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}