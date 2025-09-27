import { useEffect, useState, useMemo } from 'react';
import { getAllTblDatPer } from '../../api/ReporteComunero.api';
import * as XLSX from 'xlsx';

export function ReportesComunero() {
    const [comuneros, setComuneros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [genderFilter, setGenderFilter] = useState('todos');
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

    // Filtrar y paginar datos
    const { filteredData, paginatedData, stats, pagination } = useMemo(() => {
        // Filtros
        const filtered = comuneros.filter(comunero => {
            const searchValue = searchTerm.toLowerCase();
            const matchesSearch = !searchTerm || 
                comunero.identificacion_usuario?.toLowerCase().includes(searchValue) ||
                comunero.nombre_1?.toLowerCase().includes(searchValue) ||
                comunero.apellido_1?.toLowerCase().includes(searchValue);
            
            const matchesGender = genderFilter === 'todos' || 
                comunero.descripcion?.toLowerCase() === genderFilter;
            
            return matchesSearch && matchesGender;
        });

        // Estadísticas
        const stats = {
            total: comuneros.length,
            masculino: comuneros.filter(p => p.descripcion?.toLowerCase() === 'masculino').length,
            femenino: comuneros.filter(p => p.descripcion?.toLowerCase() === 'femenino').length,
            conEps: comuneros.filter(p => p.nombre_eapbAfiliacion).length,
            sinEps: comuneros.filter(p => !p.nombre_eapbAfiliacion).length
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
    }, [comuneros, searchTerm, genderFilter, currentPage, itemsPerPage]);

    // Reset página al cambiar filtros
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, genderFilter]);

    const exportToExcel = () => {
        const dataToExport = filteredData.map(comunero => ({
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
            'Lugar Vereda': comunero.lugar_residencia,
            'Codigo Vereda': comunero.codigo_vereda,
            'Numero de Familia': comunero.numero_familia,
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
            'Basuras': comunero.des_disp_basura,
            'Estado de vida': comunero.esta_vivo
        }));

        const ws = XLSX.utils.json_to_sheet(dataToExport);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Comuneros");
        
        const fileName = genderFilter === 'todos' 
            ? `comuneros_${filteredData.length}.xlsx` 
            : `comuneros_${genderFilter}_${filteredData.length}.xlsx`;
        
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

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando comuneros...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Reporte de Comuneros</h1>
                    <p className="text-gray-600">Resguardo Indígena Puracé - Cauca, Colombia</p>
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

            {/* Estadísticas */}
            <div className="grid grid-cols-5 gap-4 mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="text-blue-800 font-semibold text-sm">Total</h3>
                    <p className="text-2xl font-bold text-blue-900">{stats.total.toLocaleString()}</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="text-green-800 font-semibold text-sm">Masculino</h3>
                    <p className="text-2xl font-bold text-green-900">{stats.masculino.toLocaleString()}</p>
                </div>
                <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                    <h3 className="text-pink-800 font-semibold text-sm">Femenino</h3>
                    <p className="text-2xl font-bold text-pink-900">{stats.femenino.toLocaleString()}</p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h3 className="text-purple-800 font-semibold text-sm">Con EPS</h3>
                    <p className="text-2xl font-bold text-purple-900">{stats.conEps.toLocaleString()}</p>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h3 className="text-orange-800 font-semibold text-sm">Sin EPS</h3>
                    <p className="text-2xl font-bold text-orange-900">{stats.sinEps.toLocaleString()}</p>
                </div>
            </div>
            
            {/* Filtros */}
            <div className="flex gap-4 mb-6">
                <div className="relative flex-1 max-w-md">
                    <input
                        type="text"
                        placeholder="Buscar por cédula, nombre o apellido..."
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
                    value={genderFilter}
                    onChange={(e) => setGenderFilter(e.target.value)}
                >
                    <option value="todos">Todos</option>
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                </select>

                <select
                    className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    value={itemsPerPage}
                    onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                    }}
                >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
            </div>
            
            {/* Info */}
            <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
                <span>
                    Mostrando {pagination.startRecord} - {pagination.endRecord} de {pagination.totalFiltered.toLocaleString()}
                    {genderFilter !== 'todos' && ` (${genderFilter})`}
                </span>
                <span>Página {currentPage} de {pagination.totalPages}</span>
            </div>
            
            {/* Tabla */}
            <div className="overflow-x-auto rounded-lg border shadow-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo ID</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Documento</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre 1</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre 2</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Apellido 1</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Apellido 2</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sexo</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">F.Nac</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Edad</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vereda</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Codigo Vereda</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Numero de Familia</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Etnia</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Resguardo</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">EPS</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vivienda</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Parcela</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cultivo</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">N.Académico</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">E.Civil</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Régimen</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Otra Lengua</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Com.Origen</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Med.Tradicional</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Serv.Públicos</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Basuras</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado Vida</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedData.length > 0 ? (
                            paginatedData.map((comunero) => (
                                <tr key={comunero.id_paciente} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 text-sm">{comunero.id_paciente}</td>
                                    <td className="px-4 py-3 text-sm">{comunero.des_tip_identidad}</td>
                                    <td className="px-4 py-3 text-sm font-medium">{comunero.identificacion_usuario}</td>
                                    <td className="px-4 py-3 text-sm">{comunero.nombre_1}</td>
                                    <td className="px-4 py-3 text-sm">{comunero.nombre_2}</td>
                                    <td className="px-4 py-3 text-sm">{comunero.apellido_1}</td>
                                    <td className="px-4 py-3 text-sm">{comunero.apellido_2}</td>
                                    <td className="px-4 py-3 text-sm">
                                        <Badge condition={comunero.descripcion?.toLowerCase() === 'masculino'} trueColor="blue" falseColor="pink">
                                            {comunero.descripcion}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-3 text-sm">{comunero.fec_nto}</td>
                                    <td className="px-4 py-3 text-sm">{comunero.edad}</td>
                                    <td className="px-4 py-3 text-sm">{comunero.lugar_residencia}</td>
                                    <td className="px-4 py-3 text-sm">{comunero.codigo_vereda}</td>
                                    <td className="px-4 py-3 text-sm">{comunero.numero_familia}</td>
                                    <td className="px-4 py-3 text-sm">{comunero.etnia}</td>
                                    <td className="px-4 py-3 text-sm">{comunero.resguardo}</td>
                                    <td className="px-4 py-3 text-sm">{comunero.nombre_eapbAfiliacion || 'Sin EPS'}</td>
                                    <td className="px-4 py-3 text-sm">{comunero.tipo_vivienda}</td>
                                    <td className="px-4 py-3 text-sm">
                                        <Badge condition={comunero.tiene_parcela}>
                                            {comunero.tiene_parcela ? "Sí" : "No"}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-3 text-sm">{comunero.des_cultivos}</td>
                                    <td className="px-4 py-3 text-sm">{comunero.des_nivel_academico}</td>
                                    <td className="px-4 py-3 text-sm">{comunero.estado_civil}</td>
                                    <td className="px-4 py-3 text-sm">{comunero.des_regimen}</td>
                                    <td className="px-4 py-3 text-sm">
                                        <Badge condition={comunero.habla_otra_lenjua} trueColor="purple">
                                            {comunero.habla_otra_lenjua ? "Sí" : "No"}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-3 text-sm">{comunero.comunidad_de_origen}</td>
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
                                    <td className="px-4 py-3 text-sm">{comunero.des_disp_basura}</td>
                                    <td className="px-4 py-3 text-sm">{comunero.esta_vivo ? "Vivo" : "Fallecido"}</td>
                                    
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="25" className="px-6 py-8 text-center text-gray-500">
                                    No se encontraron resultados
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