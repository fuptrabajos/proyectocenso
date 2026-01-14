import { useEffect, useState } from 'react';
import { getAfiliacionStatsRapido } from '../../api/ReporteAfiliacion.api'; // CAMBIAR IMPORT

export function ReportesAfiliacion() {
    const [afiliacionesConConteo, setAfiliacionesConConteo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [totalGeneral, setTotalGeneral] = useState(0);
    const [error, setError] = useState(null);

    // REEMPLAZAR TODO EL useEffect CON ESTO:
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                
                // Usar endpoint súper optimizado
                const response = await getAfiliacionStatsRapido();
                const { afiliaciones, total_general } = response.data;
                
                // Mapear al formato que espera tu componente
                const afiliacionesFormateadas = afiliaciones.map((item, index) => ({
                    id_eapb: index + 1,
                    codigo_eapb: item.codigo_eapb__codigo_eapb,
                    nombre_eapbAfiliacion: item.codigo_eapb__nombre_eapbAfiliacion,
                    total_personas: item.total_personas
                }));
                
                setAfiliacionesConConteo(afiliacionesFormateadas);
                setTotalGeneral(total_general);
                setError(null);
                
            } catch (error) {
                console.error("Error fetching data: ", error);
                setError("Error al cargar los datos de afiliaciones");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Filtrar datos según término de búsqueda
    const filteredData = afiliacionesConConteo.filter(afiliacion =>
        afiliacion.nombre_eapbAfiliacion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        afiliacion.codigo_eapb?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calcular porcentajes
    const calcularPorcentaje = (cantidad) => {
        return totalGeneral > 0 ? ((cantidad / totalGeneral) * 100).toFixed(1) : 0;
    };

    if (loading) {
        return (
            <div className="p-4 ml-0 transition-all duration-100">
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                        <p className="text-gray-600">Cargando reporte de afiliaciones...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 ml-0 transition-all duration-100">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="text-red-800 font-medium">Error</h3>
                    <p className="text-red-600 mt-1">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 ml-0 transition-all duration-100">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Reporte de Afiliaciones EPS
                </h1>
                <p className="text-gray-600">
                    Distribución de personas por entidad promotora de salud
                </p>
            </div>

            {/* Estadísticas generales */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="text-blue-800 font-semibold text-lg">Total Personas</h3>
                    <p className="text-2xl font-bold text-blue-900">{totalGeneral.toLocaleString()}</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="text-green-800 font-semibold text-lg">EPS con Afiliados</h3>
                    <p className="text-2xl font-bold text-green-900">{afiliacionesConConteo.length}</p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h3 className="text-purple-800 font-semibold text-lg">Resultados Filtrados</h3>
                    <p className="text-2xl font-bold text-purple-900">{filteredData.length}</p>
                </div>
            </div>
            
            {/* Barra de búsqueda */}
            <div className="mb-6">
                <div className="relative flex w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Buscar por nombre de EPS o código..."
                        className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                </div>
            </div>
            
            {/* Tabla corregida - eliminé las columnas duplicadas */}
            <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-lg bg-white">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Ranking
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Código EPS
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Nombre de la EPS
                            </th>
                            <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Total Personas
                            </th>
                            <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Porcentaje
                            </th>
                            <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Participación
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredData.length > 0 ? (
                            filteredData.map((afiliacion, index) => (
                                <tr key={afiliacion.id_eapb || 'sin-afiliacion'} className="hover:bg-gray-50 transition-colors duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold text-white ${
                                                index === 0 ? 'bg-yellow-500' : 
                                                index === 1 ? 'bg-gray-400' : 
                                                index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                                            }`}>
                                                {index + 1}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm font-medium text-gray-900">
                                            {afiliacion.codigo_eapb || 'N/A'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900">
                                            {afiliacion.nombre_eapbAfiliacion}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <span className="text-lg font-bold text-blue-600">
                                            {afiliacion.total_personas?.toLocaleString() || 0}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <span className="text-sm font-semibold text-gray-700">
                                            {calcularPorcentaje(afiliacion.total_personas)}%
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div 
                                                className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                                                style={{
                                                    width: `${Math.min(calcularPorcentaje(afiliacion.total_personas), 100)}%`
                                                }}
                                            ></div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-8 text-center">
                                    <div className="text-gray-500">
                                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <h3 className="mt-2 text-sm font-medium text-gray-900">No se encontraron resultados</h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Intenta con diferentes términos de búsqueda
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Resumen al final */}
            {filteredData.length > 0 && (
                <div className="mt-6 bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center text-sm text-gray-600">
                        <span>
                            Mostrando {filteredData.length} de {afiliacionesConConteo.length} afiliaciones
                        </span>
                        <span>
                            Total de personas: {totalGeneral.toLocaleString()}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}