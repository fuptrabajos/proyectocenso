import { useEffect, useState, useMemo } from 'react';
import { getAllTblDatPer } from '../../api/ReporteComunero.api';
import * as XLSX from 'xlsx';

export function ReporteVeredas() {
    const [comuneros, setComuneros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(25);
    const [selectedVereda, setSelectedVereda] = useState(null);
    const [viewMode, setViewMode] = useState('resumen'); // 'resumen' o 'detalle'

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllTblDatPer();
                setComuneros(response.data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Procesar datos por veredas
    const veredasResumen = useMemo(() => {
        const veredasMap = {};
        
        comuneros.forEach(comunero => {
            const vereda = comunero.lugar_residencia || 'Sin especificar';
            if (!veredasMap[vereda]) {
                veredasMap[vereda] = {
                    nombre: vereda,
                    totalComuneros: 0,
                    masculino: 0,
                    femenino: 0,
                    conEps: 0,
                    sinEps: 0,
                    conParcela: 0,
                    sinParcela: 0,
                    usanMedicinaTradicional: 0,
                    conServiciosPublicos: 0,
                    edadPromedio: 0,
                    edades: [],
                    comuneros: []
                };
            }
            
            const veredaData = veredasMap[vereda];
            veredaData.totalComuneros++;
            veredaData.comuneros.push(comunero);
            
            // Estadísticas demográficas
            if (comunero.descripcion?.toLowerCase() === 'masculino') veredaData.masculino++;
            if (comunero.descripcion?.toLowerCase() === 'femenino') veredaData.femenino++;
            if (comunero.nombre_eapbAfiliacion) veredaData.conEps++;
            else veredaData.sinEps++;
            if (comunero.tiene_parcela) veredaData.conParcela++;
            else veredaData.sinParcela++;
            if (comunero.usa_medicina_tradicional) veredaData.usanMedicinaTradicional++;
            if (comunero.cuenta_con_servicios_publico) veredaData.conServiciosPublicos++;
            
            // Para calcular edad promedio
            if (comunero.edad) {
                veredaData.edades.push(comunero.edad);
            }
        });

        // Calcular edad promedio y ordenar comuneros
        const veredasArray = Object.values(veredasMap).map(vereda => ({
            ...vereda,
            edadPromedio: vereda.edades.length > 0 ? 
                Math.round(vereda.edades.reduce((sum, edad) => sum + edad, 0) / vereda.edades.length) : 0,
            comuneros: vereda.comuneros.sort((a, b) => 
                (a.apellido_1 || '').localeCompare(b.apellido_1 || '')
            )
        }));

        return veredasArray.sort((a, b) => b.totalComuneros - a.totalComuneros);
    }, [comuneros]);

    // Filtrar veredas por búsqueda
    const veredasFiltradas = useMemo(() => {
        if (!searchTerm) return veredasResumen;
        return veredasResumen.filter(vereda => 
            vereda.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [veredasResumen, searchTerm]);

    // Paginación para vista resumen
    const { veredasPaginadas, pagination } = useMemo(() => {
        const totalPages = Math.ceil(veredasFiltradas.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const paginadas = veredasFiltradas.slice(startIndex, startIndex + itemsPerPage);
        
        return {
            veredasPaginadas: paginadas,
            pagination: {
                totalPages,
                startRecord: startIndex + 1,
                endRecord: Math.min(startIndex + itemsPerPage, veredasFiltradas.length),
                totalFiltered: veredasFiltradas.length
            }
        };
    }, [veredasFiltradas, currentPage, itemsPerPage]);

    // Estadísticas generales
    const estadisticasGenerales = useMemo(() => {
        const totalComuneros = comuneros.length;
        const totalVeredas = veredasResumen.length;
        const veredaMasPoblada = veredasResumen[0] || null;
        const veredaMenosPoblada = veredasResumen[veredasResumen.length - 1] || null;
        const promedioComunerosPorVereda = totalVeredas > 0 ? Math.round(totalComuneros / totalVeredas) : 0;

        return {
            totalComuneros,
            totalVeredas,
            veredaMasPoblada,
            veredaMenosPoblada,
            promedioComunerosPorVereda
        };
    }, [veredasResumen, comuneros.length]);

    // Comuneros de la vereda seleccionada con paginación
    const { comunerosPaginados, paginationComuneros } = useMemo(() => {
        if (!selectedVereda) return { comunerosPaginados: [], paginationComuneros: {} };

        const comunerosVereda = selectedVereda.comuneros;
        const totalPages = Math.ceil(comunerosVereda.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const paginados = comunerosVereda.slice(startIndex, startIndex + itemsPerPage);
        
        return {
            comunerosPaginados: paginados,
            paginationComuneros: {
                totalPages,
                startRecord: startIndex + 1,
                endRecord: Math.min(startIndex + itemsPerPage, comunerosVereda.length),
                totalFiltered: comunerosVereda.length
            }
        };
    }, [selectedVereda, currentPage, itemsPerPage]);

    // Reset página al cambiar filtros o modo
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, viewMode, selectedVereda]);

    const handleVeredaSelect = (vereda) => {
        setSelectedVereda(vereda);
        setViewMode('detalle');
        setCurrentPage(1);
    };

    const handleBackToResumen = () => {
        setSelectedVereda(null);
        setViewMode('resumen');
        setCurrentPage(1);
    };

    const exportToExcel = () => {
        if (viewMode === 'resumen') {
            // Exportar resumen de veredas
            const dataToExport = veredasFiltradas.map(vereda => ({
                'Vereda': vereda.nombre,
                'Total Comuneros': vereda.totalComuneros,
                'Hombres': vereda.masculino,
                'Mujeres': vereda.femenino,
                '% Hombres': ((vereda.masculino / vereda.totalComuneros) * 100).toFixed(1) + '%',
                '% Mujeres': ((vereda.femenino / vereda.totalComuneros) * 100).toFixed(1) + '%',
                'Con EPS': vereda.conEps,
                'Sin EPS': vereda.sinEps,
                '% Con EPS': ((vereda.conEps / vereda.totalComuneros) * 100).toFixed(1) + '%',
                'Con Parcela': vereda.conParcela,
                'Sin Parcela': vereda.sinParcela,
                '% Con Parcela': ((vereda.conParcela / vereda.totalComuneros) * 100).toFixed(1) + '%',
                'Edad Promedio': vereda.edadPromedio,
                'Medicina Tradicional': vereda.usanMedicinaTradicional,
                'Servicios Públicos': vereda.conServiciosPublicos
            }));

            const ws = XLSX.utils.json_to_sheet(dataToExport);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Resumen_Veredas");
            XLSX.writeFile(wb, `resumen_veredas_${new Date().toISOString().split('T')[0]}.xlsx`);
        } else {
            // Exportar comuneros de la vereda seleccionada
            const dataToExport = selectedVereda.comuneros.map(comunero => ({
                'ID': comunero.id_paciente,
                'Tipo Identidad': comunero.des_tip_identidad,
                'Número Documento': comunero.identificacion_usuario,
                'Primer Nombre': comunero.nombre_1,
                'Segundo Nombre': comunero.nombre_2,
                'Primer Apellido': comunero.apellido_1,
                'Segundo Apellido': comunero.apellido_2,
                'Sexo': comunero.descripcion,
                'Fecha Nacimiento': comunero.fec_nto,
                'Edad': comunero.edad,
                'Lugar Residencia': comunero.lugar_residencia,
                'Codigo Vereda': comunero.codigo_vereda,
                'Numero Familia': comunero.numero_familia,                
                'Etnia': comunero.etnia,
                'Resguardo': comunero.resguardo,
                'EPS': comunero.nombre_eapbAfiliacion,
                'Tipo Vivienda': comunero.tipo_vivienda,
                'Parcela': comunero.tiene_parcela ? "Sí" : "No",
                'Cultivo': comunero.des_cultivos,
                'Nivel Académico': comunero.des_nivel_academico,
                'Estado Civil': comunero.estado_civil,
                'Régimen': comunero.des_regimen,
                'Habla otra lengua': comunero.habla_otra_lenjua ? "Sí" : "No",
                'Comunidad Origen': comunero.comunidad_de_origen,
                'Medicina Tradicional': comunero.usa_medicina_tradicional ? "Sí" : "No",
                'Servicios Públicos': comunero.cuenta_con_servicios_publico ? "Sí" : "No",
                'Estado': comunero.esta_vivo ? "vivo" : "Fallecido",
                'Basuras': comunero.des_disp_basura
            }));

            const ws = XLSX.utils.json_to_sheet(dataToExport);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, `Comuneros_${selectedVereda.nombre}`);
            XLSX.writeFile(wb, `comuneros_${selectedVereda.nombre.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.xlsx`);
        }
    };

    const Badge = ({ condition, trueColor = "green", falseColor = "gray", children }) => (
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            condition 
                ? `bg-${trueColor}-100 text-${trueColor}-800` 
                : `bg-${falseColor}-100 text-${falseColor}-800`
        }`}>
            {children}
        </span>
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando reporte de veredas...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <div className="flex items-center gap-4">
                        {viewMode === 'detalle' && (
                            <button
                                onClick={handleBackToResumen}
                                className="flex items-center px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                                </svg>
                                Volver al Resumen
                            </button>
                        )}
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                {viewMode === 'resumen' ? 'Reporte por Veredas' : `Comuneros de ${selectedVereda?.nombre}`}
                            </h1>
                            <p className="text-gray-600">Resguardo Indígena Puracé - Cauca, Colombia</p>
                            {viewMode === 'detalle' && (
                                <p className="text-sm text-blue-600 mt-1">
                                    {selectedVereda?.totalComuneros} comuneros registrados en esta vereda
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                <button 
                    onClick={exportToExcel}
                    className="flex items-center px-4 py-2 rounded-lg text-white bg-green-600 hover:bg-green-700 transition-colors"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    {viewMode === 'resumen' ? 'Exportar Resumen' : 'Exportar Comuneros'}
                </button>
            </div>

            {/* Estadísticas generales - Solo en vista resumen */}
            {viewMode === 'resumen' && (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h3 className="text-blue-800 font-semibold text-sm">Total Veredas</h3>
                        <p className="text-2xl font-bold text-blue-900">{estadisticasGenerales.totalVeredas}</p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h3 className="text-green-800 font-semibold text-sm">Total Comuneros</h3>
                        <p className="text-2xl font-bold text-green-900">{estadisticasGenerales.totalComuneros.toLocaleString()}</p>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <h3 className="text-purple-800 font-semibold text-sm">Vereda Más Poblada</h3>
                        <p className="text-lg font-bold text-purple-900 truncate">{estadisticasGenerales.veredaMasPoblada?.nombre || 'N/A'}</p>
                        <p className="text-sm text-purple-700">{estadisticasGenerales.veredaMasPoblada?.totalComuneros || 0} comuneros</p>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <h3 className="text-amber-800 font-semibold text-sm">Promedio por Vereda</h3>
                        <p className="text-2xl font-bold text-amber-900">{estadisticasGenerales.promedioComunerosPorVereda}</p>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <h3 className="text-red-800 font-semibold text-sm">Vereda Menos Poblada</h3>
                        <p className="text-lg font-bold text-red-900 truncate">{estadisticasGenerales.veredaMenosPoblada?.nombre || 'N/A'}</p>
                        <p className="text-sm text-red-700">{estadisticasGenerales.veredaMenosPoblada?.totalComuneros || 0} comuneros</p>
                    </div>
                </div>
            )}

            {/* Estadísticas de la vereda seleccionada - Solo en vista detalle */}
            {viewMode === 'detalle' && selectedVereda && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h3 className="text-blue-800 font-semibold text-sm">Total Comuneros</h3>
                        <p className="text-2xl font-bold text-blue-900">{selectedVereda.totalComuneros}</p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h3 className="text-green-800 font-semibold text-sm">Hombres / Mujeres</h3>
                        <p className="text-xl font-bold text-green-900">{selectedVereda.masculino} / {selectedVereda.femenino}</p>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <h3 className="text-purple-800 font-semibold text-sm">Con EPS</h3>
                        <p className="text-2xl font-bold text-purple-900">{selectedVereda.conEps}</p>
                        <p className="text-sm text-purple-700">{((selectedVereda.conEps / selectedVereda.totalComuneros) * 100).toFixed(1)}%</p>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <h3 className="text-amber-800 font-semibold text-sm">Edad Promedio</h3>
                        <p className="text-2xl font-bold text-amber-900">{selectedVereda.edadPromedio} años</p>
                    </div>
                </div>
            )}
            
            {/* Filtros */}
            <div className="flex gap-4 mb-6">
                <div className="relative flex-1 max-w-md">
                    <input
                        type="text"
                        placeholder={viewMode === 'resumen' ? "Buscar vereda..." : "Buscar comunero..."}
                        className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>

                <select
                    className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    value={itemsPerPage}
                    onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                    }}
                >
                    <option value={10}>10 por página</option>
                    <option value={25}>25 por página</option>
                    <option value={50}>50 por página</option>
                    <option value={100}>100 por página</option>
                </select>
            </div>
            
            {/* Info de paginación */}
            <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
                {viewMode === 'resumen' ? (
                    <span>
                        Mostrando {pagination.startRecord} - {pagination.endRecord} de {pagination.totalFiltered} veredas
                    </span>
                ) : (
                    <span>
                        Mostrando {paginationComuneros.startRecord} - {paginationComuneros.endRecord} de {paginationComuneros.totalFiltered} comuneros
                    </span>
                )}
                <span>
                    Página {currentPage} de {viewMode === 'resumen' ? pagination.totalPages : paginationComuneros.totalPages}
                </span>
            </div>
            
            {/* Vista Resumen - Tabla de Veredas */}
            {viewMode === 'resumen' && (
                <div className="overflow-x-auto rounded-lg border shadow-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vereda</th>
                                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Total Comuneros</th>
                                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Hombres</th>
                                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Mujeres</th>
                                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Con EPS</th>
                                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">% EPS</th>
                                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Con Parcela</th>
                                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Edad Prom.</th>
                                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {veredasPaginadas.length > 0 ? (
                                veredasPaginadas.map((vereda, index) => (
                                    <tr key={vereda.nombre} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-xs font-medium mr-3">
                                                    {((currentPage - 1) * itemsPerPage) + index + 1}
                                                </div>
                                                <div>
                                                    <div className="font-semibold">{vereda.nombre}</div>
                                                    <div className="text-xs text-gray-500">
                                                        {vereda.nombre === estadisticasGenerales.veredaMasPoblada?.nombre && '🏆 Más poblada'}
                                                        {vereda.nombre === estadisticasGenerales.veredaMenosPoblada?.nombre && '📍 Menos poblada'}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-center font-semibold text-blue-600">
                                            {vereda.totalComuneros.toLocaleString()}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-center text-blue-800">
                                            {vereda.masculino.toLocaleString()}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-center text-pink-800">
                                            {vereda.femenino.toLocaleString()}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-center">
                                            <Badge condition={vereda.conEps > vereda.sinEps} trueColor="green" falseColor="red">
                                                {vereda.conEps}
                                            </Badge>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-center">
                                            <div className="flex items-center justify-center">
                                                <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                                    <div 
                                                        className={`h-2 rounded-full ${
                                                            (vereda.conEps / vereda.totalComuneros) > 0.7 ? 'bg-green-500' :
                                                            (vereda.conEps / vereda.totalComuneros) > 0.4 ? 'bg-yellow-500' : 'bg-red-500'
                                                        }`}
                                                        style={{width: `${(vereda.conEps / vereda.totalComuneros) * 100}%`}}
                                                    ></div>
                                                </div>
                                                <span className="text-xs font-medium">
                                                    {((vereda.conEps / vereda.totalComuneros) * 100).toFixed(1)}%
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-center">
                                            <Badge condition={vereda.conParcela > vereda.sinParcela} trueColor="emerald" falseColor="gray">
                                                {vereda.conParcela}
                                            </Badge>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-center">
                                            <span className="font-medium text-indigo-700">
                                                {vereda.edadPromedio} años
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-center">
                                            <button
                                                onClick={() => handleVeredaSelect(vereda)}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs transition-colors"
                                            >
                                                Ver Comuneros
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="px-6 py-8 text-center text-gray-500">
                                        No se encontraron veredas
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Vista Detalle - Tabla de Comuneros */}
            {viewMode === 'detalle' && selectedVereda && (
                <div className="overflow-x-auto rounded-lg border shadow-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Documento</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre Completo</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sexo</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Edad</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">EPS</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Parcela</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nivel Académico</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado Civil</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Med. Tradicional</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Serv. Públicos</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {comunerosPaginados.length > 0 ? (
                                comunerosPaginados.map((comunero) => (
                                    <tr key={comunero.id_paciente} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 text-sm">{comunero.id_paciente}</td>
                                        <td className="px-4 py-3 text-sm font-medium">{comunero.identificacion_usuario}</td>
                                        <td className="px-4 py-3 text-sm">
                                            <div>
                                                <div className="font-medium text-gray-900">
                                                    {[comunero.nombre_1, comunero.nombre_2].filter(Boolean).join(' ')}
                                                </div>
                                                <div className="text-gray-500">
                                                    {[comunero.apellido_1, comunero.apellido_2].filter(Boolean).join(' ')}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            <Badge condition={comunero.descripcion?.toLowerCase() === 'masculino'} trueColor="blue" falseColor="pink">
                                                {comunero.descripcion}
                                            </Badge>
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            <span className="font-medium">{comunero.edad || 'N/A'}</span>
                                            {comunero.fec_nto && (
                                                <div className="text-xs text-gray-500">{comunero.fec_nto}</div>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            {comunero.nombre_eapbAfiliacion ? (
                                                <Badge condition={true} trueColor="green">
                                                    {comunero.nombre_eapbAfiliacion}
                                                </Badge>
                                            ) : (
                                                <Badge condition={false} falseColor="red">
                                                    Sin EPS
                                                </Badge>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            <Badge condition={comunero.tiene_parcela}>
                                                {comunero.tiene_parcela ? "Sí" : "No"}
                                            </Badge>
                                        </td>
                                        <td className="px-4 py-3 text-sm">{comunero.des_nivel_academico || 'N/A'}</td>
                                        <td className="px-4 py-3 text-sm">{comunero.estado_civil || 'N/A'}</td>
                                        <td className="px-4 py-3 text-sm">
                                            <Badge condition={comunero.usa_medicina_tradicional} trueColor="yellow">
                                                {comunero.usa_medicina_tradicional ? "Sí" : "No"}
                                            </Badge>
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            <Badge condition={comunero.cuenta_con_servicios_publico} falseColor="red">
                                                {comunero.cuenta_con_servicios_publico ? "Sí" : "No"}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="11" className="px-6 py-8 text-center text-gray-500">
                                        No se encontraron comuneros en esta vereda
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Paginación */}
            {((viewMode === 'resumen' && pagination.totalPages > 1) || 
              (viewMode === 'detalle' && paginationComuneros.totalPages > 1)) && (
                <div className="mt-6 flex justify-between items-center">
                    <span className="text-sm text-gray-700">
                        {viewMode === 'resumen' ? (
                            `${pagination.startRecord} - ${pagination.endRecord} de ${pagination.totalFiltered} veredas`
                        ) : (
                            `${paginationComuneros.startRecord} - ${paginationComuneros.endRecord} de ${paginationComuneros.totalFiltered} comuneros`
                        )}
                    </span>
                    
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className={`px-3 py-2 rounded text-sm ${
                                currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white border hover:bg-gray-50'
                            }`}
                        >
                            Anterior
                        </button>
                        
                        {Array.from({ 
                            length: Math.min(5, viewMode === 'resumen' ? pagination.totalPages : paginationComuneros.totalPages) 
                        }, (_, i) => {
                            const maxPages = viewMode === 'resumen' ? pagination.totalPages : paginationComuneros.totalPages;
                            const pageNum = Math.max(1, currentPage - 2) + i;
                            if (pageNum > maxPages) return null;
                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => setCurrentPage(pageNum)}
                                    className={`px-3 py-2 rounded text-sm ${
                                        pageNum === currentPage 
                                            ? 'bg-green-600 text-white' 
                                            : 'bg-white border hover:bg-gray-50'
                                    }`}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}
                        
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(
                                viewMode === 'resumen' ? pagination.totalPages : paginationComuneros.totalPages, 
                                prev + 1
                            ))}
                            disabled={currentPage === (viewMode === 'resumen' ? pagination.totalPages : paginationComuneros.totalPages)}
                            className={`px-3 py-2 rounded text-sm ${
                                currentPage === (viewMode === 'resumen' ? pagination.totalPages : paginationComuneros.totalPages)
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                    : 'bg-white border hover:bg-gray-50'
                            }`}
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            )}

            {/* Sección de análisis adicional - Solo en vista resumen */}
            {viewMode === 'resumen' && (
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg border shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top 5 Veredas por Población</h3>
                        <div className="space-y-3">
                            {veredasResumen.slice(0, 5).map((vereda, index) => (
                                <div key={vereda.nombre} className="flex items-center justify-between p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100 transition-colors"
                                     onClick={() => handleVeredaSelect(vereda)}>
                                    <div className="flex items-center">
                                        <span className="w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                                            {index + 1}
                                        </span>
                                        <span className="font-medium">{vereda.nombre}</span>
                                    </div>
                                    <div className="flex items-center text-blue-600">
                                        <span className="font-semibold mr-2">{vereda.totalComuneros} comuneros</span>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                        </svg>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Cobertura EPS por Vereda</h3>
                        <div className="space-y-3">
                            {veredasResumen
                                .sort((a, b) => (b.conEps / b.totalComuneros) - (a.conEps / a.totalComuneros))
                                .slice(0, 5)
                                .map((vereda) => (
                                    <div key={vereda.nombre} className="flex items-center justify-between p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100 transition-colors"
                                         onClick={() => handleVeredaSelect(vereda)}>
                                        <span className="font-medium truncate mr-4">{vereda.nombre}</span>
                                        <div className="flex items-center">
                                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                                <div 
                                                    className={`h-2 rounded-full ${
                                                        (vereda.conEps / vereda.totalComuneros) > 0.7 ? 'bg-green-500' :
                                                        (vereda.conEps / vereda.totalComuneros) > 0.4 ? 'bg-yellow-500' : 'bg-red-500'
                                                    }`}
                                                    style={{width: `${(vereda.conEps / vereda.totalComuneros) * 100}%`}}
                                                ></div>
                                            </div>
                                            <span className="text-sm font-semibold min-w-[50px]">
                                                {((vereda.conEps / vereda.totalComuneros) * 100).toFixed(1)}%
                                            </span>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}