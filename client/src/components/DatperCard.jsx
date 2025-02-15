import { useNavigate } from 'react-router-dom';



export function DatperCard({ TblDatPer }) {
    const navigate = useNavigate();

    return (
        <div
            className="bg-zinc-800 p-4 hover:bg-zinc-700 hover:cursor-pointer rounded-lg shadow-md"
            onClick={() => navigate(`/Datper/${TblDatPer.id_paciente}`)}
        >
            {/* Encabezado */}
            <p className="text-slate-400 font-semibold mb-2">IDENTIDAD: {TblDatPer.identificacion_usuario}</p>

            {/* Grid para organizar los datos */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div>

                    <p><span className="font-semibold text-slate-300">Nombre 1:</span> {TblDatPer.nombre_1}</p>
                    <p><span className="font-semibold text-slate-300">Nombre 2:</span> {TblDatPer.nombre_2}</p>
                    <p><span className="font-semibold text-slate-300">Apellido 1:</span> {TblDatPer.apellido_1}</p>
                    <p><span className="font-semibold text-slate-300">Apellido 2:</span> {TblDatPer.apellido_2}</p>
                    <p><span className="font-semibold text-slate-300">Fecha de Nacimiento:</span> {TblDatPer.fec_nto}</p>
                    <p><span className="font-semibold text-slate-300">Lugar de Residencia:</span> {TblDatPer.lugar_residencia}</p>
                    <p><span className="font-semibold text-slate-300">Etnia:</span> {TblDatPer.etnia}</p>
                    <p><span className="font-semibold text-slate-300">Resguardo:</span> {TblDatPer.resguardo}</p>
                    <p><span className="font-semibold text-slate-300">Numero de familia:</span> {TblDatPer.numero_familia}</p>
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
                    <p><span className="font-semibold text-slate-300">Numero Familia:</span> {TblDatPer.numero_familia}</p>
                </div>
                <div>
                    <p><span className="font-semibold text-slate-300">Estado Civil:</span> {TblDatPer.estado_civil}</p>
                    <p><span className="font-semibold text-slate-300">Regimen:</span> {TblDatPer.regimen}</p>
                    <p><span className="font-semibold text-slate-300">Genero:</span> {TblDatPer.sexo_al_nacer}</p>
                    <p><span className="font-semibold text-slate-300">Habla otro Idioma:</span> {TblDatPer.habla_otra_lenjua ? "Sí" : "No"}</p>
                    <p><span className="font-semibold text-slate-300">Comunidad de origen:</span> {TblDatPer.comunidad_de_origen}</p>
                    <p><span className="font-semibold text-slate-300">Nivel de Educación:</span> {TblDatPer.numero_familia}</p>
                    <p><span className="font-semibold text-slate-300">Cree en la medicina tradicional:</span> {TblDatPer.usa_medicina_tradicional ? "Sí" : "No"}</p>
                    <p><span className="font-semibold text-slate-300">Tiene servicios publicos:</span> {TblDatPer.cuenta_con_servicios_publico ? "Sí" : "No"}</p>
                    <p><span className="font-semibold text-slate-300">Disposicion de basuras:</span> {TblDatPer.id_disp_de_las_basuras}</p>
                </div>

            </div>
        <h1 className='font-bold uppercase'>{TblDatPer.tip_iden_usu}</h1>
        <p className='text-slate-400'>{TblDatPer.identificacion_usuario }</p>
        <p className='text-slate-400'>{TblDatPer.nombre_1}</p>
        <p className='text-slate-400'>{TblDatPer.nombre_2}</p>
        <p className='text-slate-400'>{TblDatPer.apellido_1}</p>
        <p className='text-slate-400'>{TblDatPer.apellido_2}</p>
        <p className='text-slate-400'>{TblDatPer.fec_nto }</p>
        <p className='text-slate-400'>{TblDatPer.lugar_residencia }</p>
        <p className='text-slate-400'>{TblDatPer.etnia}</p>
        <p className='text-slate-400'>{TblDatPer.resguardo }</p>
        <p className='text-slate-400'>{TblDatPer.nombre_eapbAfiliacion}</p> 
        <p className='text-slate-400'>{TblDatPer.lugar_de_trabajo }</p>
        <p className='text-slate-400'>{TblDatPer.nombre_padre }</p>
        <p className='text-slate-400'>{TblDatPer.nombre_madre }</p>
        <p className='text-slate-400'>{TblDatPer.tipo_vivienda }</p>
        <p className='text-slate-400'>{TblDatPer.tiene_parcela }</p>
        <p className='text-slate-400'>{TblDatPer.des_cultivos }</p>
        <p className='text-slate-400'>{TblDatPer.des_nivel_academico }</p>
        <p className='text-slate-400'>{TblDatPer.estado_civil }</p>
        <p className='text-slate-400'>{TblDatPer.des_regimen }</p>
        <p className='text-slate-400'>{TblDatPer.sexo_al_nacer }</p>
        <p className='text-slate-400'>{TblDatPer.habla_otra_lenjua }</p>
        <p className='text-slate-400'>{TblDatPer.comunidad_de_origen }</p>
        <p className='text-slate-400'>{TblDatPer.usa_medicina_tradicional  }</p>
        <p className='text-slate-400'>{TblDatPer.cuenta_con_servicios_publico  }</p>
        <p className='text-slate-400'>{TblDatPer.id_disp_de_las_basuras  }</p>
                
    </div>
    )
}
