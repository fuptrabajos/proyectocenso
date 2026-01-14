import { useNavigate } from 'react-router-dom';

export function AcademicoCard({ TblNivelAcademico }) {
    const navigate = useNavigate();
    
    return (
        <div 
            className="bg-white rounded-lg shadow-md mb-6 overflow-hidden border-t-4 border-green-600 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => {
                navigate(`/dashboard/Academico/${TblNivelAcademico.id_nivel_acad}`);
            }}
        >
            {/* Encabezado */}
            <div className="bg-green-50 p-4 border-b border-gray-200">
                <h1 className="text-lg font-bold text-green-900 uppercase">{TblNivelAcademico.des_nivel_academico}</h1>
            </div>
        </div>
    );
}