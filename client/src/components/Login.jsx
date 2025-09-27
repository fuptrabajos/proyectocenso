import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ setUser }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // Función para manejar el inicio de sesión
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setError("Todos los campos son obligatorios");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await axios.post("http://localhost:8000/api/token/", {
                username,
                password
            });

            localStorage.setItem("token", response.data.access);
            localStorage.setItem("refresh", response.data.refresh);
                // 2) pedir info del usuario autenticado para saber el rol
            const me = await axios.get("http://127.0.0.1:8000/tasks/me/", {
                headers: { Authorization: `Bearer ${response.data.access}` },
                });
                localStorage.setItem("role", me.data.role || "");

                setUser(true);
                setError("");

                // 3) redirigir según rol
                if (me.data.role === "registrador") {
                navigate("/dashboard/Datper-create"); // la ruta del formulario Comunero
                } else {
                navigate("/"); // admin o cualquier otro
                }
            } catch (error) {
                setError("Usuario o contraseña incorrectos");
            } finally {
                setLoading(false);
            }
        };    
                

    return (
        <div className="min-h-screen flex">
            {/* Panel Izquierdo - Decorativo */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-500 via-green-600 to-teal-700 relative overflow-hidden">
                {/* Elementos decorativos animados */}
                <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-bounce"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/10 rounded-full blur-2xl animate-ping"></div>
                
                {/* Contenido del panel */}
                <div className="flex flex-col justify-center items-center text-white p-12 z-10 relative">
                    <div className="mb-8">
                        <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm border border-white/30">
                            <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                            </svg>
                        </div>
                    </div>
                    <h2 className="text-4xl font-bold mb-4 text-center leading-tight">
                        Censo Indígena
                        <span className="block text-emerald-200">Resguardo de Puracé</span>
                    </h2>
                    <p className="text-xl text-center text-emerald-100 max-w-md leading-relaxed">
                        Plataforma integral para el registro y seguimiento de la comunidad indígena del Resguardo de Puracé
                    </p>
                    
                    {/* Características */}
                    <div className="mt-12 space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="text-emerald-100">Censo completo de comuneros</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="text-emerald-100">Registro de hábitos alimenticios</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="text-emerald-100">Datos sociodemográficos</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="text-emerald-100">Análisis nutricional</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="text-emerald-100">Reportes y estadísticas</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Panel Derecho - Formulario */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-gray-50 to-white p-8">
                <div className="w-full max-w-md">
                    {/* Logo móvil */}
                    <div className="lg:hidden text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                            </svg>
                        </div>
                        <h2 className="text-emerald-600 font-bold text-lg">Censo Indígena Puracé</h2>
                    </div>

                    {/* Header del formulario */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            ¡Bienvenido de vuelta!
                        </h1>
                        <p className="text-gray-600">Censo Indígena - Resguardo de Puracé</p>
                        <p className="text-sm text-emerald-600 font-medium mt-1">Accede para continuar con el registro</p>
                    </div>

                    {/* Formulario */}
                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* Campo Usuario */}
                        <div className="group">
                            <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                                Usuario
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="username"
                                    placeholder="Introduce tu usuario"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 outline-none hover:border-gray-300 text-gray-900 placeholder-gray-500"
                                />
                            </div>
                        </div>

                        {/* Campo Contraseña */}
                        <div className="group">
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                                Contraseña
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    placeholder="Introduce tu contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 outline-none hover:border-gray-300 text-gray-900 placeholder-gray-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-emerald-500 transition-colors"
                                >
                                    {showPassword ? (
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Mensaje de error con animación */}
                        {error && (
                            <div className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3 animate-shake">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                </div>
                                <p className="text-red-700 text-sm font-medium">{error}</p>
                            </div>
                        )}

                        {/* Botón de Login */}
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center space-x-3 shadow-lg group"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Iniciando sesión...</span>
                                </>
                            ) : (
                                <>
                                    <span>Iniciar Sesión</span>
                                    <svg className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Enlaces de recuperación */}
                    <div className="mt-8 space-y-4">
                        <div className="text-center">
                            <a href="#" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium hover:underline transition-colors">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>
                        
                        <div className="text-center">
                            <p className="text-gray-600 text-sm">
                                ¿Necesitas ayuda?{" "}
                                <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline transition-colors">
                                    Contactar soporte
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-12 text-center">
                        <p className="text-xs text-gray-500">
                            © 2025 Censo Indígena - Resguardo de Puracé. Todos los derechos reservados.
                        </p>
                        <p className="text-xs text-emerald-600 mt-1 font-medium">
                            Incluye módulo de hábitos alimenticios y análisis nutricional
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;