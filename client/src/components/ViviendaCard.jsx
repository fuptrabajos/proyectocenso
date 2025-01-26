import {useNavigate} from 'react-router-dom'


export function ViviendaCard({TblTiposDeVivienda}) {

    const navigate = useNavigate()
    
    return (
        <div className='bg-zinc-800 p3 hover:bg-zinc-700
        hover: cursor-pointer'

        onClick={() =>{
            navigate(`/Vivienda/${TblTiposDeVivienda.id_TipDeVivienda}`)
        }}
        >
        <h1 className='font-bold uppercase'>{TblTiposDeVivienda.id_tip_vivienda}</h1>
        <p className='text-slate-400'>{TblTiposDeVivienda.tipo_vivienda}</p>
        
                
    </div>
    )
}