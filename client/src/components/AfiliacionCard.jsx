import {useNavigate} from 'react-router-dom'


export function AfiliacionCard({TblAfiliacion}) {

    const navigate = useNavigate()
    
    return (
        <div className='bg-zinc-800 p3 hover:bg-zinc-700
        hover: cursor-pointer'

        onClick={() =>{
            navigate(`/Afiliacion/${TblAfiliacion.id_eapb}`)
        }}
        >
        <h1 className='font-bold uppercase'>{TblAfiliacion.codigo_eapb}</h1>
        <p className='text-slate-400'>{TblAfiliacion.nombre_eapb}</p>
        <p className='text-slate-400'>{TblAfiliacion.regimen}</p>
                
    </div>
    )
}