import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaList, FaChartBar, FaFileAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Iconos

export function Sidebar() {
    const [mostrarOpcionesCrear, setMostrarOpcionesCrear] = useState(false);
    const [mostrarOpcionesListar, setMostrarOpcionesListar] = useState(false);
    const [colapsado, setColapsado] = useState(false); // Estado para colapsar/expandir

    // Función para alternar el estado de colapsado
    const toggleColapsado = () => {
        setColapsado(!colapsado);
    };

    return (
        <div
            className={`bg-gray-700 h-screen fixed transition-all duration-300 ${
                colapsado ? "w-20" : "w-64"
            } overflow-y-auto top-16`} 
        >
            {/* Botón para colapsar/expandir */}
            <button
                onClick={toggleColapsado}
                className="p-4 text-white hover:text-zinc-400 w-full text-left"
            >
                {colapsado ? <FaChevronRight /> : <FaChevronLeft />}
            </button>

            <ul className="p-4">
                {/* Opción CREAR */}
                <li className="mb-4">
                    <button
                        onClick={() => setMostrarOpcionesCrear(!mostrarOpcionesCrear)}
                        className="text-white hover:text-zinc-400 w-full text-left flex items-center"
                    >
                        <FaPlus className="mr-2" /> {!colapsado && "CREAR"}
                    </button>
                    {mostrarOpcionesCrear && !colapsado && (
                        <ul className="ml-6 mt-2 space-y-2">
                            <li>
                                <Link to="/dashboard/Afiliacion-create" className="text-white hover:text-zinc-400 flex items-center"><FaChevronRight className="mr-2" /> Eps</Link>
                            </li>
                            <li>
                                <Link to="/dashboard/Datper-create" className="text-white hover:text-zinc-400 flex items-center"><FaChevronRight className="mr-3" /> Comunero</Link>
                            </li>
                            <li>
                                <Link to="/dashboard/Identidad-create" className="text-white hover:text-zinc-400 flex items-center"><FaChevronRight className="mr-2" />Tipo Vivienda</Link>
                            </li>
                            <li>
                                <Link to="/dashboard/Vivienda-create" className="text-white hover:text-zinc-400 flex items-center"><FaChevronRight className="mr-2" />Tipo Vivienda</Link>
                            </li>
                            <li>
                                <Link to="/dashboard/Cultivo-create" className="text-white hover:text-zinc-400 flex items-center"><FaChevronRight className="mr-2" />Tipo Cultivo</Link>
                            </li>
                            <li>
                                <Link to="/dashboard/Academico-create" className="text-white hover:text-zinc-400 flex items-center"><FaChevronRight className="mr-2" />Tipo Academico</Link>
                            </li>
                            <li>
                                <Link to="/dashboard/Regimen-create" className="text-white hover:text-zinc-400 flex items-center"><FaChevronRight className="mr-2" />Tipo Regimen</Link>
                            </li>
                            <li>
                                <Link to="/dashboard/Basura-create" className="text-white hover:text-zinc-400 flex items-center"><FaChevronRight className="mr-2" /> Tipo Basura</Link>
                            </li>
                            <li>
                                <Link to="/dashboard/Servicios-create" className="text-white hover:text-zinc-400 flex items-center"><FaChevronRight className="mr-2" /> Tipo Servicios</Link>
                            </li>
                            <li>
                                <Link to="/dashboard/Sexo-create" className="text-white hover:text-zinc-400 flex items-center"><FaChevronRight className="mr-2" /> Tipo Sexo</Link>
                            </li>
                        </ul>
                    )}
                </li>

                {/* Opción LISTAR */}
                <li className="mb-4">
                    <button
                        onClick={() => setMostrarOpcionesListar(!mostrarOpcionesListar)}
                        className="text-white hover:text-zinc-400 w-full text-left flex items-center"
                    >
                        <FaList className="mr-2" /> {!colapsado && "LISTAR MODULOS"}
                    </button>
                    {mostrarOpcionesListar && !colapsado && (
                        <ul className="ml-6 mt-2 space-y-2">
                            <li>
                                <Link to="/dashboard/Afiliacion" className="text-white hover:text-zinc-400 flex items-center">
                                    <FaChevronRight className="mr-2" /> Listar EPS
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/Datper" className="text-white hover:text-zinc-400 flex items-center">
                                    <FaChevronRight className="mr-2" />Listar Comuneros
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/Identidad" className="text-white hover:text-zinc-400 flex items-center">
                                    <FaChevronRight className="mr-2" /> Tipo Identidad
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/Vivienda" className="text-white hover:text-zinc-400 flex items-center">
                                    <FaChevronRight className="mr-2" /> Tipo Vivienda
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/Cultivo" className="text-white hover:text-zinc-400 flex items-center">
                                    <FaChevronRight className="mr-2" /> Tipo Cultivo
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/Academico" className="text-white hover:text-zinc-400 flex items-center">
                                    <FaChevronRight className="mr-2" /> Tipo Academico
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/Regimen" className="text-white hover:text-zinc-400 flex items-center">
                                    <FaChevronRight className="mr-2" /> Tipo Regimen
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/Basura" className="text-white hover:text-zinc-400 flex items-center">
                                    <FaChevronRight className="mr-2" /> Tipo Basura
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/Sexo" className="text-white hover:text-zinc-400 flex items-center">
                                    <FaChevronRight className="mr-2" /> Tipo Sexo
                                </Link>
                            </li>
                        </ul>
                    )}
                </li>

                {/* Opción REPORTES */}
                <li className="mb-4">
                    <Link to="/reportes" className="text-white hover:text-zinc-400 flex items-center">
                        <FaFileAlt className="mr-2" /> {!colapsado && "Reportes"}
                    </Link>
                </li>

                {/* Opción GRÁFICAS */}
                <li className="mb-4">
                    <Link to="/graficas" className="text-white hover:text-zinc-400 flex items-center">
                        <FaChartBar className="mr-2" /> {!colapsado && "Gráficas"}
                    </Link>
                </li>
            </ul>
        </div>
    );
}