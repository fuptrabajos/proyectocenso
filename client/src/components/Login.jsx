import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ setUser }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Función para manejar el inicio de sesión
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setError("Todos los campos son obligatorios");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/api/token/", {
                username,
                password
            });

            // Guardar el token en localStorage
            localStorage.setItem("token", response.data.access);
            localStorage.setItem("refresh", response.data.refresh);

            setUser(true); // Establecer usuario autenticado
            setError(""); // Limpiar errores
            navigate("/dashboard"); // Redirigir al Dashboard
        } catch (error) {
            setError("Usuario o contraseña incorrectos");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-200 to-blue-300">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
                <h1 className="text-3xl font-semibold text-center text-blue-700 mb-6">
                    Iniciar Sesión
                </h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    {/* Input Usuario */}
                    <div>
                        <label className="block text-gray-700 font-medium">Usuario</label>
                        <input
                            type="text"
                            placeholder="Ingrese su usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            name="username"
                            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                        />
                    </div>

                    {/* Input Contraseña */}
                    <div>
                        <label className="block text-gray-700 font-medium">Contraseña</label>
                        <input
                            type="password"
                            placeholder="Ingrese su contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                        />
                    </div>

                    {/* Botón Login */}
                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                    >
                        Iniciar Sesión
                    </button>
                </form>

                {/* Mensaje de error */}
                {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}

                {/* Enlace de recuperación */}
                <p className="text-center text-gray-600 mt-4">
                    ¿Olvidaste tu contraseña?{" "}
                    <a href="#" className="text-blue-500 hover:underline">
                        Recuperar acceso
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Login;
