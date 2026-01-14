import { useEffect, useState } from 'react';
import { getAllTblDatPer, searchTblDatPerByCedula } from '../api/Datper.api';
import { DatperCard } from './DatperCard';

export function DatperList() {
    const [Datper, setDatper] = useState([]);
    const [searchFields, setSearchFields] = useState({
        identificacion: '',
        nombre: '',
        apellido: '',
        searchType: 'general' // 'general', 'specific'
    });
    const [generalSearch, setGeneralSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(0);

    // Cargar los primeros 5 comuneros al montar el componente
    useEffect(() => {
        loadComuneros();
    }, []);

    const loadComuneros = async (searchParams = {}) => {
        setLoading(true);
        try {
            const res = await getAllTblDatPer(searchParams);
            // Verificar si la respuesta tiene la estructura esperada
            if (res.data.results) {
                setDatper(res.data.results);
                setTotalCount(res.data.count);
            } else {
                // Si no tiene results, asumir que es un array directo
                setDatper(res.data);
                setTotalCount(res.data.length);
            }
        } catch (error) {
            console.error('Error cargando comuneros:', error);
            setDatper([]);
            setTotalCount(0);
        } finally {
            setLoading(false);
        }
    };

    // Manejar búsqueda general
    const handleGeneralSearch = async () => {
        if (generalSearch.trim()) {
            await loadComuneros({ search: generalSearch.trim() });
        } else {
            await loadComuneros();
        }
    };

    // Manejar búsqueda específica
    const handleSpecificSearch = async () => {
        const searchParams = {};
        
        if (searchFields.identificacion.trim()) {
            searchParams.identificacion = searchFields.identificacion.trim();
        }
        if (searchFields.nombre.trim()) {
            searchParams.nombre = searchFields.nombre.trim();
        }
        if (searchFields.apellido.trim()) {
            searchParams.apellido = searchFields.apellido.trim();
        }

        if (Object.keys(searchParams).length > 0) {
            await loadComuneros(searchParams);
        } else {
            await loadComuneros();
        }
    };

    // Manejar el enter en los inputs
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            if (searchFields.searchType === 'general') {
                handleGeneralSearch();
            } else {
                handleSpecificSearch();
            }
        }
    };

    // Limpiar búsqueda
    const clearSearch = async () => {
        setGeneralSearch('');
        setSearchFields({
            identificacion: '',
            nombre: '',
            apellido: '',
            searchType: 'general'
        });
        await loadComuneros();
    };

    // Verificar si hay alguna búsqueda activa
    const hasActiveSearch = generalSearch.trim() || 
                           searchFields.identificacion.trim() || 
                           searchFields.nombre.trim() || 
                           searchFields.apellido.trim();

    return (
        <div className="container mx-auto p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Reporte de Comuneros</h1>
            </div>
            
            {/* Barra de búsqueda mejorada con pestañas */}
            <div className="mb-6">
                {/* Pestañas de tipo de búsqueda */}
                <div className="flex border-b border-gray-200 mb-4">
                    <button
                        className={`px-4 py-2 font-medium text-sm ${
                            searchFields.searchType === 'general'
                                ? 'border-b-2 border-green-500 text-green-600'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                        onClick={() => setSearchFields({...searchFields, searchType: 'general'})}
                    >
                        Buscar por Cédula
                    </button>
                    <button
                        className={`px-4 py-2 font-medium text-sm ${
                            searchFields.searchType === 'specific'
                                ? 'border-b-2 border-green-500 text-green-600'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                        onClick={() => setSearchFields({...searchFields, searchType: 'specific'})}
                    >
                        Buscar por Nombre y Apellido
                    </button>
                </div>

                {/* Búsqueda por Cédula */}
                {searchFields.searchType === 'general' && (
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="relative flex-grow max-w-md">
                            <input 
                                type="text" 
                                placeholder="Ingrese el número de cédula..." 
                                className="w-full pl-10 pr-20 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={generalSearch}
                                onChange={(e) => setGeneralSearch(e.target.value)}
                                onKeyPress={handleKeyPress}
                                disabled={loading}
                            />
                            <div className="absolute left-3 top-2.5">
                                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.485 0-4.735.956-6.414 2.586m15.828-15.828A19.952 19.952 0 0012 3c-2.485 0-4.735.956-6.414 2.586M12 3v18" />
                                </svg>
                            </div>
                            <div className="absolute right-2 top-1.5 flex gap-1">
                                <button
                                    onClick={handleGeneralSearch}
                                    disabled={loading}
                                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition duration-200 disabled:bg-gray-400"
                                >
                                    {loading ? '...' : 'Buscar'}
                                </button>
                                {generalSearch && (
                                    <button
                                        onClick={clearSearch}
                                        className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded text-sm transition duration-200"
                                        title="Limpiar búsqueda"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Búsqueda por Nombre y Apellido */}
                {searchFields.searchType === 'specific' && (
                    <div className="space-y-4">
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="relative flex-grow max-w-lg">
                                <input
                                    type="text"
                                    placeholder="Ejemplo: Juan Gómez (nombre y apellido separados por espacio)"
                                    className="w-full pl-10 pr-20 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    value={`${searchFields.nombre} ${searchFields.apellido}`.trim()}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const parts = value.split(' ');
                                        setSearchFields({
                                            ...searchFields,
                                            nombre: parts[0] || '',
                                            apellido: parts.slice(1).join(' ') || ''
                                        });
                                    }}
                                    onKeyPress={handleKeyPress}
                                    disabled={loading}
                                />
                                <div className="absolute left-3 top-2.5">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <div className="absolute right-2 top-1.5 flex gap-1">
                                    <button
                                        onClick={handleSpecificSearch}
                                        disabled={loading}
                                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition duration-200 disabled:bg-gray-400"
                                    >
                                        {loading ? '...' : 'Buscar'}
                                    </button>
                                    {(searchFields.nombre || searchFields.apellido) && (
                                        <button
                                            onClick={clearSearch}
                                            className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded text-sm transition duration-200"
                                            title="Limpiar búsqueda"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                        
                        <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                            <strong>💡 Tip:</strong> Escriba el nombre y apellido separados por espacio. 
                            Ejemplo: "Juan Gómez" buscará personas con nombre "Juan" y apellido "Gómez".
                        </div>
                    </div>
                )}
            </div>
            
            {/* Indicador de resultados */}
            <div className="bg-green-50 p-3 text-green-800 text-sm rounded-lg mb-4">
                {hasActiveSearch ? (
                    <span>
                        {loading ? 'Buscando...' : `Encontrados ${totalCount} resultado(s)`}
                        {searchFields.searchType === 'general' && generalSearch && ` para "${generalSearch}"`}
                        {searchFields.searchType === 'specific' && (
                            <>
                                {searchFields.identificacion && ` - Cédula: "${searchFields.identificacion}"`}
                                {searchFields.nombre && ` - Nombre: "${searchFields.nombre}"`}
                                {searchFields.apellido && ` - Apellido: "${searchFields.apellido}"`}
                            </>
                        )}
                    </span>
                ) : (
                    <span>
                        {loading ? 'Cargando...' : `Mostrando los primeros ${Datper.length} comuneros de la base de datos`}
                    </span>
                )}
            </div>

            {/* Instrucciones de uso */}
            {!hasActiveSearch && !loading && (
                <div className="bg-blue-50 p-3 text-blue-800 text-sm rounded-lg mb-4">
                    💡 <strong>Tip:</strong> Se muestran solo los primeros 5 comuneros. 
                    Use <strong>"Buscar por Cédula"</strong> para encontrar por número de identificación, 
                    o <strong>"Buscar por Nombre y Apellido"</strong> para buscar por nombres completos.
                </div>
            )}
            
            {/* Lista de tarjetas */}
            <div className="space-y-6">
                {loading ? (
                    <div className="text-center py-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                        <p className="text-gray-500 mt-4">Cargando comuneros...</p>
                    </div>
                ) : Datper && Datper.length > 0 ? (
                    Datper.map((TblDatPer) => (
                        <DatperCard key={TblDatPer.id_paciente} TblDatPer={TblDatPer} />
                    ))
                ) : (
                    <div className="text-center py-10 text-gray-500">
                        <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.485 0-4.735.956-6.414 2.586m15.828-15.828A19.952 19.952 0 0012 3c-2.485 0-4.735.956-6.414 2.586M12 3v18" />
                        </svg>
                        {hasActiveSearch ? (
                            <div>
                                <p className="text-lg font-medium">No se encontraron resultados</p>
                                <p>No hay comuneros que coincidan con los criterios de búsqueda</p>
                                <button
                                    onClick={clearSearch}
                                    className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition duration-200"
                                >
                                    Ver todos los comuneros
                                </button>
                            </div>
                        ) : (
                            <p>No se encontraron registros en la base de datos</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
