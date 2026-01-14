import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaPlus,
  FaList,
  FaChartBar,
  FaIdCard,
  FaHome,
  FaUsers,
  FaFileAlt,
  FaHospital,
  FaChevronLeft,
  FaChevronRight,
  FaTachometerAlt,
} from "react-icons/fa";

export function Sidebar() {
  const [mostrarOpcionesCrear, setMostrarOpcionesCrear] = useState(false);
  const [mostrarOpcionesListar, setMostrarOpcionesListar] = useState(false);
  const [mostrarOpcionesReportes, setMostrarOpcionesReportes] = useState(false);
  const [colapsado, setColapsado] = useState(false);

  // Obtenemos el rol del usuario logueado
  const role = localStorage.getItem("role");

  const toggleColapsado = () => {
    setColapsado(!colapsado);
  };

  return (
    <div
      className={`bg-gradient-to-b from-green-900 to-green-800 h-screen fixed transition-all duration-300 ${
        colapsado ? "w-16" : "w-64"
      } overflow-y-auto top-16 z-10 shadow-xl`}
    >
      {/* Botón colapsar */}
      <button
        onClick={toggleColapsado}
        className="p-4 text-green-100 hover:bg-green-700 w-full text-left transition-colors duration-200 flex justify-between items-center border-b border-green-700"
      >
        <span className={`${colapsado ? "hidden" : "block"} font-medium`}>
          Menu
        </span>
        {colapsado ? <FaChevronRight className="mx-auto" /> : <FaChevronLeft />}
      </button>

      {/* Logo */}
      {!colapsado && (
        <div className="p-4 flex items-center justify-center mb-4">
          <div className="bg-white p-1 rounded-full mr-2"></div>
          <span className="text-white font-bold">Censo Indígena</span>
        </div>
      )}

      <ul className="p-4">
        {/* DASHBOARD */}
        <li className="mb-3">
          <Link
            to="/dashboard/mapas"
            className="text-green-100 hover:bg-green-700 rounded-lg flex items-center p-2 transition-colors duration-200"
          >
            <FaTachometerAlt className={`${colapsado ? "mx-auto" : "mr-3"}`} />
            {!colapsado && <span>Dashboard</span>}
          </Link>
        </li>

        {/* CREAR */}
        <li className="mb-3">
          <button
            onClick={() => setMostrarOpcionesCrear(!mostrarOpcionesCrear)}
            className="text-green-100 hover:bg-green-700 w-full text-left flex items-center justify-between p-2 rounded-lg transition-colors duration-200"
          >
            <div className="flex items-center">
              <FaPlus className={`${colapsado ? "mx-auto" : "mr-3"}`} />
              {!colapsado && <span>Crear</span>}
            </div>
            {!colapsado && (
              <FaChevronRight
                className={`transform transition-transform duration-200 ${
                  mostrarOpcionesCrear ? "rotate-90" : ""
                }`}
              />
            )}
          </button>

          {mostrarOpcionesCrear && !colapsado && (
            <ul className="ml-6 mt-2 space-y-1">
              {/* Solo admin puede ver esto */}
              {role === "admin" && (
                <li>
                  <Link
                    to="/dashboard/create-user"
                    className="text-green-200 hover:text-white hover:bg-green-700 flex items-center p-1 rounded transition-colors duration-200"
                  >
                    <FaChevronRight className="mr-2 text-xs" /> Crear Usuario
                  </Link>
                </li>
              )}

              {/* Solo registrador puede ver esto */}
              {(role === "registrador" || role === "admin") && (
                <li>
                  <Link
                    to="/dashboard/Datper-create"
                    className="text-green-200 hover:text-white hover:bg-green-700 flex items-center p-1 rounded transition-colors duration-200"
                  >
                    <FaChevronRight className="mr-2 text-xs" /> Comunero
                  </Link>
                </li>
              )}

              {/* Admin conserva las demás opciones */}
              {role === "admin" && (
                <>
                  <li>
                    <Link
                      to="/dashboard/Afiliacion-create"
                      className="text-green-200 hover:text-white hover:bg-green-700 flex items-center p-1 rounded transition-colors duration-200"
                    >
                      <FaChevronRight className="mr-2 text-xs" /> Eps
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/Identidad-create"
                      className="text-green-200 hover:text-white hover:bg-green-700 flex items-center p-1 rounded transition-colors duration-200"
                    >
                      <FaChevronRight className="mr-2 text-xs" /> Tipo Identidad
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/Vivienda-create"
                      className="text-green-200 hover:text-white hover:bg-green-700 flex items-center p-1 rounded transition-colors duration-200"
                    >
                      <FaChevronRight className="mr-2 text-xs" /> Tipo Vivienda
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/Cultivo-create"
                      className="text-green-200 hover:text-white hover:bg-green-700 flex items-center p-1 rounded transition-colors duration-200"
                    >
                      <FaChevronRight className="mr-2 text-xs" /> Tipo Cultivo
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/Academico-create"
                      className="text-green-200 hover:text-white hover:bg-green-700 flex items-center p-1 rounded transition-colors duration-200"
                    >
                      <FaChevronRight className="mr-2 text-xs" /> Tipo Academico
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/Regimen-create"
                      className="text-green-200 hover:text-white hover:bg-green-700 flex items-center p-1 rounded transition-colors duration-200"
                    >
                      <FaChevronRight className="mr-2 text-xs" /> Tipo Regimen
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/Basura-create"
                      className="text-green-200 hover:text-white hover:bg-green-700 flex items-center p-1 rounded transition-colors duration-200"
                    >
                      <FaChevronRight className="mr-2 text-xs" /> Tipo Basura
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/Servicios-create"
                      className="text-green-200 hover:text-white hover:bg-green-700 flex items-center p-1 rounded transition-colors duration-200"
                    >
                      <FaChevronRight className="mr-2 text-xs" /> Tipo Servicios
                    </Link>
                  </li>
                </>
              )}
            </ul>
          )}
        </li>

        {/* LISTAR (solo admin) */}
        {role === "admin" && (
          <li className="mb-3">
            <button
              onClick={() => setMostrarOpcionesListar(!mostrarOpcionesListar)}
              className="text-green-100 hover:bg-green-700 w-full text-left flex items-center justify-between p-2 rounded-lg transition-colors duration-200"
            >
              <div className="flex items-center">
                <FaList className={`${colapsado ? "mx-auto" : "mr-3"}`} />
                {!colapsado && <span>Listar Módulos</span>}
              </div>
              {!colapsado && (
                <FaChevronRight
                  className={`transform transition-transform duration-200 ${
                    mostrarOpcionesListar ? "rotate-90" : ""
                  }`}
                />
              )}
            </button>
            {mostrarOpcionesListar && !colapsado && (
              <ul className="ml-6 mt-2 space-y-1">
                <li>
                  <Link
                    to="/dashboard/Afiliacion"
                    className="text-green-200 hover:text-white hover:bg-green-700 flex items-center p-1 rounded transition-colors duration-200"
                  >
                    <FaChevronRight className="mr-2 text-xs" /> Listar EPS
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/Datper"
                    className="text-green-200 hover:text-white hover:bg-green-700 flex items-center p-1 rounded transition-colors duration-200"
                  >
                    <FaChevronRight className="mr-2 text-xs" /> Listar Comuneros
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/Identidad"
                    className="text-green-200 hover:text-white hover:bg-green-700 flex items-center p-1 rounded transition-colors duration-200"
                  >
                    <FaChevronRight className="mr-2 text-xs" /> Tipo Identidad
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/Vivienda"
                    className="text-green-200 hover:text-white hover:bg-green-700 flex items-center p-1 rounded transition-colors duration-200"
                  >
                    <FaChevronRight className="mr-2 text-xs" /> Tipo Vivienda
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/Cultivo"
                    className="text-green-200 hover:text-white hover:bg-green-700 flex items-center p-1 rounded transition-colors duration-200"
                  >
                    <FaChevronRight className="mr-2 text-xs" /> Tipo Cultivo
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/Academico"
                    className="text-green-200 hover:text-white hover:bg-green-700 flex items-center p-1 rounded transition-colors duration-200"
                  >
                    <FaChevronRight className="mr-2 text-xs" /> Tipo Academico
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/Regimen"
                    className="text-green-200 hover:text-white hover:bg-green-700 flex items-center p-1 rounded transition-colors duration-200"
                  >
                    <FaChevronRight className="mr-2 text-xs" /> Tipo Regimen
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/Basura"
                    className="text-green-200 hover:text-white hover:bg-green-700 flex items-center p-1 rounded transition-colors duration-200"
                  >
                    <FaChevronRight className="mr-2 text-xs" /> Tipo Basura
                  </Link>
                </li>
              </ul>
            )}
          </li>
        )}

        {/* REPORTES (solo admin) */}
        {role === "admin" && (
          <li className="mb-3">
            <button
              onClick={() => setMostrarOpcionesReportes(!mostrarOpcionesReportes)}
              className="text-green-100 hover:bg-green-700 w-full text-left flex items-center justify-between p-2 rounded-lg transition-colors duration-200"
            >
              <div className="flex items-center">
                <FaChartBar
                  className={`${colapsado ? "mx-auto" : "mr-3"}`}
                />
                {!colapsado && <span> Reportes y estadistica</span>}
              </div>
              {!colapsado && (
                <FaChevronRight
                  className={`transform transition-transform duration-200 ${
                    mostrarOpcionesReportes ? "rotate-90" : ""
                  }`}
                />
              )}
            </button>
            {mostrarOpcionesReportes && !colapsado && (
              <ul className="ml-6 mt-2 space-y-1">
                <li>
                  <Link
                    to="/dashboard/reportes"
                    className="text-green-200 hover:text-white hover:bg-green-700 flex items-center p-1 rounded transition-colors duration-200"
                  >
                    <FaHospital className="mr-2 text-xs" /> Reporte por EPS
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/reportes1"
                    className="text-green-200 hover:text-white hover:bg-green-700 flex items-center p-1 rounded transition-colors duration-200"
                  >
                    <FaUsers className="mr-2 text-xs" /> Reporte Comuneros
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/reportes2"
                    className="text-green-200 hover:text-white hover:bg-green-700 flex items-center p-1 rounded transition-colors duration-200"
                  >
                    <FaIdCard className="mr-2 text-xs" /> Reporte por Vereda
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/reportes3"
                    className="text-green-200 hover:text-white hover:bg-green-700 flex items-center p-1 rounded transition-colors duration-200"
                  >
                    <FaHome className="mr-2 text-xs" /> Reporte Grupo Etario
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/reportes4"
                    className="text-green-200 hover:text-white hover:bg-green-700 flex items-center p-1 rounded transition-colors duration-200"
                  >
                    <FaHome className="mr-2 text-xs" /> Reporte Poblacion Estudiantil
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/reportes5"
                    className="text-green-200 hover:text-white hover:bg-green-700 flex items-center p-1 rounded transition-colors duration-200"
                  >
                    <FaUsers className="mr-2 text-xs" /> Reporte Nivel Academico
                  </Link>
                </li>
              </ul>
            )}
          </li>
        )}
      </ul>
    </div>
  );
}
