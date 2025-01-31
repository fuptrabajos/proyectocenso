import { useNavigate } from 'react-router-dom';

export function DatperCard({ TblDatPer }) {
    const navigate = useNavigate();

    return (
        <div 
            className="bg-zinc-800 p-4 hover:bg-zinc-700 hover:cursor-pointer rounded-lg shadow-md"
            onClick={() => navigate(`/Datper/${TblDatPer.id_paciente}`)}
        >
            {/* Encabezado */}
            <h1 className="font-bold uppercase text-lg text-white mb-2">{TblDatPer.Tip_iden_usu}</h1>
            <p className="text-slate-400 font-semibold mb-2">IDENTIDAD: {TblDatPer.identificacion_usuario}</p>

            {/* Grid para organizar los datos */}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                    <p><span className="font-semibold text-slate-300">Nombre 1:</span> {TblDatPer.nombre_1}</p>
                    <p><span className="font-semibold text-slate-300">Nombre 2:</span> {TblDatPer.nombre_2}</p>
                    <p><span className="font-semibold text-slate-300">Apellido 1:</span> {TblDatPer.apellido_1}</p>
                    <p><span className="font-semibold text-slate-300">Apellido 2:</span> {TblDatPer.apellido_2}</p>
                    <p><span className="font-semibold text-slate-300">Fecha de Nacimiento:</span> {TblDatPer.fec_nto}</p>
                    <p><span className="font-semibold text-slate-300">Lugar de Residencia:</span> {TblDatPer.lugar_residencia}</p>
                    <p><span className="font-semibold text-slate-300">Etnia:</span> {TblDatPer.etnia}</p>
                    <p><span className="font-semibold text-slate-300">Resguardo:</span> {TblDatPer.resguardo}</p>
                </div>

                <div>
                    <p><span className="font-semibold text-slate-300">Código EAPB:</span> {TblDatPer.codigo_eapb}</p>
                    <p><span className="font-semibold text-slate-300">Trabajo:</span> {TblDatPer.lugar_de_trabajo}</p>
                    <p><span className="font-semibold text-slate-300">Padre:</span> {TblDatPer.nombre_padre}</p>
                    <p><span className="font-semibold text-slate-300">Madre:</span> {TblDatPer.nombre_madre}</p>
                    <p><span className="font-semibold text-slate-300">Tipo de Vivienda:</span> {TblDatPer.id_tip_vivienda}</p>
                    <p><span className="font-semibold text-slate-300">Tiene Parcela:</span> {TblDatPer.tiene_parcela ? "Sí" : "No"}</p>
                    <p><span className="font-semibold text-slate-300">Tipo de Cultivos:</span> {TblDatPer.id_tip_cultivos}</p>
                    <p><span className="font-semibold text-slate-300">Nivel Académico:</span> {TblDatPer.nivel_de_academico}</p>
                    <p><span className="font-semibold text-slate-300">Numero Familia:</span> {TblDatPer.nivel_de_academico}</p>
                </div>
            </div>
        </div>
    );
}
