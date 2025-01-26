import {useNavigate} from 'react-router-dom'


export function CultivoCard({TblTiposCultivo}) {

    const navigate = useNavigate()
    
    return (
        <div className='bg-zinc-800 p3 hover:bg-zinc-700
        hover: cursor-pointer'

        onClick={() =>{
            navigate(`/Cultivo/${TblTiposCultivo.id_eapb}`)
        }}
        >
        <h1 className='font-bold uppercase'>{TblTiposCultivo.id_tip_cultivo}</h1>
        <p className='text-slate-400'>{TblTiposCultivo.des_cultivos}</p>
        <p className='text-slate-400'>{TblTiposCultivo.cantidad_en_hectareas}</p>
        <p className='text-slate-400'>{TblTiposCultivo.periodicidad}</p>
                
    </div>
    )
}