import { useNavigate } from 'react-router-dom';

export function BasuraCard({ TblDisBasuras }) {
    const navigate = useNavigate();
    
    return (
        <div 
            className="bg-white rounded-lg shadow-md mb-6 overflow-hidden border-t-4 border-green-600 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => {
                navigate(`/dashboard/Basura/${TblDisBasuras.id_dis_basuras}`);
            }}
        >
            {/* Encabezado */}
            <div className="bg-green-50 p-4">
                <h1 className="text-lg font-bold text-green-900 uppercase">{TblDisBasuras.des_disp_basura}</h1>
            </div>
        </div>
    );
}