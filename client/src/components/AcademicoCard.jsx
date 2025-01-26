import {useNavigate} from 'react-router-dom'


export function AcademicoCard({TblNivelAcademico}) {

    const navigate = useNavigate()
    
    return (
        <div className='bg-zinc-800 p3 hover:bg-zinc-700
        hover: cursor-pointer'

        onClick={() =>{
            navigate(`/Academico/${TblNivelAcademico.id_nivel_acad}`)
        }}
        >
        <h1 className='font-bold uppercase'>{TblNivelAcademico.des_nivel_academico}</h1>
        
                
    </div>
    )
}