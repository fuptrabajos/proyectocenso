import { useNavigate } from 'react-router-dom';

export function AfiliacionCard({ TblAfiliacion }) {
    const navigate = useNavigate();
    
    return (
        <div 
            className="bg-white rounded-lg shadow-md mb-6 overflow-hidden border-t-4 border-green-600 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => {
                navigate(`/dashboard/Afiliacion/${TblAfiliacion.id_eapb}`);
            }}
        >
            {/* Encabezado */}
            <div className="bg-green-50 p-4 border-b border-gray-200">
                <h1 className="text-lg font-bold text-green-900 uppercase">Código: {TblAfiliacion.codigo_eapb}</h1>
            </div>
            
            {/* Contenido */}
            <div className="p-4">
                <p className="mb-2"><span className="text-gray-600 font-medium">Nombre Afiliación:</span> {TblAfiliacion.nombre_eapbAfiliacion}</p>
                {/* <p><span className="text-gray-600 font-medium">Régimen:</span> {TblAfiliacion.regimen}</p> */}
            </div>
        </div>
    );
}