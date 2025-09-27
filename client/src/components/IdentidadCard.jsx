import { useNavigate } from 'react-router-dom';

export function IdentidadCard({ TblTipIdentidad }) {
    const navigate = useNavigate();
    
    return (
        <div 
            className="bg-white rounded-lg shadow-md mb-6 overflow-hidden border-t-4 border-green-600 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => {
                navigate(`/dashboard/Identidad/${TblTipIdentidad.id_tipo_identidad}`);
            }}
        >
            {/* Encabezado */}
            <div className="bg-green-50 p-4 border-b border-gray-200">
                <h1 className="text-lg font-bold text-green-900 uppercase">Tipo Identidad: {TblTipIdentidad.tip_identidad}</h1>
            </div>
            
            {/* Contenido */}
            <div className="p-4">
                <p><span className="text-gray-600 font-medium">Descripción:</span> {TblTipIdentidad.des_tip_identidad}</p>
            </div>
        </div>
    );
}