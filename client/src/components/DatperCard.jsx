import { useNavigate } from 'react-router-dom';

export function DatperCard({ TblDatPer }) {
    const navigate = useNavigate();

    return (
        <div
            className="bg-white rounded-lg shadow-md mb-6 overflow-hidden border-t-4 border-green-600 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => navigate(`/dashboard/Datper/${TblDatPer.id_paciente}`)}
        >
            {/* Encabezado */}
            <div className="bg-green-50 p-4 border-b border-gray-200">
                <h2 className="text-lg font-bold text-green-900">IDENTIDAD: {TblDatPer.identificacion_usuario}</h2>
            </div>

            {/* Grid para organizar los datos - Tres columnas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                {/* Columna 1 */}
                <div className="space-y-3">
                    <p><span className="text-gray-600 font-medium">Primer Nombre:</span> {TblDatPer.nombre_1}</p>
                    <p><span className="text-gray-600 font-medium">Segundo Nombre:</span> {TblDatPer.nombre_2}</p>
                    <p><span className="text-gray-600 font-medium">Primer Apellido:</span> {TblDatPer.apellido_1}</p>
                    <p><span className="text-gray-600 font-medium">Segundo Apellido:</span> {TblDatPer.apellido_2}</p>
                    <p><span className="text-gray-600 font-medium">Fecha de Nacimiento:</span> {TblDatPer.fec_nto}</p>
                    <p><span className="text-gray-600 font-medium">Edad:</span> {TblDatPer.edad}</p>
                    <p><span className="text-gray-600 font-medium">Vereda:</span> {TblDatPer.lugar_residencia}</p>
                    <p><span className="text-gray-600 font-medium">Número de Vereda:</span> {TblDatPer.codigo_vereda}</p>
                    <p><span className="text-gray-600 font-medium">Número de familia:</span> {TblDatPer.numero_familia}</p>
                 
                    
                </div>

                {/* Columna 2 */}
                <div className="space-y-3">
                    <p><span className="text-gray-600 font-medium">Etnia:</span> {TblDatPer.etnia}</p>
                    <p><span className="text-gray-600 font-medium">Resguardo:</span> {TblDatPer.resguardo}</p>
                    <p><span className="text-gray-600 font-medium">Código EAPB:</span> {TblDatPer.nombre_eapbAfiliacion}</p>
                    <p><span className="text-gray-600 font-medium">Lugar de Trabajo:</span> {TblDatPer.lugar_de_trabajo}</p>
                    <p><span className="text-gray-600 font-medium">Tipo de Vivienda:</span> {TblDatPer.tipo_vivienda}</p>
                    <p><span className="text-gray-600 font-medium">Tiene Parcela:</span> {TblDatPer.tiene_parcela ? "Sí" : "No"}</p>
                    <p><span className="text-gray-600 font-medium">Tipo de Cultivos:</span> {TblDatPer.des_cultivos}</p>
                    <p><span className="text-gray-600 font-medium">Nivel Académico:</span> {TblDatPer.des_nivel_academico}</p>
                    <p><span className="text-gray-600 font-medium">Esta vivo:</span> {TblDatPer.esta_vivo ? "VIVO" : "FALLECIDO"}</p>
                </div>

                {/* Columna 3 */}
                <div className="space-y-3">
                    <p><span className="text-gray-600 font-medium">Estado Civil:</span> {TblDatPer.estado_civil}</p>
                    <p><span className="text-gray-600 font-medium">Régimen:</span> {TblDatPer.des_regimen}</p>
                    <p><span className="text-gray-600 font-medium">Género:</span> {TblDatPer.descripcion}</p>
                    <p><span className="text-gray-600 font-medium">Habla otro Idioma:</span> {TblDatPer.habla_otra_lenjua ? "Sí" : "No"}</p>
                    <p><span className="text-gray-600 font-medium">Comunidad de origen:</span> {TblDatPer.comunidad_de_origen}</p>
                    <p><span className="text-gray-600 font-medium">Cree en la medicina tradicional:</span> {TblDatPer.usa_medicina_tradicional ? "Sí" : "No"}</p>
                    <p><span className="text-gray-600 font-medium">Tiene servicios públicos:</span> {TblDatPer.cuenta_con_servicios_publico ? "Sí" : "No"}</p>
                    <p><span className="text-gray-600 font-medium">Disposición de basuras:</span> {TblDatPer.des_disp_basura}</p>
                </div>
            </div>
        </div>
    );  
}

// Componente que muestra múltiples tarjetas
export function DatperList({ dataPacientes }) {
    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Reporte de Comuneros</h1>
                
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center transition duration-200">
                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Exportar a Excel
                </button>
            </div>
            
            <div className="mb-6 flex flex-wrap items-center gap-4">
                <div className="relative flex-grow max-w-md">
                    <input 
                        type="text" 
                        placeholder="Buscar por Cédula" 
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <div className="absolute left-3 top-2.5">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
                
                <div className="flex items-center">
                    <span className="text-gray-700 mr-2">Sexo:</span>
                    <select className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                        <option>Todos</option>
                        <option>Masculino</option>
                        <option>Femenino</option>
                    </select>
                </div>
            </div>
            
            <div className="bg-green-50 p-3 text-green-800 text-sm rounded-lg mb-4">
                Mostrando {dataPacientes?.length || 0} de {dataPacientes?.length || 0} registros
            </div>
            
            {/* Lista de tarjetas */}
            <div className="space-y-6">
                {dataPacientes && dataPacientes.length > 0 ? (
                    dataPacientes.map((paciente) => (
                        <DatperCard key={paciente.id_paciente} TblDatPer={paciente} />
                    ))
                ) : (
                    <div className="text-center py-10 text-gray-500">
                        No se encontraron registros
                    </div>
                )}
            </div>
            
            {/* Paginación */}
            {dataPacientes && dataPacientes.length > 0 && (
                <div className="mt-6 flex justify-center">
                    <nav className="inline-flex rounded-md shadow-sm">
                        <button className="px-3 py-2 bg-white border border-gray-300 rounded-l-md text-gray-600 hover:bg-gray-50">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button className="px-4 py-2 bg-green-50 border border-green-500 text-green-700">1</button>
                        <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">2</button>
                        <button className="px-3 py-2 bg-white border border-gray-300 rounded-r-md text-gray-600 hover:bg-gray-50">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </nav>
                </div>
            )}
        </div>
    );
}