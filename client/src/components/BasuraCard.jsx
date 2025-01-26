import {useNavigate} from 'react-router-dom'


export function BasuraCard({TblDisBasuras}) {

    const navigate = useNavigate()
    
    return (
        <div className='bg-zinc-800 p3 hover:bg-zinc-700
        hover: cursor-pointer'

        onClick={() =>{
            navigate(`/Basura/${TblDisBasuras.id_dis_basuras}`)
        }}
        >
        <h1 className='font-bold uppercase'>{TblDisBasuras.des_disp_basura}</h1>
       
       
                
    </div>
    )
}