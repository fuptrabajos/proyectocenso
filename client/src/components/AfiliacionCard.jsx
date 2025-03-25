import {useNavigate} from 'react-router-dom'


export function AfiliacionCard({TblAfiliacion}) {

    const navigate = useNavigate()
    
    return (
        <div className='bg-zinc-800 p3 hover:bg-zinc-700
        hover: cursor-pointer'

        onClick={() =>{
            navigate(`/dashboard/Afiliacion/${TblAfiliacion.id_eapb}`)
        }}
        >
        <h1 className="font-bold uppercase">Codigo: {TblAfiliacion.codigo_eapb}</h1>
        <p className="text-slate-400">Nombre Afiliacion:{TblAfiliacion.nombre_eapbAfiliacion}</p>
        <p className="text-slate-400">Regimen: {TblAfiliacion.regimen}</p>
                
    </div>
    )
}