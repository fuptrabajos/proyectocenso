import {useNavigate} from 'react-router-dom'


export function RegimenCard({TblRegimen}) {

    const navigate = useNavigate()
    
    return (
        <div className='bg-zinc-800 p3 hover:bg-zinc-700
        hover: cursor-pointer'

        onClick={() =>{
            navigate(`/Regimen/${TblRegimen.id_regimen}`)
        }}
        >
        <h1 className='font-bold uppercase'>{TblRegimen.des_regimen}</h1>
       
       
                
    </div>
    )
}