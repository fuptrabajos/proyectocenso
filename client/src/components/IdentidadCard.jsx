import {useNavigate} from 'react-router-dom'


export function IdentidadCard({TblTipIdentidad}) {

    const navigate = useNavigate()
    
    return (
        <div className='bg-zinc-800 p3 hover:bg-zinc-700
        hover: cursor-pointer'

        onClick={() =>{
            navigate(`/Identidad/${TblTipIdentidad.id_tip_identidad}`)
        }}
        >
        <h1 className='font-bold uppercase'>{TblTipIdentidad.id_tip_identidad}</h1>
        <p className='text-slate-400'>{TblTipIdentidad.des_tip_identidad}</p>
        
                
    </div>
    )
}