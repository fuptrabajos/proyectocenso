import {useNavigate} from 'react-router-dom'


export function SexoCard({TblSexo}) {

    const navigate = useNavigate()
    
    return (
        <div className='bg-zinc-800 p3 hover:bg-zinc-700
        hover: cursor-pointer'

        onClick={() =>{
            navigate(`/dashboard/Sexo/${TblSexo.codigo}`)
        }}
        >
        <h1 className='font-bold uppercase'>{TblSexo.descripcion}</h1>
        
                
    </div>
    )
}