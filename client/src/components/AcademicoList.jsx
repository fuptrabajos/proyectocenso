import {useEffect, useState} from  'react';
import {getAllTblNivelAcademico} from '../api/Academico.api';
import {AcademicoCard} from './AcademicoCard';



export function AcademicoList(){
    const [academico, setAcademico] = useState([]);
    

    useEffect(()=> {
        async function loadAcademico(){
            const res = await getAllTblNivelAcademico();
            setAcademico(res.data);
        }
        loadAcademico();
    },[]);
    return (
    <div className="grid grid-cols-4 gap-3">
        {academico.map((TblNivelAcademico) => (
            <AcademicoCard key={TblNivelAcademico.id_nivel_acad} TblNivelAcademico={TblNivelAcademico} />

        ))}
    </div>    
    );
}

