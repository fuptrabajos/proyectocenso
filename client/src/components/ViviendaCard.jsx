import { useNavigate } from 'react-router-dom';

export function ViviendaCard({ TblTiposDeVivienda }) {
    const navigate = useNavigate();
    
    return (
        <div 
            className="bg-white rounded-lg shadow-md mb-6 overflow-hidden border-t-4 border-green-600 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => {
                navigate(`/dashboard/Vivienda/${TblTiposDeVivienda.id_tip_vivienda}`);
            }}
        >
            {/* Encabezado */}
            <div className="bg-green-50 p-4 border-b border-gray-200">
                <h1 className="text-lg font-bold text-green-900 uppercase">Vivienda ID: {TblTiposDeVivienda.id_tip_vivienda}</h1>
            </div>
            
            {/* Contenido */}
            <div className="p-4">
                <p><span className="text-gray-600 font-medium">Tipo de Vivienda:</span> {TblTiposDeVivienda.tipo_vivienda}</p>
            </div>
        </div>
    );
}