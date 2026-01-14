import { useEffect, useState, useMemo } from 'react';
import { getAllTblDatPer } from '../../api/ReporteGrupoEtarios.api';
import * as XLSX from 'xlsx';

export function ReporteGruposEtarios() {
    const [comuneros, setComuneros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [grupoFilter, setGrupoFilter] = useState('todos'); // 'todos', 'menores5', 'mayores65'
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(25);

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

    // Procesar y filtrar datos por grupos etarios
    const { filteredData, paginatedData, stats, pagination } = useMemo(() => {
        // Clasificar por grupos etarios
        const menores5 = comuneros.filter(c => c.edad && c.edad < 5);
        const mayores65 = comuneros.filter(c => c.edad && c.edad > 65);
        const gruposVulnerables = [...menores5, ...mayores65];

        // Aplicar filtro de grupo
        let dataByGroup = [];
        switch (grupoFilter) {
            case 'menores5':
                dataByGroup = menores5;
                break;
            case 'mayores65':
                dataByGroup = mayores65;
                break;
            case 'todos':
            default:
                dataByGroup = gruposVulnerables;
                break;
        }

        // Aplicar filtro de búsqueda
        const filtered = dataByGroup.filter(comunero => {
            const searchValue = searchTerm.toLowerCase();
            return !searchTerm || 
                comunero.identificacion_usuario?.toLowerCase().includes(searchValue) ||
                comunero.nombre_1?.toLowerCase().includes(searchValue) ||
                comunero.apellido_1?.toLowerCase().includes(searchValue) ||
                comunero.lugar_residencia?.toLowerCase().includes(searchValue);
        });

        // Estadísticas detalladas
        const stats = {
            totalComuneros: comuneros.length,
            totalMenores5: menores5.length,
            totalMayores65: mayores65.length,
            totalVulnerables: gruposVulnerables.length,
            porcentajeMenores5: ((menores5.length / comuneros.length) * 100).toFixed(1),
            porcentajeMayores65: ((mayores65.length / comuneros.length) * 100).toFixed(1),
            porcentajeVulnerables: ((gruposVulnerables.length / comuneros.length) * 100).toFixed(1),
            // EPS por grupo
            menores5ConEps: menores5.filter(c => c.nombre_eapbAfiliacion).length,
            menores5SinEps: menores5.filter(c => !c.nombre_eapbAfiliacion).length,
            mayores65ConEps: mayores65.filter(c => c.nombre_eapbAfiliacion).length,
            mayores65SinEps: mayores65.filter(c => !c.nombre_eapbAfiliacion).length,
            // Por género en grupos vulnerables
            menores5Masculino: menores5.filter(c => c.descripcion?.toLowerCase() === 'masculino').length,
            menores5Femenino: menores5.filter(c => c.descripcion?.toLowerCase() === 'femenino').length,
            mayores65Masculino: mayores65.filter(c => c.descripcion?.toLowerCase() === 'masculino').length,
            mayores65Femenino: mayores65.filter(c => c.descripcion?.toLowerCase() === 'femenino').length
        };

        // Paginación
        const totalPages = Math.ceil(filtered.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);
        
        const pagination = {
            totalPages,
            startRecord: startIndex + 1,
            endRecord: Math.min(startIndex + itemsPerPage, filtered.length),
            totalFiltered: filtered.length
        };

        return { filteredData: filtered, paginatedData: paginated, stats, pagination };
    }, [comuneros, searchTerm, grupoFilter, currentPage, itemsPerPage]);

    // Reset página al cambiar filtros
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, grupoFilter]);

    const exportToExcel = () => {
        const dataToExport = filteredData.map(comunero => ({
            'ID': comunero.id_paciente,
            'Grupo Etario': comunero.edad < 5 ? 'Menor de 5 años' : 'Mayor de 65 años',
            'Tipo Identidad': comunero.des_tip_identidad,
            'Número Documento': comunero.identificacion_usuario,
            'Primer Nombre': comunero.nombre_1,
            'Segundo Nombre': comunero.nombre_2,
            'Primer Apellido': comunero.apellido_1,
            'Segundo Apellido': comunero.apellido_2,
            'Sexo': comunero.descripcion,
            'Edad': comunero.edad,
            'Fecha Nacimiento': comunero.fec_nto,
            'Vereda': comunero.lugar_residencia,
            'Numero de Familia': comunero.numero_familia,
            'EPS': comunero.nombre_eapbAfiliacion || 'Sin EPS',
            'Tipo Vivienda': comunero.tipo_vivienda,
            'Parcela': comunero.tiene_parcela ? "Sí" : "No",
            'Nivel Académico': comunero.des_nivel_academico,
            'Estado Civil': comunero.estado_civil,
            'Medicina Tradicional': comunero.usa_medicina_tradicional ? "Sí" : "No",
            'Servicios Públicos': comunero.cuenta_con_servicios_publico ? "Sí" : "No",
            'Estado': comunero.esta_vivo ? "Vivo" : "Fallecido"
        }));

        const ws = XLSX.utils.json_to_sheet(dataToExport);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Grupos_Etarios_Vulnerables");
        
        const fileName = `grupos_etarios_vulnerables_${filteredData.length}_${new Date().toISOString().split('T')[0]}.xlsx`;
        XLSX.writeFile(wb, fileName);
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

    const getAgeGroupBadge = (edad) => {
        if (edad < 5) {
            return <Badge condition={true} trueColor="blue">Menor 5 años</Badge>;
        } else if (edad > 65) {
            return <Badge condition={true} trueColor="orange">Mayor 65 años</Badge>;
        }
        return <Badge condition={false}>Normal</Badge>;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando grupos etarios...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Reporte Grupos Etarios Vulnerables</h1>
                    <p className="text-gray-600">Menores de 5 años y Mayores de 65 años</p>
                    <p className="text-sm text-gray-500">Resguardo Indígena Puracé - Cauca, Colombia</p>
                </div>
                <button 
                    onClick={exportToExcel}
                    disabled={!filteredData.length}
                    className={`flex items-center px-4 py-2 rounded-lg text-white transition-colors ${
                        filteredData.length ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'
                    }`}
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    Exportar {filteredData.length}
                </button>
            </div>

            {/* Estadísticas Generales */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="text-blue-800 font-semibold text-sm">Total Comuneros</h3>
                    <p className="text-2xl font-bold text-blue-900">{stats.totalComuneros.toLocaleString()}</p>
                </div>
                <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
                    <h3 className="text-cyan-800 font-semibold text-sm">Menores 5 años</h3>
                    <p className="text-2xl font-bold text-cyan-900">{stats.totalMenores5}</p>
                    <p className="text-xs text-cyan-700">{stats.porcentajeMenores5}% del total</p>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h3 className="text-orange-800 font-semibold text-sm">Mayores 65 años</h3>
                    <p className="text-2xl font-bold text-orange-900">{stats.totalMayores65}</p>
                    <p className="text-xs text-orange-700">{stats.porcentajeMayores65}% del total</p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="text-red-800 font-semibold text-sm">Total Vulnerables</h3>
                    <p className="text-2xl font-bold text-red-900">{stats.totalVulnerables}</p>
                    <p className="text-xs text-red-700">{stats.porcentajeVulnerables}% del total</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="text-green-800 font-semibold text-sm">Menores 5 con EPS</h3>
                    <p className="text-2xl font-bold text-green-900">{stats.menores5ConEps}</p>
                    <p className="text-xs text-green-700">de {stats.totalMenores5} menores</p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h3 className="text-purple-800 font-semibold text-sm">Mayores 65 con EPS</h3>
                    <p className="text-2xl font-bold text-purple-900">{stats.mayores65ConEps}</p>
                    <p className="text-xs text-purple-700">de {stats.totalMayores65} mayores</p>
                </div>
                <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                    <h3 className="text-pink-800 font-semibold text-sm">Sin EPS</h3>
                    <p className="text-2xl font-bold text-pink-900">{stats.menores5SinEps + stats.mayores65SinEps}</p>
                    <p className="text-xs text-pink-700">vulnerables sin EPS</p>
                </div>
            </div>

            {/* Estadísticas por Género */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="text-blue-800 font-semibold text-sm">Menores 5 - Niños</h3>
                    <p className="text-2xl font-bold text-blue-900">{stats.menores5Masculino}</p>
                </div>
                <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                    <h3 className="text-pink-800 font-semibold text-sm">Menores 5 - Niñas</h3>
                    <p className="text-2xl font-bold text-pink-900">{stats.menores5Femenino}</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="text-blue-800 font-semibold text-sm">Mayores 65 - Hombres</h3>
                    <p className="text-2xl font-bold text-blue-900">{stats.mayores65Masculino}</p>
                </div>
                <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                    <h3 className="text-pink-800 font-semibold text-sm">Mayores 65 - Mujeres</h3>
                    <p className="text-2xl font-bold text-pink-900">{stats.mayores65Femenino}</p>
                </div>
            </div>
            
            {/* Filtros */}
            <div className="flex gap-4 mb-6">
                <div className="relative flex-1 max-w-md">
                    <input
                        type="text"
                        placeholder="Buscar por cédula, nombre, apellido o vereda..."
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
                    value={grupoFilter}
                    onChange={(e) => setGrupoFilter(e.target.value)}
                >
                    <option value="todos">Todos los grupos vulnerables</option>
                    <option value="menores5">Solo menores de 5 años</option>
                    <option value="mayores65">Solo mayores de 65 años</option>
                </select>

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
                <span>
                    Mostrando {pagination.startRecord} - {pagination.endRecord} de {pagination.totalFiltered.toLocaleString()}
                    {grupoFilter !== 'todos' && ` (${grupoFilter === 'menores5' ? 'menores de 5 años' : 'mayores de 65 años'})`}
                </span>
                <span>Página {currentPage} de {pagination.totalPages}</span>
            </div>
            
            {/* Tabla */}
            <div className="overflow-x-auto rounded-lg border shadow-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grupo Etario</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Documento</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre Completo</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sexo</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Edad</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">F.Nacimiento</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vereda</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">N° Familia</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">EPS</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Med. Tradicional</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Serv. Públicos</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedData.length > 0 ? (
                            paginatedData.map((comunero) => (
                                <tr key={comunero.id_paciente} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 text-sm">{comunero.id_paciente}</td>
                                    <td className="px-4 py-3 text-sm">
                                        {getAgeGroupBadge(comunero.edad)}
                                    </td>
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
                                        <span className={`font-bold ${comunero.edad < 5 ? 'text-cyan-600' : 'text-orange-600'}`}>
                                            {comunero.edad} años
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm">{comunero.fec_nto}</td>
                                    <td className="px-4 py-3 text-sm font-medium">{comunero.lugar_residencia}</td>
                                    <td className="px-4 py-3 text-sm">
                                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-mono">
                                            {comunero.numero_familia || 'Sin asignar'}
                                        </span>
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
                                        <Badge condition={comunero.usa_medicina_tradicional} trueColor="yellow">
                                            {comunero.usa_medicina_tradicional ? "Sí" : "No"}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-3 text-sm">
                                        <Badge condition={comunero.cuenta_con_servicios_publico} falseColor="red">
                                            {comunero.cuenta_con_servicios_publico ? "Sí" : "No"}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-3 text-sm">
                                        <Badge condition={comunero.esta_vivo} trueColor="green" falseColor="gray">
                                            {comunero.esta_vivo ? "Vivo" : "Fallecido"}
                                        </Badge>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="13" className="px-6 py-8 text-center text-gray-500">
                                    No se encontraron resultados para los grupos etarios seleccionados
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Paginación */}
            {pagination.totalPages > 1 && (
                <div className="mt-6 flex justify-between items-center">
                    <span className="text-sm text-gray-700">
                        {pagination.startRecord} - {pagination.endRecord} de {pagination.totalFiltered.toLocaleString()}
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
                        
                        {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                            const pageNum = Math.max(1, currentPage - 2) + i;
                            if (pageNum > pagination.totalPages) return null;
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
                            onClick={() => setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1))}
                            disabled={currentPage === pagination.totalPages}
                            className={`px-3 py-2 rounded text-sm ${
                                currentPage === pagination.totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white border hover:bg-gray-50'
                            }`}
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}