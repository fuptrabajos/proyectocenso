import { useEffect, useState, useMemo } from 'react';

import { getAllTblDatPer } from '../../api/ReportePoblacionEstudiantil.api';
import * as XLSX from 'xlsx';

export function ReportePoblacionEstudiantil() {
    const [comuneros, setComuneros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [edadFilter, setEdadFilter] = useState('todos'); // 'todos', 'preescolar', 'primaria', 'secundaria', 'media', 'superior'
    const [nivelAcademicoFilter, setNivelAcademicoFilter] = useState('todos');
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

    // Procesar y filtrar datos por grupos estudiantiles
    const { filteredData, paginatedData, stats, pagination } = useMemo(() => {
        // Clasificar por grupos de edad estudiantil adaptados a Colombia
        const preescolar = comuneros.filter(c => c.edad && c.edad >= 3 && c.edad <= 5);
        const primaria = comuneros.filter(c => c.edad && c.edad >= 6 && c.edad <= 10);
        const secundaria = comuneros.filter(c => c.edad && c.edad >= 11 && c.edad <= 16);
        const media = comuneros.filter(c => c.edad && c.edad >= 17 && c.edad <= 18);
        const superior = comuneros.filter(c => c.edad && c.edad >= 19 && c.edad <= 25);
        const poblacionEstudiantil = [...preescolar, ...primaria, ...secundaria, ...media, ...superior];

        // Aplicar filtro de edad
        let dataByAge = [];
        switch (edadFilter) {
            case 'preescolar':
                dataByAge = preescolar;
                break;
            case 'primaria':
                dataByAge = primaria;
                break;
            case 'secundaria':
                dataByAge = secundaria;
                break;
            case 'media':
                dataByAge = media;
                break;
            case 'superior':
                dataByAge = superior;
                break;
            case 'todos':
            default:
                dataByAge = poblacionEstudiantil;
                break;
        }

        // Aplicar filtro de nivel académico
        let dataByNivel = dataByAge;
        if (nivelAcademicoFilter !== 'todos') {
            dataByNivel = dataByAge.filter(comunero => 
                comunero.des_nivel_academico?.toLowerCase().includes(nivelAcademicoFilter.toLowerCase())
            );
        }

        // Aplicar filtro de búsqueda
        const filtered = dataByNivel.filter(comunero => {
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
            totalPreescolar: preescolar.length,
            totalPrimaria: primaria.length,
            totalSecundaria: secundaria.length,
            totalMedia: media.length,
            totalSuperior: superior.length,
            totalEstudiantil: poblacionEstudiantil.length,
            porcentajePreescolar: ((preescolar.length / comuneros.length) * 100).toFixed(1),
            porcentajePrimaria: ((primaria.length / comuneros.length) * 100).toFixed(1),
            porcentajeSecundaria: ((secundaria.length / comuneros.length) * 100).toFixed(1),
            porcentajeMedia: ((media.length / comuneros.length) * 100).toFixed(1),
            porcentajeSuperior: ((superior.length / comuneros.length) * 100).toFixed(1),
            porcentajeEstudiantil: ((poblacionEstudiantil.length / comuneros.length) * 100).toFixed(1),
            
            // EPS por grupo
            preescolarConEps: preescolar.filter(c => c.nombre_eapbAfiliacion).length,
            primariaConEps: primaria.filter(c => c.nombre_eapbAfiliacion).length,
            secundariaConEps: secundaria.filter(c => c.nombre_eapbAfiliacion).length,
            mediaConEps: media.filter(c => c.nombre_eapbAfiliacion).length,
            superiorConEps: superior.filter(c => c.nombre_eapbAfiliacion).length,
            
            // Por género
            preescolarMasculino: preescolar.filter(c => c.descripcion?.toLowerCase() === 'masculino').length,
            preescolarFemenino: preescolar.filter(c => c.descripcion?.toLowerCase() === 'femenino').length,
            primariaMasculino: primaria.filter(c => c.descripcion?.toLowerCase() === 'masculino').length,
            primariaFemenino: primaria.filter(c => c.descripcion?.toLowerCase() === 'femenino').length,
            secundariaMasculino: secundaria.filter(c => c.descripcion?.toLowerCase() === 'masculino').length,
            secundariaFemenino: secundaria.filter(c => c.descripcion?.toLowerCase() === 'femenino').length,
            mediaMasculino: media.filter(c => c.descripcion?.toLowerCase() === 'masculino').length,
            mediaFemenino: media.filter(c => c.descripcion?.toLowerCase() === 'femenino').length,
            superiorMasculino: superior.filter(c => c.descripcion?.toLowerCase() === 'masculino').length,
            superiorFemenino: superior.filter(c => c.descripcion?.toLowerCase() === 'femenino').length,

            // Niveles académicos únicos
            nivelesAcademicos: [...new Set(poblacionEstudiantil
                .map(c => c.des_nivel_academico)
                .filter(Boolean)
                .sort()
            )]
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
    }, [comuneros, searchTerm, edadFilter, nivelAcademicoFilter, currentPage, itemsPerPage]);

    // Reset página al cambiar filtros
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, edadFilter, nivelAcademicoFilter]);

    const exportToExcel = () => {
        const dataToExport = filteredData.map(comunero => {
            let grupoEstudiantil = '';
            if (comunero.edad >= 3 && comunero.edad <= 5) grupoEstudiantil = 'Preescolar (3-5 años)';
            else if (comunero.edad >= 6 && comunero.edad <= 10) grupoEstudiantil = 'Primaria (6-10 años)';
            else if (comunero.edad >= 11 && comunero.edad <= 16) grupoEstudiantil = 'Secundaria (11-16 años)';
            else if (comunero.edad >= 17 && comunero.edad <= 18) grupoEstudiantil = 'Media (17-18 años)';
            else if (comunero.edad >= 19 && comunero.edad <= 25) grupoEstudiantil = 'Superior (19-25 años)';

            return {
                'ID': comunero.id_paciente,
                'Grupo Estudiantil': grupoEstudiantil,
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
                'Nivel Académico Actual': comunero.des_nivel_academico || 'Sin especificar',
                'EPS': comunero.nombre_eapbAfiliacion || 'Sin EPS',
                'Estado Civil': comunero.estado_civil,
                'Habla Otra Lengua': comunero.habla_otra_lenjua ? "Sí" : "No",
                'Servicios Públicos': comunero.cuenta_con_servicios_publico ? "Sí" : "No",
                'Estado': comunero.esta_vivo ? "Vivo" : "Fallecido"
            };
        });

        const ws = XLSX.utils.json_to_sheet(dataToExport);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Poblacion_Estudiantil");
        
        const fileName = `poblacion_estudiantil_${filteredData.length}_${new Date().toISOString().split('T')[0]}.xlsx`;
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
        if (edad >= 3 && edad <= 5) {
            return <Badge condition={true} trueColor="green">Preescolar</Badge>;
        } else if (edad >= 6 && edad <= 10) {
            return <Badge condition={true} trueColor="blue">Primaria</Badge>;
        } else if (edad >= 11 && edad <= 16) {
            return <Badge condition={true} trueColor="purple">Secundaria</Badge>;
        } else if (edad >= 17 && edad <= 18) {
            return <Badge condition={true} trueColor="indigo">Media</Badge>;
        } else if (edad >= 19 && edad <= 25) {
            return <Badge condition={true} trueColor="orange">Superior</Badge>;
        }
        return <Badge condition={false}>Fuera rango</Badge>;
    };

    const getEdadRangoText = (filter) => {
        switch(filter) {
            case 'preescolar': return 'Preescolar (3-5 años)';
            case 'primaria': return 'Primaria (6-10 años)';
            case 'secundaria': return 'Secundaria (11-16 años)';
            case 'media': return 'Media (17-18 años)';
            case 'superior': return 'Superior (19-25 años)';
            default: return 'Población estudiantil (3-25 años)';
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando población estudiantil...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Reporte Población Estudiantil</h1>
                    <p className="text-gray-600">{getEdadRangoText(edadFilter)}</p>
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

            {/* Estadísticas Generales por Nivel Educativo */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="text-blue-800 font-semibold text-sm">Total Comuneros</h3>
                    <p className="text-2xl font-bold text-blue-900">{stats.totalComuneros.toLocaleString()}</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="text-green-800 font-semibold text-sm">Preescolar (3-5)</h3>
                    <p className="text-2xl font-bold text-green-900">{stats.totalPreescolar}</p>
                    <p className="text-xs text-green-700">{stats.porcentajePreescolar}% del total</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="text-blue-800 font-semibold text-sm">Primaria (6-10)</h3>
                    <p className="text-2xl font-bold text-blue-900">{stats.totalPrimaria}</p>
                    <p className="text-xs text-blue-700">{stats.porcentajePrimaria}% del total</p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h3 className="text-purple-800 font-semibold text-sm">Secundaria (11-16)</h3>
                    <p className="text-2xl font-bold text-purple-900">{stats.totalSecundaria}</p>
                    <p className="text-xs text-purple-700">{stats.porcentajeSecundaria}% del total</p>
                </div>
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                    <h3 className="text-indigo-800 font-semibold text-sm">Media (17-18)</h3>
                    <p className="text-2xl font-bold text-indigo-900">{stats.totalMedia}</p>
                    <p className="text-xs text-indigo-700">{stats.porcentajeMedia}% del total</p>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h3 className="text-orange-800 font-semibold text-sm">Superior (19-25)</h3>
                    <p className="text-2xl font-bold text-orange-900">{stats.totalSuperior}</p>
                    <p className="text-xs text-orange-700">{stats.porcentajeSuperior}% del total</p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="text-red-800 font-semibold text-sm">Total Estudiantil</h3>
                    <p className="text-2xl font-bold text-red-900">{stats.totalEstudiantil}</p>
                    <p className="text-xs text-red-700">{stats.porcentajeEstudiantil}% del total</p>
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
                    value={edadFilter}
                    onChange={(e) => setEdadFilter(e.target.value)}
                >
                    <option value="todos">Todos los niveles</option>
                    <option value="preescolar">Preescolar (3-5 años)</option>
                    <option value="primaria">Primaria (6-10 años)</option>
                    <option value="secundaria">Secundaria (11-16 años)</option>
                    <option value="media">Media (17-18 años)</option>
                    <option value="superior">Superior (19-25 años)</option>
                </select>

                <select
                    className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    value={nivelAcademicoFilter}
                    onChange={(e) => setNivelAcademicoFilter(e.target.value)}
                >
                    <option value="todos">Todos los niveles académicos</option>
                    {stats.nivelesAcademicos.map(nivel => (
                        <option key={nivel} value={nivel}>{nivel}</option>
                    ))}
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
                    {edadFilter !== 'todos' && ` (${getEdadRangoText(edadFilter)})`}
                </span>
                <span>Página {currentPage} de {pagination.totalPages}</span>
            </div>
            
            {/* Tabla */}
            <div className="overflow-x-auto rounded-lg border shadow-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nivel Estudiantil</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Documento</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre Completo</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sexo</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Edad</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vereda</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">N° Familia</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nivel Académico</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">EPS</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Otra Lengua</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Serv. Públicos</th>
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
                                        <span className="font-bold text-indigo-600">
                                            {comunero.edad} años
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm font-medium">{comunero.lugar_residencia}</td>
                                    <td className="px-4 py-3 text-sm">
                                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-mono">
                                            {comunero.numero_familia || 'Sin asignar'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm">
                                        <span className="text-sm text-purple-700 font-medium">
                                            {comunero.des_nivel_academico || 'Sin especificar'}
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
                                        <Badge condition={comunero.habla_otra_lenjua} trueColor="purple">
                                            {comunero.habla_otra_lenjua ? "Sí" : "No"}
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
                                <td colSpan="12" className="px-6 py-8 text-center text-gray-500">
                                    No se encontraron resultados para la población estudiantil seleccionada
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