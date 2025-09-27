import { useNavigate } from 'react-router-dom';

export function CultivoCard({ TblTiposCultivo }) {
    const navigate = useNavigate();
    
    return (
        <div 
            className="bg-white rounded-lg shadow-md mb-6 overflow-hidden border-t-4 border-green-600 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => {
                navigate(`/dashboard/Cultivo/${TblTiposCultivo.id_tip_cultivo}`);
            }}
        >
            {/* Encabezado */}
            <div className="bg-green-50 p-4 border-b border-gray-200">
                <h1 className="text-lg font-bold text-green-900 uppercase">Cultivo ID: {TblTiposCultivo.id_tip_cultivo}</h1>
            </div>
            
            {/* Contenido */}
            <div className="p-4 space-y-3">
                <p><span className="text-gray-600 font-medium">Descripción:</span> {TblTiposCultivo.des_cultivos}</p>
                <p><span className="text-gray-600 font-medium">Cantidad en Hectáreas:</span> {TblTiposCultivo.cantidad_en_hectareas}</p>
                <p><span className="text-gray-600 font-medium">Periodicidad:</span> {TblTiposCultivo.periodicidad}</p>
            </div>
        </div>
    );
}