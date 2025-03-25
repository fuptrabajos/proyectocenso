import { Link } from 'react-router-dom';

export function Navbar({ onLogout }) {
    return (
        <nav className="bg-gray-800 p-4 text-white w-full fixed top-0 z-50"> {/* Añade fixed, top-0 y z-50 */}
            <div className="flex justify-between items-center px-4">
                <h1 className="text-xl font-bold">Sistema de Gestión</h1>
                <div className="flex space-x-4">
                    <Link to="/dashboard" className="hover:text-gray-300">Inicio</Link>
                    <button 
                        onClick={onLogout} 
                        className="hover:text-gray-300"
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </nav>
    );
}