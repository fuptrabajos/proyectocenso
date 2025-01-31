import {Link} from 'react-router-dom'

export function Navigation() {
    return (
        <div className="flex">
            {/* Sidebar: Links en columna */}
            <div className="w-1/4 bg-gray-100 p-4">
                <Link to="/Afiliacion" className="block font-bold text-lg mb-4 text-gray-700">
                    Listado Eps
                </Link>
                <Link to="/Datper" className="block font-bold text-lg mb-4 text-gray-700">
                    Listado Comuneros
                </Link>
                <Link to="/Identidad" className="block font-bold text-lg mb-4 text-gray-700">
                    Listado tipos de identidad
                </Link>
                <Link to="/Vivienda" className="block font-bold text-lg mb-4 text-gray-700">
                    Listado tipos de vivienda
                </Link>

                <Link to="/Cultivo" className="block font-bold text-lg mb-4 text-gray-700">
                    Listado tipos de cultivo
                </Link>

                <Link to="/Academico" className="block font-bold text-lg mb-4 text-gray-700">
                    Listado nivel academico
                </Link>

                <Link to="/Regimen" className="block font-bold text-lg mb-4 text-gray-700">
                    Listado de regimenes
                </Link>

                <Link to="/Basura" className="block font-bold text-lg mb-4 text-gray-700">
                    Listado de tto de basuras
                </Link>

                <Link to="/Servicios" className="block font-bold text-lg mb-4 text-gray-700">
                    Listado de servicios publicos
                </Link>
               

            </div>

            {/* Header: Botones en la parte superior */}
            <div className="w-3/4">
                <div className="flex justify-center space-x-4 bg-blue-50 p-4">
                    <button className="bg-indigo-500 px-4 py-2 rounded-lg text-white">
                        <Link to="/Afiliacion-create">Crear Eps</Link>
                    </button>
                    <button className="bg-indigo-500 px-4 py-2 rounded-lg text-white">
                        <Link to="/Datper-create">Crear Comunero</Link>
                    </button>

                    <button className="bg-indigo-500 px-4 py-2 rounded-lg text-white">
                        <Link to="/Datper-create">Buscar</Link>
                    </button>

                    <button className="bg-indigo-500 px-4 py-2 rounded-lg text-white">
                        <Link to="/Identidad-create">Crear Tipos de identidad</Link>
                    </button>
                    <button className="bg-indigo-500 px-4 py-2 rounded-lg text-white">
                        <Link to="/Vivienda-create">Crear Tipos de vivienda</Link>
                    </button>

                    <button className="bg-indigo-500 px-4 py-2 rounded-lg text-white">
                        <Link to="/Cultivo-create">Crear Tipos de cultivo</Link>
                    </button>

                    <button className="bg-indigo-500 px-4 py-2 rounded-lg text-white">
                        <Link to="/Academico-create">Crear nivel academico</Link>
                    </button>

                    <button className="bg-indigo-500 px-4 py-2 rounded-lg text-white">
                        <Link to="/Regimen-create">Crear nuevo regimen</Link>
                    </button>

                    <button className="bg-indigo-500 px-4 py-2 rounded-lg text-white">
                        <Link to="/Basura-create">Crear nuevo tto de basuras</Link>
                    </button>

                    <button className="bg-indigo-500 px-4 py-2 rounded-lg text-white">
                        <Link to="/Servicios-create">Crear nuevo servicio publico</Link>
                    </button>
                  
                </div>
            </div>
        </div>
    );
}
