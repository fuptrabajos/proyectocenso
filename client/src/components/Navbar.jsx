import { Link } from 'react-router-dom';

export function Navbar() {
    return (
        <nav className="bg-blue-600 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">Sistema de Gestión</h1>
                <div className="flex space-x-4">
                    <Link to="/" className="hover:text-gray-300">Inicio</Link>
                    <Link to="/about" className="hover:text-gray-300">Acerca de</Link>
                    <Link to="/contact" className="hover:text-gray-300">Contacto</Link>
                </div>
            </div>
        </nav>
    );
}