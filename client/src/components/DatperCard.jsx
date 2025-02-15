import {useNavigate} from 'react-router-dom'


export function DatperCard({TblDatPer}) {

    const navigate = useNavigate()
    
    return (
        <div className='bg-zinc-800 p3 hover:bg-zinc-700
        hover: cursor-pointer'

        onClick={() =>{
            navigate(`/Datper/${TblDatPer.id_paciente }`)
        }}
        >
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